import React from 'react';
import { Link } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';
import './BackButtonStyles.css'

function BackButton({destination = '/'}) {
  return (
    <div className='BackButtonContainer'>
        <Link to={destination} >
            <IoIosArrowBack className='text-2x1'/>
        </Link>
    </div>
  )
}

export default BackButton