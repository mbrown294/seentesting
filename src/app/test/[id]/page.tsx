import { testingOptions } from '@/data/testingOptions'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'

interface Props {
  params: Promise<{ id: string }>
}

export async function generateStaticParams() {
  return testingOptions.map(opt => ({ id: String(opt.id) }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const opt = testingOptions.find(o => o.id === Number(id))
  if (!opt) return {}
  return {
    title: `${opt.product} by ${opt.provider} | Seen Testing`,
    description: `${opt.product} — ${opt.whatItMeasures}. ${opt.headlinePrice}. ${opt.turnaround} turnaround. Available ${opt.availability}.`,
  }
}

export default async function TestDetailPage({ params }: Props) {
  const { id } = await params
  const opt = testingOptions.find(o => o.id === Number(id))
  if (!opt) notFound()

  const audienceArr = Array.isArray(opt.audience) ? opt.audience : [opt.audience]
  const related = testingOptions.filter(o =>
    o.id !== opt.id && (
      Array.isArray(o.audience)
        ? o.audience.some(a => audienceArr.includes(a))
        : audienceArr.includes(o.audience)
    )
  ).slice(0, 3)

  const details = [
    { label: 'Provider', value: opt.provider },
    { label: 'What it tests', value: opt.whatItMeasures },
    { label: 'Sample type', value: opt.sampleType },
    { label: 'Turnaround', value: opt.turnaround },
    { label: 'Availability', value: opt.availability },
    { label: 'Setting', value: opt.setting },
    { label: 'Clinician support', value: opt.clinicianSupport },
  ]

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: 'clamp(40px, 6vw, 72px) 24px' }}>
      {/* Breadcrumb */}
      <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 32, fontSize: '0.875rem' }}>
        <Link href="/browse" style={{ color: 'var(--color-electric)', fontWeight: 600, textDecoration: 'none' }}>← Browse all tests</Link>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 340px', gap: 48, alignItems: 'start' }}>
        {/* Left */}
        <div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>
            {audienceArr.map(a => (
              <span key={a} className={`pill badge-${a.toLowerCase()}`}>{a}</span>
            ))}
            <span className={`pill ${opt.setting === 'At-home' ? 'badge-home' : 'badge-clinic'}`}>
              {opt.setting === 'At-home' ? '🏠 At home' : '🏥 In clinic'}
            </span>
          </div>

          <p style={{ color: 'var(--color-ink-soft)', fontWeight: 700, fontSize: '0.95rem', marginBottom: 8 }}>{opt.provider}</p>
          <h1 className="heading-lg" style={{ marginBottom: 24 }}>{opt.product}</h1>

          <div style={{ background: 'var(--color-surface-2)', borderRadius: 16, padding: 32, marginBottom: 32 }}>
            <h2 style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: 20 }}>Test details</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
              {details.map(d => (
                <div key={d.label}>
                  <p style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--color-ink-soft)', margin: '0 0 4px' }}>{d.label}</p>
                  <p style={{ margin: 0, fontWeight: 600 }}>{d.value}</p>
                </div>
              ))}
            </div>
          </div>

          {opt.trueCost && (
            <div style={{ background: '#fef9c3', border: '1.5px solid #fde68a', borderRadius: 12, padding: 20, marginBottom: 32 }}>
              <p style={{ fontWeight: 700, margin: '0 0 6px', color: '#854d0e' }}>💡 True cost note</p>
              <p style={{ margin: 0, color: '#854d0e', fontSize: '0.9rem', lineHeight: 1.6 }}>{opt.trueCost}</p>
            </div>
          )}

          {opt.notes && (
            <div style={{ background: 'var(--color-electric-light)', borderRadius: 12, padding: 20, marginBottom: 32 }}>
              <p style={{ fontWeight: 700, margin: '0 0 6px', color: 'var(--color-electric-dark)' }}>📋 Our take</p>
              <p style={{ margin: 0, color: 'var(--color-electric-dark)', fontSize: '0.9rem', lineHeight: 1.6 }}>{opt.notes}</p>
            </div>
          )}

          {/* Match tags */}
          <div style={{ marginBottom: 32 }}>
            <p style={{ fontWeight: 700, fontSize: '0.875rem', marginBottom: 12 }}>Good for</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {opt.matchTags.map(tag => (
                <span key={tag} className="pill" style={{ background: 'var(--color-surface-2)', color: 'var(--color-ink-soft)' }}>
                  {tag.replace(/-/g, ' ')}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right — sticky CTA card */}
        <div style={{ position: 'sticky', top: 88 }}>
          <div className="card" style={{ padding: 32 }}>
            <div style={{ marginBottom: 24 }}>
              <p style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--color-ink-soft)', marginBottom: 4 }}>
                Headline price
              </p>
              <p style={{ fontWeight: 900, fontSize: '2rem', color: 'var(--color-electric)', margin: 0, letterSpacing: '-0.03em' }}>
                {opt.headlinePrice}
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
              {[
                { icon: '⚡', text: opt.turnaround + ' turnaround' },
                { icon: '📍', text: opt.availability },
                { icon: '🔬', text: opt.sampleType },
              ].map(item => (
                <div key={item.text} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: '0.9rem' }}>
                  <span>{item.icon}</span>
                  <span style={{ color: 'var(--color-ink-soft)' }}>{item.text}</span>
                </div>
              ))}
            </div>

            <a
              href={opt.source.startsWith('http') ? opt.source : `https://${opt.source}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              style={{ width: '100%', display: 'flex', justifyContent: 'center', marginBottom: 12 }}
            >
              Visit {opt.provider} →
            </a>

            <Link href="/quiz" className="btn-secondary" style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
              Retake the quiz
            </Link>

            <p style={{ fontSize: '0.75rem', color: 'var(--color-ink-soft)', textAlign: 'center', marginTop: 16, lineHeight: 1.5 }}>
              Seen Testing may earn a commission when you click through. This never affects our rankings.
            </p>
          </div>
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <div style={{ marginTop: 80 }}>
          <h2 style={{ fontWeight: 700, fontSize: '1.5rem', marginBottom: 32 }}>Other tests you might like</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 24 }}>
            {related.map(r => {
              const rAuds = Array.isArray(r.audience) ? r.audience : [r.audience]
              return (
                <Link key={r.id} href={`/test/${r.id}`} style={{ textDecoration: 'none' }}>
                  <div className="card" style={{ padding: 24 }}>
                    <p style={{ fontSize: '0.8rem', color: 'var(--color-ink-soft)', margin: '0 0 4px', fontWeight: 600 }}>{r.provider}</p>
                    <h3 style={{ fontWeight: 700, margin: '0 0 8px' }}>{r.product}</h3>
                    <p style={{ fontWeight: 800, color: 'var(--color-electric)', margin: '0 0 12px' }}>{r.headlinePrice}</p>
                    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                      {rAuds.map(a => <span key={a} className={`pill badge-${a.toLowerCase()}`}>{a}</span>)}
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
