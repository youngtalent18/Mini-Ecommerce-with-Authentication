import {create} from "zustand"

export const useCartStore = create(()=>({
    cart: [],
    total: 0,
    coupon: null,
    subTotal: 0,

    getCartItems: async () => {

    }
}))