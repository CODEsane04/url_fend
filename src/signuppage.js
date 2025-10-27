import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = ({ isLoggedIn, setIsLoggedIn }) => {

    const [name, setName] = useState(null);
    const [email, setEmail] = useState(null);
    const [Password, setPassword] = useState(null);

    const navigate = useNavigate();

    const handleClick = async ()=> {
        const res = await fetch('http://localhost:8000/user/signup', {
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