import './ShopDishStyles.css'
import React from 'react'
import { BiCoffee } from 'react-icons/bi'
import { FiPlus, FiMinus} from 'react-icons/fi'

const ShopDishContainer = (props) => {
    return (
        <div className='ShopMenuDishContainer'>
            {props.AddCallback?<div className='ShopMenuDishAddIcon'>
                <FiPlus onClick={props.AddCallback} />
            </div>:null}
            {props.cartCount?<div className='ShopMenuDishCartCount'>
                <h2>{props.cartCount}</h2>
            </div>:null}
            {props.cartCount?<div className='ShopMenuDishReduceIcon'>
                <FiMinus onClick={props.RemoveCallback} />
            </div>:null}
            {props.dish.image ? <img src={props.dish.image} className='ShopMenuDishImage' /> : <BiCoffee style={{ fontSize: '100px', justifySelf: 'center' }} />}
            <h2 className='ShopMenuDishName'>{props.dish.name}</h2>
            <h2 className='ShopMenuDishDesc'>Description PlaceHolder sidufhsidu sidufhsiudf sidhfsiudhfiusdhfiusd</h2>
            <h2 className='ShopMenuDishPrice'>${props.dish.price}</h2>
        </div>
    )
}

export default ShopDishContainer