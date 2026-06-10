'use client'
import { useState } from 'react'

export default function ComingSoon() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    setLoading(true)
    await fetch('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        source: 'coming-soon',
        marketing_consent: true,
        communication_consent: true,
      }),
    })
    setSubmitted(true)
    setLoading(false)
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f0f14 0%, #1e1e3a 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
    }}>
      <div style={{ maxWidth: 520, width: '100%', textAlign: 'center' }}>

        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 48 }}>
          <div style={{
            width: 40, height: 40, borderRadius: 10,
            background: 'var(--color-electric)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <span style={{ color: 'white', fontWeight: 900, fontSize: 20 }}>S</span>
          </div>
          <span style={{ fontWeight: 800, fontSize: '1.4rem', color: 'white', letterSpacing: '-0.02em' }}>
            seen<span style={{ color: '#7c7ce8' }}>testing</span>
          </span>
        </div>

        {/* Badge */}
        <div style={{
          display: 'inline-flex', alignItems: 'center',
          background: 'rgba(91,91,214,0.2)', border: '1px solid rgba(91,91,214,0.4)',
          borderRadius: 999, padding: '6px 16px', marginBottom: 32,
        }}>
          <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#a5a5f5', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
            Coming soon
          </span>
        </div>

        <h1 style={{
          color: 'white', fontWeight: 800,
          fontSize: 'clamp(2rem, 5vw, 3rem)',
          letterSpacing: '-0.03em', lineHeight: 1.1,
          marginBottom: 20,
        }}>
          Find the fertility test<br />
          <span style={{ color: '#7c7ce8' }}>that's right for you.</span>
        </h1>

        <p style={{
          color: 'rgba(255,255,255,0.65)',
          fontSize: '1.05rem', lineHeight: 1.7,
          marginBottom: 48, maxWidth: 400, margin: '0 auto 48px',
        }}>
          We're building the UK's most complete fertility testing directory — for women, men, and couples. At home or in clinic.
        </p>

        {!submitted ? (
          <form onSubmit={handleSubmit} style={{ display: 'flex', gap: 10, maxWidth: 420, margin: '0 auto' }}>
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              style={{
                flex: 1, padding: '14px 18px',
                borderRadius: 12, border: '1.5px solid rgba(255,255,255,0.15)',
                background: 'rgba(255,255,255,0.08)',
                color: 'white', fontSize: '1rem', outline: 'none',
              }}
            />
            <button
              type="submit"
              disabled={loading}
              style={{
                background: 'var(--color-electric)',
                color: 'white', fontWeight: 700,
                padding: '14px 24px', borderRadius: 12,
                border: 'none', cursor: 'pointer',
                fontSize: '1rem', whiteSpace: 'nowrap',
                opacity: loading ? 0.7 : 1,
              }}
            >
              {loading ? '...' : 'Notify me'}
            </button>
          </form>
        ) : (
          <div style={{
            background: 'rgba(26,179,148,0.15)',
            border: '1px solid rgba(26,179,148,0.4)',
            borderRadius: 12, padding: '20px 32px',
            maxWidth: 420, margin: '0 auto',
          }}>
            <p style={{ color: '#1ab394', fontWeight: 700, margin: 0, fontSize: '1.05rem' }}>
              ✓ You're on the list!
            </p>
            <p style={{ color: 'rgba(255,255,255,0.6)', margin: '6px 0 0', fontSize: '0.9rem' }}>
              We'll email you the moment we launch.
            </p>
          </div>
        )}

        <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.8rem', marginTop: 48 }}>
          <a href="https://seenfertility.com/resources" target="_blank" style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.8rem' }}>Fertility resources →</a>
        </p>
      </div>
    </div>
  )
}
