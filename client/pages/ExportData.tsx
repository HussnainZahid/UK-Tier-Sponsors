import { useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Download, Database } from "lucide-react";
import { toast } from "sonner";
import type { ApiResponse, DataSectionType, SponsorData } from "../../shared/api";
import { toCsv, sponsorCsvFields as fields } from "@/lib/csv";

export default function ExportData() {
  const { data: stats } = useQuery({
    queryKey: ["data-stats"],
    queryFn: async () => {
      const res = await fetch("/api/data/stats");
      const json = (await res.json()) as ApiResponse<{ all: number; recent: number; deleted: number }>;
      if (!json.success || !json.data) throw new Error(json.error || "Failed to load stats");
      return json.data;
    },
  });

  const download = useCallback(async (type: DataSectionType) => {
    try {
      const res = await fetch(`/api/data/${type}`);
      const json = (await res.json()) as ApiResponse<SponsorData[]>;
      if (!json.success || !json.data) throw new Error(json.error || "Download failed");
      const csv = toCsv(json.data);
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      const date = new Date().toISOString().slice(0, 10);
      a.href = url;
      a.download = `uktier-sponsors-${type}-${date}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      toast.success(`Downloading ${type} data`);
    } catch (e: any) {
      toast.error(e?.message || `Failed to download ${type}`);
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-brand-500/10 flex items-center justify-center">
              <Database className="w-6 h-6 text-brand-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Export Sponsor Data</h1>
              <p className="text-muted-foreground">Download CSV files for all, recent, or removed sponsors.</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>All Sponsors</CardTitle>
              <CardDescription>Complete database export</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
              <Badge variant="secondary">{stats?.all ?? 0} rows</Badge>
              <Button onClick={() => download("all")}>
                <Download className="w-4 h-4 mr-2" />
                Download CSV
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Additions</CardTitle>
              <CardDescription>Newly added sponsors</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
              <Badge variant="secondary">{stats?.recent ?? 0} rows</Badge>
              <Button onClick={() => download("recent")}>
                <Download className="w-4 h-4 mr-2" />
                Download CSV
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Removed Sponsors</CardTitle>
              <CardDescription>Recently removed entries</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
              <Badge variant="secondary">{stats?.deleted ?? 0} rows</Badge>
              <Button onClick={() => download("deleted")}>
                <Download className="w-4 h-4 mr-2" />
                Download CSV
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="mt-10">
          <Separator />
          <p className="mt-4 text-sm text-muted-foreground">
            CSV headers: {fields.join(", ")}
          </p>
        </div>
      </div>
    </div>
  );
}
