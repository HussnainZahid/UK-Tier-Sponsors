import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { 
  Sponsor, 
  SponsorSearchFilters, 
  SponsorSearchResponse, 
  SponsorStats,
  ApiResponse 
} from "@shared/api";
import SearchFilters from "@/components/SearchFilters";
import SponsorCard from "@/components/SponsorCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Search, 
  TrendingUp, 
  Building2, 
  MapPin, 
  Users, 
  ChevronLeft, 
  ChevronRight,
  Info,
  Star,
  CheckCircle2
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Index() {
  const [filters, setFilters] = useState<SponsorSearchFilters>({
    query: "",
    page: 1,
    limit: 20,
    sortBy: "name",
    sortOrder: "asc",
  });
  
  const [hasSearched, setHasSearched] = useState(false);

  // Search query
  const {
    data: searchResults,
    isLoading: searchLoading,
    error: searchError,
    refetch: refetchSearch
  } = useQuery({
    queryKey: ["sponsors", filters],
    queryFn: async (): Promise<SponsorSearchResponse> => {
      const empty: SponsorSearchResponse = {
        sponsors: [],
        total: 0,
        page: filters.page ?? 1,
        limit: filters.limit ?? 20,
        totalPages: 0,
        hasNext: false,
        hasPrev: false,
      };

      try {
        const params = new URLSearchParams();
        Object.entries(filters).forEach(([key, value]) => {
          if (value !== undefined && value !== "") {
            params.append(key, value.toString());
          }
        });

        const url = `/api/sponsors/search?${params}`;
        console.log('Searching sponsors at:', url);

        const response = await fetch(url, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        console.log('Search response:', response.status, response.statusText);

        if (!response.ok) {
          console.warn('Search endpoint failed, returning empty results');
          return empty;
        }

        const result: ApiResponse<SponsorSearchResponse> = await response.json();
        console.log('Search result:', result);

        if (!result.success || !result.data) {
          console.warn('Search returned unsuccessful, returning empty results');
          return empty;
        }

        return result.data;
      } catch (error) {
        console.warn('Search fetch error, returning empty results:', error);
        return empty;
      }
    },
    enabled: hasSearched,
    retry: 2,
    retryDelay: 1000,
  });

  // Stats query for dashboard
  const { data: stats, error: statsError } = useQuery({
    queryKey: ["sponsors", "stats"],
    queryFn: async (): Promise<SponsorStats> => {
      console.log('Fetching sponsor stats from:', '/api/sponsors/stats');

      const defaultStats = (): SponsorStats => ({
        totalSponsors: 0,
        byType: {
          Worker: 0,
          "Temporary Worker": 0,
          Student: 0,
        } as any,
        byRoute: {
          "Skilled Worker": 0,
          "Health and Care Worker": 0,
          "Seasonal Worker": 0,
          "Charity Worker": 0,
          "Religious Worker": 0,
          "International Sportsperson": 0,
          "Creative Worker": 0,
          "Global Talent": 0,
          Student: 0,
        } as any,
        topIndustries: [],
        topLocations: [],
        recentlyAdded: 0,
      });

      const computeFallbackFromAllData = async (): Promise<SponsorStats> => {
        try {
          const res = await fetch('/api/data/all');
          if (!res.ok) throw new Error(`Fallback HTTP ${res.status}`);
          const json = (await res.json()) as ApiResponse<any[]>;
          const rows = json.data || [];
          const totalSponsors = rows.length;
          const topIndustriesMap: Record<string, number> = {};
          const topLocationsMap: Record<string, number> = {};
          let recentlyAdded = 0;
          const now = Date.now();
          const THIRTY_DAYS = 30 * 24 * 60 * 60 * 1000;
          for (const r of rows) {
            if (r.Industry) topIndustriesMap[r.Industry] = (topIndustriesMap[r.Industry] || 0) + 1;
            if (r.Town) topLocationsMap[r.Town] = (topLocationsMap[r.Town] || 0) + 1;
            const d = r['Date Added'] ? new Date(r['Date Added']).getTime() : 0;
            if (d && now - d <= THIRTY_DAYS) recentlyAdded++;
          }
          const topIndustries = Object.entries(topIndustriesMap)
            .map(([industry, count]) => ({ industry, count }))
            .sort((a, b) => b.count - a.count)
            .slice(0, 10);
          const topLocations = Object.entries(topLocationsMap)
            .map(([location, count]) => ({ location, count }))
            .sort((a, b) => b.count - a.count)
            .slice(0, 10);
          return {
            totalSponsors,
            byType: defaultStats().byType,
            byRoute: defaultStats().byRoute,
            topIndustries,
            topLocations,
            recentlyAdded,
          };
        } catch (e) {
          console.warn('Fallback all-data fetch failed, using default stats:', e);
          return defaultStats();
        }
      };

      try {
        const response = await fetch("/api/sponsors/stats", {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        console.log('Sponsor stats response:', response.status, response.statusText);

        if (!response.ok) {
          console.warn('Primary stats endpoint failed, using fallback');
          return await computeFallbackFromAllData();
        }

        const result: ApiResponse<SponsorStats> = await response.json();
        console.log('Sponsor stats result:', result);

        if (!result.success) {
          console.warn('Primary stats returned unsuccessful, using fallback');
          return await computeFallbackFromAllData();
        }

        return result.data!;
      } catch (error) {
        console.warn('Stats fetch error, using fallback:', error);
        return await computeFallbackFromAllData();
      }
    },
    retry: 0,
  });

  // Log any stats errors
  if (statsError) {
    console.error('Stats query error:', statsError);
  }

  const handleSearch = () => {
    setHasSearched(true);
    refetchSearch();
  };

  const handlePageChange = (newPage: number) => {
    setFilters({ ...filters, page: newPage });
  };

  const renderHeroSection = () => (
    <div className="bg-gradient-to-br from-brand-50 via-white to-brand-50 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 gap-8 items-center mb-12">
          <div className="text-left">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Find UK Visa Sponsors
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mb-6">
              Search the official UK Home Office register of licensed visa sponsors. We help you find Tier 2/Skilled Worker and other route sponsors, with clear filters by industry and location.
            </p>

            <div className="flex flex-wrap gap-4 mb-6">
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border">
                <CheckCircle2 className="w-5 h-5 text-success-500" />
                <span className="text-sm font-medium">Official Data Source</span>
              </div>
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border">
                <Star className="w-5 h-5 text-warning-500" />
                <span className="text-sm font-medium">Updated Regularly</span>
              </div>
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border">
                <Search className="w-5 h-5 text-brand-500" />
                <span className="text-sm font-medium">Advanced Search</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Button asChild size="lg" className="shadow">
                <a href="#search" aria-label="Start searching sponsors">Start searching</a>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/data/all" aria-label="Browse all sponsors">Browse all sponsors</Link>
              </Button>
              <Button asChild variant="ghost" size="lg" className="text-brand-700">
                <Link to="/resources" aria-label="GOV.UK resources">GOV.UK resources</Link>
              </Button>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-xl">
            <img
              src="/visa-sponsor-illustration.svg"
              alt="Licensed visa sponsorship in the UK"
              className="w-full h-auto rounded-xl shadow-lg ring-1 ring-black/5"
              loading="eager"
              width="640"
              height="400"
            />
            <img
              src="/uk-flag.svg"
              alt="United Kingdom flag"
              className="absolute -top-4 -right-4 w-24 h-auto rounded-md shadow-md ring-1 ring-black/5"
              loading="lazy"
              width="120"
              height="72"
            />
          </div>
        </div>

        {/* Quick Stats */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <Card className="text-center bg-white/50 backdrop-blur">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-brand-600 mb-2">
                  {stats.totalSponsors.toLocaleString()}
                </div>
                <div className="text-sm text-muted-foreground">Total Sponsors</div>
              </CardContent>
            </Card>
            
            <Card className="text-center bg-white/50 backdrop-blur">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-brand-600 mb-2">
                  {stats.topIndustries.length}
                </div>
                <div className="text-sm text-muted-foreground">Industries</div>
              </CardContent>
            </Card>
            
            <Card className="text-center bg-white/50 backdrop-blur">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-brand-600 mb-2">
                  {stats.topLocations.length}
                </div>
                <div className="text-sm text-muted-foreground">Locations</div>
              </CardContent>
            </Card>
            
            <Card className="text-center bg-white/50 backdrop-blur">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-brand-600 mb-2">
                  {stats.recentlyAdded}
                </div>
                <div className="text-sm text-muted-foreground">Added This Month</div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );

  const renderSearchResults = () => {
    if (searchError) {
      return (
        <Alert className="mb-6">
          <Info className="h-4 w-4" />
          <AlertDescription>
            {searchError instanceof Error ? searchError.message : "An error occurred while searching"}
          </AlertDescription>
        </Alert>
      );
    }

    if (searchLoading) {
      return (
        <div className="space-y-4">
          {[...Array(6)].map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <Skeleton className="h-6 w-20" />
                    <Skeleton className="h-6 w-24" />
                  </div>
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      );
    }

    if (!searchResults?.sponsors.length) {
      return (
        <Card className="text-center py-12">
          <CardContent>
            <div className="text-muted-foreground mb-4">
              <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-medium mb-2">No sponsors found</h3>
              <p>Try adjusting your search criteria or removing some filters</p>
            </div>
          </CardContent>
        </Card>
      );
    }

    return (
      <div className="space-y-6">
        {/* Results Header */}
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold text-foreground">
              Search Results
            </h2>
            <p className="text-muted-foreground">
              {searchResults.total.toLocaleString()} sponsors found
            </p>
          </div>
        </div>

        {/* Results Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {searchResults.sponsors.map((sponsor) => (
            <SponsorCard key={sponsor.id} sponsor={sponsor} />
          ))}
        </div>

        {/* Pagination */}
        {searchResults.totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-8">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(searchResults.page - 1)}
              disabled={!searchResults.hasPrev}
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </Button>
            
            <span className="text-sm text-muted-foreground px-4">
              Page {searchResults.page} of {searchResults.totalPages}
            </span>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(searchResults.page + 1)}
              disabled={!searchResults.hasNext}
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>
    );
  };

  const renderPopularCategories = () => {
    if (!stats) return null;

    return (
      <div className="bg-muted/20 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Popular Categories
            </h2>
            <p className="text-lg text-muted-foreground">
              Explore sponsors by the most common industries and locations
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Top Industries */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="w-5 h-5" />
                  Top Industries
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {stats.topIndustries.slice(0, 5).map((industry, index) => (
                    <div key={industry.industry} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 bg-brand-100 text-brand-700 rounded-full flex items-center justify-center text-sm font-medium">
                          {index + 1}
                        </div>
                        <span className="font-medium">{industry.industry}</span>
                      </div>
                      <Badge variant="secondary">
                        {industry.count.toLocaleString()}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Top Locations */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Top Locations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {stats.topLocations.slice(0, 5).map((location, index) => (
                    <div key={location.location} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 bg-brand-100 text-brand-700 rounded-full flex items-center justify-center text-sm font-medium">
                          {index + 1}
                        </div>
                        <span className="font-medium">{location.location}</span>
                      </div>
                      <Badge variant="secondary">
                        {location.count.toLocaleString()}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      {/* Hero Section */}
      {renderHeroSection()}

      {/* Search Section */}
      <div id="search" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <SearchFilters
          filters={filters}
          onFiltersChange={setFilters}
          onSearch={handleSearch}
          loading={searchLoading}
        />

        {/* Results */}
        {hasSearched && (
          <div className="mt-8">
            {renderSearchResults()}
          </div>
        )}
      </div>

      {/* Popular Categories - only show if no search has been performed */}
      {!hasSearched && renderPopularCategories()}
    </div>
  );
}
