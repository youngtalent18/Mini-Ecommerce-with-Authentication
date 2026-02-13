import {Routes, Route, Navigate } from 'react-router-dom'
import Homepage from './Pages/Homepage.jsx'
import LoginPage from './Pages/LoginPage.jsx'
import SignUp from './Pages/SignUp.jsx'
import Navbar from './Components/Navbar.jsx'
import {Toaster } from "react-hot-toast"
import useStore from './store/useStore.js'
import { useEffect } from 'react'


function App() {

  const {user, checkAuth} = useStore();
  useEffect(()=>{
    checkAuth()
  },[checkAuth]);

  return (
    <div className='app-con'>
      <Toaster position='top-center'/>
      <Navbar />
      <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/signup' element={!user ? <SignUp /> : <Navigate to="/"/>} />
          <Route path='/login' element={!user ? <LoginPage /> : <Navigate to="/"/> } />
      </Routes>

    </div>
  )
}

export default App
