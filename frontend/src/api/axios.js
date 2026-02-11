import axios from "axios"

const api = axios.create({
    baseURL: "/api",
    withCredentials: true,
});

export default api;


// To make the link dynamic this method will be the best for me
// const api = axios.create({
//    baseURL: import.meta.mode === "development" ? "http://localhost:6060" : "/api",
//    withCredentials: true,
// });