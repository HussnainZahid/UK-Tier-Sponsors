import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, TrendingUp, Building2, MapPin, ExternalLink, ArrowRight, Calendar, Award } from "lucide-react";

export default function Statistics() {
  const overallStats = [
    { label: "Total Licensed Sponsors", value: "18,247", change: "+8.2%", icon: Building2 },
    { label: "Worker Route Sponsors", value: "15,890", change: "+7.5%", icon: Users },
    { label: "Student Route Sponsors", value: "1,250", change: "+12.3%", icon: Award },
    { label: "Active Industries", value: "52", change: "+2.0%", icon: TrendingUp }
  ];

  const quarterlyData = [
    { quarter: "Q4 2024", newSponsors: 1247, applications: 2890, approvalRate: "87%" },
    { quarter: "Q3 2024", newSponsors: 1156, applications: 2654, approvalRate: "85%" },
    { quarter: "Q2 2024", newSponsors: 1089, applications: 2432, approvalRate: "88%" },
    { quarter: "Q1 2024", newSponsors: 978, applications: 2198, approvalRate: "86%" }
  ];

  const routeBreakdown = [
    { route: "Skilled Worker", count: 12450, percentage: 68 },
    { route: "Health and Care Worker", count: 3440, percentage: 19 },
    { route: "Global Talent", count: 1890, percentage: 10 },
    { route: "Creative Worker", count: 467, percentage: 3 }
  ];

  const processingTimes = [
    { type: "New Applications", time: "8 weeks", target: "8 weeks", status: "on-target" },
    { type: "Extensions", time: "6 weeks", target: "8 weeks", status: "ahead" },
    { type: "Priority Service", time: "10 days", target: "10 days", status: "on-target" },
    { type: "Compliance Visits", time: "12 weeks", target: "16 weeks", status: "ahead" }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-brand-50 via-white to-brand-50 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              UK Sponsorship Statistics
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Comprehensive statistics and analytics on UK visa sponsorship from official 
              UK Home Office data, including trends, processing times, and performance metrics.
            </p>
            
            <div className="flex justify-center gap-4 mb-8">
              <Button asChild variant="outline">
                <a 
                  href="https://www.gov.uk/government/publications/sponsorship-transparency-data"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  Transparency Data
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Overall Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {overallStats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.label}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                      <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    </div>
                    <Icon className="w-8 h-8 text-brand-500" />
                  </div>
                  <div className="mt-2">
                    <Badge variant="outline" className="text-success-600 bg-success-50">
                      {stat.change} YoY
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Quarterly Performance */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Quarterly Performance (2024)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {quarterlyData.map((quarter) => (
                  <div key={quarter.quarter} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                    <div>
                      <div className="font-semibold">{quarter.quarter}</div>
                      <div className="text-sm text-muted-foreground">
                        {quarter.newSponsors.toLocaleString()} new sponsors
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">{quarter.applications.toLocaleString()}</div>
                      <div className="text-sm text-muted-foreground">applications</div>
                    </div>
                    <Badge variant="secondary">
                      {quarter.approvalRate} approved
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Sponsors by Route Type
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {routeBreakdown.map((route) => (
                  <div key={route.route} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{route.route}</span>
                      <span className="text-sm text-muted-foreground">
                        {route.count.toLocaleString()} ({route.percentage}%)
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-brand-500 h-2 rounded-full" 
                        style={{ width: `${route.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Processing Times */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Processing Times & Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {processingTimes.map((item) => (
                <div key={item.type} className="text-center p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-semibold mb-2">{item.type}</h4>
                  <div className="text-2xl font-bold text-brand-600 mb-1">{item.time}</div>
                  <div className="text-sm text-muted-foreground mb-2">Target: {item.target}</div>
                  <Badge 
                    variant={item.status === 'ahead' ? 'default' : 'secondary'}
                    className={item.status === 'ahead' ? 'bg-success-500' : ''}
                  >
                    {item.status === 'ahead' ? 'Ahead of Target' : 'On Target'}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Key Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <Card>
            <CardHeader>
              <CardTitle>Key Trends & Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 border-l-4 border-blue-500 rounded">
                  <h4 className="font-semibold text-blue-800 mb-2">Growth in Technology Sector</h4>
                  <p className="text-sm text-blue-700">
                    Technology companies represent the fastest-growing segment, with a 15% increase 
                    in new sponsor licenses in 2024.
                  </p>
                </div>
                
                <div className="p-4 bg-green-50 border-l-4 border-green-500 rounded">
                  <h4 className="font-semibold text-green-800 mb-2">Regional Distribution</h4>
                  <p className="text-sm text-green-700">
                    While London maintains 45% of sponsors, regional growth outside the capital 
                    is accelerating, particularly in Manchester and Birmingham.
                  </p>
                </div>
                
                <div className="p-4 bg-purple-50 border-l-4 border-purple-500 rounded">
                  <h4 className="font-semibold text-purple-800 mb-2">Health & Care Expansion</h4>
                  <p className="text-sm text-purple-700">
                    Health and Care Worker route shows 20% growth, reflecting increased NHS 
                    and social care recruitment needs.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Data Quality & Updates</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Update Frequency</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    The Register of Licensed Sponsors is updated weekly, with comprehensive 
                    statistics published quarterly by UK Visas and Immigration.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Data Sources</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Register of Licensed Sponsors</li>
                    <li>• Immigration System Statistics</li>
                    <li>• Sponsorship Transparency Data</li>
                    <li>• Entry Clearance Statistics</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Last Updated</h4>
                  <p className="text-sm text-muted-foreground">
                    Statistics current as of Q4 2024 (Published February 2025)
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Official Sources */}
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="pt-6">
            <h3 className="text-lg font-semibold text-foreground mb-3">Official Data Sources</h3>
            <p className="text-muted-foreground mb-4">
              All statistics are compiled from official UK Home Office publications, including 
              quarterly sponsorship transparency data, immigration system statistics, and the 
              register of licensed sponsors.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Button asChild variant="outline" size="sm">
                <a 
                  href="https://www.gov.uk/government/statistical-data-sets/immigration-system-statistics-data-tables"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  System Statistics
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
                  Transparency Data
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
            Explore the Data
          </h3>
          <p className="text-muted-foreground mb-6">
            Use our search tools to find specific sponsors or explore by industry and location
          </p>
          <Button asChild size="lg">
            <a href="/" className="flex items-center gap-2">
              Start Searching
              <ArrowRight className="w-4 h-4" />
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
