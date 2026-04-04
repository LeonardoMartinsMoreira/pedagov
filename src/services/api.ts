import axios from 'axios'
import { getSession } from 'next-auth/react'

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  paramsSerializer: {
    indexes: null,
  },
})

if (typeof window !== 'undefined') {
  console.log('[API] Initializing with baseURL:', process.env.NEXT_PUBLIC_API_URL)
}

api.interceptors.request.use(async (config) => {
  const session = await getSession()
  const accessToken = session?.user.accessToken

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`
  } else {
    console.warn('[API] Request without accessToken to:', config.url)
  }

  return config
})

export { api }
