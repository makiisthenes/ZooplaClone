import React from 'react';
import './css/signup.css';
import { useNavigate } from 'react-router-dom';




function Signup() {
    document.body.position = 'relative';
    document.body.height = "100vh";
    document.body.width = "100%";
    document.body.overflow = "auto hidden";

    const navigate = useNavigate();
    function login_push(){
        navigate('/login');
    }

    async function sign_up(e){
        // Handling of input and form submission.
        e.preventDefault();
        // Get the form data.
        const form = e.target;
        const email_value = form.email.value;
        const username_value = form.username.value;
        const password_value = form.password.value;
        const email_consent_value = form.emails.checked ? 1 : 0;

        // Check if the form is valid.
        if(email_value === '' || username_value === '' || password_value === ''){
            alert('Please fill in all the fields.');
            return;
        }
        
        let payload = { email: email_value, username: username_value, password: password_value, email_consent: email_consent_value };
        
        const response = await fetch("http://localhost:3500/signup", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify( payload )
        })
        
        const body = await response.text();
        const result = JSON.parse(body);
        if (result.errors){
            alert("Server Error: " + result.error);
        }
        else{
            if (result.success === true){
                alert('Sign up successful!');
                navigate('/login');
            }
            if (result.success === false){
                form.email.style.borderColor = 'red';
                setTimeout(function(){
                    form.email.style.borderColor = '';
                }, 3000);
                alert('Sign up failed!\n Reason: ' + result.reason);
            }
                       
        }
    
    }

    return ( 
        <div id="main_content" className="mid_70_layout">
            <div className="action_box_wrapper">
                <h1>Sign up to Maki Flat Finder</h1>
                <div className="action_box">
                    <form onSubmit={sign_up}>
                    <h1>Create your account</h1>
                    <div className="action_box_contents_flex">
                        <div className="action_box_contents_split_flex">
                            
                            <div className="action_box_contents_split_left">
                                <h3>Email Address</h3>
                                <div className="input_wrapper">
                                    <input type="text" name="email" placeholder="Email Address" autocomplete="email" required/>
                                </div>
                                <h3>Password</h3>
                                <span className="input_info">
                                    This must be a minimum of 8 characters, including 1 lowercase character, uppercase character and a number.
                                </span>
                                <div className="input_wrapper">
                                    <input type="password" name="password" placeholder="Password" pattern="(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$" autocomplete="off" required/>
                                </div>
                                <p>
                                    By proceeding, you agree to our <a href="tou.html">Terms of Use</a> and <a href="privacy.html">Privacy Policy</a>.
                                </p>
                                <div className="input_wrapper">
                                    <input type="checkbox" name="emails" />
                                    <span className="input_info">I want to receive marketing emails from Maki Flat Finder.</span>
                                </div>
                                <div className="submit_wrapper">
                                    <input type="submit" value="Sign Up"/>
                                </div>
                                <div className="center input_info">
                                    <span>Already have an account? <button onClick={login_push}>Log in</button></span> 
                                </div>
                            </div>
                            <div className="action_box_contents_split_right">
                                <h3>Name</h3>
                                <div className="input_wrapper">
                                    <input type="text" name="username" placeholder="Name" minLength="4" required/>
                                </div>
                                <span className="input_info">
                                    Must have a length more than 4 chars.
                                </span>
                            </div>
                        </div>
                    </div>
                    </form>
                </div>
            </div>
        </div>
     );
}

export default Signup;