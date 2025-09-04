import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, ExternalLink, BookOpen } from 'lucide-react';
import { toast } from 'sonner';

interface GovItem { title: string; description: string; link: string; format?: string; public_timestamp?: string }

export default function Resources() {
  const [q, setQ] = useState('visa sponsor');
  const [items, setItems] = useState<GovItem[]>([]);
  const [loading, setLoading] = useState(false);

  const isOfficialGovUk = (link: string) => {
    try {
      const u = new URL(link);
      return u.hostname === 'gov.uk' || u.hostname === 'www.gov.uk' || u.hostname.endsWith('.gov.uk');
    } catch {
      return false;
    }
  };

  const runSearch = async (query: string) => {
    try {
      setLoading(true);
      const res = await fetch(`/api/govuk/search?q=${encodeURIComponent(query)}&per_page=24`);
      if (!res.ok) throw new Error('Failed to fetch GOV.UK resources');
      const json = await res.json();
      const raw: GovItem[] = json?.data?.items || [];
      const officialOnly = raw.filter((it) => isOfficialGovUk(it.link));
      setItems(officialOnly);
    } catch (e: any) {
      toast.error(e?.message || 'Could not load GOV.UK resources');
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { runSearch(q); }, []);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-brand-500/10 flex items-center justify-center">
            <BookOpen className="w-6 h-6 text-brand-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Official GOV.UK Resources</h1>
            <p className="text-muted-foreground">Curated content from GOV.UK relevant to visas and sponsors.</p>
          </div>
        </div>

        <div className="flex gap-2 mb-2">
          <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search GOV.UK (e.g., Skilled Worker visa)" />
          <Button onClick={() => runSearch(q)} disabled={loading}>
            <Search className="w-4 h-4 mr-2" /> Search
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mb-8">Showing only official GOV.UK links (domains ending with .gov.uk).</p>

        {items.length === 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">UK Home Office Register</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">Official register of licensed sponsors (workers).</p>
                <a className="text-brand-600 hover:underline inline-flex items-center gap-1" href="https://www.gov.uk/government/publications/register-of-licensed-sponsors-workers" target="_blank" rel="noopener noreferrer">
                  Visit GOV.UK <ExternalLink className="w-4 h-4" />
                </a>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-base">UK Visas & Immigration (UKVI)</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">Guidance and services from UKVI.</p>
                <a className="text-brand-600 hover:underline inline-flex items-center gap-1" href="https://www.gov.uk/government/organisations/uk-visas-and-immigration" target="_blank" rel="noopener noreferrer">
                  Visit GOV.UK <ExternalLink className="w-4 h-4" />
                </a>
              </CardContent>
            </Card>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((it) => (
            <Card key={it.link} className="h-full">
              <CardHeader>
                <CardTitle className="line-clamp-2 text-base">{it.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground line-clamp-4 mb-4">{it.description}</p>
                <div className="flex items-center justify-between">
                  <Badge variant="secondary">{it.format || 'document'}</Badge>
                  <a href={it.link} target="_blank" rel="noopener noreferrer" className="text-brand-600 hover:underline flex items-center gap-1">
                    View <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
