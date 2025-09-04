import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Mail, Shield } from 'lucide-react';
import { toast } from 'sonner';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch('/api/auth/password/reset', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email }) });
      const json = await res.json();
      if (!json.success) throw new Error(json.error || 'Request failed');
      toast.success('If an account exists for that email, a reset link will be sent.');
    } catch (e: any) {
      toast.error(e?.message || 'Could not process request');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-50 via-background to-brand-100/20">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          <div className="flex items-center gap-2 mb-4">
            <Shield className="w-5 h-5 text-brand-500" />
            <h1 className="text-2xl font-bold">Reset your password</h1>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Request reset link</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={submit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input id="email" type="email" required className="pl-10" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
                  </div>
                </div>
                <Button type="submit" className="w-full" disabled={loading}>{loading ? 'Sending…' : 'Send Reset Link'}</Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
