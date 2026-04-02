import React from 'react'
import { useCartStore } from '../store/useCartStore.js';
import PeopleAlsoBought from '../Components/PeopleAlsoBought.jsx';
const CartPage = () => {
  const {cart} = useCartStore();
  return (
    <div className='cart-main'>
      <div className='cart-sub'>
        <div className="cart-sub-left">
          <motion.div className='cart-items-con' initial={{x:100, opacity:0}} animate={{x:0, opacity:1}} transition={{duration:0.5}}>
            {cart.length > 0 ? cart.map(item=>(
              <div className='cart-item' key={item._id}>
                <img src={item.image} alt={item.name} />
                <div className='cart-item-details'>
                  <h3>{item.name}</h3>
                  <p>${item.price.toFixed(2)}</p>
                  <p>Quantity: {item.quantity}</p>
                </div>
              </div>
            )) : (
              <p>Your cart is empty</p>
            )}
            {cart.length > 0 && <PeopleAlsoBought />}
          </motion.div>

        </div>
      </div>
    </div>
  )
}

export default CartPage