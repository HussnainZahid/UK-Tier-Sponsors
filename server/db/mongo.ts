import mongoose from 'mongoose';

let isConnected = false;

export async function connectMongo(): Promise<typeof mongoose | null> {
  if (isConnected) return mongoose;
  const uri = process.env.MONGODB_URI || '';
  if (!uri) {
    console.warn('[mongo] MONGODB_URI not set; API features requiring DB will be disabled.');
    return null;
  }
  try {
    await mongoose.connect(uri, { dbName: process.env.MONGODB_DB || undefined });
    isConnected = true;
    console.log('[mongo] connected');
    return mongoose;
  } catch (err) {
    console.error('[mongo] connection error', err);
    return null;
  }
}
