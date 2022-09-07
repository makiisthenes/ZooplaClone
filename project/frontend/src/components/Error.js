import React from 'react';

function Error() {
    return ( 
        <>
            <div className='mid_70_layout' style={{"fontFamily": "Consolas"}}>
                <img src={require('../images/404meme.png')} alt="Error icon" style={{"width": "300px", "float":'right'}}/>
                <h1 style={{"fontSize": "4em"}}>404 Error </h1>
                <span style={{"fontSize":"1.5em"}}>Error could not find page.<br/></span>
                <a href='/home' style={{"fontSize": "2em", "backgroundColor": "black", "color": "white"}}>Go back home.</a>
            </div> 
        </>
    );
}

export default Error;