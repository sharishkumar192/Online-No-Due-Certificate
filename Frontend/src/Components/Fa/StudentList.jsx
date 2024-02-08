import React from 'react';
import './StudentList.css';
import { useNavigate } from 'react-router-dom';

function StudentList({ props1, props2 }) {
  const userData = props2;
  const students= props1;
  const navigate = useNavigate();

  const handleApproveClick = async (studentId) => {
    try {
      console.log(studentId)
      const response = await fetch('http://localhost:3001/faculty/accept', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Add any other headers as needed
        },
        body: JSON.stringify({ userData, studentId }),
      });

      if (response.ok) {
        // Handle success, e.g., update UI or fetch updated data
        console.log('Student approved successfully');
        navigate('/fa', {state:userData});

      } else {
        // Handle error
        console.error('Failed to approve student. Status:', response.status);
      }
    } catch (error) {
      // Handle network or other errors
      console.error('Error during API call:', error);
    }
  };

  return (
    <div className='listofstudents'>
      {students.map((student) => (
        <div className='studentList' key={student.userId}>
          <div className='stname'>{student.userId}</div>
          <div className='rollno'>{student.name}</div>
          <div className='getinfo'>
            <button
              className='drbuttonapprove'
              onClick={() => handleApproveClick(student.userId)}
            >
              Approve
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default StudentList;
