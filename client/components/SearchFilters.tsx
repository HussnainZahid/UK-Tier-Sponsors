import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SponsorSearchFilters, SponsorType, SponsorRoute } from "@shared/api";
import { Search, Filter, X, MapPin, Building2, UserCheck } from "lucide-react";

interface SearchFiltersProps {
  filters: SponsorSearchFilters;
  onFiltersChange: (filters: SponsorSearchFilters) => void;
  onSearch: () => void;
  loading?: boolean;
}

export default function SearchFilters({ 
  filters, 
  onFiltersChange, 
  onSearch, 
  loading = false 
}: SearchFiltersProps) {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleFilterChange = (key: keyof SponsorSearchFilters, value: any) => {
    onFiltersChange({
      ...filters,
      [key]: value,
    });
  };

  const clearFilters = () => {
    onFiltersChange({
      query: "",
      page: 1,
      limit: 20,
      sortBy: "name",
      sortOrder: "asc",
    });
  };

  const hasActiveFilters = !!(
    filters.type ||
    filters.route ||
    filters.location ||
    filters.industry
  );

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Search className="w-5 h-5" />
          Search UK Visa Sponsors
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Main Search */}
        <div className="flex gap-2">
          <div className="flex-1">
            <Input
              placeholder="Search by company name, location, or industry..."
              value={filters.query || ""}
              onChange={(e) => handleFilterChange("query", e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && onSearch()}
              className="h-12 text-lg"
            />
          </div>
          <Button 
            onClick={onSearch}
            disabled={loading}
            size="lg"
            className="h-12 px-8"
          >
            <Search className="w-4 h-4 mr-2" />
            Search
          </Button>
        </div>

        {/* Quick Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="type" className="flex items-center gap-2 mb-2">
              <UserCheck className="w-4 h-4" />
              Sponsor Type
            </Label>
            <Select
              value={filters.type || undefined}
              onValueChange={(value) => handleFilterChange("type", value === "all" ? undefined : value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="All types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All types</SelectItem>
                {Object.values(SponsorType).map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="route" className="flex items-center gap-2 mb-2">
              <Building2 className="w-4 h-4" />
              Visa Route
            </Label>
            <Select
              value={filters.route || undefined}
              onValueChange={(value) => handleFilterChange("route", value === "all" ? undefined : value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="All routes" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All routes</SelectItem>
                {Object.values(SponsorRoute).map((route) => (
                  <SelectItem key={route} value={route}>
                    {route}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="location" className="flex items-center gap-2 mb-2">
              <MapPin className="w-4 h-4" />
              Location
            </Label>
            <Input
              placeholder="City, county, or postcode"
              value={filters.location || ""}
              onChange={(e) => handleFilterChange("location", e.target.value)}
            />
          </div>
        </div>

        {/* Advanced Filters Toggle */}
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="text-sm"
          >
            <Filter className="w-4 h-4 mr-2" />
            {showAdvanced ? "Hide" : "Show"} Advanced Filters
          </Button>

          {hasActiveFilters && (
            <Button
              variant="outline"
              size="sm"
              onClick={clearFilters}
            >
              <X className="w-4 h-4 mr-2" />
              Clear Filters
            </Button>
          )}
        </div>

        {/* Advanced Filters */}
        {showAdvanced && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-muted/50 rounded-lg">
            <div>
              <Label htmlFor="industry" className="mb-2 block">
                Industry
              </Label>
              <Input
                placeholder="e.g., Technology, Healthcare"
                value={filters.industry || ""}
                onChange={(e) => handleFilterChange("industry", e.target.value)}
              />
            </div>
            
            <div>
              <Label htmlFor="sortBy" className="mb-2 block">
                Sort By
              </Label>
              <Select
                value={filters.sortBy || "name"}
                onValueChange={(value) => handleFilterChange("sortBy", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Company Name</SelectItem>
                  <SelectItem value="location">Location</SelectItem>
                  <SelectItem value="dateAdded">Date Added</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}

        {/* Active Filters */}
        {hasActiveFilters && (
          <div className="flex flex-wrap gap-2">
            {filters.type && (
              <Badge variant="secondary" className="gap-1">
                Type: {filters.type}
                <button onClick={() => handleFilterChange("type", undefined)}>
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            )}
            {filters.route && (
              <Badge variant="secondary" className="gap-1">
                Route: {filters.route}
                <button onClick={() => handleFilterChange("route", undefined)}>
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            )}
            {filters.location && (
              <Badge variant="secondary" className="gap-1">
                Location: {filters.location}
                <button onClick={() => handleFilterChange("location", undefined)}>
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            )}
            {filters.industry && (
              <Badge variant="secondary" className="gap-1">
                Industry: {filters.industry}
                <button onClick={() => handleFilterChange("industry", undefined)}>
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
