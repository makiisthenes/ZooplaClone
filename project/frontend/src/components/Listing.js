// Required imports.
import React, { useState, useEffect} from 'react';
import axios from 'axios';
import { useNavigate, useParams  } from 'react-router-dom';

import './css/listing.css'  // Need to use CSS Styling and apply styling to these specific elements.
import IconBox from './IconBox';
import {Review, half_star} from './Review';


/* Main content */
import nav_back_icon from "../images/nav_back_icon.svg"
import nav_forward_icon from '../images/nav_forward_icon.svg'
import contract_time_icon from "../images/contract_time_icon.svg"
import property_type_icon from "../images/prop_type_icon.svg"
import water_icon from '../images/water_icon.svg'
import electricity_icon from '../images/electricity_icon.svg'
import gas_icon from "../images/gas_icon.svg"
import internet_icon from "../images/internet_icon.svg"
import pet_icon from "../images/pet_icon.svg"
import gym_icon from "../images/gym_icon.svg"
import bill_icon from "../images/bill_icon.svg"
import bbq_icon from "../images/bbq_icon.svg"
import bike_icon from "../images/bike_icon.svg"
import cleaning_icon from "../images/cleaning_icon.svg"
import concierge_icon from "../images/concierge_icon.svg"
import shield_icon from "../images/shield_icon.svg"
import cinema_icon from "../images/cinema_icon.svg"
import stop_icon from "../images/stop_icon.svg"
import workspace_icon from '../images/workspace_icon.svg'
import exclusive_icon from '../images/exclusive_icon.svg'
import leisure_icon from '../images/leisure_icon.svg'
import spanner_icon from '../images/spanner_icon.svg'
import badge_icon from '../images/badge_icon.svg'
import padlock_icon from '../images/padlock_icon.svg'


/* Side content */

import share_icon from '../images/share_icon.svg'
import email_icon from "../images/email_icon.svg"
import call_icon from '../images/call_icon.svg'
import bedroom_icon from '../images/bedroom_icon.svg'
import bathroom_icon from '../images/bathroom_icon.svg'
import report_icon from "../images/report_icon.svg"

import empty_heart_icon from "../images/heart_empty_icon.svg"
// eslint-disable-next-line no-unused-vars
import full_heart_icon from "../images/heart_full_icon.svg"





function Listing() {
    console.log("Render of Listing Component");
    // Router props.
    const params = useParams();     // Match object.
    const navigate = useNavigate();  // Histroy object. 
    const [listing, setListing] = useState({});


    // Check routing.
    console.log("Are they the same? ", params.id === undefined)
    if (params.id === undefined || params.id == typeof undefined) {  // undefined can be string.
        // If the params are not valid, then redirect to home.
        console.log("Routing to error path.")
        navigate("/error");
    }

    // Same as componentDidMount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => { getData(params.id)}, []);  // Only runs this code, if things in the dependecies array change., we have no dependecies.


    // Same as componentDidUpdate.
    useEffect(() => {console.log("Component with states updated.")}, [listing]);


    async function getData(id){
        // In charge of getting data when we see a change in url, by storing the changes in the url in the state.
        const url = `http://localhost:3500/listing?id=${params.id}`;
        
        try {
            const response = await axios.get(url);
            let data = await response.data;
            if (data === undefined){
                throw Error("Data is undefined.");
            }
            setListing(data);
        } catch (error) {
            console.log("Error trying to get the data for this listing. API not implemented.");
            // This will be removed and instead will navigate to error page.
            setListing({
                data : {
                    id : 1,
                    listing_images: ["https://flatfinder.cdn.fdm.com/cover_image.png", "https://flatfinder.cdn.fdm.com/cover_image.png","https://flatfinder.cdn.fdm.com/cover_image.png","https://flatfinder.cdn.fdm.com/cover_image.png"],
                    listing_tags:  ["Highly  Recommended", "Modern", "Eco-friendly"],
                    listing_title: "Sudbury Court Drive, Harrow, HA1 3TA",
                    listing_subtitle: "Harrow Road, Wembley, HA1",
                    monthly_price: 1230,
                    weekly_price: 330,
                    contract_length: 6,
                    property_type: "Studio",
                    avg_water_monthly_cost: 35,
                    avg_electricity_monthly_cost: 35,
                    avg_gas_monthly_cost: 40,
                    avg_internet_monthly_cost: 30,
            
                    bathroom_no: 2,
                    bedroom_no: 4,
                    agent_tel: "07720346841",
                    agent_email: "agent007@mi5.gov.uk",
            
                    reviews: {
                        no_reviews: 20,
                        overall_rating: 3.5,
                        reviews : [
                            {
                                no_rating: 4.5,
                                review_content: "one of my hobbies is programming. and when i'm programming this works great.                    ",
                                username_id: 20,
                                username: "TheVaccine",
                                timestamp_epoch: 1648996545703
                            },
                            {
                                no_rating: 3.5,
                                review_content: "Amazing place, excellent services and transport links",
                                username_id: 21,
                                username: "TrueTinker",
                                timestamp_epoch: 1647976545703
            
                            },
                            {
                                no_rating: 0.5,
                                review_content: "My tyrannosaurus rex loves to play with it.",
                                username_id: 22,
                                username: "Lawcoste",
                                timestamp_epoch: 1318023197289
                            },
                            {
                                no_rating: 2.5,
                                review_content: "My co-worker Atha has one of these. He says it looks narrow.                    ",
                                username_id: 23,
                                username: "Len",
                                timestamp_epoch: 1318023197289
                            }
                        ]
                    }
                }
            });
        }
    }
    function navigate_back(e){
        // This needs to go back to what the user previous url was, if it is in the domain, if not then go to home.
        e.preventDefault();
        // Get current URL location.
        let domain = window.location.host;
        let refferer = document.referrer;
        let refferer_host = refferer.split("/")[2];
        
        if (refferer == "" || refferer == undefined) {
            window.history.back();
        } else {
            // console.log(typeof refferer, refferer,  domain, refferer_host===domain, refferer===undefined)
            navigate("/home");
        }
    }

    function copyLink(e){
        // Get link to the listing
        // Change child span to text saying Saved
        // Copy link to clipboard.
        e.preventDefault();
        console.log("Copy link to clipboard.");
        let link = window.location.href;
        let copyText = (e.target.childNodes[0]);
        copyText.textContent = "Copied!";
        // Copy link to clipboard
        navigator.clipboard.writeText(link);
    }
  
     function changeCoverImage(e){
        // Iterate through all children of parent and remove child that has the selected class name.
        // Get current e target and make className selected.
        // We then get the document id of cover_image_figure > child img and change the src to the src of the e.target selected.
        
        // console.log(document.getElementsByClassName("listing_full_img_array_wrapper")[0].childNodes)
        const children = document.getElementsByClassName("listing_full_img_array_wrapper")[0].childNodes;
        for (let i = 0; i < children.length; i++) {
            if (children[i].className === "selected_image") {
                children[i].className = "";
            }
        }
        const img = document.getElementById("cover_image_figure").childNodes[0];
        img.src = e.target.src;
    }



    if (Object.entries(listing).length === 0){
        return (
            <div id="listing_main_content" className="mid_70_layout">Loading, please wait.</div>
        )
    }

    return ( 
        <>
            <div className="listing_box_sub_info">
            <h3>{listing.listing_subtitle}</h3>
            <div className="listing_box_sub_no_icons_wrapper_flex">
                <span>
                    <img src={bathroom_icon} alt="Bathroom Icon"/>
                    <h5>{listing.bathroom_no} bathrooms</h5>
                </span>
                <span>
                    <img src={bedroom_icon}alt="Bedroom Icon"/>
                    <h5>{listing.bedroom_no} bedrooms</h5>
                </span>
            </div>
            <div className="listing_box_sub_button_wrapper">
                <button className="white_button">
                    <img src={call_icon} alt="Call Icon"/>
                    <a href={"tel:"+listing.agent_tel}>Call agent</a>
                </button>
            </div>

            <div className="listing_box_sub_button_wrapper">
                <button className="black_button">
                    <img src={email_icon} alt="Call Icon"/>
                    <a href={"mailto:"+listing.agent_email}>Email agent</a>
                </button>
            </div>

            <div className="listing_box_sub_button_wrapper_duo">
                <div className="">
                    <button className="" onClick={copyLink}>
                        <span className='listing_sub_button_span'>Share</span>
                        <img src={share_icon} alt="Share Icon"/>
                    </button>
                    <span className="share_no"></span>
                </div>
                <div className="">
                    <button className="">
                        <span className='listing_sub_button_span'>Save</span>
                        <img src={empty_heart_icon} alt="Save Icon"/>
                    </button>
                    <span className="status_no">- consultants saved this.</span>
                </div>
            </div>

            <div className="report_status">
                <img src={report_icon} alt="Report Icon"/>
                <a href="/report">Report error with this listing.</a>
            </div>
        </div>


        <div id="listing_main_content" className="mid_70_layout">
        
        <div id="nav_top">
            <img src={nav_back_icon}  alt="Nav Back Button"/>
            <button onClick={navigate_back}>Back to search results</button>
        </div>
        
        
        <div className="listing_full_wrapper">
        
            <div className="listing_full_img">
                
                <figure id="cover_image_figure">
                    <img src={listing.listing_cover_image_url} alt="Main Listing"/>
                </figure>
                <div className="listing_full_img_overlay">
                    <div className="listing_full_img_overlay_utilities_wrapper">
                        <button className="flipx" >
                            <img src={nav_forward_icon} alt="Back Arrow" />
                        </button>
                        <span>1 of {listing.listing_images.length}</span>
                        <button >
                            <img src={nav_forward_icon} alt="Forward Arrow" />
                        </button>
                    </div>
                </div>
            </div>

            <div className="listing_full_img_array_wrapper hide_scroll">
                { ((listing.listing_images).slice(0).reverse()).map((img, index) => {
                    return (
                        <ImageView src={img} alt={`Preview View ${index}`} />
                    )
                })}           
                
            </div>

            <div className="listing_full_hashtag_wrapper">
                <div className="listing_full_hashtag_item">
                    <span>Highly Recommended</span>
                </div>
                <div className="listing_full_hashtag_item">
                    <span>Modern</span>
                </div>
                <div className="listing_full_hashtag_item">
                    <span>Eco-friendly</span>
                </div>
            </div>

            <div className="listing_full_title_wrapper">
                <h1>{listing.listing_title}</h1>
                <h3>{listing.listing_subtitle}</h3>
                <div className="custom_line_break">
            </div>

            <div className="listing_full_props_wrapper_flex">
                <div className="listing_full_props_price_wrapper">
                    
                    <div className="listing_full_props_price_info">
                        
                        <div className="listing_full_props_price_info_item_flex">
                            <span>£{listing.monthly_price} pcm</span>
                            <span>£{listing.weekly_price} pw</span>
                        </div>
                        <div className="listing_full_props_price_info_item_flex">
                            <img src={contract_time_icon} alt="Contract Time Icon"/>
                            <span>Contract Length: {listing.contract_length} months</span>
                        </div>
                        <div className="listing_full_props_price_info_item_flex">
                            <img src={property_type_icon} alt="Property Type Icon"/>
                            <span>Property Type: {listing.property_type}</span>
                        </div>
                    </div>
                    <div className="listing_full_props_price_avg">
                        
                        <h2 className="subcategory">Average Costs:</h2>

                        <AverageItem icon={water_icon} icon_alt="Water Icon" type="Water" data={listing.avg_water_monthly_cost}/>  
                        <AverageItem icon={electricity_icon} icon_alt="Electricity Icon" type="Electricity" data={listing.avg_electricity_monthly_cost}/>
                        <AverageItem icon={gas_icon} icon_alt="Gas Icon" type="Gas" data={listing.avg_gas_monthly_cost}/>
                        <AverageItem icon={internet_icon} icon_alt="Internet Icon" type="Internet" data={listing.avg_internet_monthly_cost}/>
                    </div>
                </div>
                <div className="listing_full_props_map_wrapper">
                    
                    <img src={require("../images/map_img.png")} alt="Listing Google Maps Snippet "/>
                </div>
            </div>
            

            <div className="listing_full_props_key_wrapper">
                <h2 className="subcategory">Key Features:</h2>
                <div className="listing_full_props_key_table">
                    
                    <div className="listing_full_props_key_table_flex">
                        <div className="listing_full_props_key_subtable_flex">
                            <IconBox icon={pet_icon} title="Pets allowed" alt_title="Pet Icon" />
                            <IconBox icon={gym_icon} title="Gym" alt_title="Gym Icon" />
                            <IconBox icon={bill_icon} title="Bills Included" alt_title="Bill Icon" />
                            <IconBox icon={bbq_icon} title="BBQ Areas" alt_title="BBQ Icon" />
                        </div>
                        <div className="listing_full_props_key_subtable_flex">
                            <IconBox icon={bike_icon} title="Bike Storage" alt_title="Bike Icon" />
                            <IconBox icon={cleaning_icon} title="Cleaning Services" alt_title="Cleaning Icon" /> 
                            <IconBox icon={concierge_icon} title="Concierge" alt_title="Concierge Icon" /> 
                            <IconBox icon={shield_icon} title="Fully Managed" alt_title="Shield Icon" /> 
                        </div>
                        <div className="listing_full_props_key_subtable_flex">
                            <IconBox icon={cinema_icon} title="Cinema" alt_title="Cinema Icon" /> 
                            <IconBox icon={stop_icon} title="Zero Deposit" alt_title="Stop Icon" /> 
                            <IconBox icon={workspace_icon} title="Shared Workspace" alt_title="Workspace Icon" />
                            <IconBox icon={exclusive_icon} title="Exclusive Community" alt_title="Exclusive Icon" />
                        </div>
                        <div className="listing_full_props_key_subtable_flex">
                            <IconBox icon={leisure_icon} title="Leisure Facilities" alt_title="Leisure Icon" /> 
                            <IconBox icon={spanner_icon} title="On-site Maintenance" alt_title="Spanner Icon" /> 
                            <IconBox icon={badge_icon} title="Professional Management" alt_title="Badge Icon" />
                            <IconBox icon={padlock_icon} title="Security" alt_title="Padlock Icon" />
                        </div>
                    </div>
                </div>    
            </div>
            

            <div className="listing_full_props_reviewers_wrapper">
                <div className="review_status">
                    <h2 className="subcategory">Reviews:</h2>
                    <img src={half_star} alt="" />
                    <span>{listing.reviews.overall_rating} ({listing.reviews.no_reviews} reviews)</span>
                </div>

                
                <div className="listing_full_props_reviewers hide_scroll">
                    {listing.reviews.reviews.map((review) => {
                        return <Review no_stars={review["no_rating"]} username={review["username"]} user_id={review["username_id"]} date={new Date(review["timestamp_epoch"])} main_content={review["review_content"]}/>
                        })}
                    
                </div>     
            </div>
            
        </div>
        
        <hr />
        <a id="nav_bottom" href="#nav_top">Back to top</a>
    
    </div>
    </div>
        
        
        </>
     );

     function ImageView(props) {
        return ( 
            <button onClick={changeCoverImage} className="">
            <div className="listing_full_img_array_item ">
                <img src={props.src} alt={props.alt} />
            </div>
        </button> 
    );
    }



}

export default Listing;



function AverageItem(props) {
    return ( 
        <div className="listing_full_props_price_avg_item">
            <span>
                <img src={props.icon} alt={props.icon_alt} />
                {props.type}: £{props.data}pm
            </span>
        </div>
        );
}





