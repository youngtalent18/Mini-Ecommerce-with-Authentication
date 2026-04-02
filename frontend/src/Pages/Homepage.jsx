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
    <div className='min-h-screen max-w-full bg-slate-600'>
      <h1 class="text-slate-300 text-3xl text-center font-bold">Explore Our Categories</h1>
      <div className="categories-container">
        <p className='text-sm text-slate-50 pb-1'>Discover our wide range of products in each category.</p>
          <div className='w-10/12 py-4 grid grid-cols-2 gap-2 sm:grid-cols-3 '>
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