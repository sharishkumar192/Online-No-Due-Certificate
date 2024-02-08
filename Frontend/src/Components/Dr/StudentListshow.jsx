import React from 'react'
import './StudentList.css'


import { useNavigate } from 'react-router-dom';

function StudentListshow({  props1 }) {
 // const userData = props2;
  const students= props1;
  //const navigate = useNavigate();

  

  return (
    <div className='listofstudents'>
      {students.map((student) => (
        <div className='studentList' >
          <div className='stname'>{student.userId}</div>
          <div className='rollno'>{student.name}</div>
          
        </div>
      ))}
    </div>
  );
}

export default StudentListshow;


// function StudentList(props) {
  //key={student.userId}

//     const students =props.students;
//   return (
// <div className='listofstudents'>
// {
//   students.map((student)=>(
//     <div className='studentList' key={student.slno}>
//       <div className='stname'>{student.name}</div>
//       <div className='rollno'>{student.rollno}</div>
//     </div>
//   ))
// }
// </div>
//   )
// }

// export default StudentList
