import React, { useState } from 'react';
import axios from 'axios';
import baseUrl from "./config";


function SpecificStudent() {
  const [className, setClassName] = useState('');
  const [students, setStudents] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${baseUrl}/students/class/${className}`); // Replace with your backend URL
      setStudents(response.data);
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      setLoading(false);
      setStudents([]);
    }
  };

  return (
    <div>
      <h2>Students by Class</h2>
      <div>
        <input
          type="text"
          placeholder="Enter Class Name"
          value={className}
          onChange={(e) => setClassName(e.target.value)}
        />
        <button onClick={handleSearch} disabled={loading}>
          {loading ? 'Searching...' : 'Search'}
        </button>
      </div>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {students.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Student ID</th>
              <th>Name</th>
              <th>Class</th>
              <th>Name</th>


              {/* Add other headers as needed */}
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student._id}>
                <td>{student.studentId}</td>
                <td>{student.name}</td>
                <td>{student.class}</td>
                <td>{student.name}</td>


                {/* Add other data cells as needed */}
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {students.length === 0 && !loading && error === null && className !== "" &&(<p>No students found for class: {className}</p>)}

    </div>
  );
}

export default SpecificStudent;