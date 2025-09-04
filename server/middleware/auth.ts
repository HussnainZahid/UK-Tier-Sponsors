import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface JwtPayload {
  sub: string; // user id
  email: string;
  name: string;
  iat: number;
  exp: number;
}

export function getJwtSecret(): string {
  const secret = process.env.JWT_SECRET || process.env.VITE_JWT_SECRET;
  return secret || 'dev-secret-change-me';
}

export function signToken(payload: { sub: string; email: string; name: string }): string {
  return jwt.sign(payload, getJwtSecret(), { expiresIn: '7d' });
}

export function authenticate(req: Request & { user?: JwtPayload }, res: Response, next: NextFunction) {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, error: 'Unauthorized' });
  }
  const token = auth.slice('Bearer '.length);
  try {
    const decoded = jwt.verify(token, getJwtSecret()) as JwtPayload;
    req.user = decoded;
    next();
  } catch (e) {
    return res.status(401).json({ success: false, error: 'Invalid token' });
  }
}
