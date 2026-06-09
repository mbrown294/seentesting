'use client'
import Link from 'next/link'
import { useState } from 'react'

export default function Nav() {
  const [open, setOpen] = useState(false)

  return (
    <nav style={{
      position: 'sticky', top: 0, zIndex: 100,
      background: 'rgba(255,255,255,0.92)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1.5px solid var(--color-border)',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>
        {/* Logo */}
        <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{
            width: 32, height: 32, borderRadius: 8,
            background: 'var(--color-electric)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <span style={{ color: 'white', fontWeight: 900, fontSize: 16 }}>S</span>
          </div>
          <span style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--color-ink)', letterSpacing: '-0.02em' }}>
            seen<span style={{ color: 'var(--color-electric)' }}>testing</span>
          </span>
        </Link>

        {/* Desktop links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 32 }} className="desktop-nav">
          <Link href="/browse" style={{ color: 'var(--color-ink-soft)', fontWeight: 600, textDecoration: 'none', fontSize: '0.95rem' }}>
            Browse tests
          </Link>
          <Link href="/quiz" style={{ color: 'var(--color-ink-soft)', fontWeight: 600, textDecoration: 'none', fontSize: '0.95rem' }}>
            Find my match
          </Link>
          <Link href="https://seenfertility.com/resources" target="_blank" style={{ color: 'var(--color-ink-soft)', fontWeight: 600, textDecoration: 'none', fontSize: '0.95rem' }}>
            Learn
          </Link>
        </div>

        <Link href="/quiz" className="btn-primary" style={{ padding: '10px 20px', fontSize: '0.9rem' }}>
          Take the quiz →
        </Link>
      </div>
    </nav>
  )
}
