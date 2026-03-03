import { create } from "zustand"
import axios from "../api/axios.js"
import { toast } from "react-hot-toast"

export const useProductStore = create((set) => ({
    products: [],
    loading: false,
    error: null,

    fetchAllProducts: async () => {
        set({ loading: true, error: null })

        try {
            const res = await axios.get("/products")

            set({
                products: res.data,
                loading: false
            })

        } catch (error) {
            set({
                loading: false,
                error: "Failed to fetch products"
            })

            toast.error(
                error.response?.data?.error || "Failed to fetch products"
            )
        }
    },

    createProducts: async (newProduct) => {
        set({ loading: true, error: null })

        try {
            const res = await axios.post("/products", newProduct)

            set((state) => ({
                products: [res.data, ...state.products],
                loading: false
            }))

            toast.success("Product created successfully")

        } catch (error) {
            set({ loading: false })

            toast.error(
                error.response?.data?.error || "Failed to create product"
            )
        }
    },

    deleteProducts: async (id) => {
        try {
            await axios.delete(`/products/${id}`)

            set((state) => ({
                products: state.products.filter(
                    (product) => product._id !== id
                )
            }))

            toast.success("Product deleted")

        } catch (error) {
            toast.error(
                error.response?.data?.error || "Failed to delete product"
            )
        }
    },

    toggleFeatured: async (id) => {
        try {
            const res = await axios.patch(`/products/${id}/featured`)

            set((state) => ({
                products: state.products.map((product) =>
                    product._id === id ? res.data : product
                )
            }))

        } catch (error) {
            toast.error(
                error.response?.data?.error || "Failed to update product"
            )
        }
    }
}))

export default useProductStore;