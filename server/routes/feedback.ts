import { Router } from 'express';
import { Feedback } from '../models/Feedback';
import type { ApiResponse } from '../../shared/api';

const router = Router();

router.post('/', async (req, res) => {
  try {
    const { email, message, rating, page, userId } = req.body as any;
    if (!message || typeof message !== 'string') return res.status(400).json({ success: false, error: 'Message is required' } as ApiResponse);
    const fb = await (Feedback as any).create({ email: email || null, message, rating, page, userId: userId || null });
    return res.json({ success: true, data: { id: fb.id } } as ApiResponse);
  } catch (e) {
    return res.status(500).json({ success: false, error: 'Failed to submit feedback' } as ApiResponse);
  }
});

router.get('/', async (_req, res) => {
  try {
    const list = await (Feedback as any).find().sort({ createdAt: -1 }).limit(200).lean();
    return res.json({ success: true, data: list } as ApiResponse);
  } catch (e) {
    return res.status(500).json({ success: false, error: 'Failed to load feedback' } as ApiResponse);
  }
});

export default router;
