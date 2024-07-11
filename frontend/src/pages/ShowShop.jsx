import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Navigate, useParams } from 'react-router-dom';
import Spinner from '../components/spinner';
import BackButton from '../components/BackButton';
import ShopDishContainer from './ShopDishContainer';
import { FaStar, FaCircle, FaShoppingCart } from 'react-icons/fa';
import { BiCoffee } from 'react-icons/bi';
import { LuCroissant } from 'react-icons/lu';
import { RiDrinks2Line } from 'react-icons/ri';
import GeoCoding from './GeoCoding';
import {APIProvider} from '@vis.gl/react-google-maps';
import { IoIosArrowBack } from 'react-icons/io';
import './ShowShopStyles.css';

function ShowShop() {
    const [shop, setShop] = useState({});
    const [loading, setLoading] = useState(false);
    const [cart, setCart] = useState({});
    const [cartPrice, setCartPrice] = useState(0);
    const [showMap, setShowMap] = useState(false);
    const { id } = useParams();
    const [category, setCategory] = useState('coffee');
    

    useEffect(() => {
        setLoading(true);
        axios.get('http://localhost:5000/books/' + id).then((response) => {
            setShop(response.data);
            setLoading(false);
        }).catch((error) => {
            console.log(error);
            setLoading(false);
        });
    }, []);

    


    const handleAddItem = (menuIndex)=>{
        let temp = {...cart};
        let cartkey = ''+menuIndex;
        console.log(Object.keys(temp));
        Object.keys(temp).includes(cartkey)? temp[cartkey]++:temp[cartkey]=1;
        setCartPrice(cartPrice + shop.menu[menuIndex].price);
        setCart(temp);
    }

    const handleRemoveItem = (menuIndex)=>{
        let temp = {...cart};
        let cartkey = ''+menuIndex;
        temp[cartkey]>1? temp[cartkey]--:delete temp[cartkey];
        setCartPrice(cartPrice - shop.menu[menuIndex].price);
        setCart(temp);
    }
    
    const handleCheckout = ()=>{
        const data=Object.keys(cart).map((elem)=>{return {name:shop.menu[elem].name, amount:cart[elem], price:shop.menu[elem].price}});
        setLoading(true);
        console.log(data);
        axios.post('http://localhost:5000/checkout',data).then((response)=>{
            setLoading(false);
            window.location=response.data.url;
        }).catch((error)=>{
            setLoading(false);
            console.log(error);
        })
    }

    //
    return (
        <>
        {loading ? <Spinner/>:<div className='ShowShopContainer'>
            <img className='ShowShopCardImage' src={shop.image}/>
            <div className='ShowShopBackButton'>
                <BackButton />
            </div>
            <div className='ThreeDotsContainer'>
                <FaCircle style={{ opacity: category === 'Coffee' ? 1 : 0.5, transition: 'opacity 0.5s ease-in' }} onClick={() => setCategory('Coffee')}/>
                <FaCircle style={{ opacity: category === 'Drinks' ? 1 : 0.5, transition: 'opacity 0.5s ease-in' }} onClick={() => setCategory('Drinks')}/>
                <FaCircle style={{ opacity: category === 'Food' ? 1 : 0.5, transition: 'opacity 0.5s ease-in' }} onClick={() => setCategory('Food')}/>
            </div>
            <div key={shop._id} className='ShopMenuContainer'>
                <div className='ShopDetailsContainer'>
                    <h2 className='ShowShopCardName'>{shop.name}</h2>
                    <FaStar className='ShowShopRatingIcon' />
                    <h2 className='ShowShopCardRating'>{shop.rating}</h2>
                    <h2 className='ShowShopCardDist' onClick={()=>setShowMap(true)}>{shop.address}</h2>
                </div>
                <div id='CoffeeContainer' className='CategoryContainer' onClick={() => setCategory('Coffee')} style={{ backgroundColor: category === 'coffee' ? 'rgba(237,240,239,255)' : 'white' }}>
                    <BiCoffee className='CategoryIcon' />
                    <h2 className='CategoryName'>Coffee</h2>
                </div>
                <div id='DrinksContainer' className='CategoryContainer' onClick={() => setCategory('Drinks')} style={{ backgroundColor: category === 'drinks' ? 'rgba(237,240,239,255)' : 'white' }}>
                    <RiDrinks2Line className='CategoryIcon' style={{transform:'rotateY(180deg)'}}/>
                    <h2 className='CategoryName'>Drinks</h2>
                </div>
                <div id='FoodContainer' className='CategoryContainer' onClick={() => setCategory('Food')} style={{ backgroundColor: category === 'food' ? 'rgba(237,240,239,255)' : 'white' }}>
                    <LuCroissant className='CategoryIcon' style={{transform:'rotate(90deg)'}}/>
                    <h2 className='CategoryName'>Food</h2>
                </div>
                {shop.menu?<div className='ShopMenuDishesContainer'>
                    {shop.menu.map((elem,index)=>elem.category.toLowerCase()===category.toLowerCase()?<ShopDishContainer key={index} dish={elem} cartCount={cart[index]} AddCallback={()=>handleAddItem(index)} RemoveCallback={()=>handleRemoveItem(index)}/>:null)}
                    {Object.keys(cart).length!==0?<div className='ShopMenuCartContainer' onClick={handleCheckout}>
                        <FaShoppingCart/>
                        <p>{Object.values(cart).reduce((agg,elem)=>agg+elem,0)} Items at ${cartPrice}</p>
                    </div>:null}
                </div>:null}
            </div>
            <APIProvider apiKey='AIzaSyBDsEPMRqxcWPc-fRMHR1QpA43K5cv1m-c'>
                <div className='ShowShopMapContainer' style={{ top: showMap ? '0' : '100%' }}>
                    <GeoCoding address={shop.address}/> 
                    <IoIosArrowBack className='ShowShopMapClosebutton' onClick={()=>setShowMap(false)} />  
                </div>
            </APIProvider>
        </div>}
        </>
    )
}

export default ShowShop