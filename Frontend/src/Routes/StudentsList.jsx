import React, { useState, useEffect } from 'react';
import axios from 'axios';
import baseUrl from "./config";


function StudentList() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get(`${baseUrl}/students`); // Replace with your backend API endpoint
        setStudents(response.data.GetStudents);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  if (loading) {
    return <div>Loading students...</div>;
  }

  if (error) {
    return <div>Error loading students: {error.message}</div>;
  }

  return (
    <div>
      <h2>Students' List</h2>
      {students.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Student ID</th>
              <th>Name</th>
              <th>Class</th>
              {/* Add more table headers as needed */}
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student._id}>
                <td>{student._id}</td>
                <td>{student.name}</td>
                <td>{student.class}</td>
                {/* Add more table data as needed */}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No students found.</p>
      )}
    </div>
  );
}

export default StudentList;