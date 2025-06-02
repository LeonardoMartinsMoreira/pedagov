/* eslint-disable @typescript-eslint/no-unused-vars */
import NextAuth, { DefaultSession } from 'next-auth'
import { JWT } from 'next-auth/jwt'

declare module 'next-auth' {
  interface Session {
    user: {
      access_token: string
      email: string
      name: string
      id: string
    }
  }

  interface User {
    access_token: string
    email: string
    name: string
    id: string
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    access_token: string
    email: string
    name: string
    id: string
  }
}
