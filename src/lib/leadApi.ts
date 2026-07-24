export interface LeadPayload {
  name?: string
  phone: string
  comment?: string
  source: string
  page: string
  estimate?: string
  company?: string
}

export interface LeadResult {
  ok: boolean
  message: string
}

const GENERIC_ERROR = 'Не удалось отправить заявку. Позвоните нам — ответим сразу.'

const LEAD_ENDPOINT = import.meta.env.VITE_LEAD_ENDPOINT || '/api/lead'

export async function submitLead(payload: LeadPayload): Promise<LeadResult> {
  try {
    const response = await fetch(LEAD_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    const data = await response.json().catch(() => null)

    if (!response.ok) {
      return { ok: false, message: data?.message ?? GENERIC_ERROR }
    }

    return { ok: true, message: data?.message ?? 'Заявка принята' }
  } catch {
    return { ok: false, message: GENERIC_ERROR }
  }
}
