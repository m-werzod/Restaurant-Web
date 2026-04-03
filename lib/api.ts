import { getTokenFromDocument } from './auth'

export async function apiFetch(
  endpoint: string,
  options: RequestInit = {}
): Promise<any> {
  const token = getTokenFromDocument()

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}${endpoint}`,
    {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
    }
  )

  if (res.status === 401) {
    const locale = window.location.pathname.match(/^\/(ru|en|uz)/)?.[1] ?? 'ru'
    window.location.href = `/${locale}/login`
  }

  return res.json()
}