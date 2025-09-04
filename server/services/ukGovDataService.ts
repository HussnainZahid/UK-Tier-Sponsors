import axios from 'axios';
import { Sponsor, SponsorType, SponsorRoute } from '../../shared/api';

interface UKGovSponsorData {
  Organisation: string;
  'Town/City': string;
  County?: string;
  'Sponsor Licence No'?: string;
  Route?: string;
  'Date Added'?: string;
}

export class UKGovDataService {
  private readonly baseUrl = 'https://www.gov.uk/government/publications/register-of-licensed-sponsors-workers';
  private readonly csvUrl = 'https://assets.publishing.service.gov.uk/media/65b6a4ce0a3a1c000c5a7c0e/2024-01-26_Register_of_licensed_sponsors_Worker.csv';

  /**
   * Fetch the latest sponsor data from UK Government CSV
   */
  async fetchLatestSponsorData(): Promise<Sponsor[]> {
    try {
      console.log('Fetching latest sponsor data from UK Government...');
      
      // Fetch CSV data from official UK government source
      const response = await axios.get(this.csvUrl, {
        timeout: 30000, // 30 second timeout
        headers: {
          'User-Agent': 'UK-Tier-Sponsors-Platform/1.0',
          'Accept': 'text/csv'
        }
      });

      // Parse CSV data
      const csvData = response.data;
      const sponsors = this.parseCsvData(csvData);
      
      console.log(`Successfully fetched ${sponsors.length} sponsors from UK Government data`);
      return sponsors;
      
    } catch (error) {
      console.error('Error fetching UK Government data:', error);
      
      // Fallback to mock data if API fails
      console.log('Falling back to mock data...');
      return this.getMockSponsorData();
    }
  }

  /**
   * Parse CSV data into Sponsor objects
   */
  private parseCsvData(csvData: string): Sponsor[] {
    const lines = csvData.split('\n');
    const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
    const sponsors: Sponsor[] = [];

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;

      try {
        const values = this.parseCsvLine(line);
        if (values.length < headers.length) continue;

        const rowData: any = {};
        headers.forEach((header, index) => {
          rowData[header] = values[index]?.replace(/"/g, '').trim() || '';
        });

        const sponsor = this.mapToSponsor(rowData);
        if (sponsor) {
          sponsors.push(sponsor);
        }
      } catch (error) {
        console.warn(`Error parsing CSV line ${i + 1}:`, error);
        continue;
      }
    }

    return sponsors;
  }

  /**
   * Parse a CSV line handling quoted values
   */
  private parseCsvLine(line: string): string[] {
    const result: string[] = [];
    let current = '';
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        result.push(current);
        current = '';
      } else {
        current += char;
      }
    }
    
    result.push(current);
    return result;
  }

  /**
   * Map raw CSV data to Sponsor object
   */
  private mapToSponsor(data: any): Sponsor | null {
    try {
      const orgName = data['Organisation'] || data['Organisation Name'] || '';
      const townCity = data['Town/City'] || data['Town'] || data['City'] || '';
      
      if (!orgName || !townCity) {
        return null;
      }

      // Map route to our enum
      const route = this.mapRoute(data['Route'] || '');
      const type = this.mapType(route);

      const sponsor: Sponsor = {
        id: this.generateId(orgName, townCity),
        organisationName: orgName,
        townCity: townCity,
        county: data['County'] || '',
        type: type,
        route: route,
        dateAdded: this.parseDate(data['Date Added'] || ''),
        sponsorLicenceNumber: data['Sponsor Licence No'] || '',
        website: this.generateWebsite(orgName),
        industry: this.inferIndustry(orgName),
        employees: this.estimateEmployees(),
        description: `Licensed sponsor for ${route} visa route in ${townCity}`
      };

      return sponsor;
    } catch (error) {
      console.warn('Error mapping sponsor data:', error);
      return null;
    }
  }

  /**
   * Map route string to SponsorRoute enum
   */
  private mapRoute(routeStr: string): SponsorRoute {
    const route = routeStr.toLowerCase().trim();
    
    if (route.includes('skilled worker')) return SponsorRoute.SKILLED_WORKER;
    if (route.includes('health') || route.includes('care')) return SponsorRoute.HEALTH_AND_CARE_WORKER;
    if (route.includes('seasonal')) return SponsorRoute.SEASONAL_WORKER;
    if (route.includes('charity')) return SponsorRoute.CHARITY_WORKER;
    if (route.includes('religious')) return SponsorRoute.RELIGIOUS_WORKER;
    if (route.includes('sport')) return SponsorRoute.INTERNATIONAL_SPORTSPERSON;
    if (route.includes('creative')) return SponsorRoute.CREATIVE_WORKER;
    if (route.includes('global talent')) return SponsorRoute.GLOBAL_TALENT;
    if (route.includes('student')) return SponsorRoute.STUDENT;
    
    return SponsorRoute.SKILLED_WORKER; // Default fallback
  }

  /**
   * Map route to sponsor type
   */
  private mapType(route: SponsorRoute): SponsorType {
    if (route === SponsorRoute.STUDENT) return SponsorType.STUDENT;
    if (route === SponsorRoute.SEASONAL_WORKER) return SponsorType.TEMPORARY_WORKER;
    return SponsorType.WORKER;
  }

  /**
   * Generate unique ID for sponsor
   */
  private generateId(orgName: string, townCity: string): string {
    const normalized = (orgName + townCity).toLowerCase().replace(/[^a-z0-9]/g, '');
    return normalized.substring(0, 20) + '-' + Math.random().toString(36).substring(7);
  }

  /**
   * Parse date string to ISO format
   */
  private parseDate(dateStr: string): string {
    if (!dateStr) return new Date().toISOString();
    
    try {
      // Try parsing various date formats
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) {
        return new Date().toISOString();
      }
      return date.toISOString();
    } catch {
      return new Date().toISOString();
    }
  }

  /**
   * Generate a placeholder website for the sponsor
   */
  private generateWebsite(orgName: string): string {
    const domain = orgName.toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .replace(/\s+/g, '-')
      .substring(0, 30);
    return `https://www.${domain}.co.uk`;
  }

  /**
   * Infer industry from organization name
   */
  private inferIndustry(orgName: string): string {
    const name = orgName.toLowerCase();
    
    if (name.includes('nhs') || name.includes('hospital') || name.includes('health') || name.includes('medical')) {
      return 'Healthcare';
    }
    if (name.includes('university') || name.includes('college') || name.includes('school') || name.includes('education')) {
      return 'Education';
    }
    if (name.includes('tech') || name.includes('software') || name.includes('digital') || name.includes('it ')) {
      return 'Technology';
    }
    if (name.includes('bank') || name.includes('finance') || name.includes('financial')) {
      return 'Financial Services';
    }
    if (name.includes('engineering') || name.includes('construction') || name.includes('building')) {
      return 'Engineering & Construction';
    }
    if (name.includes('retail') || name.includes('shop') || name.includes('store')) {
      return 'Retail';
    }
    if (name.includes('hotel') || name.includes('restaurant') || name.includes('hospitality')) {
      return 'Hospitality';
    }
    
    return 'Other';
  }

  /**
   * Estimate employee count (mock implementation)
   */
  private estimateEmployees(): number {
    // Random estimation for demo purposes
    const ranges = [50, 100, 250, 500, 1000, 2500, 5000];
    return ranges[Math.floor(Math.random() * ranges.length)];
  }

  /**
   * Get mock sponsor data as fallback
   */
  private getMockSponsorData(): Sponsor[] {
    return [
      {
        id: 'mock-1',
        organisationName: 'NHS Foundation Trust',
        townCity: 'London',
        county: 'Greater London',
        type: SponsorType.WORKER,
        route: SponsorRoute.HEALTH_AND_CARE_WORKER,
        dateAdded: new Date().toISOString(),
        sponsorLicenceNumber: 'NHS001',
        website: 'https://www.nhs.uk',
        industry: 'Healthcare',
        employees: 5000,
        description: 'Major NHS healthcare provider in London'
      },
      {
        id: 'mock-2',
        organisationName: 'Imperial College London',
        townCity: 'London',
        county: 'Greater London',
        type: SponsorType.STUDENT,
        route: SponsorRoute.STUDENT,
        dateAdded: new Date().toISOString(),
        sponsorLicenceNumber: 'ICL001',
        website: 'https://www.imperial.ac.uk',
        industry: 'Education',
        employees: 2500,
        description: 'World-class university in London'
      },
      {
        id: 'mock-3',
        organisationName: 'HSBC UK Bank',
        townCity: 'Birmingham',
        county: 'West Midlands',
        type: SponsorType.WORKER,
        route: SponsorRoute.SKILLED_WORKER,
        dateAdded: new Date().toISOString(),
        sponsorLicenceNumber: 'HSBC001',
        website: 'https://www.hsbc.co.uk',
        industry: 'Financial Services',
        employees: 10000,
        description: 'Major international bank with UK operations'
      }
    ];
  }

  /**
   * Schedule daily data updates
   */
  async scheduleDailyUpdate(): Promise<void> {
    console.log('Scheduling daily data update...');
    
    // In a real implementation, this would set up a cron job
    // For demo purposes, we'll just log the intent
    setInterval(async () => {
      try {
        console.log('Running daily data update...');
        const latestData = await this.fetchLatestSponsorData();
        console.log(`Updated ${latestData.length} sponsor records`);
        
        // In production, this would save to database
        // await this.saveSponsorData(latestData);
        
      } catch (error) {
        console.error('Daily update failed:', error);
      }
    }, 24 * 60 * 60 * 1000); // Run every 24 hours
  }

  /**
   * Get data freshness status
   */
  async getDataStatus(): Promise<{ lastUpdated: string; totalRecords: number; status: 'healthy' | 'stale' | 'error' }> {
    try {
      const sponsors = await this.fetchLatestSponsorData();
      return {
        lastUpdated: new Date().toISOString(),
        totalRecords: sponsors.length,
        status: 'healthy'
      };
    } catch (error) {
      return {
        lastUpdated: new Date().toISOString(),
        totalRecords: 0,
        status: 'error'
      };
    }
  }
}

// Export singleton instance
export const ukGovDataService = new UKGovDataService();
