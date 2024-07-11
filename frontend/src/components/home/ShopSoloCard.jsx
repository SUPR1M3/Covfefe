import React from 'react'
import { FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import './ShopCardStyles.css';

function ShopSoloCard({ shop }) {
    return (
        <Link to={'/shops/details/' + shop._id}>
            <div key={shop._id} className='ShopCardContainer'>
                <img className='ShopCardImage' src={shop.image} />
                <h2 className='ShopCardName'>{shop.name}</h2>
                <FaStar className='ShopRatingIcon' />
                <h2 className='ShopCardRating'>{shop.rating}</h2>
                <h2 className='ShopCardDist'>{shop.address}</h2>
            </div>
        </Link>
    )
}

export default ShopSoloCard