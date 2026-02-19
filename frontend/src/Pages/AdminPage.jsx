import { BarChart, PlusCircle, ShoppingBasket } from 'lucide-react'
import { useState } from 'react'
import AnalyticsPage from "../Components/AnalyticsPage"
import CreatePage from "../Components/CreatePage"
import ProductPage from "../Components/ProductPage"
import "./CSS/admin.css"
import { motion } from 'framer-motion'

const AdminPage = () => {
  const tabs = [
    {id: 'create', label: "Add Product", icon: PlusCircle},
    {id: "products", label: "Products", icon: ShoppingBasket},
    {id: "analytics", label: "Analytics", icon: BarChart },
  ]

  const [activeTab, setActiveTab] = useState("create");
  return (
    <div className="admin-main">
        <motion.h1 className='admin-heading'  initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} transition={{duration: 0.8}}>
            Admin Dashboard
        </motion.h1>
        <motion.div initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} transition={{duration: 0.8, delay: 0.4}} className='admin-sub'>
          {
            tabs.map((tab)=>(
              <button className={`${activeTab === tab.id? "active":"inactive"}`} key={tab.id} onClick={()=>setActiveTab(tab.id)}>
                  <tab.icon/>
                  {tab.label}
              </button>
            ))
          }
        </motion.div>
        {activeTab==="create" && <CreatePage />}
        {activeTab==="products" && <ProductPage />}
        {activeTab==="analytics" && <AnalyticsPage />}
    </div>
  )
}

export default AdminPage