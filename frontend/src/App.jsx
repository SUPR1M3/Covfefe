import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import CreateShop from './pages/CreateShop'
import DeleteBook from './pages/DeleteBook'
import EditBook from './pages/EditBook'
import ShowShop from './pages/ShowShop'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/shops/create' element={<CreateShop/>}/>
      <Route path='/shops/details/:id' element={<ShowShop/>}/>
      <Route path='/books/edit/:id' element={<EditBook/>}/>
      <Route path='/books/delete/:id' element={<DeleteBook/>}/>
    </Routes>
  )
}

export default App;