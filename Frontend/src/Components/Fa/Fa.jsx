import React, { useEffect, useState } from 'react';
import UserLogo from '../../Assets/user_icon.png';
import './Fa.css';
import StudentList from './StudentList';
import StudentListshow from './StudentListshow';

import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

function Fa() {

  //const UserName="Ramesh";
  const navigate = useNavigate();






  const[rstudents,setRstudent]= useState([
    {slno :1,id:"muhammed_m231041cs@nitc.ac.in", name:'Muhammed Raneesh ', rollno:'M231041CS',degree:'Btech',batch:'2020',dept:'CSE',fa:'Ramesh',doj:'17-03-2020',Ad:'10-05-2023'},
    {slno :2,id:"thejus_m231043cs@nitc.ac.in", name:'Thejus Sreekumar ', rollno:'M231043CS',degree:'Btech',batch:'2020',dept:'CSE',fa:'Ramesh',doj:'17-03-2020',Ad:'10-05-2023'},
  ])

  const[astudents,setAstudent]= useState([
    {slno :1,id:"muhammed_m231041cs@nitc.ac.in", name:'Akhil ', rollno:'M231041CS',degree:'Btech',batch:'2020',dept:'CSE',fa:'Ramesh',doj:'17-03-2020',Ad:'10-05-2023'},
    {slno :2,id:"thejus_m231043cs@nitc.ac.in", name:'Madhu ', rollno:'M231043CS',degree:'Btech',batch:'2020',dept:'CSE',fa:'Ramesh',doj:'17-03-2020',Ad:'10-05-2023'},
  ])

  const { state } = useLocation();
  //const [studentData, setStudentData] = useState({});
  //const [isStudentApplied, setIsStudentApplied] = useState(false);//this one new

  console.log("state in Student",state);

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await fetch('http://localhost:3001/faculty/post', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(state),
        });

        if (response.ok) {
          const additionalData = await response.json();

          console.log("additional data",additionalData)
          //console.log("pr data",additionalData.PendingRequests.studentRequests[0].userId)
          console.log("pr data",additionalData.ApprovedRequests.approvedRequests[0].userId)
          setRstudent(additionalData.PendingRequests.studentRequests);
          setAstudent(additionalData.ApprovedRequests.approvedRequests);

         // set
        //  setStudentData({ ...studentData, ...additionalData });
         // setIsStudentApplied(additionalData.isNoDueApplied)
         // console.log(studentData,"studentData");
        } else {
          console.error('Failed to fetch student data. Status:', response.status);
        }
      } catch (error) {
        console.error('Error during data fetching:', error);
      }
    };

    // Call the fetch function
    if (state) {
      fetchStudentData();
    }
  }, [state]);
  
  const handleLogout = () => {
    navigate('/');
  };

  const [activeTab, setActiveTab] = useState('request');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    if(tab==='approved'){
      
    }
  };



  return (
    <div className='fcontainer'>
        <div className="header">
            <div className="text">NITC No Due</div>
            <div className="userdetails">
              <img src={UserLogo} />
              <div className="userroll">{state.user.username}</div>
              {/* <div className="username">{studentData.username}</div> */}
            </div>
        </div>

        <div className="mainbody">
          <div className="sidebar">
            <div className='sidebarbuttons'> 
              <div className={`frequest ${activeTab === 'request' ? 'active' : ''}`}onClick={() => handleTabClick('request')}>Request</div>
              <div className={`fapproved ${activeTab === 'approved' ? 'active' : ''}`}onClick={() => handleTabClick('approved')}>Approved</div>
            </div>
            <div className="logout" onClick={handleLogout}>
              Logout
            </div>
          </div>
          <div className="content">
          {activeTab === 'request' && <StudentList props1={rstudents} props2={state}  />}
          {activeTab === 'approved' && <StudentListshow props1={astudents} />}
          </div>
        </div>
    </div>
  )
}

export default Fa