import {create} from "zustand"
import {toast} from "react-hot-toast"
import axios from "../api/axios.js"
// psalm 85:7, hebrews 4:16,psalm 102:13


export default create((set,get)=>({
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
            const res = await axios.post("/auth/login", {password, email});
            set({user: res.data, loading: false});
            toast.success("Logged in successfully");
        }catch(error){
            set({loading: false});
            toast.error(error.response.data.error || "An error occurred");
        }
    }
}))
