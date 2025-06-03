import { api } from '@/services/api'
import { errorMessages } from '@/utils/next-auth-errors-message'
import { AxiosError } from 'axios'
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { jwtDecode } from 'jwt-decode'

const handler = NextAuth({
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text', placeholder: 'jsmith' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        try {
          const res = await api.post('/sessions', {
            email: credentials?.email,
            password: credentials?.password,
          })

          const user = res.data

          if (user?.access_token) {
            return {
              ...user,
              email: credentials?.email,
            }
          }

          return null
        } catch (err) {
          const error = err as AxiosError<{ statusCode: number }>

          const statusCode = error.response?.data?.statusCode

          const message =
            errorMessages[statusCode ?? 'default'] ?? errorMessages.default

          throw new Error(message)
        }
      },
    }),
  ],

  callbacks: {
    jwt({ user, token }) {
      if (user?.access_token) {
        const decodedToken = jwtDecode<{ sub: string }>(user.access_token)

        token.accessToken = user.access_token
        token.email = user.email
        token.isFirstLogin = user.is_first_login
        token.id = decodedToken.sub
      }

      return token
    },
    session({ session, token }) {
      if (session?.user) {
        session.user.accessToken = token.accessToken
        session.user.email = token.email
        session.user.id = token.id
        session.user.isFirstLogin = token.isFirstLogin
      }

      return session
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/login',
  },
})

export { handler as GET, handler as POST }
