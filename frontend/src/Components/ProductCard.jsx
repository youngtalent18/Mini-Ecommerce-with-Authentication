import React from 'react'
import {toast} from 'react-hot-toast';
import { useStore } from '../store/useStore';
import { useCartStore } from '../store/useCartStore';

const ProductCard = ({product}) => {
    const {user} = useStore();
    const {addToCart} = useCartStore();
    const handleAddToCart = () => {
        if(!user){
            toast.error("Please login to add items to cart");
            return;
        }
        addToCart(product);
    }
  return (
    <div className='product-card'>
        <img src={product.image} alt="" />
        <span>{product.name}</span>
        <span>${product.price}</span>
        <button className='add-to-cart-btn' type='button' onClick={handleAddToCart}>Add To Cart</button>
    </div>
)
}

export default ProductCard