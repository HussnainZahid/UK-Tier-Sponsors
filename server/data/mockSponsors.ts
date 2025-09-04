import { Sponsor, SponsorType, SponsorRoute } from "../../shared/api";

// Mock sponsor data for development - simulates real UK visa sponsor data
export const mockSponsors: Sponsor[] = [
  {
    id: "1",
    organisationName: "Accenture UK Limited",
    townCity: "London",
    county: "Greater London",
    type: SponsorType.WORKER,
    route: SponsorRoute.SKILLED_WORKER,
    dateAdded: "2024-01-15",
    sponsorLicenceNumber: "ACN123456",
    website: "https://www.accenture.com/uk-en",
    industry: "Technology Consulting",
    employees: 15000,
    description: "Leading global professional services company providing technology consulting and digital transformation services."
  },
  {
    id: "2",
    organisationName: "NHS Foundation Trust",
    townCity: "Manchester",
    county: "Greater Manchester",
    type: SponsorType.WORKER,
    route: SponsorRoute.HEALTH_AND_CARE_WORKER,
    dateAdded: "2024-02-10",
    sponsorLicenceNumber: "NHS789012",
    industry: "Healthcare",
    employees: 25000,
    description: "Major NHS foundation trust providing comprehensive healthcare services."
  },
  {
    id: "3",
    organisationName: "University of Oxford",
    townCity: "Oxford",
    county: "Oxfordshire",
    type: SponsorType.STUDENT,
    route: SponsorRoute.STUDENT,
    dateAdded: "2024-01-20",
    sponsorLicenceNumber: "OXF345678",
    website: "https://www.ox.ac.uk",
    industry: "Education",
    employees: 12000,
    description: "World-leading university offering undergraduate and postgraduate education."
  },
  {
    id: "4",
    organisationName: "Rolls-Royce Holdings plc",
    townCity: "Derby",
    county: "Derbyshire",
    type: SponsorType.WORKER,
    route: SponsorRoute.SKILLED_WORKER,
    dateAdded: "2024-01-05",
    sponsorLicenceNumber: "RR901234",
    website: "https://www.rolls-royce.com",
    industry: "Aerospace & Defense",
    employees: 42000,
    description: "Global leader in power systems and services for civil and defense aerospace."
  },
  {
    id: "5",
    organisationName: "Barclays Bank PLC",
    townCity: "London",
    county: "Greater London",
    type: SponsorType.WORKER,
    route: SponsorRoute.SKILLED_WORKER,
    dateAdded: "2024-02-01",
    sponsorLicenceNumber: "BAR567890",
    website: "https://www.barclays.co.uk",
    industry: "Banking & Financial Services",
    employees: 83000,
    description: "Major British multinational investment bank and financial services company."
  },
  {
    id: "6",
    organisationName: "DeepMind Technologies Limited",
    townCity: "London",
    county: "Greater London",
    type: SponsorType.WORKER,
    route: SponsorRoute.GLOBAL_TALENT,
    dateAdded: "2024-01-25",
    sponsorLicenceNumber: "DM123789",
    website: "https://www.deepmind.com",
    industry: "Artificial Intelligence",
    employees: 1000,
    description: "World-leading AI research lab, a subsidiary of Alphabet Inc."
  },
  {
    id: "7",
    organisationName: "Guy's and St Thomas' NHS Foundation Trust",
    townCity: "London",
    county: "Greater London",
    type: SponsorType.WORKER,
    route: SponsorRoute.HEALTH_AND_CARE_WORKER,
    dateAdded: "2024-02-05",
    sponsorLicenceNumber: "GST456123",
    industry: "Healthcare",
    employees: 18000,
    description: "One of the largest NHS foundation trusts in the UK."
  },
  {
    id: "8",
    organisationName: "Aston Martin Lagonda Global Holdings plc",
    townCity: "Gaydon",
    county: "Warwickshire",
    type: SponsorType.WORKER,
    route: SponsorRoute.SKILLED_WORKER,
    dateAdded: "2024-01-30",
    sponsorLicenceNumber: "AM789456",
    website: "https://www.astonmartin.com",
    industry: "Automotive",
    employees: 2500,
    description: "British luxury sports car manufacturer."
  },
  {
    id: "9",
    organisationName: "Cambridge University",
    townCity: "Cambridge",
    county: "Cambridgeshire",
    type: SponsorType.STUDENT,
    route: SponsorRoute.STUDENT,
    dateAdded: "2024-01-18",
    sponsorLicenceNumber: "CAM147258",
    website: "https://www.cam.ac.uk",
    industry: "Education",
    employees: 11000,
    description: "Prestigious research university and one of the world's oldest universities."
  },
  {
    id: "10",
    organisationName: "ARM Limited",
    townCity: "Cambridge",
    county: "Cambridgeshire",
    type: SponsorType.WORKER,
    route: SponsorRoute.SKILLED_WORKER,
    dateAdded: "2024-02-08",
    sponsorLicenceNumber: "ARM369852",
    website: "https://www.arm.com",
    industry: "Semiconductor Design",
    employees: 6000,
    description: "Leading semiconductor and software design company."
  },
  {
    id: "11",
    organisationName: "Tesco PLC",
    townCity: "Welwyn Garden City",
    county: "Hertfordshire",
    type: SponsorType.WORKER,
    route: SponsorRoute.SKILLED_WORKER,
    dateAdded: "2024-01-12",
    sponsorLicenceNumber: "TES741963",
    website: "https://www.tesco.com",
    industry: "Retail",
    employees: 320000,
    description: "British multinational groceries and general merchandise retailer."
  },
  {
    id: "12",
    organisationName: "Royal Opera House",
    townCity: "London",
    county: "Greater London",
    type: SponsorType.WORKER,
    route: SponsorRoute.CREATIVE_WORKER,
    dateAdded: "2024-02-12",
    sponsorLicenceNumber: "ROH852741",
    website: "https://www.roh.org.uk",
    industry: "Arts & Culture",
    employees: 1200,
    description: "World-famous opera house and home to the Royal Opera and Royal Ballet."
  },
  {
    id: "13",
    organisationName: "British Airways PLC",
    townCity: "Harmondsworth",
    county: "Greater London",
    type: SponsorType.WORKER,
    route: SponsorRoute.SKILLED_WORKER,
    dateAdded: "2024-01-28",
    sponsorLicenceNumber: "BA963741",
    website: "https://www.britishairways.com",
    industry: "Aviation",
    employees: 42000,
    description: "Flag carrier airline of the United Kingdom."
  },
  {
    id: "14",
    organisationName: "GSK plc",
    townCity: "Brentford",
    county: "Greater London",
    type: SponsorType.WORKER,
    route: SponsorRoute.SKILLED_WORKER,
    dateAdded: "2024-02-03",
    sponsorLicenceNumber: "GSK159753",
    website: "https://www.gsk.com",
    industry: "Pharmaceuticals",
    employees: 76000,
    description: "Global biopharma company focused on innovative medicines and vaccines."
  },
  {
    id: "15",
    organisationName: "King's College London",
    townCity: "London",
    county: "Greater London",
    type: SponsorType.STUDENT,
    route: SponsorRoute.STUDENT,
    dateAdded: "2024-01-22",
    sponsorLicenceNumber: "KCL357951",
    website: "https://www.kcl.ac.uk",
    industry: "Education",
    employees: 8500,
    description: "Leading research university and founding college of the University of London."
  },
  {
    id: "16",
    organisationName: "Unilever UK Limited",
    townCity: "London",
    county: "Greater London",
    type: SponsorType.WORKER,
    route: SponsorRoute.SKILLED_WORKER,
    dateAdded: "2024-02-07",
    sponsorLicenceNumber: "UNI753159",
    website: "https://www.unilever.co.uk",
    industry: "Consumer Goods",
    employees: 190000,
    description: "Multinational consumer goods company with a portfolio of trusted brands."
  },
  {
    id: "17",
    organisationName: "McLaren Group Limited",
    townCity: "Woking",
    county: "Surrey",
    type: SponsorType.WORKER,
    route: SponsorRoute.INTERNATIONAL_SPORTSPERSON,
    dateAdded: "2024-01-26",
    sponsorLicenceNumber: "MCL951357",
    website: "https://www.mclaren.com",
    industry: "Motorsport & Automotive",
    employees: 4000,
    description: "British motor racing team and automotive manufacturer."
  },
  {
    id: "18",
    organisationName: "Sainsbury's Supermarkets Ltd",
    townCity: "London",
    county: "Greater London",
    type: SponsorType.WORKER,
    route: SponsorRoute.SKILLED_WORKER,
    dateAdded: "2024-02-09",
    sponsorLicenceNumber: "SAI486275",
    website: "https://www.sainsburys.co.uk",
    industry: "Retail",
    employees: 189000,
    description: "Second largest chain of supermarkets in the United Kingdom."
  },
  {
    id: "19",
    organisationName: "Heathrow Airport Holdings Limited",
    townCity: "Harmondsworth",
    county: "Greater London",
    type: SponsorType.WORKER,
    route: SponsorRoute.SKILLED_WORKER,
    dateAdded: "2024-01-14",
    sponsorLicenceNumber: "HTR620481",
    website: "https://www.heathrow.com",
    industry: "Aviation",
    employees: 76000,
    description: "Operates Heathrow Airport, the UK's largest and busiest airport."
  },
  {
    id: "20",
    organisationName: "Save the Children UK",
    townCity: "London",
    county: "Greater London",
    type: SponsorType.WORKER,
    route: SponsorRoute.CHARITY_WORKER,
    dateAdded: "2024-02-11",
    sponsorLicenceNumber: "STC135792",
    website: "https://www.savethechildren.org.uk",
    industry: "Non-profit & Charity",
    employees: 2400,
    description: "International non-governmental organization that promotes children's rights."
  }
];

// Helper function to get all unique industries
export const getUniqueIndustries = (): string[] => {
  const industries = mockSponsors
    .map(sponsor => sponsor.industry)
    .filter((industry): industry is string => !!industry);
  return [...new Set(industries)].sort();
};

// Helper function to get all unique locations
export const getUniqueLocations = (): string[] => {
  const locations = mockSponsors.map(sponsor => 
    sponsor.county ? `${sponsor.townCity}, ${sponsor.county}` : sponsor.townCity
  );
  return [...new Set(locations)].sort();
};

// Helper function to get all unique towns/cities
export const getUniqueCities = (): string[] => {
  const cities = mockSponsors.map(sponsor => sponsor.townCity);
  return [...new Set(cities)].sort();
};
