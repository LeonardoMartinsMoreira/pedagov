import axios from 'axios'

const api = axios.create({
  baseURL: 'https://pedagov-back.onrender.com/',
  timeout: 30000,
})

export { api }
