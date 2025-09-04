import { RequestHandler } from "express";
import {
  SponsorSearchFilters,
  SponsorSearchResponse,
  SponsorStats,
  ApiResponse,
  SponsorType,
  SponsorRoute,
  Sponsor
} from "../../shared/api";
import { mockSponsors, getUniqueIndustries, getUniqueLocations } from "../data/mockSponsors";

// Search sponsors with filters and pagination
export const searchSponsors: RequestHandler = (req, res) => {
  try {
    const filters: SponsorSearchFilters = {
      query: req.query.query as string,
      type: req.query.type as SponsorType,
      route: req.query.route as SponsorRoute,
      location: req.query.location as string,
      industry: req.query.industry as string,
      page: parseInt(req.query.page as string) || 1,
      limit: parseInt(req.query.limit as string) || 20,
      sortBy: (req.query.sortBy as any) || "name",
      sortOrder: (req.query.sortOrder as any) || "asc",
    };

    // Filter sponsors based on criteria
    let filteredSponsors = mockSponsors.filter(sponsor => {
      // Text search in organization name, location, and industry
      if (filters.query) {
        const query = filters.query.toLowerCase();
        const searchText = [
          sponsor.organisationName,
          sponsor.townCity,
          sponsor.county,
          sponsor.industry
        ].join(" ").toLowerCase();
        
        if (!searchText.includes(query)) {
          return false;
        }
      }

      // Filter by sponsor type
      if (filters.type && sponsor.type !== filters.type) {
        return false;
      }

      // Filter by route
      if (filters.route && sponsor.route !== filters.route) {
        return false;
      }

      // Filter by location (matches city or county)
      if (filters.location) {
        const location = filters.location.toLowerCase();
        const sponsorLocation = [sponsor.townCity, sponsor.county]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();
        
        if (!sponsorLocation.includes(location)) {
          return false;
        }
      }

      // Filter by industry
      if (filters.industry) {
        const industry = filters.industry.toLowerCase();
        const sponsorIndustry = (sponsor.industry || "").toLowerCase();
        
        if (!sponsorIndustry.includes(industry)) {
          return false;
        }
      }

      return true;
    });

    // Sort sponsors
    filteredSponsors.sort((a, b) => {
      let aValue: any;
      let bValue: any;

      switch (filters.sortBy) {
        case "name":
          aValue = a.organisationName.toLowerCase();
          bValue = b.organisationName.toLowerCase();
          break;
        case "location":
          aValue = a.townCity.toLowerCase();
          bValue = b.townCity.toLowerCase();
          break;
        case "dateAdded":
          aValue = new Date(a.dateAdded);
          bValue = new Date(b.dateAdded);
          break;
        default:
          aValue = a.organisationName.toLowerCase();
          bValue = b.organisationName.toLowerCase();
      }

      if (aValue < bValue) return filters.sortOrder === "asc" ? -1 : 1;
      if (aValue > bValue) return filters.sortOrder === "asc" ? 1 : -1;
      return 0;
    });

    // Paginate results
    const total = filteredSponsors.length;
    const totalPages = Math.ceil(total / filters.limit);
    const startIndex = (filters.page - 1) * filters.limit;
    const endIndex = startIndex + filters.limit;
    const sponsors = filteredSponsors.slice(startIndex, endIndex);

    const response: SponsorSearchResponse = {
      sponsors,
      total,
      page: filters.page,
      limit: filters.limit,
      totalPages,
      hasNext: filters.page < totalPages,
      hasPrev: filters.page > 1,
    };

    const apiResponse: ApiResponse<SponsorSearchResponse> = {
      success: true,
      data: response,
    };

    res.json(apiResponse);
  } catch (error) {
    console.error("Error searching sponsors:", error);
    const apiResponse: ApiResponse = {
      success: false,
      error: "Failed to search sponsors",
    };
    res.status(500).json(apiResponse);
  }
};

// Get sponsor statistics
export const getSponsorStats: RequestHandler = (req, res) => {
  try {
    // Calculate stats from mock data
    const totalSponsors = mockSponsors.length;

    // Group by type
    const byType = mockSponsors.reduce((acc, sponsor) => {
      acc[sponsor.type] = (acc[sponsor.type] || 0) + 1;
      return acc;
    }, {} as Record<SponsorType, number>);

    // Group by route
    const byRoute = mockSponsors.reduce((acc, sponsor) => {
      acc[sponsor.route] = (acc[sponsor.route] || 0) + 1;
      return acc;
    }, {} as Record<SponsorRoute, number>);

    // Top industries
    const industriesCounts = mockSponsors.reduce((acc, sponsor) => {
      if (sponsor.industry) {
        acc[sponsor.industry] = (acc[sponsor.industry] || 0) + 1;
      }
      return acc;
    }, {} as Record<string, number>);

    const topIndustries = Object.entries(industriesCounts)
      .map(([industry, count]) => ({ industry, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    // Top locations
    const locationCounts = mockSponsors.reduce((acc, sponsor) => {
      const location = sponsor.county 
        ? `${sponsor.townCity}, ${sponsor.county}`
        : sponsor.townCity;
      acc[location] = (acc[location] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const topLocations = Object.entries(locationCounts)
      .map(([location, count]) => ({ location, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    // Recently added (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const recentlyAdded = mockSponsors.filter(sponsor => 
      new Date(sponsor.dateAdded) >= thirtyDaysAgo
    ).length;

    const stats: SponsorStats = {
      totalSponsors,
      byType,
      byRoute,
      topIndustries,
      topLocations,
      recentlyAdded,
    };

    const apiResponse: ApiResponse<SponsorStats> = {
      success: true,
      data: stats,
    };

    res.json(apiResponse);
  } catch (error) {
    console.error("Error getting sponsor stats:", error);
    const apiResponse: ApiResponse = {
      success: false,
      error: "Failed to get sponsor statistics",
    };
    res.status(500).json(apiResponse);
  }
};

// Get a specific sponsor by ID
export const getSponsorById: RequestHandler = (req, res) => {
  try {
    const { id } = req.params;
    const sponsor = mockSponsors.find(s => s.id === id);

    if (!sponsor) {
      const apiResponse: ApiResponse = {
        success: false,
        error: "Sponsor not found",
      };
      return res.status(404).json(apiResponse);
    }

    const apiResponse: ApiResponse<Sponsor> = {
      success: true,
      data: sponsor,
    };

    res.json(apiResponse);
  } catch (error) {
    console.error("Error getting sponsor by ID:", error);
    const apiResponse: ApiResponse = {
      success: false,
      error: "Failed to get sponsor",
    };
    res.status(500).json(apiResponse);
  }
};

// Get all unique industries
export const getIndustries: RequestHandler = (req, res) => {
  try {
    const industries = getUniqueIndustries();
    
    const apiResponse: ApiResponse<string[]> = {
      success: true,
      data: industries,
    };

    res.json(apiResponse);
  } catch (error) {
    console.error("Error getting industries:", error);
    const apiResponse: ApiResponse = {
      success: false,
      error: "Failed to get industries",
    };
    res.status(500).json(apiResponse);
  }
};

// Get all unique locations
export const getLocations: RequestHandler = (req, res) => {
  try {
    const locations = getUniqueLocations();
    
    const apiResponse: ApiResponse<string[]> = {
      success: true,
      data: locations,
    };

    res.json(apiResponse);
  } catch (error) {
    console.error("Error getting locations:", error);
    const apiResponse: ApiResponse = {
      success: false,
      error: "Failed to get locations",
    };
    res.status(500).json(apiResponse);
  }
};
