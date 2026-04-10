import { Link } from "react-router-dom"
import {Lock, ShoppingCart, LogIn, LogOut, UserPlus} from "lucide-react"
import useStore from '../store/useStore';
import { useCartStore } from "../store/useCartStore";



const Navbar = () => {

  const {user,logout} = useStore();
  const {cart} = useCartStore();

  const isAdmin =  user && user?.role === "admin";

  return (
    <header className='flex justify-between items-center px-8 py-4 bg-slate-700 sticky top-0 left-0 z-10 text-white'>
      <Link className='font-bold text-2xl cursor-pointer' style={{textDecoration: "none"}} to={"/"}>E-commerce</Link>
       <div className="nav-con">
          <nav className='flex items-center gap-5'>
              <Link className='home-link' style={{textDecoration: "none"}} to={"/"}>Home</Link>

              {user &&
                ( <Link className='cart-link' to={"/cart"}>
                    <ShoppingCart className='cart-icon' size={20}/>
                    <span className='cart'>cart</span>
                    {cart.length > 0 && <span className='cart-count'>{cart.length}</span>}
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
                  <button onClick={()=>logout()} className='flex'>
                    <LogOut size={15}/>
                    <span className='logOut-text'>Logout</span>
                  </button>
                ) : (
                  <>
                  <Link className='flex items-center gap-1' to={"/signup"}>
                    <UserPlus size={15}/>
                    SignUp
                  </Link>
                  {"|"}
                  <Link className='flex items-center gap-1' to={"/login"}>
                    <LogIn size={15}/>
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