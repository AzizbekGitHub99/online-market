import axios from "axios";

const serverURL = import.meta.env.VITE_SERVER_URL;

const API = axios.create({baseURL: serverURL})

export const sendVerication = (data) => {
    return API.post(`/api/auth/verification`, data, {headers: {verificationtoken: "ulamYPMnafsAsJJXdSfqjZaSICreybtXN"}})
};

export const signUp = (formData) => API.post(`/api/auth/signup`, formData, {headers: {verificationtoken: "ulamYPMnafsAsJJXdSfqjZaSICreybtXN"}})

export const login = (formData) => API.post(`/api/auth/login`, formData, {headers: {verificationtoken: "ulamYPMnafsAsJJXdSfqjZaSICreybtXN"}})

export const googleAuth = (formData) => API.post(`/api/auth/googleAuth`, formData, {headers: {verificationtoken: "ulamYPMnafsAsJJXdSfqjZaSICreybtXN"}})