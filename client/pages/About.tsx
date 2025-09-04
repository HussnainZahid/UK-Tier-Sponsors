import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Building2, 
  Users, 
  Globe, 
  Shield, 
  Clock, 
  CheckCircle,
  ExternalLink,
  Mail,
  Github,
  Twitter,
  Linkedin,
  Award,
  Database,
  Zap,
  TrendingUp
} from "lucide-react";
import { Link } from "react-router-dom";

export default function About() {
  const stats = [
    { label: "Active Sponsors", value: "50,000+", icon: Building2 },
    { label: "Daily Users", value: "10,000+", icon: Users },
    { label: "API Requests", value: "1M+", icon: Database },
    { label: "Uptime", value: "99.9%", icon: TrendingUp }
  ];

  const features = [
    {
      icon: Database,
      title: "Official Data Source",
      description: "All data is sourced directly from the UK Home Office Register of Licensed Sponsors, ensuring accuracy and reliability."
    },
    {
      icon: Clock,
      title: "Real-time Updates",
      description: "Our system automatically syncs with official government databases to provide the most current sponsor information."
    },
    {
      icon: Shield,
      title: "Privacy & Security",
      description: "We prioritize data protection and comply with GDPR and UK data protection regulations."
    },
    {
      icon: Zap,
      title: "Fast & Reliable",
      description: "Lightning-fast search capabilities with 99.9% uptime to help you find sponsors when you need them."
    }
  ];

  const team = [
    {
      name: "Sarah Johnson",
      role: "Founder & CEO",
      description: "Former immigration lawyer with 10+ years experience helping individuals navigate UK visa processes.",
      image: "/api/placeholder/300/300"
    },
    {
      name: "Michael Chen",
      role: "Lead Developer",
      description: "Full-stack engineer specializing in data systems and API development with expertise in government data integration.",
      image: "/api/placeholder/300/300"
    },
    {
      name: "Emma Thompson",
      role: "Data Analyst",
      description: "Immigration policy researcher focused on sponsor trends and visa route analysis.",
      image: "/api/placeholder/300/300"
    }
  ];

  const timeline = [
    {
      year: "2023",
      title: "Platform Launch",
      description: "Launched UK Tier Sponsors with basic search functionality and 30,000+ sponsor records."
    },
    {
      year: "2024",
      title: "API Development",
      description: "Released public API and advanced filtering options. Reached 50,000+ active sponsor listings."
    },
    {
      year: "2024",
      title: "Mobile Optimization",
      description: "Launched mobile-responsive design and improved search performance by 300%."
    },
    {
      year: "2024",
      title: "Premium Features",
      description: "Added export functionality, real-time notifications, and priority support for registered users."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="relative mb-16">
          {/* Hero Image */}
          <div className="relative h-96 rounded-3xl overflow-hidden mb-8">
            <img
              src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg"
              alt="Professional team collaboration in modern office"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-brand-900/80 to-brand-600/60" />
            <div className="absolute inset-0 flex items-center justify-center text-center text-white">
              <div className="max-w-4xl px-6">
                <div className="flex items-center justify-center mb-6">
                  <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                    <Building2 className="w-12 h-12 text-white" />
                  </div>
                </div>
                <h1 className="text-4xl md:text-6xl font-bold mb-4">
                  About UK Tier Sponsors
                </h1>
                <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
                  We're on a mission to make UK visa sponsorship information accessible,
                  accurate, and easy to navigate for everyone seeking employment opportunities in the UK.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="text-center">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-brand-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-6 h-6 text-brand-600" />
                  </div>
                  <div className="text-3xl font-bold text-foreground mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Mission Section */}
        <Card className="mb-16">
          <CardContent className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  Our Mission
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                  The UK visa sponsorship process can be complex and overwhelming. 
                  We believe that finding the right sponsor shouldn't be a barrier 
                  to pursuing your career goals in the UK.
                </p>
                <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                  Our platform transforms the official UK Home Office sponsor register 
                  into a user-friendly, searchable database that helps job seekers, 
                  recruiters, and immigration professionals find relevant sponsors quickly and easily.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-brand-100 text-brand-700 hover:bg-brand-200">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Official Data
                  </Badge>
                  <Badge className="bg-brand-100 text-brand-700 hover:bg-brand-200">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Daily Updates
                  </Badge>
                  <Badge className="bg-brand-100 text-brand-700 hover:bg-brand-200">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Free Access
                  </Badge>
                </div>
              </div>
              <div className="bg-gradient-to-br from-brand-50 to-brand-100/50 rounded-xl p-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Globe className="w-6 h-6 text-brand-600" />
                    <span className="font-medium">Serving users worldwide</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Shield className="w-6 h-6 text-brand-600" />
                    <span className="font-medium">GDPR compliant platform</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Award className="w-6 h-6 text-brand-600" />
                    <span className="font-medium">Trusted by thousands</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Features Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-foreground text-center mb-8">
            What Makes Us Different
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-brand-100 rounded-lg flex items-center justify-center">
                        <Icon className="w-6 h-6 text-brand-600" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-foreground mb-2">
                          {feature.title}
                        </h3>
                        <p className="text-muted-foreground leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-foreground text-center mb-8">
            Meet Our Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index}>
                <CardContent className="p-6 text-center">
                  <div className="w-24 h-24 bg-brand-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Users className="w-12 h-12 text-brand-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-1">
                    {member.name}
                  </h3>
                  <p className="text-brand-600 font-medium mb-3">
                    {member.role}
                  </p>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {member.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Timeline Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-foreground text-center mb-8">
            Our Journey
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {timeline.map((item, index) => (
                <div key={index} className="flex gap-6">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-brand-500 rounded-full flex items-center justify-center text-white font-semibold">
                      {item.year.slice(-2)}
                    </div>
                    {index < timeline.length - 1 && (
                      <div className="w-0.5 h-16 bg-brand-200 mt-4" />
                    )}
                  </div>
                  <div className="flex-1 pb-8">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-xl font-semibold text-foreground">
                        {item.title}
                      </h3>
                      <Badge variant="outline" className="text-xs">
                        {item.year}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Data Sources Section */}
        <Card className="mb-16">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="w-6 h-6 text-brand-600" />
              Official Data Sources
            </CardTitle>
            <CardDescription>
              We source all sponsor information from official UK government databases
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-semibold text-foreground">Primary Sources:</h4>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <ExternalLink className="w-4 h-4 text-brand-600 mt-1" />
                    <div>
                      <a 
                        href="https://www.gov.uk/government/publications/register-of-licensed-sponsors-workers"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-brand-600 hover:underline"
                      >
                        UK Home Office Register of Licensed Sponsors
                      </a>
                      <p className="text-sm text-muted-foreground">
                        Official register of all licensed sponsors for worker routes
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <ExternalLink className="w-4 h-4 text-brand-600 mt-1" />
                    <div>
                      <a 
                        href="https://www.gov.uk/government/organisations/uk-visas-and-immigration"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-brand-600 hover:underline"
                      >
                        UK Visas and Immigration
                      </a>
                      <p className="text-sm text-muted-foreground">
                        Latest policy updates and sponsor requirements
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="space-y-4">
                <h4 className="font-semibold text-foreground">Update Frequency:</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Sponsor Data</span>
                    <Badge variant="secondary">Daily</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Policy Changes</span>
                    <Badge variant="secondary">Real-time</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Statistics</span>
                    <Badge variant="secondary">Weekly</Badge>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Section */}
        <Card>
          <CardHeader className="text-center">
            <CardTitle>Get in Touch</CardTitle>
            <CardDescription>
              Have questions or feedback? We'd love to hear from you.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="flex flex-col items-center gap-3">
                <div className="w-12 h-12 bg-brand-100 rounded-lg flex items-center justify-center">
                  <Mail className="w-6 h-6 text-brand-600" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Email Us</h3>
                  <p className="text-sm text-muted-foreground">
                    hello@uktiersponsors.com
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center gap-3">
                <div className="w-12 h-12 bg-brand-100 rounded-lg flex items-center justify-center">
                  <Github className="w-6 h-6 text-brand-600" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Open Source</h3>
                  <p className="text-sm text-muted-foreground">
                    Contribute on GitHub
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center gap-3">
                <div className="w-12 h-12 bg-brand-100 rounded-lg flex items-center justify-center">
                  <Twitter className="w-6 h-6 text-brand-600" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Follow Us</h3>
                  <p className="text-sm text-muted-foreground">
                    @uktiersponsors
                  </p>
                </div>
              </div>
            </div>
            <Separator className="my-6" />
            <div className="text-center">
              <Button asChild>
                <Link to="/login">
                  Get Started Today
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
