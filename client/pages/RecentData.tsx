import { useState, useEffect } from "react";
import DataTable from "@/components/DataTable";
import { SponsorData, ApiResponse } from "@shared/api";

export default function RecentData() {
  const [data, setData] = useState<SponsorData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

        const response = await fetch("/api/data/recent", {
          signal: controller.signal,
          headers: {
            'Content-Type': 'application/json',
          },
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result: ApiResponse<SponsorData[]> = await response.json();
        if (result.success && result.data) {
          setData(result.data);
        } else {
          throw new Error(result.error || "API returned unsuccessful result");
        }
      } catch (error) {
        if (error instanceof Error) {
          if (error.name === 'AbortError') {
            console.warn('Data fetch request timed out');
          } else {
            console.error("Failed to load recent data:", error.message);
          }
        } else {
          console.error("Failed to load recent data:", error);
        }
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleDownload = () => {
    // Create CSV content
    const headers = ["Company", "Website", "Social Website", "Town", "Industry", "Main Tier", "Sub Tier", "Date Added"];
    const csvContent = [
      headers.join(","),
      ...data.map(row => [
        `"${row.Company}"`,
        `"${row.Website || ""}"`,
        `"${row["Social website"] || ""}"`,
        `"${row.Town}"`,
        `"${row.Industry}"`,
        `"${row["Main tier"]}"`,
        `"${row["Sub tier"]}"`,
        `"${row["Date Added"] || ""}"`
      ].join(","))
    ].join("\n");

    // Download file
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "uk-tier-sponsors-recent-data.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-500 mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading recent sponsor data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <DataTable
        data={data}
        title="Recent Sponsors"
        description="Recently added sponsors to the UK tier sponsor register, updated regularly."
        showDateAdded={true}
        onDownload={handleDownload}
      />
    </div>
  );
}
