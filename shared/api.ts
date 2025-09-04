/**
 * Shared code between client and server
 * Types and interfaces for UK Tier Sponsors application
 */

/**
 * Example response type for /api/demo
 */
export interface DemoResponse {
  message: string;
}

/**
 * Sponsor data structure based on UK government register
 */
export interface Sponsor {
  id: string;
  organisationName: string;
  townCity: string;
  county?: string;
  type: SponsorType;
  route: SponsorRoute;
  dateAdded: string;
  sponsorLicenceNumber?: string;
  website?: string;
  industry?: string;
  employees?: number;
  description?: string;
}

/**
 * Types of sponsors
 */
export enum SponsorType {
  WORKER = "Worker",
  TEMPORARY_WORKER = "Temporary Worker",
  STUDENT = "Student",
}

/**
 * Immigration routes sponsors can support
 */
export enum SponsorRoute {
  SKILLED_WORKER = "Skilled Worker",
  HEALTH_AND_CARE_WORKER = "Health and Care Worker",
  SEASONAL_WORKER = "Seasonal Worker",
  CHARITY_WORKER = "Charity Worker",
  RELIGIOUS_WORKER = "Religious Worker",
  INTERNATIONAL_SPORTSPERSON = "International Sportsperson",
  CREATIVE_WORKER = "Creative Worker",
  GLOBAL_TALENT = "Global Talent",
  STUDENT = "Student",
}

/**
 * Search filters for sponsors
 */
export interface SponsorSearchFilters {
  query?: string;
  type?: SponsorType;
  route?: SponsorRoute;
  location?: string;
  industry?: string;
  page?: number;
  limit?: number;
  sortBy?: 'name' | 'location' | 'dateAdded';
  sortOrder?: 'asc' | 'desc';
}

/**
 * Paginated search response
 */
export interface SponsorSearchResponse {
  sponsors: Sponsor[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

/**
 * Statistics for dashboard
 */
export interface SponsorStats {
  totalSponsors: number;
  byType: Record<SponsorType, number>;
  byRoute: Record<SponsorRoute, number>;
  topIndustries: Array<{ industry: string; count: number }>;
  topLocations: Array<{ location: string; count: number }>;
  recentlyAdded: number;
}

/**
 * Industry classification
 */
export interface Industry {
  code: string;
  name: string;
  description?: string;
  sponsorCount: number;
}

/**
 * Location data
 */
export interface Location {
  name: string;
  county?: string;
  sponsorCount: number;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

/**
 * API Response wrapper
 */
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

/**
 * Search suggestions
 */
export interface SearchSuggestion {
  type: 'company' | 'location' | 'industry';
  value: string;
  count: number;
}

/**
 * Data section types for sidebar functionality
 */
export interface SponsorData {
  Company: string;
  Website?: string;
  "Social website"?: string;
  Town: string;
  Industry: string;
  "Main tier": string;
  "Sub tier": string;
  "Date Added"?: string;
}

export interface DataSection {
  id: string;
  name: string;
  count: number;
  data: SponsorData[];
}

export type DataSectionType = 'all' | 'recent' | 'deleted';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  company?: string | null;
}

export interface AuthSuccessResponse {
  token: string;
  user: AuthUser;
}
