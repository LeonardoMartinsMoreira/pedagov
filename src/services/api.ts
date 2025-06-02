import axios from 'axios'

const api = axios.create({
  baseURL: 'https://pedagov-back.onrender.com/',
  timeout: 60000,
})

export { api }
