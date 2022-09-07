import React, {useState, useEffect} from 'react';
// Import navigate from react-router-dom
import { useNavigate } from 'react-router-dom';
import { useAuth, useAuthenticate, useConsent } from './AuthContext';
import ConsultantItem from './ConsultantItem';
import axios from 'axios';
import './css/signup.css';
import "./css/dashboard.css";


function Dashboard() {
    
    const navigate = useNavigate();
    const auth = useAuth()
    const authenticate = useAuthenticate()

    const [consultants, setConsultants] = useState([]);
    const [role_state, setRoleState] = useState(auth.role);
    const [loggedIn_state, setLoggedInState] = useState(auth.login);
    const [consent_state, setConsentState] = useState(auth.consent);
    const [username_state, setUsernameState] = useState(auth.username);
    const setConsent = useConsent()

    console.log("Auth", typeof auth, auth)

    useEffect(() => {
        if (!auth.login) {
            console.log("After Click Auth Object", auth);
            navigate('/home')
        }
    }, []);

    useEffect(() => {

        async function changeConsent(){
            if (auth.consent_state !== consent_state && consent_state !== undefined) {
                let url = `http://localhost:3500/change_consent?consent=${consent_state}&id=${auth.id}`;
                console.log("URL: " + url);
                const response = await axios.get(url);
                let data = await response.data;
                if (data === undefined){
                    throw Error("Data is undefined.");
                }
                if (data.errors){
                    alert("Server Error: " + data.error);
                }
                else{
                    if (data.success){
                        // alert("Consent changed successfully!");
                        console.log("consent changed successfully!");
                    }else{
                        alert("Consent change failed!");
                        setConsentState(auth.consent_state);
                    }
                }
            }
        }
        changeConsent();
        
    }, [consent_state]);


    useEffect(() => {
        setRoleState(auth.role);
        setLoggedInState(auth.login);
        setConsentState(auth.consent);
        setUsernameState(auth.username);
    } , [auth]); // When auth changes, update the role state.
        

    // Check if the user is logged in, if not redirect user.
    if (!loggedIn_state || loggedIn_state === undefined){
        navigate('/login');
    }

    function start_maintenance(e){
        e.preventDefault();
        let button = e.target;
        let confirm = window.confirm("Website will be not be publicly accessible to online users [in 5 MINUTES]. \nAre you sure you want to start maintenance?");
        if (confirm){
            alert("Maintenance has been started. \nWebsite will be not be publicly accessible to online users.");
            button.disabled = true;
            // Change button text to "Maintenance Started"
            // Change button color to red
            button.style.backgroundColor = "green";
            button.textContent = "Maintenance Started";
        }
        // Disable button.
    }

    function force_start_maintenance(e){
        e.preventDefault();
        let confirm = window.confirm("Website will be not be publicly accessible to online users. [IMMEDIATELY] \nAre you sure you want to start maintenance?");
        if (confirm){
            alert("Maintenance has been started. \nWebsite will be not be publicly accessible to online users.");
            e.target.disabled = true;
        }
        // Disable button.
    }

    async function search_consultants(e){
        e.preventDefault();
        
        let form = e.target.parentNode;
        let username_input = form.querySelector("input[name='consultant_username']");
        // Send data to backend
        let url = "http://localhost:3500/getcon?name=" + String(username_input.value);
        const response = await axios.get(url);
        let data = await response.data;
        if (data === undefined){
            throw Error("Data is undefined.");
        }
        if (data.errors){
            alert("Server Error: " + data.error);
        }
        else{
            console.log("Setting consultant info", data["consultants"])
            setConsultants(data["consultants"]);
        }

    }

    function username_input_checker(e){
        e.preventDefault();
        let username_input = e.target;
        let submit = document.getElementsByClassName("search_button")[0].childNodes[0]
        // If username is more than 3 characters, we then enable the search button.
        if (username_input.value.length > 3){
            submit.disabled = false;
            submit.style.backgroundColor = "#2680EB";
        }else{
            submit.disabled = true;
            submit.style.backgroundColor = "";
        }
    }

    function remove_con_dom(id){
        // Callback function for component to remove consultant from DOM.
        // This function is called from ConsultantItem.js
        // Iterate through consultants array and remove consultant with id = id
        let new_consultants = consultants.filter(function(consultant){
            return consultant.id !== id;
        }
        );
        setConsultants(new_consultants);
    }

    function sign_out(e){
        e.preventDefault();
        authenticate(false, "", "", "", "");
        navigate('/home');
    }

    document.body.position = 'relative';
    document.body.height = "100vh";
    document.body.width = "100%";
    document.body.overflow = "auto hidden";

    function delete_sign(e){
        /* In charge of deleting themselves */
        e.preventDefault();
    }


    async function change_username(e){
        e.preventDefault();
        // get submit button and disable it.
        let submit = e.target;
        submit.disabled = true;

        // On click event will try to change username.
        console.log(auth.username !== username_state)
        if (auth.username !== username_state && username_state !== undefined) {
            let url = `http://localhost:3500/change_name?name=${username_state}&id=${auth.id}`;
            console.log("URL: " + url);
            const response = await axios.get(url);
            let data = await response.data;
            if (data === undefined){
                throw Error("Data is undefined.");
            }
            if (data.errors){
                alert("Server Error: " + data.error);
            }
            else{
                if (data.success){
                    alert("Username changed successfully!");
                    authenticate(auth.login, auth.role, username_state, auth.id, auth.consent);
                }else{
                    alert("Consent change failed!");
                    setUsernameState(auth.username);
                }
            }
        }
    }

    async function delete_account(e){
        e.preventDefault()
        let confirm = window.confirm("Are you sure you want to delete your account? \nThis action cannot be undone.");
        if (confirm){
            let url = `http://localhost:3500/delcon?id=${auth.id}`;
            console.log("URL: " + url);
            const response = await axios.get(url);
            let data = await response.data;
            if (data === undefined){
                throw Error("Data is undefined.");
            }
            if (data.errors){
                alert("Server Error: " + data.error);
            }
            else{
                if (data.success){
                    alert("Account deleted successfully!");
                    authenticate(false, "", "", "", "");
                    navigate('/home');
                }else{
                    alert("Account deletion failed!");
                }
            }
        }
    }

    

    function username_valid_checker(e){
        // Check if username is 
        let username_change_submit = document.getElementById("username_change_btn");
        setUsernameState(e.target.value);
        if (e.target.value.length > 3 && e.target.value !== auth.username){
            username_change_submit.disabled = false;
        }else{
            username_change_submit.disabled = true;
        }
        

    }
    
    function change_consent(e){
        // Changes state of consent.
        setConsent(!consent_state)
        setConsentState(!consent_state)
    }

    console.log("Role State", role_state)

    if (role_state === "admin"){
        return ( 
            <div id="main_content" className="mid_70_layout">
                <div className="action_box_wrapper">
                    
                    <div className="dashboard_title_wrapper_flex">
                        <h1>Dashboard</h1> <button className="blue_btn whitefg">Admin</button>
                    </div>
                    <div className="action_box">
                        <div id="admin_signout_bar">
                            <div className="sign_out_button">
                                <button className="blue_btn whitefg" onClick={sign_out}>Sign out</button>
                            </div>                   
                        </div>
                            <div className="maintenance admin_section">
                                <h3>Start Maintenance Break</h3>
                                <p>An alert to all current users will be send, starting a 5 minute timer before before the maintenance cut.</p>
                                <div className="admin_maintance_button_flex">
                                    <div id="start_button">
                                        <button className="red_btn whitefg" onClick={start_maintenance}>Start</button>
                                    </div>
                                    <div className="force_start_button">
                                        <button className="grey_btn whitefg" onClick={force_start_maintenance}>Force Start</button>
                                    </div>
                                </div>
                            </div>
                            
                            
                            <div className="search admin_section">
                                <h3>Search Consultant</h3>
                                <p>Remove Consultants</p>
                                <form name="remove_consultants" onSubmit={search_consultants}>
                                    <div className="input_wrapper">
                                        <input type="text" name="consultant_username" placeholder="Enter Consultant Name:" onChange={username_input_checker} required/>
                                    </div>
                                    <div className="search_button">
                                        <button className="grey_btn whitefg" disabled>Search</button>
                                    </div>
                                </form>
    
                                <div className="consultants_results_wrapper">
                                    {   
                                        consultants.map((consultant)=>{
                                        return <ConsultantItem key={consultant.id} id={consultant.id} name={consultant.name} remove_consultant={remove_con_dom}/>;})    
                                    }
                                </div>  
                            </div>
                            <form onSubmit={delete_account}>
                            <div className="delete_account admin_section">
                                <button type="submit" className="red_btn whitefg">Delete my account.</button>
                            </div>
                            </form>
                    </div>
                </div>
            </div>
         )
    }  

    if (role_state === "consultant"){
        return ( 
            <>
            <div id="main_content" className="mid_70_layout">
                <div className="action_box_wrapper">
                    <div className="dashboard_title_wrapper_flex">
                        <h1>Dashboard</h1> <button className="blue_btn whitefg">Consulatant</button>
                    </div>
                    <div className="action_box">
                            <div className="action_box_contents_flex">
                                <div className="action_box_contents_split_flex">
                                    <div className="action_box_contents_split_left">
                                        <h3>Email Preference</h3>
                                        <div className="input_wrapper">
                                            <input type="checkbox" name="accommodation" value="Receive emails about accommodations." checked={consent_state} onChange={change_consent} />Receive emails about accommodations.
                                        </div>
                                        <form onSubmit={change_username}> 
                                            <h3>Name:</h3>
                                            <div className="input_wrapper">
                                                <input type="text" name="username" autoComplete="off" spellCheck='false' autoCorrect='off' value={username_state} onChange={username_valid_checker}/>
                                                <button id="username_change_btn" type="submit" disabled>Change Name</button>
                                            </div>
                                        </form>
                                        <div className="link">
                                            <p>
                                                <a href="saved_listings.html">View all saved listings</a>
                                            </p>
                                        </div>
                                        
                                    </div>
                                    <div className="dashboard_action_box_contents_split_right">
                                        <div className="sign_out_button">
                                            <button className="blue_btn whitefg" onClick={sign_out}>Sign out</button>
                                        </div>
                                    </div>
                                    
                                </div>
                                
                            </div>

                            
                            <div>
                                <form onSubmit={delete_account}>
                                <button className="red_btn whitefg" type='submit'>Delete my account</button>
                                </form>
                            </div>
                    </div>
                </div>
            </div>
            </>
         );


    }

    
}

export default Dashboard;