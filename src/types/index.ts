export type Audience = 'Female' | 'Male' | 'Couples'
export type Setting = 'At-home' | 'In-clinic'

export interface TestingOption {
  id: number
  product: string
  provider: string
  audience: Audience | Audience[]
  setting: Setting
  category: string
  whatItMeasures: string
  sampleType: string
  headlinePrice: string
  trueCost: string
  turnaround: string
  availability: string
  clinicianSupport: string
  matchTags: string[]
  affiliateProgram: string
  source: string
  notes: string
}

export interface QuizAnswers {
  audience?: string
  setting?: string
  priority?: string
  goal?: string
  location?: string
  email?: string
  firstName?: string
  marketingConsent?: boolean
  communicationConsent?: boolean
}

export interface Lead {
  email: string
  first_name?: string
  audience?: string
  setting?: string
  priority?: string
  goal?: string
  location?: string
  marketing_consent: boolean
  communication_consent: boolean
  top_match_id?: number
  quiz_completed_at?: string
}
