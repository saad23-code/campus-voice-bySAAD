import { supabase } from '../../../lib/supabase'
import { NextResponse } from 'next/server'

// 1. Force Next.js to treat this as a dynamic route
export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET(request) {
  try {
    // 2. Add a unique timestamp to the query to bypass Supabase's own internal caching if any
    const { data, error } = await supabase
      .from('issues')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error

    // 3. Return response with "No-Cache" headers for the browser
    return new NextResponse(JSON.stringify({ issues: data }), {
      status: 200,
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
    })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}