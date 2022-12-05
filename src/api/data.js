import axios from "./axios.js";

export const getJPData = () => axios.get('/products/recommend');

export const getHotData = () => axios.get('/products/hot');

export const getProductDetail = (id) => axios.get('/products/' + id)

export const getAllGoods = (params) => axios.get('/products', { params })

export const sendSMS = (phone) => axios.post('/sendSMS', {phone})

export const phoneRegin = (params) => axios.post('/phoneRegin', { params })
