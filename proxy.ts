import createMiddleware from 'next-intl/middleware'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { routing } from './i18n/routing'

const intlMiddleware = createMiddleware(routing)

const locales = ['ru', 'en', 'uz'] as const
const defaultLocale = 'ru'

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const token = request.cookies.get('token')?.value

  // Root path → always go to login first
  if (pathname === '/') {
    return NextResponse.redirect(
      new URL(`/${defaultLocale}/login`, request.url)
    )
  }

  // Find locale prefix in the path
  const currentLocale =
    locales.find(
      (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`)
    ) ?? null

  // No locale prefix → let intl middleware add it
  if (!currentLocale) {
    return intlMiddleware(request)
  }

  const pathWithoutLocale =
    pathname === `/${currentLocale}`
      ? '/'
      : pathname.slice(`/${currentLocale}`.length)

  const isAuthPage =
    pathWithoutLocale.startsWith('/login') ||
    pathWithoutLocale.startsWith('/register')

  // No token on a protected page → redirect to login
  if (!token && !isAuthPage) {
    return NextResponse.redirect(
      new URL(`/${currentLocale}/login`, request.url)
    )
  }

  // All other cases → let intl middleware handle (sets requestLocale for translations)
  return intlMiddleware(request)
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)'],
}
