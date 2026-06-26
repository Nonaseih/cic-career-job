import { cache } from 'react'
import { unstable_cache } from 'next/cache'
import { createClient as createSupabaseJsClient } from '@supabase/supabase-js'
import { createClient } from './server'
import type { Job } from '@/lib/types'

/**
 * The current authenticated user, deduped within a single server render via
 * React `cache()`. The Header and the page both need it, but only one Supabase
 * auth round-trip is made per request instead of two or three.
 */
export const getCurrentUser = cache(async () => {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  return user
})

/** Cookieless anon client — safe to use inside `unstable_cache`. */
function publicClient() {
  return createSupabaseJsClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { auth: { persistSession: false, autoRefreshToken: false } }
  )
}

/**
 * Newest published jobs, cached cross-request. Jobs change ~weekly via the CSV
 * importer, which busts this with `revalidateTag('jobs')`; the 5-minute window
 * is a safety net.
 */
export const getNewestJobs = unstable_cache(
  async (limit: number): Promise<Job[]> => {
    const sb = publicClient()
    const { data } = await sb
      .from('jobs')
      .select('*')
      .eq('is_published', true)
      .order('created_at', { ascending: false })
      .limit(limit)
    return (data as Job[]) ?? []
  },
  ['newest-jobs'],
  { revalidate: 300, tags: ['jobs'] }
)

/**
 * Pickup jobs for the registration marquee: kintone-flagged jobs first, else
 * recent salaried jobs so 年収 stays prominent. Cached like the job list.
 */
export const getPickupJobs = unstable_cache(
  async (limit: number): Promise<Job[]> => {
    const sb = publicClient()
    const flagged = await sb
      .from('jobs')
      .select('*')
      .eq('is_published', true)
      .eq('is_pickup', true)
      .order('created_at', { ascending: false })
      .limit(limit)
    if (flagged.data && flagged.data.length > 0) return flagged.data as Job[]

    const salaried = await sb
      .from('jobs')
      .select('*')
      .eq('is_published', true)
      .not('salary_min', 'is', null)
      .order('created_at', { ascending: false })
      .limit(limit)
    return (salaried.data as Job[]) ?? []
  },
  ['pickup-jobs'],
  { revalidate: 300, tags: ['jobs'] }
)
