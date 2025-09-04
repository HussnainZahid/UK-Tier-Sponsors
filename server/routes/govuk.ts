import { Router } from 'express';
import axios from 'axios';
import type { ApiResponse } from '../../shared/api';

const router = Router();

// Simple in-memory cache with TTL
const cache = new Map<string, { ts: number; payload: any }>();
const TTL_MS = 60 * 60 * 1000; // 1 hour

router.get('/search', async (req, res) => {
  const q = (req.query.q as string) || 'visa sponsor';
  const page = parseInt((req.query.page as string) || '1', 10);
  const perPage = Math.min(parseInt((req.query.per_page as string) || '20', 10), 50);
  const key = `${q}::${page}::${perPage}`;

  const useCache = () => {
    const cached = cache.get(key);
    if (cached && Date.now() - cached.ts < TTL_MS) {
      return cached.payload;
    }
    return null;
  };

  try {
    // Serve fresh if possible
    const url = 'https://www.gov.uk/api/search.json';
    const { data } = await axios.get(url, {
      timeout: 15000,
      params: { q, page, count: perPage },
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'UK-Tier-Sponsors/1.0 (+https://uktiersponsors.co.uk)'
      }
    });

    const items = (data?.results || []).map((r: any) => ({
      title: r.title,
      description: r.description,
      link: r.link?.startsWith('http') ? r.link : `https://www.gov.uk${r.link || ''}`,
      format: r.format,
      public_timestamp: r.public_timestamp,
      content_store_document_type: r.content_store_document_type,
    }));

    const payload = { success: true, data: { total: data?.total ?? items.length, items } } as ApiResponse;
    cache.set(key, { ts: Date.now(), payload });
    return res.json(payload);
  } catch (e) {
    const cached = useCache();
    if (cached) {
      return res.json(cached);
    }
    // Return 200 with empty items to avoid client error toast; include message
    return res.json({ success: true, data: { total: 0, items: [] }, message: 'Using empty fallback due to upstream error' } as ApiResponse);
  }
});

export default router;
