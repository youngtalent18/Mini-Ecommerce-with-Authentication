import { useState } from 'react'
import { Link } from "react-router-dom"
import {Lock, ShoppingCart, LogIn, LogOut, UserPlus} from "lucide-react"
import useStore from '../store/useStore';
const Navbar = () => {

  const {user} = useStore();
  const isAdmin = false;

  return (
    <header className='navbar'>
      <Link className='default-home' style={{textDecoration: "none"}} to={"/"}>E-commerce</Link>
       <div className="nav-con">
          <nav className='nav-links'>
              <Link className='home-link' style={{textDecoration: "none"}} to={"/"}>Home</Link>

              {user &&
                ( <Link className='cart-link' to={"/cart"}>
                    <ShoppingCart className='cart-icon' size={20}/>
                    <span className='cart'>cart</span>
                    <span className='cart-count'>0</span>
                  </Link>
                )
              }

              {
                isAdmin && 
                (
                  <Link className='dashboard' to={"/dashboard"}>
                    <Lock className='dash-icon' size={18}/>
                    <span className='dash-text'>Dashboard</span>
                  </Link>
                )
              }

              {
                user ? (
                  <button className='logout-btn'>
                    <LogOut size={18}/>
                    <span className='logOut-text'>Logout</span>
                  </button>
                ) : (
                  <>
                  <Link className='signup-login' to={"/signup"}>
                    <UserPlus size={18}/>
                    SignUp
                  </Link>
                  {"|"}
                  <Link className='signup-login' to={"/login"}>
                    <LogIn size={18}/>
                    Login
                  </Link>
                  </>
                )
              }

          </nav>
        </div>
    </header>
  )
}

export default Navbar