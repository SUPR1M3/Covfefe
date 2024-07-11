import express from 'express';
import { Shop } from '../models/shopModel.js';
import { ShopChecker } from '../utils/ShopChecker.js';
import { Findby } from '../utils/Findby.js';

const router = express.Router();

router.post('/', async (request,response)=>{
    try{
        if(!ShopChecker(request.body)){
            return response.status(400).send({
                message: 'Enter all required fields: Name, Address, Rating(1-5), Non-empty Menu with Dish name as string, price as number and category as string.',
            });
        }
        const newShop = {
            name: request.body.name,
            address: request.body.address,
            rating: request.body.rating,
            menu: request.body.menu,
            image: request.body.image,
        };
        const shop = await Shop.create(newShop);
        return response.status(201).send(shop);
    }
    catch(error){
        console.log(error.message);
        response.status(500).send({message:error.message});
    }
});

router.get('/',async (request, response)=>{
    try{
        const {Name,Address,Rating,Dish,Cost} = request.query;
        const tempShops = await Shop.find({});
        let shops = await Findby(Name, Address, Rating, Dish, Cost, tempShops);
        return response.status(200).json({
            count:shops.length,
            data:shops
        });
    }
    catch(error){
        console.log(error.message);
        response.status(500).send({message:error.message});
    }
});

router.get('/:id',async (request, response)=>{
    try{
        const {id} = request.params;
        const shop = await Shop.findById(id);
        if(!shop)
            return response.status(201).send({message:"No such shop found"});
        return response.status(200).json(shop);
    }
    catch(error){
        console.log(error.message);
        response.status(500).send({message:error.message});
    }
});

router.put('/:id',async (request, response)=>{
    try{
        if(!request.body.name || !request.body.address || !request.body.menu || request.body.menu.length===0){
            return response.status(400).send({
                message:'Send all required fields: Name, Address, Non-empty Menu.',
            });
        }
        const {id} = request.params;
        const res = await Shop.findByIdAndUpdate(id,request.body);
        if(!res){
            return response.status(400).json({message:'Shop not found'});
        }
        return response.status(200).send({message:'Shop updated successfully'});
    }
    catch(error){
        console.log(error.message);
        response.status(500).send({message:error.message});
    }
});

router.delete('/:id',async (request, response)=>{
    try{
        const {id} = request.params;
        const res = await Book.findByIdAndDelete(id);
        if(!res){
            return response.status(404).json({message:'Shop not found'});
        }
        return response.status(200).send({message:'Shop deleted successfully'});
    }
    catch(error){
        console.log(error.message);
        response.status(500).send({message:error.message});
    }
});

export default router;