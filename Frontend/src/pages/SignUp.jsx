import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('STUDENT');
  const [error, setError] = useState('');
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await signUp(email, password, role);
      alert('Account created! Please log in.');
      navigate('/login');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '60px auto', fontFamily: 'sans-serif' }}>
      <h2>Create Account</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <label>
          Register As:
          <select value={role} onChange={(e) => setRole(e.target.value)} style={{ width: '100%', padding: '8px', marginTop: '4px' }}>
            <option value="STUDENT">Student</option>
            <option value="TEACHER">Teacher</option>
          </select>
        </label>

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
          placeholder="Password (min 6 chars)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ padding: '8px' }}
        />

        <button type="submit" style={{ padding: '10px', cursor: 'pointer' }}>
          Sign Up as {role}
        </button>
      </form>

      <p style={{ marginTop: '16px' }}>Already have an account? <Link to="/login">Login</Link></p>
    </div>
  );
}