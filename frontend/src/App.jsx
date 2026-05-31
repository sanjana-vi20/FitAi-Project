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
import UserDashboard from './pages/dashboards/UserDashboard'
import ProfilePage from './components/ProfilePage'
import Workouts from './pages/Workouts'
import Community from './pages/Community'
import Workoutss from './pages/Workoutss'
import DietPlan from './pages/DietPlanPage'
import ProfileSetup from './pages/dashboards/ProfileSetup'

function App() {

  return (
    <>
      <BrowserRouter>
      <Toaster/>
      <div className="bg-slate-950">
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/user-dashboard' element={<UserDashboard/>}/>
        <Route path='/profile' element={<ProfilePage/>}/>
        <Route path='/workout' element={<Workoutss/>}/>
        <Route path='/diet' element={<DietPlan/>}/>
        <Route path='/community' element={<Community/>}/>
        <Route path='/profile-setup' element={<ProfileSetup/>}/>
        <Route path='/diet-setup' element={<DietarySetup/>}/>

      </Routes>
      </div>
      </BrowserRouter>
    </>
  )
}

export default App
