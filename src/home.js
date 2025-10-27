import { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
console.log("API URL:", API_URL);
// Use the local address as a fallback if the environment variable isn't set.

const Home = ({isLoading, isLoggedIn}) => {
    console.log(isLoggedIn);
    const navigate = useNavigate();

    useEffect(()=> {
        if ((isLoggedIn === false || isLoggedIn === null) && isLoading === false) {
            navigate('/')
        }
    }, [isLoggedIn, navigate]);

    const[url, setUrl] = useState('');
    const[fetchedUrl, setFetchedUrl] = useState(null);

    const handleShorten = async (e)=> {
        e.preventDefault();
        
        console.log("sent a post request");
        
        const res = await fetch(`${API_BASE_URL}/`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({long_url:url}),
            credentials: 'include',
        });

        const short_url_doc = await res.json();
        setFetchedUrl(short_url_doc);
        setUrl('');
    }

    return (
        <div className="home">
            <div className="input-field">
                <input  
                    type="text" 
                    placeholder="Enter the url"
                    value = {url}
                    onChange={(e)=>{
                        setUrl(e.target.value);
                        console.log(e.target.value);
                    }}
                />
                <button onClick={handleShorten}>Shorten</button>
            </div>
            {fetchedUrl != null && <div className="single-url">
                {console.log("got the url_doc", fetchedUrl)}
                    <p>short Url: <a href={fetchedUrl.shortUrl} target="_blank">{fetchedUrl.shortUrl}</a></p>
                    <p>Long Url: <a href={fetchedUrl.redirectUrl} target="_blank">{fetchedUrl.redirectUrl}</a></p>
                </div>}
        </div>
    );
}
 
export default Home;