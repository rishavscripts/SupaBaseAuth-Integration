import { useEffect, useState } from 'react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

const emptyForm = { fullName: '', rollNumber: '', department: '', mathMarks: '', scienceMarks: '', englishMarks: '' };

export default function TeacherDashboard() {
  const { user, signOut } = useAuth();
  const [records, setRecords] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(emptyForm);

  const loadRecords = async () => {
    try {
      const res = await api.get('/teacher/records');
      setRecords(res.data);
    } catch (err) {
      console.error('Failed to fetch records (is Spring Boot running?)', err);
    }
  };

  useEffect(() => {
    loadRecords();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      mathMarks: Number(formData.mathMarks),
      scienceMarks: Number(formData.scienceMarks),
      englishMarks: Number(formData.englishMarks),
    };

    try {
      if (editingId) {
        await api.put(`/teacher/records/${editingId}`, payload);
      } else {
        await api.post('/teacher/records', payload);
      }
      setFormData(emptyForm);
      setEditingId(null);
      loadRecords();
    } catch (err) {
      alert(err.response?.data?.message || 'Operation failed');
    }
  };

  const handleEdit = (rec) => {
    setEditingId(rec.id);
    setFormData({
      fullName: rec.fullName,
      rollNumber: rec.rollNumber,
      department: rec.department,
      mathMarks: rec.mathMarks,
      scienceMarks: rec.scienceMarks,
      englishMarks: rec.englishMarks,
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this student record?')) return;
    try {
      await api.delete(`/teacher/records/${id}`);
      loadRecords();
    } catch (err) {
      alert('Delete failed');
    }
  };

  return (
    <div style={{ maxWidth: '900px', margin: '40px auto', fontFamily: 'sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Teacher Admin Dashboard</h2>
        <button onClick={signOut} style={{ padding: '6px 14px', cursor: 'pointer' }}>Logout</button>
      </div>
      <p>Logged in as: <strong>{user?.email}</strong> (Role: TEACHER)</p>
      <hr />

      <h3>{editingId ? 'Edit Student Record' : 'Add New Student Record'}</h3>
      <form onSubmit={handleSave} style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '24px' }}>
        <input placeholder="Full Name" required value={formData.fullName} style={{ padding: '6px' }}
          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} />
        <input placeholder="Roll No" required value={formData.rollNumber} style={{ padding: '6px' }}
          onChange={(e) => setFormData({ ...formData, rollNumber: e.target.value })} />
        <input placeholder="Department" required value={formData.department} style={{ padding: '6px' }}
          onChange={(e) => setFormData({ ...formData, department: e.target.value })} />
        <input type="number" min="0" max="100" placeholder="Math" required value={formData.mathMarks} style={{ padding: '6px', width: '75px' }}
          onChange={(e) => setFormData({ ...formData, mathMarks: e.target.value })} />
        <input type="number" min="0" max="100" placeholder="Science" required value={formData.scienceMarks} style={{ padding: '6px', width: '80px' }}
          onChange={(e) => setFormData({ ...formData, scienceMarks: e.target.value })} />
        <input type="number" min="0" max="100" placeholder="English" required value={formData.englishMarks} style={{ padding: '6px', width: '80px' }}
          onChange={(e) => setFormData({ ...formData, englishMarks: e.target.value })} />
        <button type="submit" style={{ padding: '6px 14px', cursor: 'pointer' }}>
          {editingId ? 'Update' : 'Add Record'}
        </button>
        {editingId && (
          <button type="button" onClick={() => { setEditingId(null); setFormData(emptyForm); }} style={{ padding: '6px 12px', cursor: 'pointer' }}>
            Cancel
          </button>
        )}
      </form>

      <table border="1" cellPadding="8" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Roll No</th>
            <th>Department</th>
            <th>Math</th>
            <th>Science</th>
            <th>English</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {records.length === 0 ? (
            <tr><td colSpan="7" align="center">No student records found.</td></tr>
          ) : (
            records.map((rec) => (
              <tr key={rec.id}>
                <td>{rec.fullName}</td>
                <td>{rec.rollNumber}</td>
                <td>{rec.department}</td>
                <td>{rec.mathMarks}</td>
                <td>{rec.scienceMarks}</td>
                <td>{rec.englishMarks}</td>
                <td>
                  <button onClick={() => handleEdit(rec)} style={{ cursor: 'pointer' }}>Edit</button>{' '}
                  <button onClick={() => handleDelete(rec.id)} style={{ cursor: 'pointer' }}>Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}