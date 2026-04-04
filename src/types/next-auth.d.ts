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
      /** true quando a API devolveu `session` no login/troca de senha — obriga /change-password */
      mustChangePassword: boolean
      avatar: string
      roles: string[]
    }
  }

  interface User {
    access_token: string
    email: string
    name: string
    id: string
    session?: unknown
    /** Definido no authorize — não depende do JWT session chegar no callback */
    mustChangePassword?: boolean
    roles?: string[]
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken: string
    email: string
    name: string
    id: string
    mustChangePassword: boolean
    roles?: string[]
  }
}
