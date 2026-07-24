const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000
const RATE_LIMIT_MAX_REQUESTS = 5
const MAX_FIELD_LENGTH = 1000
const TELEGRAM_TIMEOUT_MS = 8000

const requestLog = new Map()

export const LEAD_MESSAGES = {
  accepted: 'Заявка принята',
  invalidPhone: 'Проверьте номер телефона и попробуйте ещё раз.',
  rateLimited: 'Слишком много заявок подряд. Позвоните нам — ответим сразу.',
  deliveryFailed: 'Заявка не дошла. Позвоните нам — примем её по телефону.',
}

export async function processLead(body, clientKey, config) {
  if (isRateLimited(clientKey)) {
    return { status: 429, body: { ok: false, message: LEAD_MESSAGES.rateLimited } }
  }

  if (typeof body?.company === 'string' && body.company.trim() !== '') {
    return { status: 200, body: { ok: true, message: LEAD_MESSAGES.accepted } }
  }

  const phone = normalizePhone(body?.phone)

  if (!phone) {
    return { status: 400, body: { ok: false, message: LEAD_MESSAGES.invalidPhone } }
  }

  const lead = {
    phone,
    name: sanitize(body?.name),
    comment: sanitize(body?.comment),
    estimate: sanitize(body?.estimate),
    source: sanitize(body?.source) || 'не указано',
    page: sanitize(body?.page) || '/',
    receivedAt: new Date().toISOString(),
  }

  if (!config?.botToken || !config?.chatId) {
    console.warn('[lead] Telegram не настроен. Заявка только в логах:')
    console.warn(formatLeadAsText(lead))
    return { status: 200, body: { ok: true, message: LEAD_MESSAGES.accepted } }
  }

  try {
    await sendToTelegram(lead, config)
    return { status: 200, body: { ok: true, message: LEAD_MESSAGES.accepted } }
  } catch (error) {
    console.error('[lead] Доставка в Telegram не удалась:', error.message)
    console.error('[lead] Потерянная заявка:', formatLeadAsText(lead))
    return { status: 502, body: { ok: false, message: LEAD_MESSAGES.deliveryFailed } }
  }
}

export function buildTelegramMessage(lead) {
  const lines = ['<b>🔔 Новая заявка с сайта</b>', '', `<b>Телефон:</b> ${escapeHtml(lead.phone)}`]

  if (lead.name) lines.push(`<b>Имя:</b> ${escapeHtml(lead.name)}`)
  if (lead.comment) lines.push(`<b>Задача:</b> ${escapeHtml(lead.comment)}`)
  if (lead.estimate) lines.push(`<b>Расчёт на сайте:</b> ${escapeHtml(lead.estimate)}`)

  lines.push(
    '',
    `<b>Форма:</b> ${escapeHtml(lead.source)}`,
    `<b>Страница:</b> ${escapeHtml(lead.page)}`,
    `<b>Время:</b> ${formatMoscowTime(lead.receivedAt)}`,
  )

  return lines.join('\n')
}

async function sendToTelegram(lead, config) {
  const response = await fetch(`https://api.telegram.org/bot${config.botToken}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: config.chatId,
      text: buildTelegramMessage(lead),
      parse_mode: 'HTML',
      disable_web_page_preview: true,
    }),
    signal: AbortSignal.timeout(TELEGRAM_TIMEOUT_MS),
  })

  if (!response.ok) {
    const details = await response.text().catch(() => '')
    throw new Error(`Telegram ответил ${response.status}: ${details.slice(0, 200)}`)
  }
}

function isRateLimited(key) {
  const now = Date.now()
  const timestamps = (requestLog.get(key) ?? []).filter((time) => now - time < RATE_LIMIT_WINDOW_MS)

  if (timestamps.length >= RATE_LIMIT_MAX_REQUESTS) {
    requestLog.set(key, timestamps)
    return true
  }

  timestamps.push(now)
  requestLog.set(key, timestamps)

  if (requestLog.size > 5000) {
    for (const [loggedKey, times] of requestLog) {
      if (times.every((time) => now - time >= RATE_LIMIT_WINDOW_MS)) requestLog.delete(loggedKey)
    }
  }

  return false
}

function normalizePhone(value) {
  if (typeof value !== 'string') return null

  let digits = value.replace(/\D/g, '')
  if (digits.startsWith('8')) digits = `7${digits.slice(1)}`
  if (digits.length === 10 && digits.startsWith('9')) digits = `7${digits}`

  return /^79\d{9}$/.test(digits) ? `+${digits}` : null
}

function sanitize(value) {
  if (typeof value !== 'string') return ''
  return value.replace(/\s+/g, ' ').trim().slice(0, MAX_FIELD_LENGTH)
}

function escapeHtml(value) {
  return String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

function formatLeadAsText(lead) {
  return buildTelegramMessage(lead).replace(/<[^>]+>/g, '')
}

function formatMoscowTime(isoString) {
  return new Intl.DateTimeFormat('ru-RU', {
    timeZone: 'Europe/Moscow',
    dateStyle: 'short',
    timeStyle: 'short',
  }).format(new Date(isoString))
}
