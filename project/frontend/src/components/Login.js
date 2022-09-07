import React from 'react';
import './css/signup.css';
import './css/login.css';
import { useNavigate } from 'react-router-dom';
import ThirdPartyOption from './ThirdPartyOption'
import { useAuth, useAuthenticate } from './AuthContext';


function Login() {
    // Changing body css styling here.
    document.body.position = 'relative';
    document.body.height = "100vh";
    document.body.width = "100%";
    document.body.overflow = "auto hidden";

    const auth = useAuth();
    const authenticate = useAuthenticate()

    const navigate = useNavigate();
    function signup_push(){
        navigate('/signup');
    }

    if (auth.loggedIn){
        navigate('/home');
    }

    async function login(e){
        e.preventDefault();
        // Get the form data.
        const form = e.target;
        const email_value = form.email.value;
        const password_value = form.password.value;
        
        // Check if the form is valid.
        if(email_value === '' || password_value === ''){
            alert('Please fill in all the fields.');
            return;
        }

        // Send this data to the server to check if the user is valid.
        let payload = { email: email_value, password: password_value };
        
        const response = await fetch("http://localhost:3500/login", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify( payload )
        })
        
        const body = await response.text();
        const result = JSON.parse(body);

        console.log(result);

        // Handle response and redirect to the appropriate page.
        if (result.errors){
            alert("Server Error: " + response.data.error);
        }
        else{
            if (result.login === true){
                console.log(result.role); // Showing role of user, consultant or admin.
                alert('Login successful!');
                authenticate(result.login, result.role, result.username, result.id, result.consent);
                console.log(auth)
                navigate('/dashboard');
                
            }
            if (result.login === false){
                // Clear password field.
                form.password.value = '';
                // Make both input fields red for 3 seconds.
                form.email.style.borderColor = 'red';
                form.password.style.borderColor = 'red';
                setTimeout(function(){
                    form.email.style.borderColor = '';
                    form.password.style.borderColor = '';
                }, 3000);
                alert('Login failed!\n Reason: ' + result.reason);
            }
        }

    }

    return ( 
        <div id="main_content" className="mid_70_layout">
            <div className="action_box_wrapper">
                <h1>Login to access your account</h1>
                <div className="action_box">
                    
                    <div className="action_box_contents_flex">
                        <div className="action_box_contents_split_flex">
                            
                            <div className="action_box_contents_split_left">
                                <h3>Email Address</h3>
                                <form onSubmit={login}>
                                    <div className="input_wrapper">
                                        <input type="text" name="email" placeholder="Email Address" autoComplete="email" required/>
                                    </div>
                                    <h3>Password</h3>
                                    <div className="input_wrapper">
                                        <input type="password" name="password" placeholder="Password" autoComplete="off" required/>
                                    </div>
                                    <p className="center">
                                        <a href="forgot_password.html">Forgot Password?</a>
                                    </p>
            
                                    <div className="submit_wrapper">
                                        <input type="submit" value="Log in"/>
                                    </div>
                                </form>
                                <div className="center input_info">
                                    <span>Dont have a account? <button onClick={signup_push}>Sign Up</button></span> 
                                </div>
                               

                            </div>
                            <div className="action_box_contents_split_right">
                                <h3>Sign in with others:</h3>
                                <ThirdPartyOption image={require("../images/google_icon.png")} title="Google" />
                                <ThirdPartyOption image={require("../images/facebook_icon.png")} title="Facebook" />
                                <ThirdPartyOption image={require("../images/apple_icon.png")} title="Apple" />
                                <ThirdPartyOption image={require("../images/tiktok_icon.png")} title="Tiktok" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>        

     );
}
export default Login;