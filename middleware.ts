import { getToken } from 'next-auth/jwt'
import { NextResponse, type NextRequest } from 'next/server'

function isStaticAsset(pathname: string) {
  return /\.(ico|png|jpg|jpeg|svg|gif|webp|woff2?|ttf|eot)$/i.test(pathname)
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname === '/favicon.ico' ||
    isStaticAsset(pathname)
  ) {
    const response = NextResponse.next()

    response.headers.set('X-Frame-Options', 'DENY')
    response.headers.set('X-Content-Type-Options', 'nosniff')

    return response
  }

  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
    secureCookie: process.env.NODE_ENV === 'production',
  })

  const isAuthenticated = Boolean(token)
  const mpc = (token as Record<string, unknown> | null)?.mustChangePassword
  const mustChangePassword = mpc === true || mpc === 'true'

  if (!isAuthenticated) {
    if (pathname === '/login') {
      return NextResponse.next()
    }
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('callbackUrl', pathname)
    return NextResponse.redirect(loginUrl)
  }

  if (mustChangePassword) {
    if (pathname === '/change-password') {
      return NextResponse.next()
    }
    if (pathname === '/login') {
      return NextResponse.redirect(new URL('/change-password', request.url))
    }
    return NextResponse.redirect(new URL('/change-password', request.url))
  }

  if (pathname === '/change-password') {
    return NextResponse.redirect(new URL('/', request.url))
  }

  if (pathname === '/login') {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
