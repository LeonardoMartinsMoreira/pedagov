/* eslint-disable @typescript-eslint/no-unused-vars */
import NextAuth, { DefaultSession } from 'next-auth'
import { JWT } from 'next-auth/jwt'

declare module 'next-auth' {
  interface Session {
    user: {
      accessToken: string
      email: string
      name: string
      id: string
      isFirstLogin: boolean
    }
  }

  interface User {
    access_token: string
    email: string
    name: string
    id: string
    is_first_login: boolean
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken: string
    email: string
    name: string
    id: string
    isFirstLogin: boolean
  }
}
