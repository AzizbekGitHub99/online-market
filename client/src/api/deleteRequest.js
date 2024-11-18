import axios from "axios";

const serverURL = import.meta.env.VITE_SERVER_URL;

const API = axios.create({baseURL: serverURL})

export const deleteReq = (id, method) => {
    const token = JSON.parse(localStorage.getItem("verification_tokenauthuser"))
    return API.delete(`/api/${method}/${id}`, { headers: { token, verificationtoken: "ulamYPMnafsAsJJXdSfqjZaSICreybtXN"} });
};

export const deleteUser = (id) => {
    const token = JSON.parse(localStorage.getItem("verification_tokenauthuser"))
    return API.delete(`/api/user/${id}`, { headers: { token, verificationtoken: "ulamYPMnafsAsJJXdSfqjZaSICreybtXN"} });
};