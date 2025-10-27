import { useState } from "react";
import { useNavigate } from "react-router-dom";
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
// Use the local address as a fallback if the environment variable isn't set.
console.log("API URL:", API_URL);

const Signup = ({ isLoggedIn, setIsLoggedIn }) => {

    const [name, setName] = useState(null);
    const [email, setEmail] = useState(null);
    const [Password, setPassword] = useState(null);

    const navigate = useNavigate();

    const handleClick = async ()=> {
        const res = await fetch(`${API_BASE_URL}/user/signup`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({name : name, email: email, password: Password}),
        });
        
        if(res.ok) {
            setIsLoggedIn(null);
            navigate('/');
        }
    }

    return (
        <div className="box">

                <h2>SIGN UP</h2>
                <div className="s-inputs">
                    <label>Name</label>
                <input 
                    type="text" 
                    placeholder="Enter name"
                    value = {name}
                    onChange={(e)=>{
                        setName(e.target.value);
                    }}
                />

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
            

            <button onClick={handleClick}>Sign up</button>
        </div>
    );
}
 
export default Signup;