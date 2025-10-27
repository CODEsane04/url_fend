import { useState} from "react";
import { useNavigate } from "react-router-dom";
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';
// Use the local address as a fallback if the environment variable isn't set.
console.log("API URL:", API_BASE_URL);

const Login = ({ isLoggedIn, setIsLoggedIn }) => {

    
    const [email, setEmail] = useState(null);
    const [Password, setPassword] = useState(null);
    //const [isLoggedIn, setIsLoggedIn] = useState(null);
    const navigate = useNavigate();

    console.log(isLoggedIn);
    console.log("hello");
    
    
    const handleLogin = async ()=> {
        const res = await fetch(`${API_BASE_URL}/user/login`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({email: email, password: Password}),
        });

        if (res.ok) {
            setIsLoggedIn(true);
            navigate('/home');
        }
        else {
            setIsLoggedIn(false);
        }
    }

    const handleNav = ()=> {
        navigate('/user');
    }

    return (
        <div className="box">
            <h2>LOGIN</h2>
            <div className="s-inputs">

                <label>Email</label>
                <input 
                    type="text" 
                    placeholder="Enter email"
                    value = {email}
                    onChange={(e)=>{
                        setEmail(e.target.value);
                    }}
                />

                <label>Password</label>
                <input 
                    type="text" 
                    placeholder="Enter Password"
                    value = {Password}
                    onChange={(e)=>{
                        setPassword(e.target.value);
                    }}
                />
            </div>

            <button onClick={handleLogin}>Login</button>
            {isLoggedIn === false && <button onClick={handleNav}>Sign Up</button>}
            {isLoggedIn === false && <p>Either sign up, or check credentials</p>}
        </div>
    );
}
 
export default Login;