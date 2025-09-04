import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Search, 
  Download, 
  Filter, 
  ExternalLink, 
  Building2, 
  MapPin, 
  Calendar,
  ArrowUpDown,
  ArrowUp,
  ArrowDown
} from "lucide-react";
import { SponsorData } from "@shared/api";
import { cn } from "@/lib/utils";

interface DataTableProps {
  data: SponsorData[];
  title: string;
  description: string;
  showDateAdded?: boolean;
  onDownload?: () => void;
}

type SortField = 'Company' | 'Town' | 'Industry' | 'Date Added';
type SortOrder = 'asc' | 'desc';

export default function DataTable({ 
  data, 
  title, 
  description, 
  showDateAdded = true,
  onDownload 
}: DataTableProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [industryFilter, setIndustryFilter] = useState<string>("all");
  const [sortField, setSortField] = useState<SortField>("Company");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  // Get unique industries for filter (excluding empty values)
  const industries = useMemo(() => {
    const unique = [...new Set(data.map(item => item.Industry))]
      .filter(industry => industry && industry.trim() !== '') // Filter out empty values
      .sort();
    return unique;
  }, [data]);

  // Filter and sort data
  const filteredAndSortedData = useMemo(() => {
    let filtered = data.filter(item => {
      const matchesSearch = searchQuery === "" || 
        item.Company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.Town.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.Industry.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesIndustry = industryFilter === "all" || item.Industry === industryFilter;
      
      return matchesSearch && matchesIndustry;
    });

    // Sort data
    filtered.sort((a, b) => {
      let aValue: string | Date = "";
      let bValue: string | Date = "";

      switch (sortField) {
        case "Company":
          aValue = a.Company.toLowerCase();
          bValue = b.Company.toLowerCase();
          break;
        case "Town":
          aValue = a.Town.toLowerCase();
          bValue = b.Town.toLowerCase();
          break;
        case "Industry":
          aValue = a.Industry.toLowerCase();
          bValue = b.Industry.toLowerCase();
          break;
        case "Date Added":
          aValue = a["Date Added"] ? new Date(a["Date Added"]) : new Date(0);
          bValue = b["Date Added"] ? new Date(b["Date Added"]) : new Date(0);
          break;
        default:
          aValue = a.Company.toLowerCase();
          bValue = b.Company.toLowerCase();
      }

      if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [data, searchQuery, industryFilter, sortField, sortOrder]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredAndSortedData.slice(startIndex, startIndex + itemsPerPage);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) return <ArrowUpDown className="w-4 h-4" />;
    return sortOrder === 'asc' ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />;
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A";
    try {
      return new Date(dateString).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  const getTierColor = (tier: string) => {
    if (tier.includes('A rating')) return "bg-success-100 text-success-800 border-success-200";
    if (tier.includes('B rating')) return "bg-warning-100 text-warning-800 border-warning-200";
    return "bg-muted text-muted-foreground";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">{title}</h1>
          <p className="text-muted-foreground">{description}</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="text-sm">
            {filteredAndSortedData.length.toLocaleString()} sponsors
          </Badge>
          {onDownload && (
            <Button onClick={onDownload} variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
          )}
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Search & Filter
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Input
                placeholder="Search companies, towns, industries..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />
            </div>
            <div>
              <Select value={industryFilter} onValueChange={setIndustryFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All industries" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Industries</SelectItem>
                  {industries.map((industry) => (
                    <SelectItem key={industry} value={industry || 'unknown'}>
                      {industry || 'Unknown Industry'}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Select 
                value={sortField} 
                onValueChange={(value) => setSortField(value as SortField)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sort by..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Company">Sort by Company</SelectItem>
                  <SelectItem value="Town">Sort by Location</SelectItem>
                  <SelectItem value="Industry">Sort by Industry</SelectItem>
                  {showDateAdded && (
                    <SelectItem value="Date Added">Sort by Date Added</SelectItem>
                  )}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Data Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b bg-muted/50">
                <tr>
                  <th className="text-left p-4">
                    <Button 
                      variant="ghost" 
                      onClick={() => handleSort("Company")}
                      className="font-semibold h-auto p-0"
                    >
                      Company {getSortIcon("Company")}
                    </Button>
                  </th>
                  <th className="text-left p-4">
                    <Button 
                      variant="ghost" 
                      onClick={() => handleSort("Town")}
                      className="font-semibold h-auto p-0"
                    >
                      Location {getSortIcon("Town")}
                    </Button>
                  </th>
                  <th className="text-left p-4">
                    <Button 
                      variant="ghost" 
                      onClick={() => handleSort("Industry")}
                      className="font-semibold h-auto p-0"
                    >
                      Industry {getSortIcon("Industry")}
                    </Button>
                  </th>
                  <th className="text-left p-4">Tier & Route</th>
                  {showDateAdded && (
                    <th className="text-left p-4">
                      <Button 
                        variant="ghost" 
                        onClick={() => handleSort("Date Added")}
                        className="font-semibold h-auto p-0"
                      >
                        Date Added {getSortIcon("Date Added")}
                      </Button>
                    </th>
                  )}
                  <th className="text-left p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.map((sponsor, index) => (
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
                    {showDateAdded && (
                      <td className="p-4">
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Calendar className="w-3 h-3" />
                          {formatDate(sponsor["Date Added"])}
                        </div>
                      </td>
                    )}
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
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between p-4 border-t">
              <div className="text-sm text-muted-foreground">
                Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredAndSortedData.length)} of {filteredAndSortedData.length} results
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                <div className="flex items-center gap-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }
                    
                    return (
                      <Button
                        key={pageNum}
                        variant={currentPage === pageNum ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCurrentPage(pageNum)}
                      >
                        {pageNum}
                      </Button>
                    );
                  })}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
