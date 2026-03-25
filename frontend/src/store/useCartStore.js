import {create} from "zustand"
import axios from "../api/axios.js"
import { toast } from "react-hot-toast"

export const useCartStore = create((set)=>({
    cart: [],
    total: 0,
    coupon: null,
    subTotal: 0,

    getCartItems: async () => {
        try{
            const res = await axios.get("/cart");
            set({cart: res.data});
        }catch(error){
            set({cart: []});
            const message = error.response?.data?.message || "Failed to fetch cart items";
            toast.error(message);
        }
    },
    addToCart: async () => {

    },
}))