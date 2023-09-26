import axios from 'axios'
import { debugApi } from '@/utils/debug'

const api = axios.create({
    baseURL: `http://localhost:8000`,
    'Content-Type': 'application/json',
    Accept: 'application/json',
    timeout: 5000
})

const setBearerToken = (token) => {
    api.defaults.headers.Authorization = `Bearer ${token}`
}

const post = (endpoint, content) => {
    return api.post(endpoint, content)
}

const get = (endpoint) => {
    return api.get(endpoint)
}

export default {
    setBearerToken,
    post,
    get
}