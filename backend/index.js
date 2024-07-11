import express, { request, response } from "express"
import mongoose from "mongoose";
import { PORT, mongoDBURL } from "./config.js";
import cors from 'cors';
import bodyParser from 'body-parser';
import booksRoute from './routes/booksRoute.js';
import Stripe from "stripe";

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(express.json());
const stripe = Stripe('sk_test_51PXLupRuHe9N11Jb4lg0akrS4e0fXTiBp0E4nusxQopbriGXjWF4ADyn2JpFxXQUUVm9PBY7X5Kif8HdBvx4LuhF00H33yl4yL');
/*app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
}));*/


app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send("Home Page");
})

app.use('/books', booksRoute);

app.post('/checkout/', async (request, response) => {
    //console.log(request);
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            line_items: request.body.map((elem) => {
                return {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: elem.name
                        },
                        unit_amount: elem.price
                    },
                    quantity: elem.amount
                }
            }),
            success_url: 'http://localhost:5000/success.html',
            cancel_url: 'http://localhost:5000/'
        })
        response.json({url:session.url});
    } catch(error){
        response.status(500).json({error:error.message});
    }
});

mongoose.connect(mongoDBURL).then(() => {
    console.log("App connected to DB");
    app.listen(PORT, () => {
        console.log("test");
    })
}).catch((error) => {
    console.log(error)
})