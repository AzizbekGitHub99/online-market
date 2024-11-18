import axios from "axios"

const serverUrl = import.meta.env.VITE_SERVER_URL

const API = axios.create({baseURL: serverUrl})

export const getReq = (method) => API.get(`/api/${method}`, {headers: {verificationtoken: "ulamYPMnafsAsJJXdSfqjZaSICreybtXN"}}); 
export const getOneReq = (id, method) => API.get(`/api/${method}/${id}`, {headers: {verificationtoken: "ulamYPMnafsAsJJXdSfqjZaSICreybtXN"}}); 
export const getSimilar = (method, name) => API.get(`/api/${method}s/similar?name=${name}`, {headers: {verificationtoken: "ulamYPMnafsAsJJXdSfqjZaSICreybtXN"}}); 
export const getLocation = (name) => API.get(`/api/cars/location?name=${name}`, {headers: {verificationtoken: "ulamYPMnafsAsJJXdSfqjZaSICreybtXN"}}); 