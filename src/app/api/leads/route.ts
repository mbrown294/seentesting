import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function POST(req: NextRequest) {
  const body = await req.json()

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!url || !key) {
    return NextResponse.json({ error: 'Missing env vars', url: !!url, key: !!key }, { status: 500 })
  }

  const supabase = createClient(url, key)

  const { error, data } = await supabase.from('leads').upsert({
    email: body.email,
    first_name: body.first_name || null,
    audience: body.audience || null,
    setting: body.setting || null,
    priority: body.priority || null,
    goal: body.goal || null,
    location: body.location || null,
    marketing_consent: body.marketing_consent ?? false,
    communication_consent: body.communication_consent ?? false,
    top_match_id: body.top_match_id || null,
    quiz_completed_at: new Date().toISOString(),
    source: 'quiz',
  }, { onConflict: 'email' }).select()

  if (error) {
    return NextResponse.json({ error: error.message, code: error.code, details: error.details }, { status: 500 })
  }

  return NextResponse.json({ ok: true, data })
}
