import {Routes, Route } from 'react-router-dom'
import Homepage from './Pages/Homepage.jsx'
import LoginPage from './Pages/LoginPage.jsx'
import SignUp from './Pages/SignUp.jsx'
import Navbar from './Components/Navbar.jsx'
import {Toaster } from "react-hot-toast"
import useStore from './store/useStore.js'


function App() {

  const {user} = useStore();

  return (
    <div className='app-con'>
      <Toaster position='top-center'/>
      <Navbar />
      <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/login' element={user ? <Homepage /> : <LoginPage />} />
      </Routes>

    </div>
  )
}

export default App
