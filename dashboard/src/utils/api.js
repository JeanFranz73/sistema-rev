import axios from 'axios'

const api = axios.create({
    baseURL: `http://${location.hostname}:8000`,
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

const patch = (endpoint, content) => {
    return api.patch(endpoint, content)
}

const get = (endpoint) => {
    return api.get(endpoint)
}

export default {
    setBearerToken,
    post,
    patch,
    get
}