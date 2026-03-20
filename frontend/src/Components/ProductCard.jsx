import React from 'react'
import {toast} from 'react-hot-toast';

const ProductCard = ({product}) => {
    const handleAddToCart = () => {
        toast.success(`${product.name} added to cart`);
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