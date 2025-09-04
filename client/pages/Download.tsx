import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import type { ApiResponse, DataSectionType, SponsorData } from "@shared/api";
import { toCsv } from "@/lib/csv";

export default function Download() {
  const { type } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const run = async () => {
      const t = (type as DataSectionType) || "all";
      if (!["all", "recent", "deleted"].includes(t)) {
        toast.error("Invalid download type");
        navigate("/data/export");
        return;
      }
      try {
        const res = await fetch(`/api/data/${t}`);
        const json = (await res.json()) as ApiResponse<SponsorData[]>;
        if (!json.success || !json.data) throw new Error(json.error || "Download failed");
        const csv = toCsv(json.data);
        const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        const date = new Date().toISOString().slice(0, 10);
        a.href = url;
        a.download = `uktier-sponsors-${t}-${date}.csv`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        navigate("/data/export");
      } catch (e: any) {
        toast.error(e?.message || "Download failed");
        navigate("/data/export");
      }
    };
    run();
  }, [type, navigate]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardContent className="flex flex-col items-center justify-center p-8">
          <Loader2 className="h-8 w-8 animate-spin text-brand-600 mb-4" />
          <h2 className="text-xl font-semibold text-foreground mb-2">Preparing download...</h2>
          <p className="text-muted-foreground text-center">Your CSV will start downloading automatically.</p>
        </CardContent>
      </Card>
    </div>
  );
}
