import {create} from "zustand"
import axios from "../api/axios.js"
import {toast} from "react-hot-toast"

export default create((set)=>({
    products: [],
    loading: false,

    setProducts: (products) => set({products}),

    fetchAllProducts: async () => {
        set({loading: true});
        try{
            const res = await axios.get("/products");
            set({products: res.data, loading: false});
        }catch(error){
            set({error: "Failed to fetch products", laoding: false});
            toast.error(error.res.data.error || "Failed to fetch products");
        }
    },
    createProducts: async () => {
        
    },
    deleteProducts: async (id) => {
        try{

        }catch(error){

        }
    },
    toggleFeatured: async () => {
        try {

        }catch(error){

        }
    },
}))