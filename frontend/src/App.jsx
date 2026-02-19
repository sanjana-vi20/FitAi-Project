import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home  from './pages/Home'
import Header from './components/Header'
import Register from './pages/Register'
import { Toaster } from 'react-hot-toast'
import Login from './pages/Login'

function App() {

  return (
    <>
      <BrowserRouter>
      <Toaster/>
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
