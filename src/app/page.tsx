import Link from 'next/link'
import TestCard from '@/components/ui/TestCard'
import { testingOptions } from '@/data/testingOptions'

export default function Home() {
  const featured = testingOptions.slice(0, 3)

  const stats = [
    { value: '19+', label: 'Testing options' },
    { value: '1 in 7', label: 'Couples face fertility challenges' },
    { value: '50%', label: 'Of fertility issues are male-factor' },
    { value: '5 mins', label: 'To find your perfect match' },
  ]

  const audiences = [
    {
      icon: '♀',
      label: 'For women',
      desc: 'Ovarian reserve, hormone panels, ovulation tracking — at home or in clinic.',
      href: '/browse?audience=Female',
      color: '#fce7f3',
      textColor: '#be185d',
    },
    {
      icon: '♂',
      label: 'For men',
      desc: 'Semen analysis, sperm DNA, testosterone and male hormone panels.',
      href: '/browse?audience=Male',
      color: 'var(--color-electric-light)',
      textColor: 'var(--color-electric-dark)',
    },
    {
      icon: '♡',
      label: 'For couples',
      desc: 'Joint assessments and bundles — test together, plan together.',
      href: '/browse?audience=Couples',
      color: 'var(--color-mint-light)',
      textColor: '#0f766e',
    },
  ]

  return (
    <>
      {/* Hero */}
      <section style={{
        background: 'linear-gradient(135deg, #0f0f14 0%, #1e1e3a 100%)',
        color: 'white',
        padding: 'clamp(60px, 10vw, 120px) 24px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Background accent */}
        <div style={{
          position: 'absolute', top: -100, right: -100,
          width: 500, height: 500, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(91,91,214,0.3) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div style={{ maxWidth: 800, margin: '0 auto', position: 'relative' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'rgba(91,91,214,0.2)', border: '1px solid rgba(91,91,214,0.4)',
            borderRadius: 999, padding: '6px 14px', marginBottom: 32,
          }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#a5a5f5', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              UK fertility testing — all in one place
            </span>
          </div>

          <h1 className="heading-xl" style={{ color: 'white', marginBottom: 24 }}>
            Find the fertility test<br />
            <span style={{ color: '#7c7ce8' }}>that's right for you.</span>
          </h1>

          <p style={{ fontSize: 'clamp(1rem, 2vw, 1.25rem)', color: 'rgba(255,255,255,0.7)', lineHeight: 1.7, maxWidth: 600, marginBottom: 48 }}>
            Browse every fertility testing option available in the UK — for women, men, and couples. At home or in clinic. Filter by price, what you want to test, and how fast you need results.
          </p>

          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            <Link href="/quiz" className="btn-primary" style={{ fontSize: '1.05rem', padding: '16px 32px' }}>
              Take the matching quiz →
            </Link>
            <Link href="/browse" className="btn-secondary" style={{ color: 'white', borderColor: 'rgba(255,255,255,0.3)', fontSize: '1.05rem', padding: '16px 32px' }}>
              Browse all tests
            </Link>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section style={{ background: 'var(--color-electric)', color: 'white', padding: '24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
          {stats.map(s => (
            <div key={s.label} style={{ textAlign: 'center' }}>
              <p style={{ fontWeight: 900, fontSize: 'clamp(1.5rem, 3vw, 2rem)', margin: 0 }}>{s.value}</p>
              <p style={{ fontSize: '0.8rem', margin: 0, opacity: 0.8 }}>{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Audience cards */}
      <section style={{ maxWidth: 1200, margin: '80px auto 0', padding: '0 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <h2 className="heading-lg">Testing for everyone</h2>
          <p style={{ color: 'var(--color-ink-soft)', fontSize: '1.05rem', marginTop: 12 }}>
            50% of fertility challenges are male-factor. We take both sides seriously.
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
          {audiences.map(a => (
            <Link key={a.label} href={a.href} style={{ textDecoration: 'none' }}>
              <div className="card" style={{ padding: 32, textAlign: 'center', height: '100%' }}>
                <div style={{
                  width: 64, height: 64, borderRadius: '50%',
                  background: a.color, margin: '0 auto 20px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 28, color: a.textColor,
                }}>
                  {a.icon}
                </div>
                <h3 style={{ fontWeight: 700, fontSize: '1.2rem', marginBottom: 12, color: a.textColor }}>
                  {a.label}
                </h3>
                <p style={{ color: 'var(--color-ink-soft)', lineHeight: 1.6, fontSize: '0.95rem' }}>
                  {a.desc}
                </p>
                <p style={{ color: 'var(--color-electric)', fontWeight: 700, marginTop: 20, fontSize: '0.9rem' }}>
                  Browse options →
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Quiz CTA */}
      <section style={{
        maxWidth: 1200, margin: '80px auto 0', padding: '0 24px',
      }}>
        <div style={{
          background: 'linear-gradient(135deg, var(--color-electric-light) 0%, #fce7f3 100%)',
          borderRadius: 24, padding: 'clamp(40px, 6vw, 72px)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          gap: 40, flexWrap: 'wrap',
        }}>
          <div>
            <h2 className="heading-lg" style={{ marginBottom: 16 }}>Not sure where to start?</h2>
            <p style={{ color: 'var(--color-ink-soft)', fontSize: '1.05rem', maxWidth: 480, lineHeight: 1.7 }}>
              Answer 5 quick questions and we'll match you to the right test — based on your goals, budget, location, and how you want to test.
            </p>
            <div style={{ marginTop: 32 }}>
              <Link href="/quiz" className="btn-primary" style={{ fontSize: '1.05rem' }}>
                Find my match →
              </Link>
            </div>
          </div>
          <div style={{
            background: 'white', borderRadius: 16, padding: 24, minWidth: 220,
            boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
          }}>
            {['Who is this for?', 'At home or in clinic?', 'What matters most?', 'What do you want to learn?', 'Where are you based?'].map((q, i) => (
              <div key={q} style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '10px 0',
                borderBottom: i < 4 ? '1px solid var(--color-border)' : 'none',
              }}>
                <div style={{
                  width: 24, height: 24, borderRadius: '50%',
                  background: 'var(--color-electric)', color: 'white',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '0.7rem', fontWeight: 800, flexShrink: 0,
                }}>
                  {i + 1}
                </div>
                <p style={{ margin: 0, fontSize: '0.85rem', fontWeight: 500 }}>{q}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured tests */}
      <section style={{ maxWidth: 1200, margin: '80px auto 0', padding: '0 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 40, flexWrap: 'wrap', gap: 16 }}>
          <div>
            <h2 className="heading-lg">Popular options</h2>
            <p style={{ color: 'var(--color-ink-soft)', marginTop: 8 }}>Most-viewed fertility tests this month</p>
          </div>
          <Link href="/browse" className="btn-secondary" style={{ padding: '10px 20px' }}>
            View all 19 tests
          </Link>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 24 }}>
          {featured.map(opt => <TestCard key={opt.id} option={opt} />)}
        </div>
      </section>

      {/* Trust / Seen link */}
      <section style={{ maxWidth: 1200, margin: '80px auto 0', padding: '0 24px' }}>
        <div style={{
          background: 'var(--color-surface-2)', borderRadius: 16,
          padding: 'clamp(32px, 5vw, 56px)', textAlign: 'center',
        }}>
          <p style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-ink-soft)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 16 }}>
            Built by the team behind
          </p>
          <a href="https://seenfertility.com" target="_blank" style={{ textDecoration: 'none' }}>
            <p style={{ fontWeight: 800, fontSize: '1.5rem', color: 'var(--color-ink)', letterSpacing: '-0.02em' }}>
              Seen <span style={{ color: 'var(--color-electric)' }}>Fertility</span>
            </p>
          </a>
          <p style={{ color: 'var(--color-ink-soft)', maxWidth: 560, margin: '16px auto 0', lineHeight: 1.7 }}>
            Seen Fertility exists to make fertility care more accessible, honest, and inclusive.
            Seen Testing is our directory — built to help you find the right first step, wherever you are on your journey.
          </p>
          <a href="https://seenfertility.com/resources" target="_blank" className="btn-secondary" style={{ marginTop: 24, display: 'inline-flex' }}>
            Explore Seen Fertility resources →
          </a>
        </div>
      </section>
    </>
  )
}
