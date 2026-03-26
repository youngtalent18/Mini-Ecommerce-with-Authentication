import React from 'react'
import "./CSS/Homepage.css"
import Category from '../Components/Category';

const Homepage = () => {

  const categories = [
    {href: "/bags", name: "Bags", imageUrl: "/bag_banner.png"},
    {href: "/kids", name: "Kids", imageUrl: "/kid_banner.png"},
    {href: "/men", name: "Men", imageUrl: "/men_banner.png"},
    {href: "/women", name: "Women", imageUrl: "/Women.jpeg"},
  ];

  return (
    <div className='main-category'>
      <h1 class="text-3xl font-bold">Explore Our Categories</h1>
        <hr />
      <div className="categories-container">
        <p>Discover our wide range of products in each category.</p>
          <div className='category-list'>
          {
            categories.map((category, index) => {
              return <Category key={index} category={category} />
            })
          }
        </div>
      </div>
    </div>
  )
}
export default Homepage