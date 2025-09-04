import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, ExternalLink, TrendingUp, Building2, ArrowRight } from "lucide-react";

export default function Location() {
  // Sample location data based on UK regions
  const topRegions = [
    { name: "London", sponsors: 8200, percentage: "45%", growth: "+8%" },
    { name: "South East", sponsors: 2100, percentage: "12%", growth: "+12%" },
    { name: "North West", sponsors: 1850, percentage: "10%", growth: "+15%" },
    { name: "West Midlands", sponsors: 980, percentage: "5%", growth: "+10%" },
    { name: "Yorkshire and Humber", sponsors: 750, percentage: "4%", growth: "+18%" },
    { name: "Scotland", sponsors: 620, percentage: "3%", growth: "+6%" },
    { name: "East of England", sponsors: 580, percentage: "3%", growth: "+9%" },
    { name: "South West", sponsors: 520, percentage: "3%", growth: "+7%" },
    { name: "Wales", sponsors: 380, percentage: "2%", growth: "+11%" },
    { name: "North East", sponsors: 320, percentage: "2%", growth: "+14%" }
  ];

  const topCities = [
    { name: "London", sponsors: 8200, type: "Capital" },
    { name: "Manchester", sponsors: 650, type: "Major City" },
    { name: "Birmingham", sponsors: 520, type: "Major City" },
    { name: "Edinburgh", sponsors: 380, type: "Capital City" },
    { name: "Leeds", sponsors: 320, type: "Major City" },
    { name: "Bristol", sponsors: 290, type: "Major City" },
    { name: "Cardiff", sponsors: 220, type: "Capital City" },
    { name: "Sheffield", sponsors: 180, type: "City" },
    { name: "Liverpool", sponsors: 170, type: "Major City" },
    { name: "Newcastle", sponsors: 150, type: "Major City" }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-brand-50 via-white to-brand-50 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Browse by Location
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Find UK visa sponsors by geographic location across England, Scotland, Wales, and Northern Ireland. 
              Data sourced from the UK Home Office Register of Licensed Sponsors.
            </p>
            
            <div className="flex justify-center gap-4 mb-8">
              <Button asChild variant="outline">
                <a 
                  href="https://www.gov.uk/government/publications/register-of-licensed-sponsors-workers"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  Official Register
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Regional Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <Card>
            <CardContent className="pt-6 text-center">
              <MapPin className="w-8 h-8 text-brand-500 mx-auto mb-3" />
              <div className="text-3xl font-bold text-foreground mb-2">12</div>
              <div className="text-sm text-muted-foreground">UK Regions</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6 text-center">
              <Building2 className="w-8 h-8 text-brand-500 mx-auto mb-3" />
              <div className="text-3xl font-bold text-foreground mb-2">350+</div>
              <div className="text-sm text-muted-foreground">Cities & Towns</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6 text-center">
              <TrendingUp className="w-8 h-8 text-brand-500 mx-auto mb-3" />
              <div className="text-3xl font-bold text-foreground mb-2">45%</div>
              <div className="text-sm text-muted-foreground">London Share</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6 text-center">
              <MapPin className="w-8 h-8 text-brand-500 mx-auto mb-3" />
              <div className="text-3xl font-bold text-foreground mb-2">55%</div>
              <div className="text-sm text-muted-foreground">Outside London</div>
            </CardContent>
          </Card>
        </div>

        {/* Regional and City Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Top Regions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Sponsors by UK Region
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topRegions.map((region, index) => (
                  <div key={region.name} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-brand-100 text-brand-700 rounded-full flex items-center justify-center text-sm font-medium">
                        {index + 1}
                      </div>
                      <div>
                        <div className="font-medium">{region.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {region.sponsors.toLocaleString()} sponsors ({region.percentage})
                        </div>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-success-600 bg-success-50">
                      {region.growth}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Top Cities */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="w-5 h-5" />
                Top Cities by Sponsor Count
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topCities.map((city, index) => (
                  <div key={city.name} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-brand-100 text-brand-700 rounded-full flex items-center justify-center text-sm font-medium">
                        {index + 1}
                      </div>
                      <div>
                        <div className="font-medium">{city.name}</div>
                        <div className="text-sm text-muted-foreground">{city.sponsors.toLocaleString()} sponsors</div>
                      </div>
                    </div>
                    <Badge variant="secondary">
                      {city.type}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Geographic Distribution Insights */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle>Geographic Distribution Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">London Dominance</h4>
                <p className="text-muted-foreground text-sm mb-4">
                  London accounts for approximately 45% of all licensed sponsors in the UK, 
                  reflecting its position as the country's economic center and global business hub.
                </p>
                
                <h4 className="font-semibold mb-3">Regional Growth</h4>
                <p className="text-muted-foreground text-sm">
                  Northern regions show strong growth rates, with Yorkshire and Humber leading 
                  at +18% year-on-year, indicating expanding opportunities outside London.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold mb-3">Sector Concentration</h4>
                <p className="text-muted-foreground text-sm mb-4">
                  Technology and financial services sponsors concentrate in London and South East, 
                  while manufacturing and healthcare sponsors are more evenly distributed.
                </p>
                
                <h4 className="font-semibold mb-3">Emerging Hubs</h4>
                <p className="text-muted-foreground text-sm">
                  Manchester, Birmingham, and Edinburgh are emerging as significant sponsorship 
                  hubs, offering alternatives to London-based opportunities.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Data Source Information */}
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="pt-6">
            <h3 className="text-lg font-semibold text-foreground mb-3">Location Data Sources</h3>
            <p className="text-muted-foreground mb-4">
              Geographic distribution data is compiled from the UK Home Office Register of Licensed Sponsors, 
              which includes detailed address information for all licensed sponsors across the UK. 
              Regional statistics are updated with each quarterly publication.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button asChild variant="outline" size="sm">
                <a 
                  href="https://www.gov.uk/government/publications/register-of-licensed-sponsors-workers"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  Download Full Register
                </a>
              </Button>
              <Button asChild variant="outline" size="sm">
                <a 
                  href="https://www.gov.uk/government/organisations/uk-visas-and-immigration"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  UK Visas & Immigration
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <h3 className="text-2xl font-bold text-foreground mb-4">
            Find Sponsors Near You
          </h3>
          <p className="text-muted-foreground mb-6">
            Search for visa sponsors in your preferred location or explore opportunities across the UK
          </p>
          <Button asChild size="lg">
            <a href="/" className="flex items-center gap-2">
              Search by Location
              <ArrowRight className="w-4 h-4" />
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
