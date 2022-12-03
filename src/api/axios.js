import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://kumanxuan1.f3322.net:8881/cms',
    timeout: 4000
})

instance.interceptors.response.use(
    response=> {
return response.data.data;
},
error => {
    return error;
}
)

export default instance