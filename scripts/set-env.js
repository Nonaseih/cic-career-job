// Sets Vercel env vars via API — no shell newline issues
const https = require('https')

const VERCEL_TOKEN = process.env.VERCEL_TOKEN
const PROJECT_ID   = process.env.VERCEL_PROJECT_ID

if (!VERCEL_TOKEN || !PROJECT_ID) {
  console.error('Usage: VERCEL_TOKEN=xxx VERCEL_PROJECT_ID=yyy node scripts/set-env.js')
  process.exit(1)
}

const VARS = [
  { key: 'NEXT_PUBLIC_SUPABASE_URL',      value: 'https://svajiqotbporknsxeajz.supabase.co' },
  { key: 'NEXT_PUBLIC_SUPABASE_ANON_KEY', value: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN2YWppcW90YnBvcmtuc3hlYWp6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAwNTkzMjksImV4cCI6MjA5NTYzNTMyOX0.ANRB9kSCbfw5XRjebyK6KVaqyNMpwf_aM_AhewqJE7U' },
  { key: 'SUPABASE_SERVICE_ROLE_KEY',      value: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN2YWppcW90YnBvcmtuc3hlYWp6Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MDA1OTMyOSwiZXhwIjoyMDk1NjM1MzI5fQ.m32m4bfaNMWTOzKTGgxVjCjsSVR4Qc90e02JIccafSk' },
  { key: 'RESEND_API_KEY',                value: 're_8n5ZQLNx_KA8b8RQ2atBg5bufe4zkm96H' },
  { key: 'CA_NOTIFICATION_EMAIL',         value: 'Nonasiehcode@gmail.com' },
]

function request(method, path, body) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify(body)
    const req = https.request({
      hostname: 'api.vercel.com',
      path,
      method,
      headers: {
        Authorization: `Bearer ${VERCEL_TOKEN}`,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data),
      },
    }, res => {
      let out = ''
      res.on('data', c => out += c)
      res.on('end', () => resolve({ status: res.statusCode, body: JSON.parse(out) }))
    })
    req.on('error', reject)
    req.write(data)
    req.end()
  })
}

async function main() {
  for (const { key, value } of VARS) {
    // Delete existing first
    await request('DELETE', `/v10/projects/${PROJECT_ID}/env/${key}?target=production`, {})
      .catch(() => {})

    const res = await request('POST', `/v10/projects/${PROJECT_ID}/env`, {
      key,
      value,
      type: 'encrypted',
      target: ['production'],
    })

    if (res.status === 200 || res.status === 201) {
      console.log(`✓ ${key}`)
    } else {
      console.error(`✗ ${key}:`, JSON.stringify(res.body?.error ?? res.body))
    }
  }
  console.log('\nDone — redeploy for changes to take effect.')
}

main()
