import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from './AuthContext';
import './css/nav.css'
import ProfileIcon from '../images/profile_icon.svg'


// imrse 
/// ccc 

function NavBar() {
    const [loggedIn, setLogin] = useState(false);
    const navigate = useNavigate();
    const auth = useAuth();
    let session_status = (<button className="blue_btn whitefg" onClick={login_push}>Logged In</button>);
    if (!loggedIn){
        session_status = <button className="blue_btn whitefg" onClick={login_push}>Login</button>
    }else{
        session_status = <a href="/dashboard"><img src={ProfileIcon} alt="Account Icon"></img></a>
    }

    useEffect(() => {
        if (auth.login) {
            setLogin(true)
            console.log(auth)
        }else{
            if (!auth.login || auth.login === undefined){
                setLogin(false)
            }
        }  
    }, [auth]);


    return (
         <div id="nav_full">
            <nav id="main_nav" className="mid_70_layout">
                <h2><Link to="/">Maki Flat Finder</Link></h2>
                {session_status}
            </nav>
        </div>
    );

    function login_push() {
        if (auth.login) {
            navigate('/home');
        } else {
            navigate('/login');
        }
        
    }
}

export default NavBar;