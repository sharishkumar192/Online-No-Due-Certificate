
import './App.css';
import React from 'react';
import {useEffect,useState} from 'react';
import { BrowserRouter,Routes, Route, Link } from "react-router-dom";
import Login from './Components/Login/Login'; //importing Login component
import Student from './Components/Student/Student';
import Fa from './Components/Fa/Fa'
import Dr from './Components/Dr/Dr'

function App() {
  return (
    <div>
     {/* // <BrowserRouter> */}
      <Routes>
        <Route path='/' Component={Login}/>
        <Route path='student' Component={Student}/>
        <Route path='fa' Component={Fa}/>
        <Route path='dr' Component={Dr}/>
        <Route path='*' element={<div><h2>Error 404 Check your URL</h2></div>}/>
      </Routes>
     {/* </BrowserRouter> */}
  </div>
  );
}
export default App;
