import React,{useState} from 'react';
import axios from 'axios';
import { useNavigate, useParams} from 'react-router-dom';
import Spinner from '../components/spinner';
import BackButton from '../components/BackButton';
import { useSnackbar } from 'notistack';

function DeleteBook() {
    const [loading,setLoading] = useState(false);
    const navigate = useNavigate();
    const {id} = useParams();
    const {enqueueSnackbar} =useSnackbar();
    const handleDeleteBook = ()=>{
        setLoading(true);
        axios.delete('http://localhost:5000/books/'+id).then(()=>{
            setLoading(false);
            enqueueSnackbar('Book Deleted Successfully.',{variant:'success'});
            navigate('/');
        }).catch((error)=>{
            console.log(error);
            enqueueSnackbar('An error occured.',{variant:'error'});
            setLoading(false);
        });
    }
    return (
        <div className='p-4'>
            <BackButton/>
            <h1 className='text-3x1 my-4'>DeleteBook</h1>
            <div className='flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto'>
                <h3 className='text-2xl'>Are you sure you want to delete this book?</h3>
                <button className='p-4 bg-red-600 text-white m-8 w-full' onClick={handleDeleteBook}>Delete</button>
            </div>
        </div>
    )
}

export default DeleteBook