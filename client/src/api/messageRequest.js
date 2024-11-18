import axios from "axios"


const serverURL = import.meta.env.VITE_SERVER_URL

const API = axios.create({baseURL: serverURL});

export const addMessage = (data) => {
    const token = JSON.parse(localStorage.getItem("verification_tokenauthuser"))
    return API.post('/api/message', data, {headers: {token, verificationtoken: "ulamYPMnafsAsJJXdSfqjZaSICreybtXN"}})
};

export const getMessage = (chatId) => {
    const token = JSON.parse(localStorage.getItem("verification_tokenauthuser"))
    return API.get(`/api/message/${chatId}`, {headers: {token, verificationtoken: "ulamYPMnafsAsJJXdSfqjZaSICreybtXN"}})
};

export const updateMessage = (messageId, data) => {
    const token = JSON.parse(localStorage.getItem("verification_tokenauthuser"))
    return API.put(`/api/message/${messageId}`, data, {headers: {token, verificationtoken: "ulamYPMnafsAsJJXdSfqjZaSICreybtXN"}})
};

export const deleteMessage = (messageId) => {
    const token = JSON.parse(localStorage.getItem("verification_tokenauthuser"))
    return API.delete(`/api/message/${messageId}`, {headers: {token, verificationtoken: "ulamYPMnafsAsJJXdSfqjZaSICreybtXN"}})
};