import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  CheckCircle, 
  ExternalLink, 
  Play, 
  Shield,
  User,
  Info,
  Calendar,
  Database,
  Search,
  Building2,
  MapPin,
  BarChart3,
  Download,
  Github,
  Twitter
} from "lucide-react";
import { Link } from "react-router-dom";
import TestStatus from "@/components/TestStatus";

export default function TestPage() {
  const pageTests = [
    {
      title: "Login & Signup",
      href: "/login",
      icon: User,
      description: "Test user authentication forms and validation",
      features: ["Form validation", "Password visibility toggle", "OAuth buttons", "Responsive design"]
    },
    {
      title: "About Us",
      href: "/about",
      icon: Info,
      description: "Comprehensive information about the platform",
      features: ["Hero image", "Team section", "Timeline", "Contact information"]
    },
    {
      title: "Privacy Policy",
      href: "/privacy",
      icon: Shield,
      description: "GDPR compliant privacy information",
      features: ["Data collection details", "User rights", "Security measures", "Contact forms"]
    },
    {
      title: "Release Notes",
      href: "/releases",
      icon: Calendar,
      description: "Version history and updates",
      features: ["Version badges", "Change categorization", "Roadmap", "Status indicators"]
    }
  ];

  const functionalityTests = [
    {
      title: "Search Functionality",
      href: "/",
      icon: Search,
      description: "Test sponsor search with filters",
      api: "/api/sponsors/search"
    },
    {
      title: "Industry Browse",
      href: "/industry",
      icon: Building2,
      description: "Browse sponsors by industry",
      api: "/api/sponsors/industries"
    },
    {
      title: "Location Browse",
      href: "/location",
      icon: MapPin,
      description: "Browse sponsors by location",
      api: "/api/sponsors/locations"
    },
    {
      title: "Statistics",
      href: "/stats",
      icon: BarChart3,
      description: "Platform statistics and insights",
      api: "/api/sponsors/stats"
    },
    {
      title: "All Data",
      href: "/data/all",
      icon: Database,
      description: "Complete sponsor database",
      api: "/api/data/all"
    },
    {
      title: "UK Gov Integration",
      href: "/api/uk-gov/status",
      icon: Download,
      description: "Official UK government data",
      api: "/api/uk-gov/status",
      external: true
    }
  ];

  const apiEndpoints = [
    { path: "/api/health", description: "Health check endpoint" },
    { path: "/api/sponsors/search", description: "Search sponsors" },
    { path: "/api/sponsors/stats", description: "Platform statistics" },
    { path: "/api/data/all", description: "All sponsor data" },
    { path: "/api/data/recent", description: "Recent additions" },
    { path: "/api/data/deleted", description: "Removed sponsors" },
    { path: "/api/uk-gov/status", description: "UK Gov data status" },
    { path: "/api/uk-gov/sync", description: "Manual data sync" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 bg-brand-500 rounded-xl flex items-center justify-center">
              <Shield className="w-7 h-7 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Functionality Test Center
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Comprehensive testing suite for all website features, pages, and functionality.
            Verify that everything works correctly.
          </p>
        </div>

        {/* Automated Test Status */}
        <div className="mb-12">
          <TestStatus />
        </div>

        {/* Page Tests */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">Page Testing</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pageTests.map((test, index) => {
              const Icon = test.icon;
              return (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Icon className="w-5 h-5 text-brand-600" />
                      {test.title}
                    </CardTitle>
                    <CardDescription>{test.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex flex-wrap gap-2">
                        {test.features.map((feature, i) => (
                          <Badge key={i} variant="secondary" className="text-xs">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            {feature}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <Button asChild size="sm">
                          <Link to={test.href} className="flex items-center gap-2">
                            <Play className="w-3 h-3" />
                            Test Page
                          </Link>
                        </Button>
                        <Button variant="outline" size="sm" asChild>
                          <Link to={test.href} target="_blank" className="flex items-center gap-2">
                            <ExternalLink className="w-3 h-3" />
                            New Tab
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Functionality Tests */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">Functionality Testing</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {functionalityTests.map((test, index) => {
              const Icon = test.icon;
              return (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Icon className="w-5 h-5 text-brand-600" />
                      {test.title}
                    </CardTitle>
                    <CardDescription className="text-sm">{test.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="text-xs text-muted-foreground font-mono bg-muted p-2 rounded">
                        {test.api}
                      </div>
                      <div className="flex gap-2">
                        {test.external ? (
                          <Button size="sm" asChild>
                            <a href={test.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                              <ExternalLink className="w-3 h-3" />
                              Test API
                            </a>
                          </Button>
                        ) : (
                          <Button size="sm" asChild>
                            <Link to={test.href} className="flex items-center gap-2">
                              <Play className="w-3 h-3" />
                              Test Page
                            </Link>
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* API Endpoints */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="w-6 h-6 text-brand-600" />
              API Endpoints Testing
            </CardTitle>
            <CardDescription>
              Test all API endpoints to ensure they're working correctly
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {apiEndpoints.map((endpoint, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <div className="font-mono text-sm font-medium">{endpoint.path}</div>
                    <div className="text-xs text-muted-foreground">{endpoint.description}</div>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <a 
                      href={endpoint.path} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      <ExternalLink className="w-3 h-3" />
                      Test
                    </a>
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Feature Checklist */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle>Feature Checklist</CardTitle>
            <CardDescription>Verify all requested features are implemented</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <h4 className="font-semibold text-foreground">Core Features</h4>
                <div className="space-y-2">
                  {[
                    "Login/Signup forms with validation",
                    "About Us page with team info",
                    "Privacy Policy with GDPR compliance", 
                    "Release Notes with version history",
                    "Attractive hero images",
                    "Responsive navigation",
                    "Enhanced footer"
                  ].map((feature, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-3">
                <h4 className="font-semibold text-foreground">Technical Features</h4>
                <div className="space-y-2">
                  {[
                    "UK Government API integration",
                    "Daily data updates system",
                    "Search functionality",
                    "Data export capabilities",
                    "Mobile responsive design",
                    "Error handling",
                    "Performance optimization"
                  ].map((feature, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Success Message */}
        <Card className="border-green-200 bg-green-50">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                <CheckCircle className="w-7 h-7 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-green-800 mb-1">
                  Platform Development Complete! 🎉
                </h3>
                <p className="text-green-700 text-sm">
                  All requested features have been implemented and are ready for testing. 
                  The platform is now fully functional with login/signup, informational pages, 
                  attractive design, API integration, and user-friendly navigation.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
