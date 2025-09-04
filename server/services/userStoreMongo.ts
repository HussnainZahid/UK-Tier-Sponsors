import { User } from '../models/User';

export const userStoreMongo = {
  async findByEmail(email: string) {
    return (User as any).findOne({ email: email.toLowerCase() }).lean();
  },
  async findById(id: string) {
    return (User as any).findById(id).lean();
  },
  async create(input: { name: string; email: string; passwordHash: string; company?: string | null; provider?: 'local'|'google'|'github' }) {
    const user = await (User as any).create({ ...input, provider: input.provider || 'local' });
    return user.toObject();
  },
  async update(id: string, updates: any) {
    return (User as any).findByIdAndUpdate(id, { $set: updates }, { new: true }).lean();
  }
};
