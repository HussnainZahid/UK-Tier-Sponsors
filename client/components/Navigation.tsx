import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Search,
  Building2,
  MapPin,
  BarChart3,
  User,
  LogIn,
  Settings,
  HelpCircle,
  ExternalLink,
  Shield,
  Calendar,
  Info,
  ChevronDown,
  Database,
  Download
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function Navigation() {
  const location = useLocation();
  const [user] = useState(null); // This would come from auth context

  const isActive = (path: string) => location.pathname === path;

  const mainNavItems = [
    {
      title: "Search",
      href: "/",
      icon: Search,
      description: "Find visa sponsors"
    },
    {
      title: "Industry",
      href: "/industry",
      icon: Building2,
      description: "Browse by industry sector"
    },
    {
      title: "Location",
      href: "/location",
      icon: MapPin,
      description: "Search by location"
    },
    {
      title: "Statistics",
      href: "/stats",
      icon: BarChart3,
      description: "Platform insights and trends"
    }
  ];

  const dataNavItems = [
    {
      title: "All Sponsors",
      href: "/data/all",
      description: "Complete sponsor database",
      badge: "50K+"
    },
    {
      title: "Recent Additions",
      href: "/data/recent",
      description: "Newly added sponsors",
      badge: "New"
    },
    {
      title: "Removed Sponsors",
      href: "/data/deleted",
      description: "Recently removed from register",
      badge: "Updated"
    }
  ];

  const resourceItems = [
    {
      title: "About Us",
      href: "/about",
      icon: Info,
      description: "Learn about our mission"
    },
    {
      title: "Privacy Policy",
      href: "/privacy",
      icon: Shield,
      description: "How we protect your data"
    },
    {
      title: "Release Notes",
      href: "/releases",
      icon: Calendar,
      description: "Latest platform updates"
    },
    {
      title: "GOV.UK Resources",
      href: "/resources",
      icon: HelpCircle,
      description: "Official guidance and links from GOV.UK"
    }
  ];

  const officialLinks = [
    {
      title: "UK Home Office Register",
      href: "https://www.gov.uk/government/publications/register-of-licensed-sponsors-workers",
      description: "Official sponsor register"
    },
    {
      title: "UK Visas & Immigration",
      href: "https://www.gov.uk/government/organisations/uk-visas-and-immigration",
      description: "Government immigration info"
    }
  ];

  return (
    <NavigationMenu className="relative">
      <NavigationMenuList className="flex gap-1">
        
        {/* Main Navigation */}
        <NavigationMenuItem>
          <NavigationMenuTrigger className="h-10">
            <Search className="w-4 h-4 mr-2" />
            Sponsors
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid gap-3 p-6 w-[500px] lg:w-[600px] lg:grid-cols-[.75fr_1fr]">
              <div className="row-span-3">
                <NavigationMenuLink asChild>
                  <Link
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-brand-500/20 to-brand-700/20 p-6 no-underline outline-none focus:shadow-md"
                    to="/"
                  >
                    <Building2 className="h-6 w-6 text-brand-600" />
                    <div className="mb-2 mt-4 text-lg font-medium">
                      UK Tier Sponsors
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      Search the official UK government register of licensed visa sponsors
                    </p>
                  </Link>
                </NavigationMenuLink>
              </div>
              <div className="grid gap-3">
                {mainNavItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <NavigationMenuLink key={item.href} asChild>
                      <Link
                        to={item.href}
                        className={cn(
                          "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                          isActive(item.href) && "bg-accent text-accent-foreground"
                        )}
                      >
                        <div className="flex items-center gap-2">
                          <Icon className="w-4 h-4" />
                          <div className="text-sm font-medium leading-none">
                            {item.title}
                          </div>
                        </div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          {item.description}
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  );
                })}
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* Data Navigation */}
        <NavigationMenuItem>
          <NavigationMenuTrigger className="h-10">
            <Database className="w-4 h-4 mr-2" />
            Data
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid gap-3 p-6 w-[400px]">
              <div className="grid gap-3">
                {dataNavItems.map((item) => (
                  <NavigationMenuLink key={item.href} asChild>
                    <Link
                      to={item.href}
                      className={cn(
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                        isActive(item.href) && "bg-accent text-accent-foreground"
                      )}
                    >
                      <div className="flex items-center justify-between">
                        <div className="text-sm font-medium leading-none">
                          {item.title}
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          {item.badge}
                        </Badge>
                      </div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {item.description}
                      </p>
                    </Link>
                  </NavigationMenuLink>
                ))}
              </div>
              <div className="border-t pt-3">
                <NavigationMenuLink asChild>
                  <Link
                    to="/data/export"
                    className="flex items-center gap-2 text-sm text-brand-600 hover:text-brand-700"
                  >
                    <Download className="w-4 h-4" />
                    Export Data
                  </Link>
                </NavigationMenuLink>
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* Resources Navigation */}
        <NavigationMenuItem>
          <NavigationMenuTrigger className="h-10">
            <HelpCircle className="w-4 h-4 mr-2" />
            Resources
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid gap-3 p-6 w-[500px] lg:w-[600px] lg:grid-cols-2">
              <div>
                <h4 className="text-sm font-medium mb-3 text-muted-foreground">Platform</h4>
                <div className="grid gap-3">
                  {resourceItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <NavigationMenuLink key={item.href} asChild>
                        <Link
                          to={item.href}
                          className={cn(
                            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                            isActive(item.href) && "bg-accent text-accent-foreground"
                          )}
                        >
                          <div className="flex items-center gap-2">
                            <Icon className="w-4 h-4" />
                            <div className="text-sm font-medium leading-none">
                              {item.title}
                            </div>
                          </div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            {item.description}
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    );
                  })}
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-3 text-muted-foreground">Official Sources</h4>
                <div className="grid gap-3">
                  {officialLinks.map((item) => (
                    <NavigationMenuLink key={item.href} asChild>
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      >
                        <div className="flex items-center gap-2">
                          <ExternalLink className="w-4 h-4" />
                          <div className="text-sm font-medium leading-none">
                            {item.title}
                          </div>
                        </div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          {item.description}
                        </p>
                      </a>
                    </NavigationMenuLink>
                  ))}
                </div>
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* User Account */}
        <NavigationMenuItem>
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-10 w-10 rounded-full">
                  <User className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="w-4 h-4 mr-2" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Download className="w-4 h-4 mr-2" />
                  Downloads
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogIn className="w-4 h-4 mr-2" />
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button asChild variant="ghost" className="h-10">
              <Link to="/login" className="flex items-center gap-2">
                <LogIn className="w-4 h-4" />
                Sign In
              </Link>
            </Button>
          )}
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
