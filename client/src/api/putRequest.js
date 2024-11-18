import axios from "axios";

const serverURL = import.meta.env.VITE_SERVER_URL;

const API = axios.create({baseURL: serverURL})

export const updateReq = (id, data, method) => {
    const token = JSON.parse(localStorage.getItem("verification_tokenauthuser"))
    return API.put(`/api/${method}/${id}`, data, { headers: {token, verificationtoken: "ulamYPMnafsAsJJXdSfqjZaSICreybtXN"}});
};

export const likeReq = (id, data) => {
    const token = JSON.parse(localStorage.getItem("verification_tokenauthuser"))
    return API.put(`/api/user/like/${id}`, data, { headers: { token, verificationtoken: "ulamYPMnafsAsJJXdSfqjZaSICreybtXN"}});
}