import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Building2,
  Mail,
  Github,
  Twitter,
  Linkedin,
  ExternalLink,
  Shield,
  Zap,
  Clock,
  CheckCircle,
  ArrowUp,
  Bell
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleNewsletterSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast.success("Successfully subscribed to newsletter!");
      setEmail("");
    } else {
      toast.error("Please enter a valid email address");
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const quickLinks = [
    { name: "Search Sponsors", href: "/" },
    { name: "Browse by Industry", href: "/industry" },
    { name: "Browse by Location", href: "/location" },
    { name: "Statistics", href: "/stats" }
  ];

  const dataLinks = [
    { name: "All Sponsors", href: "/data/all" },
    { name: "Recent Additions", href: "/data/recent" },
    { name: "Removed Sponsors", href: "/data/deleted" },
    { name: "Export Data", href: "/data/export" }
  ];

  const resourceLinks = [
    { name: "About Us", href: "/about" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Release Notes", href: "/releases" },
    { name: "Help Center", href: "/help" }
  ];

  const officialLinks = [
    {
      name: "UK Home Office Register",
      href: "https://www.gov.uk/government/publications/register-of-licensed-sponsors-workers",
      external: true
    },
    {
      name: "UK Visas & Immigration",
      href: "https://www.gov.uk/government/organisations/uk-visas-and-immigration",
      external: true
    },
    {
      name: "Immigration Statistics",
      href: "https://www.gov.uk/government/statistics/immigration-system-statistics-year-ending-march-2024",
      external: true
    }
  ];

  const features = [
    { icon: CheckCircle, text: "50,000+ Active Sponsors" },
    { icon: Clock, text: "Daily Data Updates" },
    { icon: Shield, text: "Official UK Government Data" },
    { icon: Zap, text: "Real-time Search" }
  ];

  return (
    <footer className="bg-muted/30 border-t border-border">
      {/* Newsletter Section */}
      <div className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="w-10 h-10 bg-brand-500 rounded-lg flex items-center justify-center">
                <Bell className="w-5 h-5 text-white" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-2">
              Stay Updated
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Get notified about new sponsors, platform updates, and important changes 
              to UK visa sponsorship regulations.
            </p>
            <form onSubmit={handleNewsletterSignup} className="flex gap-3 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1"
                required
              />
              <Button type="submit">
                Subscribe
              </Button>
            </form>
            <p className="text-xs text-muted-foreground mt-3">
              Free newsletter • No spam • Unsubscribe anytime
            </p>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-brand-500 rounded-lg flex items-center justify-center">
                <Building2 className="w-5 h-5 text-white" />
              </div>
              <span className="ml-3 text-xl font-semibold text-foreground">
                UK Tier Sponsors
              </span>
            </div>
            <p className="text-muted-foreground text-sm mb-6 max-w-md leading-relaxed">
              The most comprehensive and user-friendly way to search the UK government's 
              official register of licensed visa sponsors. Find employers who can sponsor 
              your visa application with advanced search capabilities.
            </p>
            
            {/* Features */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div key={index} className="flex items-center gap-2">
                    <Icon className="w-4 h-4 text-brand-600" />
                    <span className="text-xs text-muted-foreground">{feature.text}</span>
                  </div>
                );
              })}
            </div>

            {/* Social Links */}
            <div className="flex gap-3">
              <Button variant="outline" size="icon">
                <Github className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Twitter className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Linkedin className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Mail className="w-4 h-4" />
              </Button>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link 
                    to={link.href} 
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Data */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">
              Data & Export
            </h3>
            <ul className="space-y-3">
              {dataLinks.map((link) => (
                <li key={link.href}>
                  <Link 
                    to={link.href} 
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Resources */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">
              Resources
            </h3>
            <ul className="space-y-3 mb-6">
              {resourceLinks.map((link) => (
                <li key={link.href}>
                  <Link 
                    to={link.href} 
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            
            {/* Official Links */}
            <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              Official Sources
            </h4>
            <ul className="space-y-2">
              {officialLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
                  >
                    {link.name}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-col md:flex-row items-center gap-4 text-center md:text-left">
              <p className="text-xs text-muted-foreground">
                © 2024 UK Tier Sponsors. Data sourced from official UK Home Office registers.
              </p>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">
                  <Clock className="w-3 h-3 mr-1" />
                  Updated Daily
                </Badge>
                <Badge variant="outline" className="text-xs">
                  <Shield className="w-3 h-3 mr-1" />
                  GDPR Compliant
                </Badge>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <p className="text-xs text-muted-foreground">
                Independent tool. Not affiliated with UK Government.
              </p>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={scrollToTop}
                className="flex items-center gap-1"
              >
                <ArrowUp className="w-3 h-3" />
                Back to top
              </Button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
