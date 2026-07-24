const RUSSIAN_PHONE_DIGITS = 11

export function extractDigits(value: string): string {
  return value.replace(/\D/g, '')
}

export function normalizePhoneDigits(value: string): string {
  let digits = extractDigits(value)

  if (digits.startsWith('8')) digits = `7${digits.slice(1)}`
  if (digits.startsWith('9') && digits.length <= 10) digits = `7${digits}`
  if (!digits.startsWith('7')) digits = `7${digits}`

  return digits.slice(0, RUSSIAN_PHONE_DIGITS)
}

export function formatPhone(value: string): string {
  const digits = normalizePhoneDigits(value)
  if (digits.length <= 1) return '+7 '

  const body = digits.slice(1)
  const area = body.slice(0, 3)
  const first = body.slice(3, 6)
  const second = body.slice(6, 8)
  const third = body.slice(8, 10)

  let result = '+7'
  if (area) result += ` (${area}`
  if (area.length === 3) result += ')'
  if (first) result += ` ${first}`
  if (second) result += `-${second}`
  if (third) result += `-${third}`

  return result
}

export function isValidPhone(value: string): boolean {
  const digits = normalizePhoneDigits(value)
  return digits.length === RUSSIAN_PHONE_DIGITS && /^79\d{9}$/.test(digits)
}

export function toTelHref(value: string): string {
  return `+${normalizePhoneDigits(value)}`
}
