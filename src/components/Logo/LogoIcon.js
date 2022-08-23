import React from 'react';
import Tilty from 'react-tilty';
import brain from './brain.png';
import './LogoIcon.css';

const LogoIcon = () => {
    return(
        <div className='ma4 mt0'>
            <Tilty style={{height: '130px', width:'130px'}} className='tilty br2 shadow-2' max={55} scale={1} perspective={900} reset={true}>
                <div className='pa3 tc'>
                    <img style={{padding: '5px', maxWidth: '100%', maxHeight: '100%', height: '100px', width: '100px'}} src={brain} alt='logo'/>
                </div>   
            </Tilty>
        </div>
        
    )
}

export default LogoIcon;