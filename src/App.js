import { useState} from "react";
import { useEffect } from "react";
import './App.css';
import Navbar from './navbar.js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './home.js';
import Links from './url-list.js';
import Signup from './signuppage.js';
import Login from './loginpage.js'
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';
console.log("API URL:", API_BASE_URL);
// Use the local address as a fallback if the environment variable isn't set.

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(()=>{

      const checkAuth = async () => {

        const res = await fetch(`${API_BASE_URL}/user/check-auth`, {
          method: 'GET',
          credentials: 'include',
        });

        if (res.ok) {
          setIsLoggedIn(true);
          setIsLoading(false);
        }
        else {
          setIsLoggedIn(null);
          setIsLoading(false);
        }
      }
      checkAuth();
      
  }, []);

  return (

    <Router>
      <div className="App">
        <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        <div className="content">

          <Routes>

            <Route exact path="/" element={<Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />

            <Route path="/home" element={<Home isLoading={isLoading} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />

            <Route path="/links" element={<Links isLoading={isLoading} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />

            <Route path="/user" element={<Signup isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
            
          </Routes>
          
        </div>
      </div>
    </Router>
  );
}

export default App;
