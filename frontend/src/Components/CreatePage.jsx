import { useState } from 'react'
import {motion} from "framer-motion"
import { Loader, PlusCircle, Upload } from 'lucide-react';
import useProductStore from '../store/useProductStore';

const CreatePage = () => {
    const categories = ["kids", "women", "men", "bags"];
    const [newProduct, setNewProduct] = useState({
        name: "",
        description: "",
        category: "",
        price: "",
        image: ""
    });
    const {createProducts, loading} = useProductStore();

    const handleCreate = async (e)=>{
        e.preventDefault();
        try {
            await createProducts(newProduct);
            setNewProduct({ name: "",
                            description: "",
                            category: "",
                            price: "",
                            image: ""
                         })
        } catch (error) {
            console.log("Failed to create",error);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    const handleOnchange = (e)=>{
        const file = e.target.files[0];

        if(file){
            const reader = new FileReader();

            reader.onloadend = () => {
                setNewProduct({...newProduct, image: reader.result });
            }
            reader.readAsDataURL(file);
        }
    }
  return (
    <motion.div className='create-con' initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} transition={{duration: 0.8, delay: 0.4}} >
        <h2>Create Product</h2>
        <form onSubmit={handleSubmit}>
            <div className='create-detail'>
                <label className='create-label' htmlFor="name">Product Name</label>
                <input value={newProduct.name} name="name" id="name" required onChange={(e)=>setNewProduct({...newProduct, name: e.target.value})} type="text" />
            </div>
            <div className='create-detail'>
                <label className='create-label' htmlFor="description">Description</label>
                <textarea value={newProduct.description} required name="description" id="description" onChange={(e)=>setNewProduct({...newProduct, description: e.target.value})} rows="3" />
            </div>
            <div className='create-detail'>
                <label className='create-label' htmlFor="price">Price</label>
                <input value={newProduct.price} required name="price" id="price" onChange={(e)=>setNewProduct({...newProduct, price: e.target.value})} type="number" />
            </div>

            <div className='create-detail'>
                <label className='create-label' htmlFor="category">Category</label>
                <select value={newProduct.category} required onChange={(e)=>setNewProduct({...newProduct, category: e.target.value})} name="category" id="category">
                    <option value="">Select a category</option>
                    {
                        categories.map((category)=>(
                            <option key={category} value={category}>
                                {category}
                            </option>
                        ))
                    }
                </select>
            </div>
            <div className='image-detail'>
                <input required accept="image/*" id="image" type="file" onChange={handleOnchange}/>
                <label className='image-label' htmlFor="image"><Upload size={15}/>Upload Image</label>
                {newProduct.image && <span>{newProduct.image}</span>}
            </div>
            <button onClick={handleCreate} type='submit' disabled={loading} className='btn'>
                {
                    loading? (
                        <>
                            <Loader className='create-spin' size={15}/>
                            Loading...
                        </>
                    ):(
                        <>
                        <PlusCircle size={15}/>
                        Create Product
                        </>
                    )
                }
            </button>
        </form>
    </motion.div>
  )
}

export default CreatePage