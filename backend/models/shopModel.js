import mongoose from "mongoose";

const dishSchema = mongoose.Schema(
    {
        name:{
            type: String,
            required:true,
        },
        price:{
            type:Number,
            required:true
        }
    }
)

const Dish = mongoose.model('Dish', dishSchema)

const shopSchema = mongoose.Schema(
    {
        name:{
            type: String,
            required:true,
        },
        address:{
            type: String,
            required:true,
        },
        rating:{
            type: Number,
            required:true,
        },
        menu:[{
            name:{
                type: String,
                required:true,
            },
            category:{
                type: String,
                required:true,
            },
            price:{
                type:Number,
                required:true,
            },
            image:{
                type: String,
            },
        }],
        image:{
            type: String,
        },
    },
    {
        timestamps: true,
    }
)

export const Shop = mongoose.model('Shop', shopSchema);