import axios from "./axios.js";

export const getJPData = () => axios.get('/products/recommend');

export const getHotData = () => axios.get('/products/hot');

export const getProductDetail = (id) => axios.get('/products/'+id)

export const getAllGoods = () => axios.get('/products')
