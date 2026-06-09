import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    const { error } = await supabase.from('leads').insert({
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
    })

    if (error) {
      // Upsert on duplicate email
      await supabase.from('leads').upsert({
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
      }, { onConflict: 'email' })
    }

    return NextResponse.json({ ok: true })
  } catch (e) {
    console.error('Lead capture error:', e)
    return NextResponse.json({ error: 'Failed to save lead' }, { status: 500 })
  }
}
