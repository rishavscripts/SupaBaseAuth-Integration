import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../services/supabaseClient';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setRole(session?.user?.user_metadata?.role || null);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setRole(session?.user?.user_metadata?.role || null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email, password, selectedRole) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { role: selectedRole },
      },
    });
    if (error) throw error;
    return data;
  };

  const signInWithRole = async (email, password, expectedRole) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;

    const actualRole = data.user?.user_metadata?.role;
    if (actualRole !== expectedRole) {
      await supabase.auth.signOut();
      throw new Error(`Access denied: This account is registered as a ${actualRole}, not a ${expectedRole}.`);
    }

    return data;
  };

  const signOut = () => supabase.auth.signOut();

  return (
    <AuthContext.Provider value={{ session, user: session?.user, role, loading, signUp, signInWithRole, signOut }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);