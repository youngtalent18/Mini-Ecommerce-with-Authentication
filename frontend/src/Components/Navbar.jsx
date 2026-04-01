import { Link } from "react-router-dom"
import {Lock, ShoppingCart, LogIn, LogOut, UserPlus} from "lucide-react"
import useStore from '../store/useStore';
import { useCartStore } from "../store/useCartStore";



const Navbar = () => {

  const {user,logout} = useStore();
  const {cart} = useCartStore();

  const isAdmin =  user && user?.role === "admin";

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
                    {cart.lenght > 0 && <span className='cart-count'>{cart.length}</span>}
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
                  <button onClick={()=>logout()} className='logout-btn'>
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