import React, { Component } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import email_icon from "../images/email_icon.svg"
import call_icon from '../images/call_icon.svg'
import bedroom_icon from '../images/bedroom_icon.svg'
import bathroom_icon from '../images/bathroom_icon.svg'
import report_icon from "../images/report_icon.svg"

import empty_heart_icon from "../images/heart_empty_icon.svg"
import full_heart_icon from "../images/heart_full_icon.svg"



function SearchBox(props) {
    const navigate = useNavigate();

    function open_listing(){
        navigate('/listing/' + props.listing_id);
    }

    return ( 
            <div className="result_listing_flex" onClick={open_listing}>
                <figure className="result_listing_pic">
                    <img src={props.listing_cover_image_url} alt="Not available." />
                </figure>
                
                <div className="result_listing_info_flex">
                    
                    <div className="top_row_info_flex">
                        
                        <div className="price_listing_wrapper">
                            <p>£{props.monthly_price} pcm</p>
                            <p>£{props.weekly_price} pw</p>
                        </div>
                        
                        <div className="save_listing_wrapper">
                            <a href={"save"+props.listing_id}><span className="save_listing">Save</span></a>
                            <img src={empty_heart_icon} alt="Save listing" />
                        </div>
                    </div>


                    
                    <div className="mid_row_info_flex">
                        <div className="utilities_icon_flex_wrapper">
                    
                            <div className="bathroom_stats">
                                <img src={bathroom_icon} alt="Bathroom icon" />
                                <span>{props.bathroom_no} bathrooms</span>
                            </div>
                            
                            <div className="bedroom_stats">
                                <img src={bedroom_icon} alt="Bedroom icon" />
                                <span>{props.bedroom_no} bedrooms</span>
                            </div>
                        </div>

                        
                        <h2>{props.listing_title}</h2>
                        <h3>{props.listing_subtitle}</h3>
                    </div>
                    <div className="bottom_row_info_flex">
                        <div className="contact_buttons">
                            <button className="contact_flex call_btn">
                                <img src={call_icon} alt="Call icon" />
                                <a href={"tel:"+props.agent_tel}>Call agent</a>
                            </button>
                            <button className="contact_flex email_btn">
                                <img src={email_icon} alt="Email icon" />
                                <a href={"mailto:"+props.agent_email}>Email agent</a>
                            </button>
                        </div>
                        <div className="report_button">
                            <img src={report_icon} alt="Report listing" />
                            <a href={"/report/"+props.listing_id}><span>Report error with this listing.</span></a>
                        </div>
                    </div>
                </div>
            </div>
    );
}

export default SearchBox;