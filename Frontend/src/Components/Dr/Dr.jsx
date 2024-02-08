import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserLogo from '../../Assets/user_icon.png';
import { useState } from 'react';
import './Dr.css';
import StudentList from './StudentList';
import StudentListshow from './StudentListshow';

import { useLocation } from 'react-router-dom';
function Dr() {

  const navigate = useNavigate();
  const { state } = useLocation();

  const UserName="Manoj";
  const UserRoll="E151041";

  const[option,setOption]=useState("1");
  
  const[rqstudents,setRqstudent]= useState([
    {slno :1,id:"muhammed_m231041cs@nitc.ac.in", name:'Muhammed Raneesh ', rollno:'M231041CS',degree:'Btech',batch:'2020',dept:'CSE',fa:'Ramesh',doj:'17-03-2020',Ad:'10-05-2023',due:5000},
    {slno :2,id:"thejus_m231043cs@nitc.ac.in", name:'Thejus Sreekumar ', rollno:'M231043CS',degree:'Btech',batch:'2020',dept:'CSE',fa:'Ramesh',doj:'17-03-2020',Ad:'10-05-2023',due:0},
  ])

  const[astudents,setAstudent]= useState([
    {slno :1,id:"muhammed_m231041cs@nitc.ac.in", name:'Muhammed', rollno:'M231041CS',degree:'Btech',batch:'2020',dept:'CSE',fa:'Ramesh',doj:'17-03-2020',Ad:'10-05-2023',due:5000},
    {slno :2,id:"thejus_m231043cs@nitc.ac.in", name:'Thejus ', rollno:'M231043CS',degree:'Btech',batch:'2020',dept:'CSE',fa:'Ramesh',doj:'17-03-2020',Ad:'10-05-2023',due:0},
  ])

  const[rjstudents,setRjstudent]= useState([
    {slno :1,id:"muhammed_m231041cs@nitc.ac.in", name:'Raneesh ', rollno:'M231041CS',degree:'Btech',batch:'2020',dept:'CSE',fa:'Ramesh',doj:'17-03-2020',Ad:'10-05-2023',due:5000},
    {slno :2,id:"thejus_m231043cs@nitc.ac.in", name:'Akhil ', rollno:'M231043CS',degree:'Btech',batch:'2020',dept:'CSE',fa:'Ramesh',doj:'17-03-2020',Ad:'10-05-2023',due:0},
  ])

  const [indexofDR,setIndexofDR] =useState(0)


  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await fetch('http://localhost:3001/dr/post', {
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
          console.log("pr data",additionalData.ApprovedRequests.studentRequests)
          console.log("pr data",additionalData.RejectedRequests)
          //setIndex
          setRqstudent(additionalData.PendingRequests.studentRequests);
          setAstudent(additionalData.ApprovedRequests.approvedRequests);
          setRjstudent(additionalData.RejectedRequests.rejectedRequests);
          setIndexofDR(additionalData.PendingRequests.index);

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
  };



  return (
    <div className='dcontainer'>
        <div className="header">
            <div className="text">NITC No Due</div>
            <div className="userdetails">
              <img src={UserLogo} alt={UserName}/>
              <div className="userroll">{state.user.username}</div>

            </div>
        </div>

        <div className="mainbody">
          <div className="sidebar">
            <div className='sidebarbuttons'> 

              <div className={`drequest ${activeTab === 'request' ? 'active' : ''}`}onClick={() => handleTabClick('request')}>Request</div>
              <div className={`dapproved ${activeTab === 'approved' ? 'active' : ''}`}onClick={() => handleTabClick('approved')}>Approved</div>
              <div className={`drejected ${activeTab === 'rejected' ? 'active' : ''}`}onClick={() => handleTabClick('rejected')}>Rejected</div>


            </div>
            <div className="logout" onClick={handleLogout}>
              Logout
            </div>
          </div>
          <div className="content">
          {activeTab === 'request' && <StudentList  props3 = {indexofDR} props1={rqstudents} props2={state} />}
          {activeTab === 'approved' && <StudentListshow props1={astudents} />}
          {activeTab === 'rejected' && <StudentListshow props1={rjstudents} />}
          </div>
        </div>
    </div>
  )
}

export default Dr