import { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';
console.log("API URL:", API_BASE_URL);

const Linkss = ({isLoading, isLoggedIn, setIsLoggedIn }) => {

    const[urls, setUrls] = useState([]);
    const navigate = useNavigate();

   useEffect(() => {

        if ((isLoggedIn === null || isLoggedIn === false) && isLoading === false) {
            navigate('/')
        }

        const geturls = async () => {
            try {
                const res = await fetch(`${API_BASE_URL}/links`, {
                    method:'GET',
                    headers: { "Content-Type": "application/json" },
                    credentials: 'include',
                });
                const data = await res.json();
                setUrls(data);
            } catch (err) {
                console.error("Error fetching URLs:", err);
            }
        };

        geturls();
  }, []); 
    
    return (
        <div className="url-list">
            {urls.length > 0 && urls.map((url)=>(
                <div className="single-url">
                    <p>short Url: <a href={url.shortUrl} target="_blank">{url.shortUrl}</a></p>
                    <p>Long Url: <a href={url.redirectUrl} target="_blank">{url.redirectUrl}</a></p>
                </div>
            ))}
        </div>
    );
}
 
export default Linkss;