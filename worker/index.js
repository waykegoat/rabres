import { processLead } from '../shared/lead.js'

const JSON_HEADERS = { 'Content-Type': 'application/json; charset=utf-8' }

export default {
  async fetch(request, env) {
    const allowedOrigin = resolveOrigin(request, env)

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders(allowedOrigin) })
    }

    if (request.method !== 'POST') {
      return json({ ok: false, message: 'Метод не поддерживается' }, 405, allowedOrigin)
    }

    let body
    try {
      body = await request.json()
    } catch {
      return json({ ok: false, message: 'Некорректный запрос' }, 400, allowedOrigin)
    }

    const clientKey = request.headers.get('CF-Connecting-IP') ?? 'unknown'

    const result = await processLead(body, clientKey, {
      botToken: env.TELEGRAM_BOT_TOKEN,
      chatId: env.TELEGRAM_CHAT_ID,
    })

    return json(result.body, result.status, allowedOrigin)
  },
}

function resolveOrigin(request, env) {
  const requestOrigin = request.headers.get('Origin') ?? ''
  const allowList = (env.ALLOWED_ORIGINS ?? '')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean)

  if (allowList.length === 0) return requestOrigin || '*'
  return allowList.includes(requestOrigin) ? requestOrigin : allowList[0]
}

function corsHeaders(origin) {
  return {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
    Vary: 'Origin',
  }
}

function json(body, status, origin) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...JSON_HEADERS, ...corsHeaders(origin) },
  })
}
