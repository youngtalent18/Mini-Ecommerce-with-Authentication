import {motion} from "framer-motion"
import { ArrowRight, Loader,LogIn } from "lucide-react"
import { useState } from "react"
import useStore from "../store/useStore.js"

const LoginPage = () => {

  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const {login, loading} = useStore();

  const handleSubmit = (e) =>{
    e.preventDefault();
    console.log(email, password);
    login({email, password});
  }
  return (
    <div className='login-container'>
      <motion.div initial={{opacity: 0, y: -20}} animate={{opacity: 1, y: 0}} transition={{duration: 0.8}}>
            <h2 className='signup-heading'>Log Into Account</h2>
      </motion.div>
      <motion.div initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} transition={{duration: 0.8}} className="details">
          
          <form onSubmit={handleSubmit} className="main">
            <div className="name-field">
              <label htmlFor="email">Email</label><br/>
              <input id='email' type="email" required value={email} onChange={(e)=> setEmail(e.target.value)}/>
            </div>
            <div className="name-field">
              <label htmlFor="password">Password</label><br/>
              <input id='password'  placeholder='**********' type="password" required value={password} onChange={(e)=> setPassword(e.target.value)}/>
            </div>
            <button 
              type='submit'
              className='register-btn'
              disabled={loading}>
              {loading ? 
              ( <>
                  <Loader className='spinner' aria-hidden='true'/>
                  Loading...
                </>
              )
              :
              (<>
                <LogIn size={18}/>Sign In
               </>
              )
              }
             </button>
             <div className="register">
                <p>Don't have an account? <span >Sign Up <ArrowRight size={15}/></span></p>
            </div>
          </form>
      </motion.div>
    </div>
  )
}

export default LoginPage