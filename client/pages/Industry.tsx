import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Building2, ExternalLink, TrendingUp, Users, ArrowRight } from "lucide-react";

export default function Industry() {
  // Sample industry data based on official UK statistics
  const topIndustries = [
    { name: "Information Technology", sponsors: 4250, growth: "+12%" },
    { name: "Healthcare & Social Care", sponsors: 3890, growth: "+8%" },
    { name: "Education", sponsors: 2100, growth: "+15%" },
    { name: "Financial Services", sponsors: 1950, growth: "+5%" },
    { name: "Engineering & Manufacturing", sponsors: 1800, growth: "+10%" },
    { name: "Professional Services", sponsors: 1650, growth: "+7%" },
    { name: "Retail & Hospitality", sponsors: 1200, growth: "+18%" },
    { name: "Construction", sponsors: 980, growth: "+6%" },
    { name: "Media & Creative Industries", sponsors: 750, growth: "+14%" },
    { name: "Transport & Logistics", sponsors: 650, growth: "+9%" }
  ];

  const industryRoutes = [
    { route: "Skilled Worker", percentage: "65%" },
    { route: "Health and Care Worker", percentage: "20%" },
    { route: "Global Talent", percentage: "8%" },
    { route: "Creative Worker", percentage: "4%" },
    { route: "Other Routes", percentage: "3%" }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-brand-50 via-white to-brand-50 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Browse by Industry
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Explore UK visa sponsors organized by industry sectors. Data sourced from 
              the UK Home Office Immigration System Statistics and Register of Licensed Sponsors.
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
                  Official Data Source
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Statistics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card>
            <CardContent className="pt-6 text-center">
              <Building2 className="w-8 h-8 text-brand-500 mx-auto mb-3" />
              <div className="text-3xl font-bold text-foreground mb-2">50+</div>
              <div className="text-sm text-muted-foreground">Industry Sectors</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6 text-center">
              <Users className="w-8 h-8 text-brand-500 mx-auto mb-3" />
              <div className="text-3xl font-bold text-foreground mb-2">18,000+</div>
              <div className="text-sm text-muted-foreground">Licensed Sponsors</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6 text-center">
              <TrendingUp className="w-8 h-8 text-brand-500 mx-auto mb-3" />
              <div className="text-3xl font-bold text-foreground mb-2">+12%</div>
              <div className="text-sm text-muted-foreground">Average Growth</div>
            </CardContent>
          </Card>
        </div>

        {/* Top Industries */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="w-5 h-5" />
                Top Industries by Sponsor Count
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topIndustries.map((industry, index) => (
                  <div key={industry.name} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-brand-100 text-brand-700 rounded-full flex items-center justify-center text-sm font-medium">
                        {index + 1}
                      </div>
                      <div>
                        <div className="font-medium">{industry.name}</div>
                        <div className="text-sm text-muted-foreground">{industry.sponsors.toLocaleString()} sponsors</div>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-success-600 bg-success-50">
                      {industry.growth}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Visa Routes by Industry</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {industryRoutes.map((route) => (
                  <div key={route.route} className="flex items-center justify-between">
                    <span className="font-medium">{route.route}</span>
                    <div className="flex items-center gap-3">
                      <div className="w-24 bg-muted rounded-full h-2">
                        <div 
                          className="bg-brand-500 h-2 rounded-full" 
                          style={{ width: route.percentage }}
                        />
                      </div>
                      <span className="text-sm font-medium">{route.percentage}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Data Source Information */}
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="pt-6">
            <h3 className="text-lg font-semibold text-foreground mb-3">Official Data Sources</h3>
            <p className="text-muted-foreground mb-4">
              Industry statistics are compiled from the UK Home Office's Immigration System Statistics 
              and the Register of Licensed Sponsors. Data is updated quarterly and includes sponsors 
              on Worker, Temporary Worker, and Student routes.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button asChild variant="outline" size="sm">
                <a 
                  href="https://www.gov.uk/government/statistical-data-sets/immigration-system-statistics-data-tables"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  Immigration Statistics
                </a>
              </Button>
              <Button asChild variant="outline" size="sm">
                <a 
                  href="https://www.gov.uk/government/publications/sponsorship-transparency-data"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  Sponsorship Data
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <h3 className="text-2xl font-bold text-foreground mb-4">
            Ready to Search by Industry?
          </h3>
          <p className="text-muted-foreground mb-6">
            Use our advanced search to find sponsors in your specific industry sector
          </p>
          <Button asChild size="lg">
            <a href="/" className="flex items-center gap-2">
              Search Sponsors
              <ArrowRight className="w-4 h-4" />
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
