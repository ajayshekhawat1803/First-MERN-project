import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'

import Header from './Components/Header'
import Footer from './Components/Footer'
import SignUp from './Components/SignUp'
import PrivateComponents from './Components/PrivateComponents'
import Login from './Components/Login'
import AddProduct from './Components/AddProduct'
import Home from './Components/Home'
import UpdateProduct from './Components/UpdateProduct'


function App() {

  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route element={<PrivateComponents/>}>
            <Route path='/' element={<Home/>} />
            <Route path='/add-product' element={<AddProduct/>} />
            <Route path='/update/:id' element={<UpdateProduct/>} />
            <Route path='/logout' element={<h1>This is Logout PAge</h1>} />
            <Route path='/profile' element={<h1>This is Profile PAge</h1>} />
          </Route>

          <Route path='/signup' element={<SignUp />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </BrowserRouter>
      <Footer />

    </>
  )
}

export default App
