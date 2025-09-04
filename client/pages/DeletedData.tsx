import { useState, useEffect } from "react";
import DataTable from "@/components/DataTable";
import { SponsorData, ApiResponse } from "@shared/api";

export default function DeletedData() {
  const [data, setData] = useState<SponsorData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

        const response = await fetch("/api/data/deleted", {
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
            console.error("Failed to load deleted data:", error.message);
          }
        } else {
          console.error("Failed to load deleted data:", error);
        }
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleDownload = () => {
    // Create CSV content - note deleted data doesn't have Website, Social website, or Date Added
    const headers = ["Company", "Town", "Industry", "Main Tier", "Sub Tier"];
    const csvContent = [
      headers.join(","),
      ...data.map(row => [
        `"${row.Company}"`,
        `"${row.Town}"`,
        `"${row.Industry}"`,
        `"${row["Main tier"]}"`,
        `"${row["Sub tier"]}"`
      ].join(","))
    ].join("\n");

    // Download file
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "uk-tier-sponsors-deleted-data.csv");
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
          <p className="text-muted-foreground">Loading deleted sponsor data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <DataTable
        data={data}
        title="Deleted Sponsors"
        description="Sponsors that have been removed from the UK tier sponsor register."
        showDateAdded={false} // Deleted data doesn't have date added
        onDownload={handleDownload}
      />
    </div>
  );
}
