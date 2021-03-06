import './App.css';
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NoteState';
import Alerts from './components/Alerts';
import Login from './components/Login';
import SignUp from './components/SignUp';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from 'react-router-dom';



function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type)=>{
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
        setAlert(null);
    }, 1500);
} 
  return (
    <>
      <NoteState>
        <Router>
          <Navbar showAlert1={showAlert} />
          <Alerts alert={alert} />
          <div className="container">
            <Routes>
              <Route path="/*" element={<Home showAlert={showAlert} />} />
              <Route path="about/*" element={<About  />} />
              <Route path="login/*" element={<Login showAlert={showAlert} />} />
              <Route path="signup/*" element={<SignUp  showAlert={showAlert} />} />
              
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
