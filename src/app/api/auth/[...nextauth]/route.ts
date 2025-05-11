import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

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
      async authorize(credentials) {
        if (
          credentials?.password === '12345678' &&
          credentials.email === 'leo@gmail.com'
        ) {
          const user = { id: '1', name: 'Leonardo', email: 'leo@example.com' }

          return user
        }

        throw new Error('Usuário ou senha incorretos')
      },
    }),
  ],
  callbacks: {
    jwt({ user, token }) {
      if (user) {
        token.id = user.id
        token.email = user.email
        token.name = user.name
      }

      return token
    },
    session({ session, token }) {
      if (session.user) {
        session.user.name = token.name
        session.user.email = token.email
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
