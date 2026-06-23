import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import { isValidAdminAuth, ADMIN_REALM } from '@/lib/adminAuth'

export async function proxy(request: NextRequest) {
  // Admin CSV-import area: gate behind a shared HTTP Basic Auth credential.
  // This is independent of the Supabase member session — CAs are staff who may
  // not have member accounts, and members must not reach the import tools.
  if (request.nextUrl.pathname.startsWith('/admin')) {
    if (!isValidAdminAuth(request.headers.get('authorization'))) {
      return new NextResponse('Authentication required', {
        status: 401,
        headers: {
          'WWW-Authenticate': `Basic realm="${ADMIN_REALM}", charset="UTF-8"`,
        },
      })
    }
    return NextResponse.next({ request })
  }

  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          )
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Protect job detail pages and mypage (admin is handled above).
  const isProtected =
    request.nextUrl.pathname.startsWith('/jobs/') ||
    request.nextUrl.pathname.startsWith('/mypage')

  if (isProtected && !user) {
    const loginUrl = request.nextUrl.clone()
    loginUrl.pathname = '/login'
    loginUrl.searchParams.set('next', request.nextUrl.pathname)
    return NextResponse.redirect(loginUrl)
  }

  // Redirect logged-in users away from login/register
  if (user && (request.nextUrl.pathname === '/login' || request.nextUrl.pathname === '/register')) {
    const url = request.nextUrl.clone()
    url.pathname = '/mypage'
    return NextResponse.redirect(url)
  }

  return supabaseResponse
}

export const config = {
  matcher: ['/jobs/:path+', '/mypage/:path*', '/admin/:path*', '/login', '/register'],
}
