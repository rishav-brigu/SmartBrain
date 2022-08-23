import React from 'react';
import './Search.css';

const SearchBar = ({onInputChange, onButtonDetect}) => {
    return(
        <div>
            <p className='f3'>Search for an image. Our AI will detect the number of faces in it.</p>
            <div className='center'>
                <div className='form center pa4 shadow-5 br3'>
                    <input 
                        className='f4 pa2 w-70 center' 
                        type='text' 
                        onChange={onInputChange}
                    />
                    <button 
                        className='ma1 w-30 grow f4 link ph3 pv2 dib white bg-light-purple'
                        onClick={onButtonDetect}
                    >
                            Detect
                    </button>
                </div>  
            </div>
        </div>
    )
}

export default SearchBar;