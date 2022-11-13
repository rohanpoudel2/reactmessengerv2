import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NavBar from './components/navbar/NavBar'
import Login from './pages/login/Login'
import Home from './pages/home/Home'
import AuthProvider from './context/auth'
import './app.scss'
import PrivateRoute from './privateroute/PrivateRoute'
import Profile from './pages/profile/Profile'

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className='app'>
          <NavBar />
          <Routes>
            <Route index element={<PrivateRoute component={<Home />} />} />
            <Route path='/login' element={<Login />} />
            <Route path='/profile' element={<Profile />} />
          </Routes>
        </div >
      </BrowserRouter >
    </AuthProvider>
  )
}

export default App