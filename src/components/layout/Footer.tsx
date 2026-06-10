import Link from 'next/link'

export default function Footer() {
  return (
    <footer style={{ borderTop: '1.5px solid var(--color-border)', background: 'var(--color-surface-2)', marginTop: 80 }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '48px 24px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 40 }}>
        <div>
          <div style={{ fontWeight: 800, fontSize: '1.1rem', letterSpacing: '-0.02em', marginBottom: 8 }}>
            seen<span style={{ color: 'var(--color-electric)' }}>testing</span>
          </div>
          <p style={{ color: 'var(--color-ink-soft)', fontSize: '0.875rem', lineHeight: 1.6, maxWidth: 240 }}>
            Find the right fertility test for you — at home or in clinic, for women, men, and couples across the UK.
          </p>
        </div>

        <div>
          <p style={{ fontWeight: 700, marginBottom: 16, fontSize: '0.875rem' }}>Explore</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              { label: 'Browse all tests', href: '/browse' },
              { label: 'Take the quiz', href: '/quiz' },
              { label: 'Tests for women', href: '/browse?audience=Female' },
              { label: 'Tests for men', href: '/browse?audience=Male' },
              { label: 'Couples testing', href: '/browse?audience=Couples' },
            ].map(l => (
              <Link key={l.href} href={l.href} style={{ color: 'var(--color-ink-soft)', textDecoration: 'none', fontSize: '0.875rem', fontWeight: 500 }}>
                {l.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <p style={{ fontWeight: 700, marginBottom: 16, fontSize: '0.875rem' }}>Learn</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              { label: 'Fertility resources', href: 'https://seenfertility.com/resources' },
              { label: 'What is AMH?', href: 'https://seenfertility.com/resources' },
              { label: 'Male fertility basics', href: 'https://seenfertility.com/resources' },
              { label: 'Understanding semen analysis', href: 'https://seenfertility.com/resources' },
            ].map(l => (
              <a key={l.href} href={l.href} target="_blank" style={{ color: 'var(--color-ink-soft)', textDecoration: 'none', fontSize: '0.875rem', fontWeight: 500 }}>
                {l.label}
              </a>
            ))}
          </div>
        </div>

        <div>
          <p style={{ fontWeight: 700, marginBottom: 16, fontSize: '0.875rem' }}>Legal</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              { label: 'Privacy policy', href: '/privacy' },
              { label: 'Terms of use', href: '/terms' },
              { label: 'Cookie policy', href: '/cookies' },
            ].map(l => (
              <Link key={l.href} href={l.href} style={{ color: 'var(--color-ink-soft)', textDecoration: 'none', fontSize: '0.875rem', fontWeight: 500 }}>
                {l.label}
              </Link>
            ))}
          </div>
          <p style={{ color: 'var(--color-ink-soft)', fontSize: '0.75rem', marginTop: 24, lineHeight: 1.5 }}>
            Seen Testing is not a medical provider. Content is for informational purposes only. Always consult a healthcare professional.
          </p>
        </div>
      </div>

      <div style={{ borderTop: '1px solid var(--color-border)', padding: '20px 24px', textAlign: 'center' }}>
        <p style={{ color: 'var(--color-ink-soft)', fontSize: '0.8rem' }}>
          © {new Date().getFullYear()} Seen Testing Ltd. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
