import express, { json, request, response } from "express";
import {PORT,mongoDBREL} from "./config.js";
import mongoose from 'mongoose';
import booksRoute from './routes/booksRoute.js'

const app = express();

// to call postmen(middleware for pressignrequest body)
app.use(express.json());
// wllow custom origins 


app.get('/',(request,response)=>{
    console.log(request)
    return response.status(234).send('welcome to books store')
    ;
});

app.use('/books',booksRoute)



mongoose
.connect(mongoDBREL)
.then(()=>{
    console.log("app connected to database");
    app.listen(PORT,()=>{
        console.log(`App is listening to psot : ${PORT}`);
    })
})
.catch((Error)=>{
    console.log(Error);
});

