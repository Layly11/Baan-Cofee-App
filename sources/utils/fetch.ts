import { getAuthToken } from './auth'

export const authFetch = async (url: string, options: any = {}) => {
  const token = await getAuthToken()
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
    ...(token ? { 'Authorization': `Bearer ${token}` } : {})
  }

  return fetch(url, {
    ...options,
    headers
  })
}