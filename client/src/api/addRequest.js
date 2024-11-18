import axios from "axios";

const serverURL = import.meta.env.VITE_SERVER_URL;

const API = axios.create({baseURL: serverURL})

export const addReq = (data, method) => {
    const token = JSON.parse(localStorage.getItem("verification_tokenauthuser"))
    return API.post(`/api/${method}`, data, {headers: {token, verificationtoken: "ulamYPMnafsAsJJXdSfqjZaSICreybtXN"}})
};