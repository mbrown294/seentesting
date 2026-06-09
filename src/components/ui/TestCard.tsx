import Link from 'next/link'
import { TestingOption } from '@/types'

interface Props {
  option: TestingOption
  rank?: number
}

export default function TestCard({ option, rank }: Props) {
  const audienceArr = Array.isArray(option.audience) ? option.audience : [option.audience]

  return (
    <Link href={`/test/${option.id}`} style={{ textDecoration: 'none' }}>
      <div className="card" style={{ padding: 24, position: 'relative', height: '100%', display: 'flex', flexDirection: 'column', gap: 16 }}>
        {rank && (
          <div style={{
            position: 'absolute', top: -10, left: 20,
            background: 'var(--color-electric)', color: 'white',
            fontWeight: 800, fontSize: '0.75rem',
            padding: '4px 12px', borderRadius: 999,
          }}>
            #{rank} match
          </div>
        )}

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
          <div>
            <p style={{ fontSize: '0.8rem', color: 'var(--color-ink-soft)', fontWeight: 600, marginBottom: 4 }}>
              {option.provider}
            </p>
            <h3 style={{ fontWeight: 700, fontSize: '1.05rem', margin: 0, lineHeight: 1.3 }}>
              {option.product}
            </h3>
          </div>
          <div style={{ textAlign: 'right', flexShrink: 0 }}>
            <p style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--color-electric)', margin: 0 }}>
              {option.headlinePrice}
            </p>
          </div>
        </div>

        {/* Badges */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {audienceArr.map(a => (
            <span key={a} className={`pill badge-${a.toLowerCase()}`}>{a}</span>
          ))}
          <span className={`pill ${option.setting === 'At-home' ? 'badge-home' : 'badge-clinic'}`}>
            {option.setting === 'At-home' ? '🏠 At home' : '🏥 In clinic'}
          </span>
          {option.clinicianSupport !== 'None' && (
            <span className="pill" style={{ background: '#f0fdf4', color: '#166534' }}>👩‍⚕️ Clinician included</span>
          )}
        </div>

        {/* What it measures */}
        <p style={{ fontSize: '0.875rem', color: 'var(--color-ink-soft)', margin: 0, lineHeight: 1.5 }}>
          <strong style={{ color: 'var(--color-ink)' }}>Tests for:</strong> {option.whatItMeasures}
        </p>

        {/* Meta row */}
        <div style={{ display: 'flex', gap: 20, marginTop: 'auto' }}>
          <div>
            <p style={{ fontSize: '0.7rem', color: 'var(--color-ink-soft)', fontWeight: 600, margin: '0 0 2px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Turnaround</p>
            <p style={{ fontSize: '0.875rem', fontWeight: 600, margin: 0 }}>{option.turnaround}</p>
          </div>
          <div>
            <p style={{ fontSize: '0.7rem', color: 'var(--color-ink-soft)', fontWeight: 600, margin: '0 0 2px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Sample</p>
            <p style={{ fontSize: '0.875rem', fontWeight: 600, margin: 0 }}>{option.sampleType}</p>
          </div>
          <div>
            <p style={{ fontSize: '0.7rem', color: 'var(--color-ink-soft)', fontWeight: 600, margin: '0 0 2px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Available</p>
            <p style={{ fontSize: '0.875rem', fontWeight: 600, margin: 0 }}>{option.availability}</p>
          </div>
        </div>

        <div style={{ fontSize: '0.85rem', color: 'var(--color-electric)', fontWeight: 700, marginTop: 4 }}>
          View details →
        </div>
      </div>
    </Link>
  )
}
