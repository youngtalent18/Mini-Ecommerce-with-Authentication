import React from 'react'

const ProductCard = ({product}) => {
  return (
    <div className='product-card' key={product._id}>
        <img src={product.image} alt="" />
        <span>{product.name}</span>
        <span>${product.price}</span>
    </div>
)
}

export default ProductCard