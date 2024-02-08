import React from 'react'
import {useEffect,useState} from 'react';
import { useNavigate } from 'react-router-dom';

import './Login.css'
const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [session,setSession]=useState({})
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const data = {
                "username" :username,
                "password":password
            }
          const response = await fetch('http://localhost:3001/users/login', {
            method: 'POST',
          //  credentials : "include", // to send HTTP only cookies

            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          });
    
          if (!response.ok) {
            console.error(`HTTP error! Status: ${response.status}`);
            const errorData = await response.json();
            console.error('Error data:', errorData);
            navigate('/');

          } else {
            const data = await response.json();
            // Assuming the backend returns some data indicating user role (fa, dr, student, etc.)
          //  console.log(data);
            setSession(data);
            const userRole = data.user.userType;
            console.log('Login successful:', data);


    
            // Perform routing based on user role
            switch (userRole) {
                  case 'Student':
                    // Redirect to the faculty (fa) page
                  //  history.push('/student', { userData: data });  // Replace 'userData' with the actual key you want to use
                  console.log("Student")
                  navigate('/student', {state:data});

                 // navigate('student', {state:{userData:data}}); // Replace 'userData' with the actual key you want to use
                  
                    break;
                  case 'Faculty':
                    navigate('/fa', {state:data});

                    // Redirect to the department (dr) page
                    break;
                  case 'DR':
                    // Redirect to the student page
                    navigate('/dr', {state:data});

                    break;
                  // Add more cases based on your backend response
        
                  default:
                    // Handle unexpected user roles or errors
                }
          } 
        } catch (error) {
          // Handle fetch or other errors
          navigate('/');

          //console.error('Error during login:', error);
        }
      };
    
  return (
    <div className='container'>
        <div className="header">
            <div className="text">NITC No Due</div>
        </div>
        <div className="inputs">
            <div className="input">
                <input type="text" placeholder='Username' value={username}
            onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div className="input">
                <input type="password" placeholder='Password' value={password}
            onChange={(e) => setPassword(e.target.value)}/>
            </div>
        </div>
        <div className="submit_container" >
            <div className="login" onClick={handleLogin} >Login</div>
        </div>
    </div>
  )
}

export default Login