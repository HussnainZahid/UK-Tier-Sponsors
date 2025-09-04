import type { AuthSuccessResponse, ApiResponse, AuthUser } from '../../shared/api';

const TOKEN_KEY = 'auth_token';

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string | null) {
  if (token) localStorage.setItem(TOKEN_KEY, token);
  else localStorage.removeItem(TOKEN_KEY);
}

function authHeaders() {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function register(input: { name: string; email: string; password: string; company?: string }): Promise<AuthUser> {
  const res = await fetch('/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  });
  const json = (await res.json()) as ApiResponse<AuthSuccessResponse>;
  if (!res.ok || !json.success || !json.data) throw new Error(json.error || 'Registration failed');
  setToken(json.data.token);
  return json.data.user;
}

export async function login(input: { email: string; password: string }): Promise<AuthUser> {
  const res = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  });
  const json = (await res.json()) as ApiResponse<AuthSuccessResponse>;
  if (!res.ok || !json.success || !json.data) throw new Error(json.error || 'Login failed');
  setToken(json.data.token);
  return json.data.user;
}

export async function me(): Promise<AuthUser | null> {
  const res = await fetch('/api/auth/me', {
    headers: { ...authHeaders() },
  });
  if (res.status === 401) return null;
  const json = (await res.json()) as ApiResponse<AuthUser>;
  if (!json.success || !json.data) return null;
  return json.data;
}

export function logout() {
  setToken(null);
}
