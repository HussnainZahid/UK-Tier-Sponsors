import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { 
  Calendar,
  Star,
  Bug,
  Zap,
  Shield,
  Plus,
  Settings,
  Database,
  Smartphone,
  ExternalLink,
  CheckCircle,
  AlertTriangle,
  Info
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ReleaseNotes() {
  const releases = [
    {
      version: "2.1.0",
      date: "2024-12-15",
      type: "major",
      title: "Enhanced Search & User Authentication",
      description: "Major update with improved search capabilities and secure user authentication system.",
      changes: [
        {
          type: "feature",
          title: "User Authentication System",
          description: "Added secure login/signup functionality with OAuth integration (GitHub, Google)"
        },
        {
          type: "feature", 
          title: "Advanced Search Filters",
          description: "New filtering options by sponsor route, company size, and industry sector"
        },
        {
          type: "feature",
          title: "Export Functionality",
          description: "Users can now export search results in CSV, Excel, and PDF formats"
        },
        {
          type: "improvement",
          title: "Search Performance",
          description: "Search response time improved by 60% with new indexing system"
        },
        {
          type: "improvement",
          title: "Mobile Responsiveness",
          description: "Completely redesigned mobile experience with touch-optimized interface"
        },
        {
          type: "fix",
          title: "Data Accuracy",
          description: "Fixed issues with sponsor status updates and improved data validation"
        }
      ]
    },
    {
      version: "2.0.3",
      date: "2024-11-28",
      type: "patch",
      title: "Bug Fixes & Performance Improvements",
      description: "Critical bug fixes and performance optimizations.",
      changes: [
        {
          type: "fix",
          title: "Search Results Pagination",
          description: "Fixed pagination bug that was causing incomplete search results"
        },
        {
          type: "fix",
          title: "Data Loading Issues",
          description: "Resolved timeout issues when loading large datasets"
        },
        {
          type: "improvement",
          title: "API Response Time",
          description: "Reduced average API response time from 800ms to 300ms"
        },
        {
          type: "security",
          title: "Security Updates",
          description: "Updated dependencies and fixed potential security vulnerabilities"
        }
      ]
    },
    {
      version: "2.0.2",
      date: "2024-11-15",
      type: "patch",
      title: "Data Synchronization Update",
      description: "Improved data synchronization with official UK government sources.",
      changes: [
        {
          type: "improvement",
          title: "Real-time Data Sync",
          description: "Implemented automated daily synchronization with UK Home Office register"
        },
        {
          type: "feature",
          title: "Change Notifications",
          description: "Added system to track and display recent changes to sponsor listings"
        },
        {
          type: "fix",
          title: "Industry Classification",
          description: "Fixed incorrect industry categorization for some sponsors"
        }
      ]
    },
    {
      version: "2.0.1",
      date: "2024-11-01",
      type: "patch",
      title: "UI/UX Improvements",
      description: "User interface enhancements and accessibility improvements.",
      changes: [
        {
          type: "improvement",
          title: "Accessibility",
          description: "Improved screen reader support and keyboard navigation"
        },
        {
          type: "improvement",
          title: "Loading States",
          description: "Added skeleton screens and better loading indicators"
        },
        {
          type: "feature",
          title: "Dark Mode",
          description: "Added system-preference based dark mode support"
        },
        {
          type: "fix",
          title: "Table Sorting",
          description: "Fixed sorting issues in sponsor data tables"
        }
      ]
    },
    {
      version: "2.0.0",
      date: "2024-10-15",
      type: "major",
      title: "Complete Platform Rebuild",
      description: "Ground-up rebuild with modern technologies and improved architecture.",
      changes: [
        {
          type: "feature",
          title: "New Architecture",
          description: "Rebuilt with React 18, TypeScript, and modern build tools"
        },
        {
          type: "feature",
          title: "API Integration",
          description: "New RESTful API with comprehensive documentation"
        },
        {
          type: "feature",
          title: "Advanced Analytics",
          description: "Added sponsor statistics and trend analysis"
        },
        {
          type: "feature",
          title: "Responsive Design",
          description: "Mobile-first responsive design with Tailwind CSS"
        },
        {
          type: "improvement",
          title: "Performance",
          description: "50x faster loading times with optimized data structures"
        }
      ]
    },
    {
      version: "1.2.1",
      date: "2024-08-20",
      type: "patch",
      title: "Legacy System Final Update",
      description: "Final update to the legacy system before v2.0 migration.",
      changes: [
        {
          type: "fix",
          title: "Search Functionality",
          description: "Fixed search bugs and improved result accuracy"
        },
        {
          type: "improvement",
          title: "Data Coverage",
          description: "Expanded database to include 45,000+ sponsors"
        },
        {
          type: "security",
          title: "Security Patches",
          description: "Applied critical security updates"
        }
      ]
    }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "feature":
        return <Plus className="w-4 h-4 text-green-600" />;
      case "improvement":
        return <Zap className="w-4 h-4 text-blue-600" />;
      case "fix":
        return <Bug className="w-4 h-4 text-orange-600" />;
      case "security":
        return <Shield className="w-4 h-4 text-red-600" />;
      default:
        return <Info className="w-4 h-4 text-gray-600" />;
    }
  };

  const getTypeBadge = (type: string) => {
    const variants = {
      feature: "bg-green-100 text-green-700 hover:bg-green-200",
      improvement: "bg-blue-100 text-blue-700 hover:bg-blue-200", 
      fix: "bg-orange-100 text-orange-700 hover:bg-orange-200",
      security: "bg-red-100 text-red-700 hover:bg-red-200"
    };
    
    return (
      <Badge className={variants[type as keyof typeof variants] || "bg-gray-100 text-gray-700"}>
        {getTypeIcon(type)}
        <span className="ml-1 capitalize">{type}</span>
      </Badge>
    );
  };

  const getVersionBadge = (type: string) => {
    switch (type) {
      case "major":
        return <Badge className="bg-purple-100 text-purple-700">Major Release</Badge>;
      case "minor":
        return <Badge className="bg-blue-100 text-blue-700">Minor Release</Badge>;
      case "patch":
        return <Badge className="bg-gray-100 text-gray-700">Patch Release</Badge>;
      default:
        return <Badge variant="outline">Release</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="relative mb-12">
          {/* Hero Section */}
          <div className="relative h-72 rounded-3xl overflow-hidden mb-8">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-500 via-brand-600 to-brand-700" />
            <div className={"absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23ffffff\" fill-opacity=\"0.1\"%3E%3Ccircle cx=\"30\" cy=\"30\" r=\"1\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"} />
            <div className="absolute inset-0 flex items-center justify-center text-center text-white">
              <div className="max-w-3xl px-6">
                <div className="flex items-center justify-center mb-6">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                    <Calendar className="w-10 h-10 text-white" />
                  </div>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  Release Notes
                </h1>
                <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
                  Stay up to date with the latest features, improvements, and bug fixes
                  to the UK Tier Sponsors platform.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Current Status Banner */}
        <Card className="mb-8 border-brand-200 bg-gradient-to-r from-brand-50 to-brand-100/50">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Platform Status: All Systems Operational
                </h3>
                <p className="text-muted-foreground mb-4">
                  Current version: <strong>v2.1.0</strong> • 
                  Last updated: <strong>December 15, 2024</strong> • 
                  Uptime: <strong>99.9%</strong>
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-green-100 text-green-700">
                    ✓ Database Synced
                  </Badge>
                  <Badge className="bg-green-100 text-green-700">
                    ✓ API Healthy
                  </Badge>
                  <Badge className="bg-green-100 text-green-700">
                    ✓ Search Optimized
                  </Badge>
                </div>
              </div>
              <Button variant="outline" size="sm" asChild>
                <a 
                  href="https://status.uktiersponsors.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  Status Page
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Releases */}
        <div className="space-y-8">
          {releases.map((release, index) => (
            <Card key={release.version} className={index === 0 ? "border-brand-200" : ""}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <CardTitle className="text-2xl">
                        Version {release.version}
                      </CardTitle>
                      {getVersionBadge(release.type)}
                      {index === 0 && (
                        <Badge className="bg-yellow-100 text-yellow-700">
                          <Star className="w-3 h-3 mr-1" />
                          Latest
                        </Badge>
                      )}
                    </div>
                    <CardDescription className="text-lg">
                      {release.title}
                    </CardDescription>
                  </div>
                  <div className="text-right text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(release.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground">
                  {release.description}
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {release.changes.map((change, changeIndex) => (
                    <div key={changeIndex} className="flex gap-4">
                      <div className="flex-shrink-0 mt-1">
                        {getTypeIcon(change.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h4 className="font-medium text-foreground mb-1">
                              {change.title}
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              {change.description}
                            </p>
                          </div>
                          {getTypeBadge(change.type)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Roadmap Teaser */}
        <Card className="mt-12 border-dashed border-2 border-brand-200">
          <CardContent className="p-8 text-center">
            <div className="w-12 h-12 bg-brand-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Settings className="w-6 h-6 text-brand-600" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              What's Coming Next?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              We're constantly working to improve the platform. Here's a sneak peek 
              at what we're planning for future releases.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="p-4 bg-brand-50 rounded-lg">
                <Database className="w-6 h-6 text-brand-600 mx-auto mb-2" />
                <h4 className="font-medium mb-1">Enhanced Analytics</h4>
                <p className="text-sm text-muted-foreground">
                  Advanced sponsor insights and trend analysis
                </p>
              </div>
              <div className="p-4 bg-brand-50 rounded-lg">
                <Smartphone className="w-6 h-6 text-brand-600 mx-auto mb-2" />
                <h4 className="font-medium mb-1">Mobile App</h4>
                <p className="text-sm text-muted-foreground">
                  Native iOS and Android applications
                </p>
              </div>
              <div className="p-4 bg-brand-50 rounded-lg">
                <Star className="w-6 h-6 text-brand-600 mx-auto mb-2" />
                <h4 className="font-medium mb-1">AI Recommendations</h4>
                <p className="text-sm text-muted-foreground">
                  Personalized sponsor suggestions
                </p>
              </div>
            </div>
            <Button variant="outline">
              View Full Roadmap
            </Button>
          </CardContent>
        </Card>

        {/* Subscribe to Updates */}
        <Card className="mt-8">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-1">
                  Stay Updated
                </h3>
                <p className="text-muted-foreground">
                  Get notified about new releases and important updates
                </p>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" size="sm">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  RSS Feed
                </Button>
                <Button size="sm">
                  Subscribe to Newsletter
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
