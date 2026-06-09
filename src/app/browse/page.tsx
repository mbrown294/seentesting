'use client'
import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { testingOptions, filterOptions } from '@/data/testingOptions'
import TestCard from '@/components/ui/TestCard'
import Link from 'next/link'
import { Suspense } from 'react'

function BrowseContent() {
  const searchParams = useSearchParams()
  const [audience, setAudience] = useState(searchParams.get('audience') || 'all')
  const [setting, setSetting] = useState('all')
  const [search, setSearch] = useState('')

  const filtered = filterOptions(testingOptions, {
    audience: audience === 'all' ? undefined : audience,
    setting: setting === 'all' ? undefined : setting as 'At-home' | 'In-clinic',
  }).filter(opt =>
    search === '' ||
    opt.product.toLowerCase().includes(search.toLowerCase()) ||
    opt.provider.toLowerCase().includes(search.toLowerCase()) ||
    opt.whatItMeasures.toLowerCase().includes(search.toLowerCase())
  )

  const audienceOptions = [
    { value: 'all', label: 'Everyone' },
    { value: 'Female', label: '♀ Women' },
    { value: 'Male', label: '♂ Men' },
    { value: 'Couples', label: '♡ Couples' },
  ]

  const settingOptions = [
    { value: 'all', label: 'All settings' },
    { value: 'At-home', label: '🏠 At home' },
    { value: 'In-clinic', label: '🏥 In clinic' },
  ]

  return (
    <>
      {/* Page header */}
      <div style={{ background: 'linear-gradient(135deg, #0f0f14 0%, #1e1e3a 100%)', color: 'white', padding: 'clamp(40px, 6vw, 72px) 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <h1 className="heading-lg" style={{ color: 'white', marginBottom: 12 }}>Browse fertility tests</h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.05rem', marginBottom: 32 }}>
            {testingOptions.length} options across the UK — at home and in clinic
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
            <input
              className="input"
              placeholder="Search by test, provider, or what it measures..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ maxWidth: 420, background: 'rgba(255,255,255,0.1)', border: '1.5px solid rgba(255,255,255,0.2)', color: 'white' }}
            />
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 24px' }}>
        {/* Filters */}
        <div style={{ display: 'flex', gap: 24, marginBottom: 40, flexWrap: 'wrap', alignItems: 'flex-start' }}>
          <div>
            <p style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--color-ink-soft)', marginBottom: 8 }}>
              Who's testing?
            </p>
            <div style={{ display: 'flex', gap: 8 }}>
              {audienceOptions.map(o => (
                <button
                  key={o.value}
                  onClick={() => setAudience(o.value)}
                  style={{
                    padding: '8px 16px', borderRadius: 8, border: '2px solid',
                    borderColor: audience === o.value ? 'var(--color-electric)' : 'var(--color-border)',
                    background: audience === o.value ? 'var(--color-electric-light)' : 'white',
                    color: audience === o.value ? 'var(--color-electric-dark)' : 'var(--color-ink)',
                    fontWeight: 600, cursor: 'pointer', fontSize: '0.875rem',
                    transition: 'all 0.15s',
                  }}
                >
                  {o.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--color-ink-soft)', marginBottom: 8 }}>
              Where?
            </p>
            <div style={{ display: 'flex', gap: 8 }}>
              {settingOptions.map(o => (
                <button
                  key={o.value}
                  onClick={() => setSetting(o.value)}
                  style={{
                    padding: '8px 16px', borderRadius: 8, border: '2px solid',
                    borderColor: setting === o.value ? 'var(--color-electric)' : 'var(--color-border)',
                    background: setting === o.value ? 'var(--color-electric-light)' : 'white',
                    color: setting === o.value ? 'var(--color-electric-dark)' : 'var(--color-ink)',
                    fontWeight: 600, cursor: 'pointer', fontSize: '0.875rem',
                    transition: 'all 0.15s',
                  }}
                >
                  {o.label}
                </button>
              ))}
            </div>
          </div>

          <div style={{ marginLeft: 'auto', alignSelf: 'flex-end' }}>
            <Link href="/quiz" className="btn-primary" style={{ padding: '10px 20px', fontSize: '0.9rem' }}>
              Not sure? Take the quiz →
            </Link>
          </div>
        </div>

        {/* Results count */}
        <p style={{ color: 'var(--color-ink-soft)', fontWeight: 600, marginBottom: 24, fontSize: '0.9rem' }}>
          Showing {filtered.length} of {testingOptions.length} tests
        </p>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 24 }}>
            {filtered.map(opt => <TestCard key={opt.id} option={opt} />)}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '80px 24px' }}>
            <p style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: 12 }}>No tests match your filters</p>
            <p style={{ color: 'var(--color-ink-soft)', marginBottom: 24 }}>Try adjusting or clearing your filters</p>
            <button onClick={() => { setAudience('all'); setSetting('all'); setSearch('') }} className="btn-secondary">
              Clear filters
            </button>
          </div>
        )}
      </div>
    </>
  )
}

export default function BrowsePage() {
  return (
    <Suspense>
      <BrowseContent />
    </Suspense>
  )
}
