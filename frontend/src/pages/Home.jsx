import React, {useState,useEffect} from 'react';
import axios from 'axios';
import Spinner from '../components/spinner';
import { Link } from 'react-router-dom';
import {MdOutlineAddBox} from 'react-icons/md';
import BookCard from '../components/home/BookCard';
import { PiCaretUpDownDuotone } from 'react-icons/pi';

function Home() {
    const [books,setBooks] = useState([]);
    const [loading,setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchParam, setSearchParam] = useState('Name');
    useEffect(()=>{
        setLoading(true);
        axios.get('http://localhost:5000/books').then((response)=>{
            setBooks(response.data.data);
            setLoading(false)
        }).catch((error)=>{
            console.log(error);
            setLoading(false);
        });
    },[]);

    const sendSearchReq =()=>{
        setLoading(true);
        axios.get('http://localhost:5000/books/?'+searchParam +'=' +searchQuery).then((response)=>{
            setBooks(response.data.data);
            setLoading(false)
        }).catch((error)=>{
            console.log(error);
            setLoading(false);
        });
    }

    return (
        <div className='p-4 bg-emerald-800 rounded-b-lg'>
            <div className='flex justify-center items-center gap-x-4 rounded-lg h-10'>
            <select value={searchParam} onChange={(e)=>setSearchParam(e.target.value)} className='border-2 border-gray-500 px-4 py-1 rounded-md'>
                <option value="Name">Name</option>
                <option value="Dish">Dish</option>
                <option value="Cost">Cost</option>
                <option value="Rating">Rating</option>
            </select>
                <input type='text' value={searchQuery} onChange={(e)=>setSearchQuery(e.target.value)} placeholder='Enter Search Query'className='border-2 border-gray-500 px-4 py-1 w-1/2 rounded-md'/>
                <button className='bg-yellow-700 hover:bg-yellow-600 px-4 py-1 rounded-md font-bold text-emerald-800 active:scale-95' onClick={sendSearchReq}>Search</button>
            </div>
            <div className='flex justify-between items-center font-semibold'>
                <h1 className='text-3xl my-8 text-white'>Shops List:</h1>
                <Link to='/shops/create'>
                    <MdOutlineAddBox className='text-yellow-700 text-4xl active:scale-95 hover:text-yellow-600'/>
                </Link>
            </div>            
            {loading?(<Spinner/>):(<BookCard books={books}/>)}
        </div>
    )
}

export default Home