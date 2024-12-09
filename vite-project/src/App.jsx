// eslint-disable-next-line no-unused-vars
import React from 'react'
import {Routes,Route} from 'react-router-dom' 
import Home from './pages/Home'
import CreateBooks from './pages/CreateBooks'
import DeleteBook from './pages/DeleteBook'
import EditBook from './pages/EditBook'
import ShowBook from './pages/ShowBook'




const App = () => {
  return (
   <Routes>
    <Route Routepath='/'element={<Home/>}/>
    <Route Routepath='/books/create'element={<CreateBooks/>}/>
    <Route Routepath='/books/details/:id'element={<ShowBook/>}/>
    <Route Routepath='/books/edit/:id'element={<EditBook/>}/>
    <Route Routepath='/books/delete/:id'element={<DeleteBook/>}/>
   </Routes>
  )
}
export default App
