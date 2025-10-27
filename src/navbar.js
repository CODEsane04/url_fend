import { Link } from 'react-router-dom';

const Nav = ({ isLoggedIn, setIsLoggedIn }) => {
    return (
        <div className="navbar">
            <h1>URL Shortener</h1>
            <div className="links">
                {isLoggedIn === true && (
                    <>
                        <Link to="/home" href="">Home</Link>
                        <Link to="/links" href="">URLs</Link>
                    </>
                )}
                {(isLoggedIn === false || isLoggedIn === null) && <Link to="/user">Sign Up</Link>}
                {isLoggedIn === true && <Link to="/" onClick={()=>{
                    setIsLoggedIn(null);
                }}>Logout</Link>}
            </div>
        </div>
    );
}
 
export default Nav;