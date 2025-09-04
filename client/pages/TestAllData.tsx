import { useState, useEffect } from "react";

export default function TestAllData() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        console.log("Fetching data from /api/data/all");
        setLoading(true);
        const response = await fetch("/api/data/all");
        console.log("Response status:", response.status);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        console.log("API result:", result);
        
        if (result.success && result.data) {
          setData(result.data);
          console.log("Data loaded successfully:", result.data.length, "items");
        } else {
          throw new Error(result.error || "Failed to load data");
        }
      } catch (error) {
        console.error("Failed to load all data:", error);
        setError(error instanceof Error ? error.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

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
      <h1 className="text-2xl font-bold mb-4">All Sponsors Data (Test)</h1>
      <p className="mb-4">Successfully loaded {data.length} sponsors</p>
      
      {data.length > 0 && (
        <div className="bg-white border rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left">Company</th>
                <th className="px-4 py-2 text-left">Town</th>
                <th className="px-4 py-2 text-left">Industry</th>
                <th className="px-4 py-2 text-left">Main Tier</th>
              </tr>
            </thead>
            <tbody>
              {data.slice(0, 10).map((sponsor, index) => (
                <tr key={index} className="border-t">
                  <td className="px-4 py-2">{sponsor.Company}</td>
                  <td className="px-4 py-2">{sponsor.Town}</td>
                  <td className="px-4 py-2">{sponsor.Industry}</td>
                  <td className="px-4 py-2">{sponsor["Main tier"]}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {data.length > 10 && (
            <div className="px-4 py-2 bg-gray-50 text-sm text-gray-600">
              Showing first 10 of {data.length} sponsors
            </div>
          )}
        </div>
      )}
    </div>
  );
}
