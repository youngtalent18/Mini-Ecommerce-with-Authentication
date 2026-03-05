import {Routes, Route, Navigate } from 'react-router-dom'
import Homepage from './Pages/Homepage.jsx'
import AdminPage from './Pages/AdminPage.jsx'
import LoginPage from './Pages/LoginPage.jsx'
import SignUp from './Pages/SignUp.jsx'
import Navbar from './Components/Navbar.jsx'
import {Toaster } from "react-hot-toast"
import useStore from './store/useStore.js'
import { useEffect } from 'react'
import CategoryPage from './Pages/CategoryPage.jsx'


function App() {

  const {user, checkAuth, checkingAuth} = useStore();
  useEffect(()=>{
    checkAuth()
  },[checkAuth]);

  if (checkingAuth) return <div className='loader'>Loading...</div>;


  return (
    <div className='app-con'>
      <Toaster position='top-center'/>
      <Navbar />
      <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/signup' element={!user ? <SignUp /> : <Navigate to="/"/>} />
          <Route path='/login' element={!user ? <LoginPage /> : <Navigate to="/"/> } />
          <Route path='/dashboard' element={user && user?.role === "admin" ? <AdminPage /> : <Navigate to="/login"/>} />
          <Route path='/category/:category' element={<CategoryPage/>} />
      </Routes>

    </div>
  )
}

export default App
