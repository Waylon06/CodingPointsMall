import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://kumanxuan1.f3322.net:8881/cms',
    timeout: 4000
})

instance.interceptors.request.use(config => {
    if (sessionStorage.getItem("token") != null) {
        config.headers['x-auth-token'] = sessionStorage.getItem("token")
    }
    return config;
}, error => {
    return error
})

instance.interceptors.response.use(
    response => {
        return response.data;
    },
    error => {
        return error;
    }
)

export default instance
//移除拦截器
// export let removeMyInterceptor = () => {
//     instance.interceptors.response.eject(myInterceptor)
// }

