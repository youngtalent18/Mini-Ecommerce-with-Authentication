import React from 'react'
import { Link } from 'react-router-dom'

const Category = ({category}) => {
  return (
    <div className='main-image-con'>
        <Link to={"category" + category.href}>
        <div className='categories'>
            <img loading='lazy' src={category.imageUrl} alt={category.name} />
            <div className='detail-cat'>
                <h4>{category.name}</h4>
                <p>Explore {category.name}</p>
            </div>
        </div>
        </Link>
    </div>
  )
}

export default Category