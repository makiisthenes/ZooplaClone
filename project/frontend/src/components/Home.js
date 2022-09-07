import React from 'react';
import './css/home.css'
import compass_icon from '../images/compass_icon.svg'
import filter_pref_icon from '../images/filter_pref_icon.svg'
import check_tick_icon from '../images/check_tick_icon.svg'
import time_icon from '../images/time_icon.svg'
import phone_icon from '../images/phone_icon.svg'   
import fdm_consultant_icon from '../images/fdm_consultant_icon.svg'
import money_icon from '../images/money_icon.svg'
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

function Home() {
    // Need to use CSS Modules to stop importing of all css files globally.
    const navigate = useNavigate();

    const auth = useAuth();
    


    function search_query(e){
        // Handles the query search from input.
        e.preventDefault();
        const input_elem = e.currentTarget.parentNode.firstChild;
        const query = input_elem.value;
        if (query.length > 0) {
            // Push navigate to search page with query.
            if (auth.login) {
                navigate('/search?query=' + query);
            } else {
                navigate('/login');
            }
            
        }else{
            // Make input_elem outline red for around 2 seconds.
            console.log("No query");
            input_elem.style.outline = "2px solid red";
            setTimeout(() => {
                input_elem.style.outline = "";
            }
            , 2000);

        }
    };

    function input_search(e){
        // Allows users to just press enter to search.
        if(e.keyCode === 13){
            search_query(e);
        }
    }
    
    
    return ( 
        <div id="main_content" className="mid_70_layout">
            <figure id='landing_figure'>
                <img id="landing_main" src={require("../images/landing_main.png")} alt="landing" />
                <h1>Find your new home</h1>
            </figure>
            <div id="landing_input" className="landing_input_top">
                <input type="text" placeholder="Postcode or location to start..." onKeyDown={input_search} required />
                <button className="blue_btn" onClick={search_query} >Go</button>
            </div>

            <div id="info_box_wrapper">
                <div className="info_box">
                    
                    <div className="info_box_flex_container">
                        <img className="info_box_main_img" src={require("../images/barcelona_landing_map.png")} alt="Barcelona Landing Map"/>

                        <div className="icon_info_wrapper">
                            <h2 className="info_box_header">Why use our platform?</h2>

                            <p className="icon_list_layout">
                                <img src={compass_icon}  alt="Compass Icon" />
                                <span>Find locations close to your clients easily.</span>
                            </p>
                            <p className="icon_list_layout">
                                <img src={filter_pref_icon} alt="Filter Icon" />
                                <span>Filter by price, accessibility, transport links, distance.</span>
                            </p>
                            <p className="icon_list_layout">
                                <img src={check_tick_icon} alt="Tick Icon" />
                                <span>Listing from hundreds of platforms, all in one place.</span>
                            </p>
                            <p className="icon_list_layout">
                                <img src={time_icon} alt="Time Icon" />
                                <span>Save time by using our powerful searching tools.</span>
                            </p>
                            <p className="icon_list_layout">
                                <img src={phone_icon} alt="Phone Icon" />
                                <span>Support available 24/7 for queries and disputes.</span>
                            </p>
                        </div>
                    </div>
                </div>

                <div className="info_box">
                    
                    <div className="info_box_flex_container">
                        <img className="info_box_main_img" src={require("../images/ex_listing_landing_map.png")}  alt="Exclusive Listings" />
                        <div className="icon_info_wrapper">
                            <h2 className="info_box_header">Exclusive Listings</h2>
                            
                            <p className="icon_list_layout">
                                <img src={fdm_consultant_icon} alt="Consultant Icon" />
                                <span>Find listings not available anywhere else for FDM clients.</span>
                            </p>
                            <p className="icon_list_layout">
                                <img src={money_icon} alt="Money Icon" />
                                <span>Exclusive competitive listings for users.</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>


            <div id="end_content">
                <img src={require("../images/landing_end.png")}  alt="End Landing" />
                <div id="end_input_wrapper">

                    <h2>Start your search now!</h2>

                    <div id="landing_input" className="landing_input_bottom">
                        <input type="text" placeholder="Postcode or location to start..." onKeyDown={input_search} required/>
                        <button className="blue_btn"  onClick={search_query}>Go</button>
                    </div>
                </div>
            </div>
        </div>
        );
    
}
 
export default Home;