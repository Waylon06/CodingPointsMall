import axios from "./axios.js";
import qs from 'qs'

export const getJPDataAPI = () => axios.get('/products/recommend');

export const getHotDataAPI = () => axios.get('/products/hot');

export const getProductDetailAPI = (id) => axios.get('/products/' + id)

export const getAllGoodsAPI = (params) => axios.get('/products', { params })

export const sendSMSAPI = (phone) => axios.post('/sendSMS', qs.stringify(phone))

export const phoneReginAPI = (params) => axios.post('/phoneRegin', qs.stringify(params))

export const getUserInfoAPI = () => axios.get('/shop/userProfiles')

export const addToCartAPI = (params) => axios.post('/shop/carts/add', qs.stringify(params))
