import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  Shield, 
  Lock, 
  Eye, 
  Cookie, 
  Database, 
  Mail, 
  FileText,
  ExternalLink,
  Calendar,
  CheckCircle,
  AlertTriangle,
  Users,
  Server
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Privacy() {
  const lastUpdated = "December 15, 2024";

  const principles = [
    {
      icon: Lock,
      title: "Data Security",
      description: "We use industry-standard encryption and security measures to protect your information."
    },
    {
      icon: Eye,
      title: "Transparency",
      description: "We clearly explain what data we collect, how we use it, and who we share it with."
    },
    {
      icon: Users,
      title: "User Control",
      description: "You have full control over your data with options to access, update, or delete it."
    },
    {
      icon: Shield,
      title: "GDPR Compliance",
      description: "We fully comply with UK GDPR and data protection regulations."
    }
  ];

  const dataTypes = [
    {
      category: "Account Information",
      description: "Information you provide when creating an account",
      items: [
        "Name and email address",
        "Company information (optional)",
        "Profile preferences",
        "Authentication credentials"
      ],
      retention: "Until account deletion",
      legal_basis: "Contract performance"
    },
    {
      category: "Usage Data",
      description: "Information about how you use our platform",
      items: [
        "Search queries and filters used",
        "Pages visited and time spent",
        "Click-through rates and interactions",
        "Device and browser information"
      ],
      retention: "12 months",
      legal_basis: "Legitimate interest"
    },
    {
      category: "Technical Data",
      description: "Automatically collected technical information",
      items: [
        "IP address and location data",
        "Browser type and version",
        "Operating system",
        "Referring website URLs"
      ],
      retention: "6 months",
      legal_basis: "Legitimate interest"
    },
    {
      category: "Communication Data",
      description: "Records of your communications with us",
      items: [
        "Support ticket conversations",
        "Email correspondence",
        "Feedback and survey responses",
        "Newsletter subscriptions"
      ],
      retention: "3 years",
      legal_basis: "Legitimate interest"
    }
  ];

  const rights = [
    {
      title: "Right of Access",
      description: "Request copies of your personal data we hold",
      action: "Contact us to request your data"
    },
    {
      title: "Right to Rectification",
      description: "Request correction of inaccurate personal data",
      action: "Update your profile or contact support"
    },
    {
      title: "Right to Erasure",
      description: "Request deletion of your personal data",
      action: "Delete your account or contact us"
    },
    {
      title: "Right to Restrict Processing",
      description: "Request limitation of how we process your data",
      action: "Contact our privacy team"
    },
    {
      title: "Right to Data Portability",
      description: "Request transfer of your data to another service",
      action: "Export your data from account settings"
    },
    {
      title: "Right to Object",
      description: "Object to processing based on legitimate interests",
      action: "Opt-out in account settings"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="relative mb-12">
          {/* Hero Image */}
          <div className="relative h-80 rounded-3xl overflow-hidden mb-8">
            <img
              src="https://images.pexels.com/photos/5475786/pexels-photo-5475786.jpeg"
              alt="Cybersecurity and data protection technology"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-purple-900/80 to-brand-600/70" />
            <div className="absolute inset-0 flex items-center justify-center text-center text-white">
              <div className="max-w-4xl px-6">
                <div className="flex items-center justify-center mb-6">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                    <Shield className="w-10 h-10 text-white" />
                  </div>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  Privacy Policy
                </h1>
                <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
                  Your privacy is important to us. This policy explains how UK Tier Sponsors
                  collects, uses, and protects your personal information.
                </p>
                <div className="flex items-center justify-center gap-2 mt-6">
                  <Calendar className="w-4 h-4 text-white/80" />
                  <span className="text-sm text-white/80">
                    Last updated: {lastUpdated}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Privacy Principles */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {principles.map((principle, index) => {
            const Icon = principle.icon;
            return (
              <Card key={index} className="text-center">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-brand-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-6 h-6 text-brand-600" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">
                    {principle.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {principle.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Quick Summary */}
        <Card className="mb-8 border-brand-200 bg-gradient-to-r from-brand-50 to-brand-100/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="w-6 h-6 text-green-600" />
              Quick Summary
            </CardTitle>
            <CardDescription>
              Key points about how we handle your data
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                  <span className="text-sm">We only collect data necessary for our service</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                  <span className="text-sm">We never sell your personal information</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                  <span className="text-sm">You can delete your account and data anytime</span>
                </li>
              </ul>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                  <span className="text-sm">All data is encrypted and securely stored</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                  <span className="text-sm">We comply with UK GDPR requirements</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                  <span className="text-sm">Third-party integrations are limited and secure</span>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Data We Collect */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-6">
            Information We Collect
          </h2>
          <div className="space-y-6">
            {dataTypes.map((dataType, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl">{dataType.category}</CardTitle>
                      <CardDescription>{dataType.description}</CardDescription>
                    </div>
                    <div className="text-right">
                      <Badge variant="outline" className="mb-1">
                        {dataType.retention}
                      </Badge>
                      <p className="text-xs text-muted-foreground">
                        Legal basis: {dataType.legal_basis}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {dataType.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-brand-500 rounded-full mt-2"></div>
                        <span className="text-sm text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* How We Use Your Data */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="w-6 h-6 text-brand-600" />
              How We Use Your Information
            </CardTitle>
            <CardDescription>
              We use your data for the following purposes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold text-foreground mb-3">Service Delivery</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Provide access to sponsor search functionality</li>
                  <li>• Maintain your account and preferences</li>
                  <li>• Process data exports and downloads</li>
                  <li>• Send service-related notifications</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-3">Platform Improvement</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Analyze usage patterns to improve features</li>
                  <li>• Identify and fix technical issues</li>
                  <li>• Develop new functionality based on user needs</li>
                  <li>• Optimize search performance and accuracy</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-3">Communication</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Respond to support requests and inquiries</li>
                  <li>• Send important platform updates</li>
                  <li>• Share relevant product announcements</li>
                  <li>• Conduct user research and surveys (optional)</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-3">Legal & Security</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Comply with legal obligations</li>
                  <li>• Prevent fraud and abuse</li>
                  <li>• Maintain platform security</li>
                  <li>• Enforce our terms of service</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Data Sharing */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Server className="w-6 h-6 text-brand-600" />
              Data Sharing & Third Parties
            </CardTitle>
            <CardDescription>
              When and how we share your information
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  We Share Data With:
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <h5 className="font-medium mb-2">Service Providers</h5>
                    <p className="text-sm text-muted-foreground">
                      Cloud hosting, analytics, and customer support tools that help us operate the platform.
                    </p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <h5 className="font-medium mb-2">Legal Requirements</h5>
                    <p className="text-sm text-muted-foreground">
                      When required by law, court order, or to protect our legal rights and user safety.
                    </p>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-red-600" />
                  We Never Share Data With:
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                    <h5 className="font-medium mb-2">Data Brokers</h5>
                    <p className="text-sm text-muted-foreground">
                      We never sell or rent your personal information to third parties.
                    </p>
                  </div>
                  <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                    <h5 className="font-medium mb-2">Advertisers</h5>
                    <p className="text-sm text-muted-foreground">
                      Your personal data is never used for advertising purposes.
                    </p>
                  </div>
                  <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                    <h5 className="font-medium mb-2">Unauthorized Parties</h5>
                    <p className="text-sm text-muted-foreground">
                      Strict access controls prevent unauthorized data access.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Your Rights */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-6">
            Your Privacy Rights
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {rights.map((right, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-foreground mb-2">
                    {right.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    {right.description}
                  </p>
                  <p className="text-xs text-brand-600 font-medium">
                    How to exercise: {right.action}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Security Measures */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="w-6 h-6 text-brand-600" />
              Security Measures
            </CardTitle>
            <CardDescription>
              How we protect your information
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-brand-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Lock className="w-6 h-6 text-brand-600" />
                </div>
                <h4 className="font-semibold mb-2">Encryption</h4>
                <p className="text-sm text-muted-foreground">
                  All data is encrypted in transit and at rest using industry-standard protocols.
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-brand-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Server className="w-6 h-6 text-brand-600" />
                </div>
                <h4 className="font-semibold mb-2">Secure Infrastructure</h4>
                <p className="text-sm text-muted-foreground">
                  Our servers are hosted in secure, certified data centers with 24/7 monitoring.
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-brand-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Shield className="w-6 h-6 text-brand-600" />
                </div>
                <h4 className="font-semibold mb-2">Access Controls</h4>
                <p className="text-sm text-muted-foreground">
                  Strict access controls ensure only authorized personnel can access data.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Cookies */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Cookie className="w-6 h-6 text-brand-600" />
              Cookies & Tracking
            </CardTitle>
            <CardDescription>
              How we use cookies and similar technologies
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-foreground mb-2">Essential Cookies</h4>
                <p className="text-sm text-muted-foreground">
                  Required for the platform to function properly. These cannot be disabled.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">Analytics Cookies</h4>
                <p className="text-sm text-muted-foreground">
                  Help us understand how users interact with our platform to improve functionality.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">Preference Cookies</h4>
                <p className="text-sm text-muted-foreground">
                  Remember your settings and preferences for a better user experience.
                </p>
              </div>
              <div className="pt-2">
                <Button variant="outline" size="sm">
                  Manage Cookie Preferences
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="w-6 h-6 text-brand-600" />
              Contact Our Privacy Team
            </CardTitle>
            <CardDescription>
              Have questions about your privacy or this policy?
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold text-foreground mb-3">Get in Touch</h4>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium">Email:</p>
                    <p className="text-sm text-muted-foreground">privacy@uktiersponsors.com</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Data Protection Officer:</p>
                    <p className="text-sm text-muted-foreground">dpo@uktiersponsors.com</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Response Time:</p>
                    <p className="text-sm text-muted-foreground">Within 30 days (GDPR requirement)</p>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-3">Quick Actions</h4>
                <div className="space-y-2">
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <FileText className="w-4 h-4 mr-2" />
                    Download Your Data
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <Eye className="w-4 h-4 mr-2" />
                    View Data We Have
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start" asChild>
                    <Link to="/login">
                      <Shield className="w-4 h-4 mr-2" />
                      Account Settings
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
            <Separator className="my-6" />
            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                This privacy policy was last updated on {lastUpdated}. 
                We will notify you of any significant changes via email or platform notification.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
