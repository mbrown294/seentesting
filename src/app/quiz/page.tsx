'use client'
import { useState } from 'react'
import { testingOptions, filterOptions, scoreOptions } from '@/data/testingOptions'
import { QuizAnswers } from '@/types'
import TestCard from '@/components/ui/TestCard'

const TOTAL_STEPS = 7

const steps = [
  {
    q: 'Who is this test for?',
    key: 'audience',
    subtitle: 'This helps us show you the most relevant options.',
    options: [
      { label: '♀ A woman', value: 'Female', desc: 'Ovarian reserve, hormones, ovulation' },
      { label: '♂ A man', value: 'Male', desc: 'Sperm health, testosterone, male hormones' },
      { label: '♡ Us as a couple', value: 'Couples', desc: 'Joint assessment or bundle options' },
    ],
  },
  {
    q: 'Where would you prefer to test?',
    key: 'setting',
    subtitle: 'Both options give you clinically meaningful results.',
    options: [
      { label: '🏠 At home', value: 'At-home', desc: 'Test kit delivered, results online. Private and convenient.' },
      { label: '🏥 At a clinic', value: 'In-clinic', desc: 'Visit a clinic for sample collection and in-person support.' },
    ],
  },
  {
    q: 'What matters most to you?',
    key: 'priority',
    subtitle: 'Pick the one thing you care about most.',
    options: [
      { label: '💰 Lowest cost', value: 'lowest-cost', desc: 'Get the most affordable option that still gives you answers.' },
      { label: '🔬 Most comprehensive', value: 'most-comprehensive', desc: 'The broadest possible picture of your fertility.' },
      { label: '⚡ Fastest results', value: 'fastest', desc: 'Get results as quickly as possible.' },
      { label: '👩‍⚕️ Clinician guidance', value: 'clinician-guidance', desc: 'I want a doctor or nurse to review my results.' },
    ],
  },
  {
    q: 'What do you most want to learn?',
    key: 'goal',
    subtitle: 'This helps us match you to the right biomarkers.',
    options: [
      { label: '🥚 Egg count / ovarian reserve', value: 'egg-count', desc: 'How many eggs do I have? (AMH, AFC)' },
      { label: '📅 Ovulation timing', value: 'ovulation', desc: 'Am I ovulating? When? (LH, PdG, E3G)' },
      { label: '💧 Sperm health', value: 'sperm', desc: 'Count, motility, volume, DNA integrity.' },
      { label: '⚖️ General hormone balance', value: 'hormones', desc: 'FSH, LH, testosterone, prolactin, SHBG.' },
      { label: '🗺 The full picture', value: 'full-picture', desc: 'Everything — I want a complete fertility MOT.' },
    ],
  },
  {
    q: 'Where in the UK are you based?',
    key: 'location',
    subtitle: 'Some in-clinic options are London-only.',
    options: [
      { label: '🏙 London', value: 'London', desc: '' },
      { label: '🏘 Another major city', value: 'major-city', desc: 'Manchester, Birmingham, Bristol, Leeds, etc.' },
      { label: '🗺 Rural / smaller town', value: 'rural', desc: 'At-home options are usually best here.' },
      { label: '🏴󠁧󠁢󠁳󠁣󠁴󠁿🏴󠁧󠁢󠁷󠁬󠁳󠁿 Scotland / Wales / NI', value: 'devolved', desc: '' },
    ],
  },
]

type Phase = 'quiz' | 'gate' | 'results'

export default function QuizPage() {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<QuizAnswers>({})
  const [phase, setPhase] = useState<Phase>('quiz')

  // Gate fields
  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [marketingConsent, setMarketingConsent] = useState(false)
  const [commConsent, setCommConsent] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const currentStep = steps[step]
  const progress = ((step + 1) / TOTAL_STEPS) * 100

  function selectOption(value: string) {
    setAnswers(prev => ({ ...prev, [currentStep.key]: value }))
    if (step < steps.length - 1) {
      setTimeout(() => setStep(s => s + 1), 250)
    } else {
      setTimeout(() => setPhase('gate'), 250)
    }
  }

  function getResults() {
    let opts = filterOptions(testingOptions, {
      audience: answers.audience,
      setting: answers.setting,
    })
    opts = scoreOptions(opts, { priority: answers.priority, goal: answers.goal })
    return opts.slice(0, 6)
  }

  async function handleGateSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    setSubmitting(true)
    setSubmitError('')

    try {
      const results = getResults()
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          first_name: firstName,
          audience: answers.audience,
          setting: answers.setting,
          priority: answers.priority,
          goal: answers.goal,
          location: answers.location,
          marketing_consent: marketingConsent,
          communication_consent: commConsent,
          top_match_id: results[0]?.id,
        }),
      })

      // Also send results email
      await fetch('/api/quiz-result', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, firstName, results, answers }),
      })

      setPhase('results')
    } catch {
      setSubmitError('Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (phase === 'quiz') {
    return (
      <div style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column' }}>
        {/* Progress */}
        <div style={{ padding: '24px 24px 0' }}>
          <div style={{ maxWidth: 640, margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-ink-soft)' }}>
                Question {step + 1} of {steps.length}
              </span>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-electric)' }}>
                {Math.round(progress)}% complete
              </span>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${progress}%` }} />
            </div>
          </div>
        </div>

        {/* Question */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 'clamp(32px, 6vw, 80px) 24px' }}>
          <div style={{ maxWidth: 640, margin: '0 auto', width: '100%' }}>
            <h1 style={{ fontWeight: 800, fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', letterSpacing: '-0.02em', marginBottom: 8, lineHeight: 1.2 }}>
              {currentStep.q}
            </h1>
            <p style={{ color: 'var(--color-ink-soft)', marginBottom: 36 }}>{currentStep.subtitle}</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {currentStep.options.map(opt => (
                <button
                  key={opt.value}
                  className={`quiz-option ${answers[currentStep.key as keyof QuizAnswers] === opt.value ? 'selected' : ''}`}
                  onClick={() => selectOption(opt.value)}
                >
                  <span style={{ fontWeight: 700, display: 'block', marginBottom: opt.desc ? 4 : 0 }}>{opt.label}</span>
                  {opt.desc && <span style={{ fontSize: '0.875rem', opacity: 0.7, fontWeight: 400 }}>{opt.desc}</span>}
                </button>
              ))}
            </div>

            {step > 0 && (
              <button
                onClick={() => setStep(s => s - 1)}
                style={{ marginTop: 24, background: 'none', border: 'none', color: 'var(--color-ink-soft)', cursor: 'pointer', fontWeight: 600, padding: 0 }}
              >
                ← Back
              </button>
            )}
          </div>
        </div>
      </div>
    )
  }

  if (phase === 'gate') {
    return (
      <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 24px' }}>
        <div style={{ maxWidth: 480, width: '100%' }}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <div style={{
              width: 64, height: 64, borderRadius: '50%', background: 'var(--color-electric-light)',
              margin: '0 auto 20px', display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 28,
            }}>🎯</div>
            <h1 style={{ fontWeight: 800, fontSize: '1.75rem', letterSpacing: '-0.02em', marginBottom: 8 }}>
              Your matches are ready
            </h1>
            <p style={{ color: 'var(--color-ink-soft)', lineHeight: 1.6 }}>
              Enter your email to see your top matches — we'll also send you the full list so you can revisit any time.
            </p>
          </div>

          <form onSubmit={handleGateSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <label style={{ display: 'block', fontWeight: 600, fontSize: '0.875rem', marginBottom: 6 }}>
                First name <span style={{ color: 'var(--color-ink-soft)', fontWeight: 400 }}>(optional)</span>
              </label>
              <input
                className="input"
                placeholder="Your first name"
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontWeight: 600, fontSize: '0.875rem', marginBottom: 6 }}>
                Email address <span style={{ color: 'var(--color-coral)' }}>*</span>
              </label>
              <input
                className="input"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>

            <div style={{ background: 'var(--color-surface-2)', borderRadius: 12, padding: 20, display: 'flex', flexDirection: 'column', gap: 14 }}>
              <label className="checkbox-wrapper">
                <input
                  type="checkbox"
                  checked={commConsent}
                  onChange={e => setCommConsent(e.target.checked)}
                />
                <span style={{ fontSize: '0.875rem', color: 'var(--color-ink-soft)', lineHeight: 1.5 }}>
                  I'm happy for Seen Testing to email me my results and any follow-up information about my matched tests.
                </span>
              </label>

              <label className="checkbox-wrapper">
                <input
                  type="checkbox"
                  checked={marketingConsent}
                  onChange={e => setMarketingConsent(e.target.checked)}
                />
                <span style={{ fontSize: '0.875rem', color: 'var(--color-ink-soft)', lineHeight: 1.5 }}>
                  I'd also like to receive fertility news, guides, and offers from Seen Fertility. You can unsubscribe any time.
                </span>
              </label>
            </div>

            <p style={{ fontSize: '0.75rem', color: 'var(--color-ink-soft)', lineHeight: 1.5 }}>
              By continuing you agree to our{' '}
              <a href="/privacy" style={{ color: 'var(--color-electric)' }}>Privacy Policy</a>. We process your data in line with UK-GDPR. We will never sell your data.
            </p>

            {submitError && (
              <p style={{ color: 'var(--color-coral)', fontSize: '0.875rem' }}>{submitError}</p>
            )}

            <button
              type="submit"
              className="btn-primary"
              disabled={!email || submitting}
              style={{ opacity: (!email || submitting) ? 0.6 : 1, cursor: (!email || submitting) ? 'not-allowed' : 'pointer', fontSize: '1.05rem', padding: '16px' }}
            >
              {submitting ? 'Loading your results...' : 'See my matches →'}
            </button>
          </form>
        </div>
      </div>
    )
  }

  // Results
  const results = getResults()
  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: 'clamp(40px, 6vw, 72px) 24px' }}>
      <div style={{ textAlign: 'center', marginBottom: 56 }}>
        <div style={{
          display: 'inline-block', background: 'var(--color-electric-light)',
          color: 'var(--color-electric)', fontWeight: 700, padding: '6px 16px',
          borderRadius: 999, fontSize: '0.85rem', marginBottom: 20,
        }}>
          Your personalised matches
        </div>
        <h1 className="heading-lg">
          {firstName ? `${firstName}, here are your top matches` : 'Here are your top matches'}
        </h1>
        <p style={{ color: 'var(--color-ink-soft)', marginTop: 12, fontSize: '1.05rem' }}>
          Based on your answers — we've ranked these for you. Full results sent to {email}.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 24, flexWrap: 'wrap' }}>
          {[answers.audience, answers.setting, answers.priority].filter(Boolean).map(a => (
            <span key={a} className="pill" style={{ background: 'var(--color-electric-light)', color: 'var(--color-electric-dark)', fontSize: '0.875rem' }}>
              {a?.replace('-', ' ')}
            </span>
          ))}
        </div>
      </div>

      {/* Top 3 highlighted */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 24 }}>
        {results.map((opt, i) => (
          <TestCard key={opt.id} option={opt} rank={i + 1} />
        ))}
      </div>

      <div style={{ textAlign: 'center', marginTop: 56 }}>
        <p style={{ color: 'var(--color-ink-soft)', marginBottom: 20 }}>
          Want to explore all options? Browse the full directory.
        </p>
        <a href="/browse" className="btn-secondary">Browse all tests</a>
      </div>
    </div>
  )
}
