import axios from 'axios';

const api = axios.create({
    baseURL: 'http://192.168.1.102:3003'
})

export default api;