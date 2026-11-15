import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [selectedRole, setSelectedRole] = useState('STUDENT');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { signInWithRole } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await signInWithRole(email, password, selectedRole);
      navigate(selectedRole === 'TEACHER' ? '/teacher/dashboard' : '/student/dashboard');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '60px auto', fontFamily: 'sans-serif' }}>
      <h2>Portal Login</h2>

      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
        <button
          type="button"
          onClick={() => setSelectedRole('STUDENT')}
          style={{
            flex: 1,
            padding: '10px',
            cursor: 'pointer',
            fontWeight: selectedRole === 'STUDENT' ? 'bold' : 'normal',
            backgroundColor: selectedRole === 'STUDENT' ? '#2563eb' : '#e5e7eb',
            color: selectedRole === 'STUDENT' ? '#fff' : '#000',
            border: 'none',
          }}
        >
          Student Login
        </button>
        <button
          type="button"
          onClick={() => setSelectedRole('TEACHER')}
          style={{
            flex: 1,
            padding: '10px',
            cursor: 'pointer',
            fontWeight: selectedRole === 'TEACHER' ? 'bold' : 'normal',
            backgroundColor: selectedRole === 'TEACHER' ? '#2563eb' : '#e5e7eb',
            color: selectedRole === 'TEACHER' ? '#fff' : '#000',
            border: 'none',
          }}
        >
          Teacher Login
        </button>
      </div>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ padding: '8px' }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ padding: '8px' }}
        />
        <button type="submit" style={{ padding: '10px', cursor: 'pointer' }}>
          Login as {selectedRole}
        </button>
      </form>

      <p style={{ marginTop: '16px' }}>Need an account? <Link to="/signup">Sign Up</Link></p>
    </div>
  );
}