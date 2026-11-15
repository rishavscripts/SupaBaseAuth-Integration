import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Home() {
  const { session, role } = useAuth();

  return (
    <div style={{ maxWidth: '720px', margin: '80px auto', textAlign: 'center', fontFamily: 'sans-serif' }}>
      <h1>Academic Portal — Supabase Auth & RBAC</h1>
      <p>Role-based Student Marks Submission & Teacher Administration System</p>

      <div style={{ marginTop: '32px', display: 'flex', gap: '16px', justifyContent: 'center' }}>
        {!session ? (
          <>
            <Link to="/login"><button style={{ padding: '10px 24px', cursor: 'pointer' }}>Login</button></Link>
            <Link to="/signup"><button style={{ padding: '10px 24px', cursor: 'pointer' }}>Sign Up</button></Link>
          </>
        ) : (
          <Link to={role === 'TEACHER' ? '/teacher/dashboard' : '/student/dashboard'}>
            <button style={{ padding: '10px 24px', cursor: 'pointer' }}>Go to {role} Dashboard</button>
          </Link>
        )}
      </div>
    </div>
  );
}