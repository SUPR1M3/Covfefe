import React,{useState} from 'react';
import axios from 'axios';
import { useNavigate} from 'react-router-dom';
import Spinner from '../components/spinner';
import BackButton from '../components/BackButton';
import ShopDishContainer from './ShopDishContainer';
import { useSnackbar } from 'notistack';

function CreateShop() {
    const [name,setName] = useState('');
    const [address,setAddress] = useState('');
    const [rating,setRating] = useState('');
    const [menu,setMenu] = useState([]);
    const [image, setImage] = useState('');
    const [dishImage, setDishImage] = useState('');
    const [dishName, setDishName] = useState('');
    const [dishCategory, setDishCategory] = useState('');
    const [dishPrice, setDishPrice] = useState('');
    const [loading,setLoading] = useState(false);
    const navigate = useNavigate();
    const {enqueueSnackbar} = useSnackbar();

    const handleAddMenuItem = ()=>{
        let temp = [...menu, {name:dishName, category:dishCategory, price:dishPrice, image:dishImage}];
        console.log(dishImage);
        setMenu(temp);
        setDishName('');
        setDishCategory('Coffee');
        setDishPrice('');
        setDishImage('');
    }
    const handleRemoveMenuItem = (index)=>{
        let temp = [...menu];
        temp.splice(index,1);
        setMenu(temp);
    }
    const ImageBase64 = (file)=>{
        const reader = new FileReader();
        reader.readAsDataURL(file);
        const data = new Promise((resolve, reject)=>{
            reader.onload = ()=>{resolve(reader.result)};
            reader.onerror = (error)=>reject(error);
        })
        return data;
    }
    const handleDishImageUpload = async (e)=>{
        const file = e.target.files[0];
        console.log(file);
        const img = await ImageBase64(file);
        setDishImage(img);
    }

    const handleImageUpload = async (e)=>{
        const file = e.target.files[0];
        const img = await ImageBase64(file);
        //console.log(img);
        setImage(img);
    }

    const handleSaveBook = ()=>{
        const data = {
            name,
            address,
            rating,
            menu,
            image,
        };
        setLoading(true);
        axios.post('http://localhost:5000/books', data).then(()=>{
            setLoading(false);
            enqueueSnackbar('Shop Created Successfully.',{variant:'success'});
            navigate('/');
        }).catch((error)=>{
            setLoading(false);
            enqueueSnackbar('An Error Occured.', {variant:'error'});
            console.log(data);
            console.log(error);
        });
    };
  return (
    <div className='p-4'>
        <BackButton/>
        <h1 className='text-3xl my-4'>Create Shop</h1>
        {loading?<Spinner/>:''}
        <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
            <div className='my-4'>
                <label className='text-xl mr-4 text-gray-500'>Name</label>
                <input type='text' value={name} onChange={(e)=>setName(e.target.value)} className='border-2 border-gray-500 px-4 py-2 w-full'/>
            </div>
            <div className='my-4'>
                <label className='text-xl mr-4 text-gray-500'>Address</label>
                <input type='text' value={address} onChange={(e)=>setAddress(e.target.value)} className='border-2 border-gray-500 px-4 py-2 w-full'/>
            </div>
            <div className='my-4'>
                <label className='text-xl mr-4 text-gray-500'>Rating</label>
                <input type='number' value={rating} onChange={(e)=>setRating(e.target.value)} className='border-2 border-gray-500 px-4 py-2 w-full'/>
            </div>
            <div className='my-4'>
                <label className='text-xl mr-4 text-gray-500'>Image</label>
                <input type='file' onChange={handleImageUpload} className='border-2 border-gray-500 px-4 py-2 w-full'/>
            </div>
            <div className='my-4'>
                <label className='text-xl mr-4 text-gray-500'>Menu</label><br/>
                <label className='text-xl mr-4 text-gray-500'>Dish Name</label>
                <input type='text' value={dishName} onChange={(e)=>setDishName(e.target.value)} className='border-2 border-gray-500 px-4 py-2 w-full'/>
                <label className='text-xl mr-4 text-gray-500'>Category</label>
                <select value={dishCategory} onChange={(e)=>setDishCategory(e.target.value)} className='border-2 border-gray-500 px-4 py-2 w-full'>
                    <option value="Coffee">Coffee</option>
                    <option value="Drinks">Drinks</option>
                    <option value="Food">Food</option>
                </select><br/>
                <label className='text-xl mr-4 text-gray-500'>Price</label>
                <input type='number' value={dishPrice} onChange={(e)=>setDishPrice(e.target.value)} className='border-2 border-gray-500 px-4 py-2 w-full'/>
                <div className='my-4'>
                    <label className='text-xl mr-4 text-gray-500'>Dish Image</label>
                    <input type='file' onChange={handleDishImageUpload} className='border-2 border-gray-500 px-4 py-2 w-full'/>
                </div>
                <button className='p-2 bg-sky-300 m-8' onClick={handleAddMenuItem}>
                    Add
                </button>
                {menu.map((elem,index)=><ShopDishContainer key = {index} dish={elem} cartCount={1} RemoveCallback={()=>handleRemoveMenuItem(index)}/>)}
            </div>
            <button className='p-2 bg-sky-300 m-8' onClick={handleSaveBook}>
                Save
            </button>
        </div>
    </div>
  )
}

export default CreateShop
