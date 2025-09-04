import fs from 'fs';
import path from 'path';
import { randomUUID } from 'crypto';

export interface StoredUser {
  id: string;
  name: string;
  email: string;
  company?: string | null;
  passwordHash: string;
  createdAt: string;
  updatedAt: string;
}

const dataDir = path.resolve(process.cwd(), 'server', 'data');
const usersFile = path.join(dataDir, 'users.json');

function ensureStore(): void {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  if (!fs.existsSync(usersFile)) {
    fs.writeFileSync(usersFile, JSON.stringify({ users: [] }, null, 2));
  }
}

function readStore(): { users: StoredUser[] } {
  ensureStore();
  try {
    const raw = fs.readFileSync(usersFile, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return { users: [] };
  }
}

function writeStore(store: { users: StoredUser[] }): void {
  ensureStore();
  fs.writeFileSync(usersFile, JSON.stringify(store, null, 2));
}

export const userStore = {
  async findByEmail(email: string): Promise<StoredUser | undefined> {
    const { users } = readStore();
    return users.find(u => u.email.toLowerCase() === email.toLowerCase());
  },
  async findById(id: string): Promise<StoredUser | undefined> {
    const { users } = readStore();
    return users.find(u => u.id === id);
  },
  async create(input: { name: string; email: string; passwordHash: string; company?: string | null }): Promise<StoredUser> {
    const existing = await this.findByEmail(input.email);
    if (existing) throw new Error('User already exists');
    const now = new Date().toISOString();
    const user: StoredUser = {
      id: randomUUID(),
      name: input.name,
      email: input.email,
      company: input.company ?? null,
      passwordHash: input.passwordHash,
      createdAt: now,
      updatedAt: now,
    };
    const store = readStore();
    store.users.push(user);
    writeStore(store);
    return user;
  },
  async update(id: string, updates: Partial<Omit<StoredUser, 'id' | 'createdAt'>>): Promise<StoredUser | undefined> {
    const store = readStore();
    const idx = store.users.findIndex(u => u.id === id);
    if (idx === -1) return undefined;
    const updated: StoredUser = {
      ...store.users[idx],
      ...updates,
      updatedAt: new Date().toISOString(),
    } as StoredUser;
    store.users[idx] = updated;
    writeStore(store);
    return updated;
  },
};
