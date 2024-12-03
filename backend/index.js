import express, { request, response } from "express";
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

