import React from 'react';
import ReactTimeAgo from 'react-time-ago'
import half_star from '../images/half_star.svg'
import full_star from '../images/full_star.svg'
import empty_star from '../images/empty_star.svg'
import './css/review.css'

import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en.json'
TimeAgo.addLocale(en);



function Review(props) {
    const { no_stars, main_content, username, user_id, date} = props;
    function parse_no_stars(no_stars) {
        // Based on number we parse the star icons, accounting for half values and up to 5.
        let stars = [];
        for (let i = 0; i < Math.floor(no_stars); i++) {
            stars.push(<img src={full_star} alt="full star" />);
        }
        if (no_stars % 1 !== 0) {
            stars.push(<img src={half_star} alt="half star" />);
        }
        const remaining = 5 - stars.length;
        for (let i = 0; i < remaining; i++) {
            stars.push(<img src={empty_star} alt="empty star" />);
        }
        return stars;
    }
    
    return ( 
        <>
            <div className="review_content">
                <div className="review_content_stars_array_flex">
                    {parse_no_stars(no_stars)}
                </div>
                <div className="review_content_main_content">
                    {main_content}
                </div>
                <div className="review_content_stats_flex">
                    <div className="review_content_stats_name">
                        <a href="/user/user_id">{username}</a>
                    </div>
                    <div className="review_content_stats_date">
                        <span><ReactTimeAgo timeStyle="twitter" date={date} locale="en"/></span>
                    </div>
                </div>
            </div>
        </>
     );
}

export {Review, half_star};