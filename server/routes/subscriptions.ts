import { Router } from 'express';
import { Subscription } from '../models/Subscription';
import type { ApiResponse } from '../../shared/api';

const router = Router();

router.post('/subscribe', async (req, res) => {
  try {
    const { email, plan } = req.body as { email: string; plan?: 'free'|'pro'|'enterprise' };
    if (!email) return res.status(400).json({ success: false, error: 'Email is required' } as ApiResponse);
    const sub = await (Subscription as any).findOneAndUpdate(
      { email: email.toLowerCase() },
      { $setOnInsert: { plan: plan || 'free', status: 'active' } },
      { upsert: true, new: true }
    ).lean();
    return res.json({ success: true, data: sub } as ApiResponse);
  } catch (e) {
    return res.status(500).json({ success: false, error: 'Subscription failed' } as ApiResponse);
  }
});

router.post('/status', async (req, res) => {
  try {
    const { email } = req.body as { email: string };
    if (!email) return res.status(400).json({ success: false, error: 'Email is required' } as ApiResponse);
    const sub = await (Subscription as any).findOne({ email: email.toLowerCase() }).lean();
    return res.json({ success: true, data: sub } as ApiResponse);
  } catch (e) {
    return res.status(500).json({ success: false, error: 'Failed to get status' } as ApiResponse);
  }
});

export default router;
