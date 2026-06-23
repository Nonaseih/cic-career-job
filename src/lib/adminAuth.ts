// Shared HTTP Basic Auth check for the admin CSV-import area.
//
// CAs are staff and may not hold a member (Supabase) account, so admin access
// is gated by a shared credential rather than the member session. This helper
// is used both in `src/proxy.ts` (to gate page + asset requests) and inside the
// CSV-import Server Actions themselves, per the Next.js guidance that auth must
// be verified inside each Server Function and not rely on Proxy alone.

export const ADMIN_REALM = 'CIC Career Admin'

// Length-independent comparison to avoid leaking the credential via timing.
function safeEqual(a: string, b: string): boolean {
  let mismatch = a.length ^ b.length
  const len = Math.max(a.length, b.length)
  for (let i = 0; i < len; i++) {
    mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i)
  }
  return mismatch === 0
}

/**
 * Validate an `Authorization` header value against the configured admin
 * credentials. Returns false (fail-closed) when no password is configured or
 * the header is missing/malformed.
 */
export function isValidAdminAuth(authHeader: string | null): boolean {
  const expectedPassword = process.env.ADMIN_PASSWORD
  if (!expectedPassword) return false // fail closed if unconfigured
  if (!authHeader || !authHeader.startsWith('Basic ')) return false

  let decoded: string
  try {
    decoded = Buffer.from(authHeader.slice(6), 'base64').toString('utf-8')
  } catch {
    return false
  }

  const sep = decoded.indexOf(':')
  if (sep === -1) return false

  const user = decoded.slice(0, sep)
  const password = decoded.slice(sep + 1)
  const expectedUser = process.env.ADMIN_USER || 'admin'

  // Evaluate both before returning to avoid short-circuit timing differences.
  const userOk = safeEqual(user, expectedUser)
  const passOk = safeEqual(password, expectedPassword)
  return userOk && passOk
}

export function adminChallenge(): Response {
  return new Response('Authentication required', {
    status: 401,
    headers: {
      'WWW-Authenticate': `Basic realm="${ADMIN_REALM}", charset="UTF-8"`,
    },
  })
}
