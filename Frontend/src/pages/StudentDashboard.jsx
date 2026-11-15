import { useEffect, useState } from 'react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function StudentDashboard() {
  const { user, signOut } = useAuth();
  const [record, setRecord] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    fullName: '',
    rollNumber: '',
    department: '',
    mathMarks: '',
    scienceMarks: '',
    englishMarks: '',
  });

  const fetchMyRecord = async () => {
    try {
      const res = await api.get('/student/record');
      setRecord(res.data);
    } catch (err) {
      if (err.response?.status === 404 || !err.response) {
        setRecord(null);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyRecord();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/student/record', {
        ...formData,
        mathMarks: Number(formData.mathMarks),
        scienceMarks: Number(formData.scienceMarks),
        englishMarks: Number(formData.englishMarks),
      });
      setRecord(res.data);
    } catch (err) {
      alert(err.response?.data?.message || 'Submission failed (is Spring Boot running?)');
    }
  };

  if (loading) return <p style={{ textAlign: 'center', marginTop: '40px' }}>Loading your dashboard...</p>;

  return (
    <div style={{ maxWidth: '600px', margin: '40px auto', fontFamily: 'sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Student Dashboard</h2>
        <button onClick={signOut} style={{ padding: '6px 14px', cursor: 'pointer' }}>Logout</button>
      </div>
      <p>Logged in as: <strong>{user?.email}</strong></p>
      <hr />

      {!record ? (
        <div>
          <h3>Submit Your Academic Details & Marks</h3>
          <p>You can submit this form once. Contact your teacher for any future edits.</p>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <input placeholder="Full Name" required value={formData.fullName} style={{ padding: '8px' }}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} />
            <input placeholder="Roll Number" required value={formData.rollNumber} style={{ padding: '8px' }}
              onChange={(e) => setFormData({ ...formData, rollNumber: e.target.value })} />
            <input placeholder="Department" required value={formData.department} style={{ padding: '8px' }}
              onChange={(e) => setFormData({ ...formData, department: e.target.value })} />
            <input type="number" min="0" max="100" placeholder="Math Marks" required value={formData.mathMarks} style={{ padding: '8px' }}
              onChange={(e) => setFormData({ ...formData, mathMarks: e.target.value })} />
            <input type="number" min="0" max="100" placeholder="Science Marks" required value={formData.scienceMarks} style={{ padding: '8px' }}
              onChange={(e) => setFormData({ ...formData, scienceMarks: e.target.value })} />
            <input type="number" min="0" max="100" placeholder="English Marks" required value={formData.englishMarks} style={{ padding: '8px' }}
              onChange={(e) => setFormData({ ...formData, englishMarks: e.target.value })} />
            <button type="submit" style={{ padding: '10px', cursor: 'pointer' }}>Submit Details</button>
          </form>
        </div>
      ) : (
        <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px', marginTop: '20px' }}>
          <h3>Your Submitted Record</h3>
          <p><strong>Name:</strong> {record.fullName}</p>
          <p><strong>Roll Number:</strong> {record.rollNumber}</p>
          <p><strong>Department:</strong> {record.department}</p>
          <p><strong>Math:</strong> {record.mathMarks}</p>
          <p><strong>Science:</strong> {record.scienceMarks}</p>
          <p><strong>English:</strong> {record.englishMarks}</p>
        </div>
      )}
    </div>
  );
}