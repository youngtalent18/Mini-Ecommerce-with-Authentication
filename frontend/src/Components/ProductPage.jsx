import React from 'react'
import useProductStore from '../store/useProductStore'
import {motion} from "framer-motion"

const ProductPage = () => {
  const { deleteProducts, toggleFeatured, products } = useProductStore();

  return (
    <motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
>
  <div className="table-wrapper">
    <table className="product-table">
      <thead>
        <tr>
          <th>Image</th>
          <th>Name</th>
          <th>Category</th>
          <th>Price</th>
          <th>Featured</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {products.map((product) => (
          <tr key={product._id}>
            <td>
              <img
                src={product.image}
                alt={product.name}
                className="table-img"
              />
            </td>

            <td>{product.name}</td>
            <td>{product.category}</td>
            <td>GHS {product.price}</td>

            <td>
              <button
                className={`feature-btn ${
                  product.isFeatured ? "active" : ""
                }`}
                onClick={() => toggleFeatured(product._id)}
              >
                {product.isFeatured ? "Yes" : "No"}
              </button>
            </td>

            <td>
              <button
                className="delete-btn"
                onClick={() => deleteProducts(product._id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</motion.div>

  )
}

export default ProductPage