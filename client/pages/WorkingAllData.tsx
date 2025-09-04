import { useState, useEffect } from "react";
import { SponsorData, ApiResponse } from "@shared/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Download, Search, ExternalLink, MapPin, Building2 } from "lucide-react";

export default function WorkingAllData() {
  const [data, setData] = useState<SponsorData[]>([]);
  const [filteredData, setFilteredData] = useState<SponsorData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

        const response = await fetch("/api/data/all", {
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
          setFilteredData(result.data);
        } else {
          throw new Error(result.error || "API returned unsuccessful result");
        }
      } catch (error) {
        let errorMessage = "Unknown error occurred";
        if (error instanceof Error) {
          if (error.name === 'AbortError') {
            errorMessage = "Request timed out. Please try again.";
          } else {
            errorMessage = error.message;
          }
        }
        console.error("Failed to load all data:", error);
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    if (searchQuery === "") {
      setFilteredData(data);
    } else {
      const filtered = data.filter(sponsor =>
        sponsor.Company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sponsor.Town.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sponsor.Industry.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredData(filtered);
    }
  }, [searchQuery, data]);

  const handleDownload = () => {
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

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "uk-tier-sponsors-all-data.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getTierColor = (tier: string) => {
    if (tier.includes('A rating')) return "bg-green-100 text-green-800 border-green-200";
    if (tier.includes('B rating')) return "bg-yellow-100 text-yellow-800 border-yellow-200";
    return "bg-gray-100 text-gray-800 border-gray-200";
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-500 mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading all sponsor data...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <h2 className="text-lg font-semibold text-red-800 mb-2">Error Loading Data</h2>
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">All Sponsors</h1>
          <p className="text-muted-foreground">Complete database of UK tier sponsors with full details and contact information.</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="text-sm">
            {filteredData.length.toLocaleString()} sponsors
          </Badge>
          <Button onClick={handleDownload} variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Download
          </Button>
        </div>
      </div>

      {/* Search */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="w-5 h-5" />
            Search & Filter
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Input
            placeholder="Search companies, towns, industries..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full"
          />
        </CardContent>
      </Card>

      {/* Data Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b bg-muted/50">
                <tr>
                  <th className="text-left p-4 font-semibold">Company</th>
                  <th className="text-left p-4 font-semibold">Location</th>
                  <th className="text-left p-4 font-semibold">Industry</th>
                  <th className="text-left p-4 font-semibold">Tier & Route</th>
                  <th className="text-left p-4 font-semibold">Date Added</th>
                  <th className="text-left p-4 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.slice(0, 20).map((sponsor, index) => (
                  <tr key={index} className="border-b hover:bg-muted/30 transition-colors">
                    <td className="p-4">
                      <div>
                        <div className="font-medium text-foreground">{sponsor.Company}</div>
                        {sponsor.Website && (
                          <a 
                            href={sponsor.Website} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-xs text-brand-600 hover:text-brand-700 flex items-center gap-1 mt-1"
                          >
                            Website <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <MapPin className="w-3 h-3" />
                        {sponsor.Town}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-1 text-sm">
                        <Building2 className="w-3 h-3 text-muted-foreground" />
                        {sponsor.Industry}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="space-y-1">
                        <Badge className={getTierColor(sponsor["Main tier"])}>
                          {sponsor["Main tier"]}
                        </Badge>
                        <div className="text-xs text-muted-foreground">
                          {sponsor["Sub tier"]}
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="text-sm text-muted-foreground">
                        {sponsor["Date Added"] ? new Date(sponsor["Date Added"]).toLocaleDateString('en-GB') : "N/A"}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        {sponsor.Website && (
                          <Button size="sm" variant="ghost" asChild>
                            <a 
                              href={sponsor.Website} 
                              target="_blank" 
                              rel="noopener noreferrer"
                            >
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {filteredData.length > 20 && (
              <div className="p-4 border-t bg-muted/20 text-center text-sm text-muted-foreground">
                Showing first 20 of {filteredData.length} results. Use search to filter or download full dataset.
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
