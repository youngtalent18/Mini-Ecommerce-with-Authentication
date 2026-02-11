import { useState } from 'react'
import { Loader, UserPlus } from 'lucide-react'
import { motion } from "framer-motion"
import useStore from "../store/useStore.js"

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  })

  const {signup, loading} = useStore();

  const handleSubmit = (e) =>{
    e.preventDefault();
    console.log(formData);
    signup(formData);
  }
  return (
    <div className='signup-con'>
      <motion.div initial={{opacity: 0, y: -20}} animate={{opacity: 1, y: 0}} transition={{duration: 0.8}}>
      <h2 className='signup-heading'>Create Your Account</h2>
      </motion.div>

      <motion.div initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} transition={{duration: 0.8}} className="details">
          <form onSubmit={handleSubmit} className="main">
            <div className="name-field">
              <label htmlFor="name">Full Name</label><br/>
              <input id='name' type="text" required value={formData.name} onChange={(e)=> setFormData({...formData, name: e.target.value})}/>
            </div>
            <div className="name-field">
              <label htmlFor="email">Email</label><br/>
              <input id='email' type="email" required value={formData.email} onChange={(e)=> setFormData({...formData, email: e.target.value})}/>
            </div>
            <div className="name-field">
              <label htmlFor="password">Password</label><br/>
              <input id='password'  placeholder='**********' type="password" required value={formData.password} onChange={(e)=> setFormData({...formData, password: e.target.value})}/>
            </div>
            <div className="name-field">
              <label htmlFor="confirm">Confirm </label><br/>
              <input id='confirm' placeholder='**********' type="password" required value={formData.confirmPassword} onChange={(e)=> setFormData({...formData, confirmPassword: e.target.value})}/>
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
                <UserPlus size={18}/>Register
               </>
              )
              }
             </button>
             <div className="register">
                <p>Already have an account? <span >Sign In</span></p>
            </div>
          </form>
      </motion.div>
    </div>
  )
}

export default SignUp