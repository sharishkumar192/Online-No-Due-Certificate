import React, { useState,useEffect } from 'react';
import UserLogo from '../../Assets/user_icon.png';
import FirstMessage from './FirstMessage';
import {useLocation} from 'react-router-dom';

import './Student.css';
//import PopupStudent from './PopupStudent';
import Status from './Status';
import PopupStudent from './PopupStudent';
import {useNavigate,useParams } from 'react-router-dom';
function Student() {
  const { state } = useLocation();
  console.log(state);
  console.log("state");


  const [studentData, setStudentData] = useState({});

  useEffect(() => {
    // Access the userData from the state passed during navigation
    //const userDataFromNavigation = window.history.state?.state?.userData;

    if (state) {
      // You can use userDataFromNavigation to fetch additional data
      // Example: Fetch student-specific data using the student ID
      const fetchStudentData = async () => {
        try {
          const response = await fetch(`http://localhost:3001/students/`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              // Add any other headers as needed
            },
            body: JSON.stringify(state),

          });
          console.log("response",response)
          if (response.ok) {
            const additionalData =  await response.json();
           console.log("additional data" ,)
          setStudentData({ ...studentData, ...additionalData });
            console.log("student data" ,studentData)

          } else {
            console.error('Failed to fetch student data. Status:', response.status);
          }
        } catch (error) {
          console.error('Error during data fetching:', error);
        }
      };

      // Call the fetch function
      fetchStudentData();
    }
  }, []);

  // useEffect(()=>{
  //   const response = fetchStudentData();
  //   if (response.ok) {
  //     const additionalData = await response.json();
  //     setUserData({ ...userDataFromNavigation, additionalData });
  //   } else {
  //     console.error('Failed to fetch student data. Status:', response.status);
  //   }
  // } catch (error) {
  //   console.error('Error during data fetching:', error);
  // }
  // },[])

  // useEffect( () => {
    


  //  // if (state) {
  // //     // You can use userDataFromNavigation to fetch additional data
  // //     // Example: Fetch student-specific data using the student ID
  //      const fetchStudentData = async () => {
  //        try {
  //         const response = await fetch('http://localhost:3001/users/login', {
  //           method: 'POST',
  //         //  credentials : "include", // to send HTTP only cookies

  //           headers: {
  //             'Content-Type': 'application/json',
  //           },
  //           body: JSON.stringify(state),
  //         });

  // //         if (response.ok) {
  // //           const additionalData = await response.json();
  // //      //     setUserData({ ...userDataFromNavigation, additionalData });
  // //         } else {
  // //           console.error('Failed to fetch student data. Status:', response.status);
  // //         }
  // //       } catch (error) {
  // //         console.error('Error during data fetching:', error);
  // //       }
  // //     };

  // //     // Call the fetch function
  //    }
  //    catch{
  //     console.error("error");
  //    }

  // }, [] );

    // const id = studentData.userId
  //  / console.log(id)
  return (
    <div className='scontainer'>
        <div className="header">
            {/* <div className="text">NITC No Due {studentData.userId}</div> */}
            <div className="userdetails">
               {/* <img src={UserLogo} alt={studentData.userId}></img>  */}
               {/* <div className="userroll">{studentData.userId}</div> 
               <div className="username">{studentData.name}</div>  */}
            </div>
        </div>

        <div className="mainbody">
          <div className="sidebar">
            <div className='sidebarbuttons'> 
              <div className='applyb'>Apply</div>
              <div className="statusg">Status</div>
            </div>
            <div className="logout">
              Logout
            </div>
          </div>
          <div className="content">
            <FirstMessage/>
          </div>
        </div>
    </div>
  )
}

export default Student