import {create} from "zustand"
import {toast} from "react-hot-toast"
import axios from "../api/axios.js"
// psalm 85:7, hebrews 4:16,psalm 102:13


export const useStore = create((set)=>({
    user: null,
    loading: false,
    checkingAuth: true,

    signup : async({name, password, email, confirmPassword}) => {
        set({loading: true});

        if(password !== confirmPassword){
            set({loading: false});
            return toast.error("Password unmatch");
        }

        try{
            const res = await axios.post("/auth/signup", {name,password, email});
            set({user: res.data, loading: false});

        }catch(error){
            set({loading: false});
            toast.error(error.response.data.error || "An error occurred");
        }
    },
    login : async({email, password}) => {
        set({loading: true});

        try{
            await axios.post("/auth/login", {password, email});
            const res = await axios.get("/auth/profile");
            set({user: res.data, loading: false});
            toast.success("Logged in successfully");
        }catch(error){
            set({loading: false});
            toast.error(error.response.data.error || "An error occurred");
        }
    },
    checkAuth: async() => {
        set({checkingAuth: true});
        try{
            const res = await axios.get("/auth/profile");
            set({user: res.data, checkingAuth: false});
        }catch(error){
            set({checkingAuth: false, user: null});
            console.log("Error",error);
        }
    },
    logout: async () => {
        try {
            await axios.post("/auth/logout");
            set({ user: null });
        } catch (error) {
            const message = error.response?.data?.error ||error.message ||"Logout failed";
            toast.error(message);
        }
    },
}));

export default useStore;