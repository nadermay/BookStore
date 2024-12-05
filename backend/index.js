import express, { json, request, response } from "express";
import {PORT,mongoDBREL} from "./config.js";
import mongoose from 'mongoose';
import { Book} from './models/bookModel.js';

const app = express();

// to call postmen
app.use(express.json());

app.get('/',(request,response)=>{
    console.log(request)
    return response.status(234).send('welcome to books store')
    ;
});

//route for save new book 
app.post('/books', async (request, response) => {
    try {
      // Validate required fields
      if (
        !request.body.title ||
        !request.body.author ||
        !request.body.publishYear
      ) {
        return response.status(400).send({
          message: 'Send all required fields: title, author, publishYear',
        });
      }
  
      // Create a new book object
      const newBook = {
        title: request.body.title,
        author: request.body.author,
        publishYear: request.body.publishYear,
      };
  
      // Save the new book to the database (assuming you're using Mongoose)
      const savedBook = await Book.create(newBook); // Replace `Book` with your Mongoose model
  
      // Respond with the saved book
      return response.status(201).send(savedBook);
    } catch (error) {
      console.error('Error saving the book:', error);
      return response.status(500).send({
        message: 'Internal server error',
        error: error.message,
      });
    }
  });
  

// route for get all the books 
app.get('/books',async(request,response)=>{
  try{
    const books = await Book.find({});
    return response.status(200).json({
      count : books.length,
      data : books
    });
  }catch(error){
    console.log(error.message);
    response.status(500).send({message:error.message})
  }
})
// route for get all the books  by id 
app.get('/books/:id',async(request,response)=>{
  try{

    const{id}=request.params;

    const book = await Book.findById(id);
    return response.status(200).json(book);
  }catch(error){
    console.log(error.message);
    response.status(500).send({message:error.message})
  }
})

//update book route
app.put('/books/:id',async(request,response)=>{
  try{
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishYear
    ){
      return response.status(400).send({
        message:'send all required fields : title,author; publishYear'
      })
    }
    const {id}= request.params;
    const result = await Book.findByIdAndUpdate(id,request.body);
if(!result){
  return response.status(404).json({message:'book not found'});
}
return response.status(200).send({message:'Book updated successfully'})
  }catch(error) {
    console.log(error.message);
    response.status(500).send({message:error.message});
  }
})

// delete book route
app.delete('/books/:id',async(request,response)=>{
  try{
    const{id}=request.params;
    const result = await Book.findByIdAndDelete(id);

      if(!result){
        return response.status(404).json({message:'book not found'})
      }

      return response.status(200).send({message:'book deleted successfully'})

  }catch(error){
console.log(error.message);
response.status(500).send({message:error.message})
  }
})



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

