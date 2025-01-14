import React from 'react';
import ShopSoloCard from './ShopSoloCard';

function BookCard({books}) {
  return (
    <div className='grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
        {books.map((book)=><ShopSoloCard key={book._id} shop={book}/>)}
    </div>
  )
}

export default BookCard