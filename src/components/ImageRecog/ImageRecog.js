import React from 'react';
import './ImageRecog.css';

const ImageRecog = ({newImage, faceArea}) => {
    return(
        <div className='center ma'>
            <div className='absolute mt2'>
                <img id='image' src={newImage} alt=''  width='500px' height='auto' />
                <div className='bounding-box' style={{top: faceArea.top, right: faceArea.right, bottom: faceArea.bottom, left: faceArea.left}}></div>  
            </div>
        </div>
    )
}

export default ImageRecog;