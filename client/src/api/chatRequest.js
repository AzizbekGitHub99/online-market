import axios from "axios"


const serverURL = import.meta.env.VITE_SERVER_URL

const API = axios.create({baseURL: serverURL});

export const userChats = () => {
    const token = JSON.parse(localStorage.getItem("verification_tokenauthuser"))
    return API.get('/api/chat', {headers: {token, verificationtoken: "ulamYPMnafsAsJJXdSfqjZaSICreybtXN"}})
};

export const findChat = (firstId, secondId) => {
    const token = JSON.parse(localStorage.getItem("verification_tokenauthuser"))
    return API.get(`/api/chat/${firstId}/${secondId}`, {headers: {token, verificationtoken: "ulamYPMnafsAsJJXdSfqjZaSICreybtXN"}})
};

export const deleteChat = (chatId) => {
    const token = JSON.parse(localStorage.getItem("verification_tokenauthuser"))
    return API.delete(`/api/chat/${chatId}`, {headers: {token, verificationtoken: "ulamYPMnafsAsJJXdSfqjZaSICreybtXN"}})
};