import React, { useState } from 'react'
import './PopupStudent.css'
function PopupStudent({props1,props2, onSubmit }) {

  const userData = props1;
  const studentData = props2;

  console.log(userData)
  const [updatedData,setUpdatedData] = useState({});
  console.log("studentData")

  console.log(studentData)
  const handleSubmission = async () => {
    // Call the onSubmit callback passed from the parent
    try {
      
    const response = await fetch('http://localhost:3001/students/apply', {
      method: 'POST',
    //  credentials : "include", // to send HTTP only cookies

      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      console.error(`HTTP error! Status: ${response.status}`);
      const errorData = await response.json();
      console.error('Error data:', errorData);
    } else {
      const data = await response.json();
      console.log("data",data);
      setUpdatedData(data);
   //   const userRole = data.user.userType;
      console.log('New data:', data);
    } 
  } catch (error) {
    // Handle fetch or other errors
    console.error('Error during login:', error);
  }

    if (onSubmit) {
      onSubmit(userData);
    }
  };
  
  const stname=studentData.name;//name of student
 const stroll="stroll"//roll number
  const stdegree="M-Tech";//degree
  const stbatch=studentData.passoutYear;//batch
  const stdept=studentData.programme;//departmemt
  const stfa=studentData.facultyId;//FA name
  //const stdoj="17-03-2020";//date of join
  //const stapd="21-04-2023";//Application date 
  return (
    <div className='contentcontainer'>
      <h2>Student Details</h2>
    <table className='tb'>
      <tr>
        <th>Name: </th>
        <td>{stname}</td>
        <td><div className="spacer"></div></td>
        <th>Rollnumber: </th>
        <td>{stroll}</td>
      </tr>
      <tr className='spacerv'></tr>
      <tr>
        <th>Degree: </th>
        <td>{stdegree}</td>
        <td><div className="spacer"></div></td>
        <th>Batch: </th>
        <td>{stbatch}</td>
      </tr>
      <tr className='spacerv'></tr>
      <tr>
        <th>Department: </th>
        <td>{stdept}</td>
        <td><div className="spacer"></div></td>
        <th>Faculty Advisor: </th>
        <td>{stfa}</td>
      </tr>
      <tr className='spacerv'></tr>
      {/* <tr>
        <th>Date of Join:</th>
        <td>{stdoj}</td>
        <td><div className="spacer"></div></td>
        <th>Application Date: </th>
        <td>{stapd}</td>
      </tr> */}
    </table>
    <div className="submit_container" >
            <div className="submit" onClick={handleSubmission}>Submit</div>
    </div>
    </div>
  )
}

export default PopupStudent