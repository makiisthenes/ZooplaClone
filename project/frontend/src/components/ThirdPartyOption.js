import React from 'react';

function ThirdPartyOption(props) {
    return ( 
        <div className="third_party_wrapper">
            <button className="third_party_button">
                <div className="third_party_wrapper_flex">
                    <img src={props.image} alt="" />
                    <span>{props.title}</span>
                </div>
            </button>
        </div>
     );
}

export default ThirdPartyOption;