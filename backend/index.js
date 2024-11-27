import express from "express";
import {PORT,mongoDBREL} from "./config.js";
import mongoose from 'mongoose';


const app = express();

app.get('/',(request,response)=>{
    console.log(request)
    return response.status(234).send('welcome to books store')
    ;
});



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