import React from 'react';

const NavBar = ({ onRouteChange }) => {
    return(
        <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
            <p 
                onClick={() => onRouteChange('signin')}
                className='f3 pa3 underline black dim link pointer'>Sign Out</p>
        </nav>
    )
}

export default NavBar;