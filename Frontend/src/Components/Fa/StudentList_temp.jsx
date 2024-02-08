import React from 'react'
import './StudentList.css'


function StudentList(props) {


    const students =props.students;
  return (
<div className='listofstudents'>
{
  students.map((student)=>(
    <div className='studentList' key={student._id}>
    <div className='stname'>{student.name}</div>
    <div className='rollno'>{student.userId}</div>
      <div className='getinfo'>
        <button>Approve</button>
      </div>
    </div>
  ))
}
</div>
  )
}

export default StudentList
