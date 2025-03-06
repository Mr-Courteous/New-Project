import React, { useState } from 'react';
import axios from 'axios';
import baseUrl from './config';


function UpdateStudentScore() {
  const [studentId, setStudentId] = useState('');
  const [subject, setSubject] = useState('');
  const [year, setYear] = useState('');
  const [term, setTerm] = useState('');
  const [newScores, setNewScores] = useState([0, 0]); // Default scores
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    setLoading(true);
    setMessage(null);
    setError(null);
    try {
      const response = await axios.put(`${baseUrl}/updateStudentScore`, { // Replace with your backend URL
        studentId,
        subject,
        year,
        term,
        newScores,
      });
      setMessage(response.data.message);
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.error || err.message);
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Update Student Score</h2>
      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div>
        <label>Student ID:</label>
        <input
          type="text"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
        />
      </div>
      <div>
        <label>Subject:</label>
        <input
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
      </div>
      <div>
        <label>Year:</label>
        <input
          type="text"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />
      </div>
      <div>
        <label>Term:</label>
        <select value={term} onChange={(e) => setTerm(e.target.value)}>
          <option value="">Select Term</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
      </div>
      <div>
        <label>New Scores (e.g., "80, 90"):</label>
        <input
          type="text"
          value={newScores.join(', ')}
          onChange={(e) => setNewScores(e.target.value.split(',').map(Number))}
        />
      </div>

      <button onClick={handleUpdate} disabled={loading}>
        {loading ? 'Updating...' : 'Update Score'}
      </button>
    </div>
  );
}

export default UpdateStudentScore;