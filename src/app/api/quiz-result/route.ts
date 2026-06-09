import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { TestingOption } from '@/types'

export async function POST(req: NextRequest) {
  try {
    const { email, firstName, results, answers } = await req.json()

    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json({ ok: true, skipped: 'no resend key' })
    }

    const resend = new Resend(process.env.RESEND_API_KEY)

    const resultRows = results.slice(0, 6).map((r: TestingOption, i: number) => `
      <tr style="border-bottom: 1px solid #e2e2ea;">
        <td style="padding: 16px 0; font-weight: 700; color: #5b5bd6;">#${i + 1}</td>
        <td style="padding: 16px 12px;">
          <strong>${r.product}</strong><br>
          <span style="color: #3d3d4a; font-size: 13px;">${r.provider}</span>
        </td>
        <td style="padding: 16px 12px; font-size: 13px; color: #3d3d4a;">${r.headlinePrice}</td>
        <td style="padding: 16px 12px; font-size: 13px; color: #3d3d4a;">${r.turnaround}</td>
        <td style="padding: 16px 0; font-size: 13px;">
          <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'https://seentesting.com'}/test/${r.id}" style="color: #5b5bd6; font-weight: 700;">View →</a>
        </td>
      </tr>
    `).join('')

    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'hello@seentesting.com',
      to: email,
      subject: `${firstName ? `${firstName}, your` : 'Your'} fertility test matches from Seen Testing`,
      html: `
        <!DOCTYPE html>
        <html>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #f6f6f9; margin: 0; padding: 40px 0;">
          <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.06);">

            <!-- Header -->
            <div style="background: linear-gradient(135deg, #0f0f14 0%, #1e1e3a 100%); padding: 40px 40px 32px; text-align: center;">
              <p style="color: white; font-weight: 800; font-size: 20px; margin: 0 0 4px; letter-spacing: -0.02em;">
                seen<span style="color: #7c7ce8;">testing</span>
              </p>
              <h1 style="color: white; font-size: 26px; font-weight: 800; margin: 16px 0 8px; letter-spacing: -0.02em;">
                ${firstName ? `${firstName}, here are` : 'Here are'} your matches 🎯
              </h1>
              <p style="color: rgba(255,255,255,0.7); margin: 0; font-size: 15px;">
                Based on your quiz — ranked for you
              </p>
            </div>

            <!-- Quiz summary -->
            <div style="padding: 24px 40px; background: #ededfc; border-bottom: 1px solid #e2e2ea;">
              <p style="margin: 0; font-size: 13px; font-weight: 700; color: #3d3dbf; text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 12px;">Your preferences</p>
              <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                ${[answers.audience, answers.setting, answers.priority?.replace(/-/g, ' ')].filter(Boolean).map(a =>
                  `<span style="background: white; color: #3d3dbf; padding: 4px 12px; border-radius: 999px; font-size: 13px; font-weight: 600;">${a}</span>`
                ).join('')}
              </div>
            </div>

            <!-- Results -->
            <div style="padding: 32px 40px;">
              <h2 style="font-size: 18px; font-weight: 700; margin: 0 0 20px;">Your top matches</h2>
              <table style="width: 100%; border-collapse: collapse;">
                <thead>
                  <tr style="border-bottom: 2px solid #e2e2ea;">
                    <th style="text-align: left; padding: 0 0 12px; font-size: 12px; color: #3d3d4a; text-transform: uppercase; letter-spacing: 0.06em;">#</th>
                    <th style="text-align: left; padding: 0 12px 12px; font-size: 12px; color: #3d3d4a; text-transform: uppercase; letter-spacing: 0.06em;">Test</th>
                    <th style="text-align: left; padding: 0 12px 12px; font-size: 12px; color: #3d3d4a; text-transform: uppercase; letter-spacing: 0.06em;">Price</th>
                    <th style="text-align: left; padding: 0 12px 12px; font-size: 12px; color: #3d3d4a; text-transform: uppercase; letter-spacing: 0.06em;">Turnaround</th>
                    <th style="text-align: left; padding: 0 0 12px; font-size: 12px; color: #3d3d4a; text-transform: uppercase; letter-spacing: 0.06em;">Link</th>
                  </tr>
                </thead>
                <tbody>${resultRows}</tbody>
              </table>
            </div>

            <!-- CTA -->
            <div style="padding: 0 40px 40px; text-align: center;">
              <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'https://seentesting.com'}/browse"
                 style="display: inline-block; background: #5b5bd6; color: white; font-weight: 700; padding: 14px 28px; border-radius: 12px; text-decoration: none; font-size: 15px;">
                Browse all tests →
              </a>
              <p style="color: #3d3d4a; font-size: 13px; margin-top: 20px; line-height: 1.6;">
                Want to learn more about fertility testing before you decide?<br>
                <a href="https://seenfertility.com/resources" style="color: #5b5bd6; font-weight: 600;">Visit Seen Fertility's resource hub →</a>
              </p>
            </div>

            <!-- Footer -->
            <div style="background: #f6f6f9; padding: 24px 40px; text-align: center; border-top: 1px solid #e2e2ea;">
              <p style="font-size: 12px; color: #3d3d4a; margin: 0; line-height: 1.6;">
                Seen Testing is not a medical provider. Content is for informational purposes only.<br>
                <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'https://seentesting.com'}/privacy" style="color: #5b5bd6;">Privacy policy</a> ·
                <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'https://seentesting.com'}/unsubscribe?email=${encodeURIComponent(email)}" style="color: #5b5bd6;">Unsubscribe</a>
              </p>
              <p style="font-size: 12px; color: #3d3d4a; margin: 8px 0 0;">
                © ${new Date().getFullYear()} Seen Fertility Ltd
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
    })

    return NextResponse.json({ ok: true })
  } catch (e) {
    console.error('Email send error:', e)
    // Don't fail the user experience for email errors
    return NextResponse.json({ ok: true, warning: 'email failed silently' })
  }
}
