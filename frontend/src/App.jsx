import {Routes, Route } from 'react-router-dom'
import Homepage from './Pages/Homepage.jsx'
import LoginPage from './Pages/LoginPage.jsx'
import SignUp from './Pages/SignUp.jsx'
import Navbar from './Components/Navbar.jsx'


function App() {

  return (
    <div className='app-con'>
      <Navbar />
      <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/login' element={<LoginPage />} />
      </Routes>

    </div>
  )
}

export default App
