import { Router } from 'express';
import bcrypt from 'bcryptjs';
import axios from 'axios';
import { userStoreMongo as userStore } from '../services/userStoreMongo';
import { signToken, authenticate } from '../middleware/auth';
import type { ApiResponse } from '../../shared/api';

const router = Router();

function appBaseUrl(req: any) {
  const envUrl = process.env.PUBLIC_APP_URL || process.env.VITE_PUBLIC_APP_URL;
  if (envUrl) return envUrl.replace(/\/$/, '');
  const proto = (req.headers['x-forwarded-proto'] as string) || req.protocol || 'http';
  const host = req.get('host');
  return `${proto}://${host}`;
}

function isProviderConfigured(provider: 'google' | 'github') {
  if (provider === 'google') return !!(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET);
  if (provider === 'github') return !!(process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET);
  return false;
}

router.post('/register', async (req, res) => {
  try {
    const { name, email, password, company } = req.body as { name: string; email: string; password: string; company?: string };
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, error: 'Missing required fields' } satisfies ApiResponse);
    }
    const existing = await userStore.findByEmail(email);
    if (existing) {
      return res.status(409).json({ success: false, error: 'User already exists' } satisfies ApiResponse);
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await userStore.create({ name, email, passwordHash, company: company ?? null });
    const token = signToken({ sub: user.id, email: user.email, name: user.name });
    return res.json({ success: true, data: { token, user: { id: user.id, name: user.name, email: user.email, company: user.company } } } satisfies ApiResponse);
  } catch (e: any) {
    return res.status(500).json({ success: false, error: 'Registration failed' } satisfies ApiResponse);
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body as { email: string; password: string };
    if (!email || !password) {
      return res.status(400).json({ success: false, error: 'Missing credentials' } satisfies ApiResponse);
    }
    const user = await userStore.findByEmail(email);
    if (!user || !user.passwordHash) {
      return res.status(401).json({ success: false, error: 'Invalid email or password' } satisfies ApiResponse);
    }
    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) {
      return res.status(401).json({ success: false, error: 'Invalid email or password' } satisfies ApiResponse);
    }
    const token = signToken({ sub: user.id, email: user.email, name: user.name });
    return res.json({ success: true, data: { token, user: { id: user.id, name: user.name, email: user.email, company: user.company } } } satisfies ApiResponse);
  } catch (e: any) {
    return res.status(500).json({ success: false, error: 'Login failed' } satisfies ApiResponse);
  }
});

router.get('/me', authenticate, async (req, res) => {
  try {
    const userId = (req as any).user.sub as string;
    const user = await userStore.findById(userId);
    if (!user) return res.status(404).json({ success: false, error: 'User not found' } satisfies ApiResponse);
    return res.json({ success: true, data: { id: user.id, name: user.name, email: user.email, company: user.company } } satisfies ApiResponse);
  } catch (e: any) {
    return res.status(500).json({ success: false, error: 'Failed to load user' } satisfies ApiResponse);
  }
});

router.get('/providers', (req, res) => {
  return res.json({
    success: true,
    data: {
      email: true,
      google: isProviderConfigured('google'),
      github: isProviderConfigured('github'),
    }
  } satisfies ApiResponse);
});

router.post('/password/reset', async (req, res) => {
  try {
    const { email } = req.body as { email: string };
    if (!email) return res.status(400).json({ success: false, error: 'Email is required' } satisfies ApiResponse);
    const user = await userStore.findByEmail(email);
    if (user) {
      // In a real implementation, send reset email here
      console.log(`[auth] Password reset requested for ${email}`);
    }
    return res.json({ success: true, message: 'If an account exists for that email, a reset link will be sent.' } satisfies ApiResponse);
  } catch (e) {
    return res.status(500).json({ success: false, error: 'Could not process request' } satisfies ApiResponse);
  }
});

router.get('/oauth/:provider/start', async (req, res) => {
  const provider = req.params.provider as 'google' | 'github';
  if (!['google', 'github'].includes(provider)) {
    return res.status(400).json({ success: false, error: 'Unsupported provider' } satisfies ApiResponse);
  }
  if (!isProviderConfigured(provider)) {
    return res.status(501).json({ success: false, error: `${provider} OAuth is not configured` } satisfies ApiResponse);
  }
  const base = appBaseUrl(req);
  const redirectUri = `${base}/api/auth/oauth/${provider}/callback`;
  if (provider === 'google') {
    const params = new URLSearchParams({
      client_id: process.env.GOOGLE_CLIENT_ID as string,
      redirect_uri: redirectUri,
      response_type: 'code',
      scope: 'openid email profile',
      access_type: 'offline',
      include_granted_scopes: 'true',
      state: 'state',
      prompt: 'consent'
    });
    return res.redirect(`https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`);
  } else {
    const params = new URLSearchParams({
      client_id: process.env.GITHUB_CLIENT_ID as string,
      redirect_uri: redirectUri,
      scope: 'read:user user:email',
      state: 'state',
      allow_signup: 'true'
    });
    return res.redirect(`https://github.com/login/oauth/authorize?${params.toString()}`);
  }
});

router.get('/oauth/:provider/callback', async (req, res) => {
  const provider = req.params.provider as 'google' | 'github';
  const code = req.query.code as string | undefined;
  if (!code) return res.status(400).json({ success: false, error: 'Missing code' } satisfies ApiResponse);
  const base = appBaseUrl(req);
  const redirectUri = `${base}/api/auth/oauth/${provider}/callback`;

  try {
    if (provider === 'google') {
      const tokenResp = await axios.post('https://oauth2.googleapis.com/token', new URLSearchParams({
        client_id: process.env.GOOGLE_CLIENT_ID as string,
        client_secret: process.env.GOOGLE_CLIENT_SECRET as string,
        code,
        grant_type: 'authorization_code',
        redirect_uri: redirectUri,
      }), { headers: { 'Content-Type': 'application/x-www-form-urlencoded' }});
      const accessToken = tokenResp.data.access_token as string;
      const userResp = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', { headers: { Authorization: `Bearer ${accessToken}` }});
      const { email, name } = userResp.data as { email: string; name: string };
      let user = await userStore.findByEmail(email);
      if (!user) {
        user = await userStore.create({ name: name || email.split('@')[0], email, passwordHash: '', company: null, provider: 'google' });
      }
      const token = signToken({ sub: user.id, email: user.email, name: user.name });
      return res.redirect(`${base}/auth/callback?token=${encodeURIComponent(token)}`);
    } else {
      const tokenResp = await axios.post('https://github.com/login/oauth/access_token', {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
        redirect_uri: redirectUri,
      }, { headers: { Accept: 'application/json' }});
      const accessToken = tokenResp.data.access_token as string;
      const userResp = await axios.get('https://api.github.com/user', { headers: { Authorization: `Bearer ${accessToken}`, 'User-Agent': 'uktier-sponsors-app' }});
      const emailsResp = await axios.get('https://api.github.com/user/emails', { headers: { Authorization: `Bearer ${accessToken}`, 'User-Agent': 'uktier-sponsors-app' }});
      const primaryEmail = (emailsResp.data as any[]).find(e => e.primary)?.email || (emailsResp.data as any[])[0]?.email;
      const email = primaryEmail as string;
      const name = (userResp.data as any).name || (userResp.data as any).login;
      if (!email) return res.status(400).json({ success: false, error: 'No email returned from GitHub' } satisfies ApiResponse);
      let user = await userStore.findByEmail(email);
      if (!user) {
        user = await userStore.create({ name: name || email.split('@')[0], email, passwordHash: '', company: null, provider: 'github' });
      }
      const token = signToken({ sub: user.id, email: user.email, name: user.name });
      return res.redirect(`${base}/auth/callback?token=${encodeURIComponent(token)}`);
    }
  } catch (e: any) {
    return res.status(500).json({ success: false, error: 'OAuth flow failed' } satisfies ApiResponse);
  }
});

export default router;
