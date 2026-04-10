import axios from 'axios'
import { getSession, signOut } from 'next-auth/react'

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

api.interceptors.request.use(async (config) => {
  const session = await getSession()
  const accessToken = session?.user.accessToken

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`
  }

  return config
})

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const status = error.response?.status
    const requestUrl = String(error.config?.url ?? '')
    const isChangePasswordFailure =
      status === 401 && requestUrl.includes('change-password')

    if (status === 401 && !isChangePasswordFailure) {
      console.error('[API] Unauthorized access detected, signing out...')
      if (typeof window !== 'undefined') {
        const isLoginPage = window.location.pathname === '/login'
        if (!isLoginPage) {
          await signOut({ redirect: true, callbackUrl: '/login' })
        }
      }
    }
    return Promise.reject(error)
  }
)

export { api }
