import { api } from '@/services/api'
import {
  mustChangePassword,
  nonEmptyString,
  pickSessionFromResponse,
} from '@/utils/auth-session'
import { errorMessages } from '@/utils/next-auth-errors-message'
import { AxiosError } from 'axios'
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { jwtDecode } from 'jwt-decode'

function decodeSub(jwt: string): string {
  try {
    return jwtDecode<{ sub: string }>(jwt).sub
  } catch {
    return ''
  }
}

const handler = NextAuth({
  session: { strategy: 'jwt' },
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

          const body = res.data as Record<string, unknown>
          const user = (body?.result ?? body) as {
            access_token?: string
            session?: unknown
            email?: string
          }

          const sessionJwt = pickSessionFromResponse(res.data)
          const mergedSession =
            sessionJwt ?? (nonEmptyString(user.session) ? user.session : undefined)

          const hasToken = nonEmptyString(user.access_token)
          const needPassword = mustChangePassword(mergedSession)

          if (!hasToken && !needPassword) return null

          return {
            ...user,
            email: credentials?.email,
            access_token: typeof user.access_token === 'string' ? user.access_token : '',
            session: mergedSession,
            mustChangePassword: needPassword,
          } as import('next-auth').User
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
    jwt({ user, token, trigger, session }) {
      if (user) {
        const u = user as {
          access_token?: string
          session?: unknown
          email?: string
          mustChangePassword?: boolean
        }
        const raw = typeof u.access_token === 'string' ? u.access_token : ''

        token.accessToken = raw
        token.email = u.email ?? token.email

        if (nonEmptyString(raw)) {
          token.id = decodeSub(raw)
        } else if (nonEmptyString(u.session)) {
          token.id = decodeSub(u.session as string)
        } else {
          token.id = token.id ?? ''
        }

        token.mustChangePassword =
          typeof u.mustChangePassword === 'boolean'
            ? u.mustChangePassword
            : mustChangePassword(u.session)
      }

      if (trigger === 'update' && session) {
        const patch = session as {
          accessToken?: string
          apiSession?: unknown
        }
        if (patch.accessToken !== undefined) {
          const next = patch.accessToken
          token.accessToken = next
          if (nonEmptyString(next)) {
            token.id = decodeSub(next)
          }
          token.mustChangePassword =
            patch.apiSession !== undefined
              ? mustChangePassword(patch.apiSession)
              : false
        } else if (patch.apiSession !== undefined) {
          token.mustChangePassword = mustChangePassword(patch.apiSession)
        }
      }

      return token
    },
    session({ session, token }) {
      if (session?.user) {
        session.user.accessToken = token.accessToken
        session.user.email = token.email
        session.user.id = token.id
        session.user.mustChangePassword = Boolean(token.mustChangePassword)
      }
      return session
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: { signIn: '/login' },
})

export { handler as GET, handler as POST }
