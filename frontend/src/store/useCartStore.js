import {create} from "zustand"
import axios from "../api/axios.js"
import { toast } from "react-hot-toast"

export const useCartStore = create((set, get)=>({
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
    addToCart: async (product) => {
        try{
            await axios.post("/cart",{productId: product._id});
            toast.success("Product added to cart");

            set((prevState)=>{
                const existingItem = prevState.cart.find((item)=>item._id === product._id);
                const newCart = existingItem ? prevState.cart.map((item)=>(item._id === product._id? {...item, quantity: item.quantity + 1} : item)) 
                    : [...prevState.cart,{...product, quantity: 1}];
                return {cart: newCart};
            })
        }catch(error){
            const message = error.response?.data?.message || "Failed to items add cart";
            toast.error(message);
        }
    },
    calculateTotal: () => {
        const {coupon, cart} = get();
        const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
        const discount = coupon ? (subtotal * coupon.discount) / 100 : 0;
        const total = subtotal - discount;
        set({total, subTotal: subtotal});
    },
}))