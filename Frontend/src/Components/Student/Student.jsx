import React, { useState, useEffect } from 'react';
import UserLogo from '../../Assets/user_icon.png';
import FirstMessage from './FirstMessage';
import { useLocation } from 'react-router-dom';
import './Student.css';
import Status from './Status';
import PopupStudent from './PopupStudent';
import { useNavigate, useParams } from 'react-router-dom';

function Student() {
    const navigate = useNavigate();

  const { state } = useLocation();
  const [studentData, setStudentData] = useState({});
  const [isStudentApplied, setIsStudentApplied] = useState(false);//this one new

  console.log("state in Student",state);

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await fetch('http://localhost:3001/students/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(state),
        });

        if (response.ok) {
          const additionalData = await response.json();
          setStudentData({ ...studentData, ...additionalData });
          setIsStudentApplied(additionalData.isNoDueApplied)
          console.log(studentData,"studentData");
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
  const [showPopup, setShowPopup] = useState(false);
  const [showStatus, setShowStatus] = useState(false);
  const [statusButtonDisabled, setStatusButtonDisabled] = useState(true);
  const handleSubmitClick = () => {
    setShowPopup(false);
    setShowStatus(true);
    setIsStudentApplied(true);//this one  new
  };

  const handleApplyClick = () => {
    if (!showStatus) {
      setShowPopup(true);
      setShowStatus(false);
      setStatusButtonDisabled(true); 
    }
  };

  

  const handleLogout = () => {
    navigate('/');
  };
  return (
    <div className='scontainer'>
        <div className="header">
            <div className="text">NITC No Due</div>
            <div className="userdetails">
              <img src={UserLogo} />
              <div className="userroll">{studentData.userId}</div>
              <div className="username">{studentData.username}</div>
            </div>
        </div>

        <div className="mainbody">
          <div className="sidebar">
            <div className='sidebarbuttons'> 
            <div className={`applyb ${showStatus ? 'disabled' : ''}`} onClick={handleApplyClick}>
            Apply
            </div>

            <div className={`statusg ${showPopup || !showStatus ? 'disabled' : ''}`} onClick={() => setShowStatus(true)}>
            Status
            </div> 
              </div>
            <div className="logout" onClick={handleLogout}>
              Logout
            </div>
          </div>
          <div className="content">
          {isStudentApplied ? (
            <Status props1={state} />
          ) : (
            <>
              <FirstMessage />
              {showPopup && <PopupStudent props1={state} props2={studentData}  onSubmit={handleSubmitClick} />}
            </>
          )}


          {/* {showPopup ? (
            <PopupStudent props1={state} props2={studentData} onSubmit={handleSubmitClick} />
          ) : showStatus ? (
            <Status props1={state} />
          ) : (
            <FirstMessage />
          )} */}
          </div>
        </div>
    </div>
  )
}

export default Student
