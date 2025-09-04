import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Home,
  Clock,
  Trash2,
  LogIn,
  LogOut,
  X,
  Github,
  Shield,
  Info,
  Calendar,
  Download,
  HelpCircle
} from "lucide-react";
import { cn } from "@/lib/utils";
import { DataSectionType, User, ApiResponse } from "@shared/api";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

export default function Sidebar({ isOpen, onClose, className }: SidebarProps) {
  const location = useLocation();
  const [user, setUser] = useState<User | null>(null);
  const [dataCounts, setDataCounts] = useState({ all: 0, recent: 0, deleted: 0 });

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  // Fetch data counts from API
  useEffect(() => {
    const fetchDataCounts = async () => {
      try {
        // Add delay to avoid conflicts with hot reload
        await new Promise(resolve => setTimeout(resolve, 100));

        console.log('Attempting to fetch data stats from:', '/api/data/stats');

        const response = await fetch('/api/data/stats', {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        console.log('Response status:', response.status, response.statusText);

        if (response.ok) {
          const result: ApiResponse<{ all: number; recent: number; deleted: number }> = await response.json();
          console.log('API result:', result);
          if (result.success && result.data) {
            setDataCounts(result.data);
            console.log('Data counts updated:', result.data);
          } else {
            console.warn('API returned unsuccessful result:', result);
          }
        } else {
          console.warn('API request failed with status:', response.status, response.statusText);
        }
      } catch (error) {
        const { formatError } = await import("@/lib/utils");
        console.error('Fetch error:', formatError(error));

        // Fallback to default values on error
        setDataCounts({ all: 0, recent: 0, deleted: 0 });
      }
    };

    // Delay the initial fetch to avoid HMR conflicts
    const timeoutId = setTimeout(fetchDataCounts, 500);
    return () => clearTimeout(timeoutId);
  }, []);

  const dataSections = [
    {
      type: 'all' as DataSectionType,
      name: 'All',
      href: '/data/all',
      icon: Home,
      count: dataCounts.all,
      description: 'Complete sponsor database'
    },
    {
      type: 'recent' as DataSectionType,
      name: 'Recent',
      href: '/data/recent',
      icon: Clock,
      count: dataCounts.recent,
      description: 'Recently added sponsors'
    },
    {
      type: 'deleted' as DataSectionType,
      name: 'Deleted',
      href: '/data/deleted',
      icon: Trash2,
      count: dataCounts.deleted,
      description: 'Removed from register'
    },
  ];

  const additionalLinks = [
    { name: 'Login', href: '/login', icon: LogIn },
    { name: 'Download All', href: '/download/all', icon: Download },
    { name: 'Download Recent', href: '/download/recent', icon: Download },
    { name: 'Download Deleted', href: '/download/deleted', icon: Download },
    { name: 'Join Slack Community', href: 'https://slack.example.com', icon: HelpCircle, external: true },
    { name: 'Github', href: 'https://github.com/uk-tier-sponsors', icon: Github, external: true },
    { name: 'Privacy Policy', href: '/privacy', icon: Shield },
    { name: 'Release Notes', href: '/releases', icon: Calendar },
    { name: 'About Us', href: '/about', icon: Info },
  ];

  const handleLogin = () => {
    // Mock login - in real app this would integrate with auth provider
    setUser({
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      avatar: 'https://github.com/shadcn.png'
    });
  };

  const handleLogout = () => {
    setUser(null);
  };

  const isActive = (href: string) => {
    return location.pathname === href;
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div
        id="app-sidebar"
        className={cn(
          "fixed left-0 top-0 z-50 h-full w-80 transform bg-sidebar border-r border-sidebar-border transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full",
          className
        )}
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-brand-500 rounded-lg flex items-center justify-center">
                <Home className="w-4 h-4 text-white" />
              </div>
              <div>
                <h2 className="font-semibold text-sidebar-foreground">Data Manager</h2>
                <p className="text-xs text-sidebar-foreground/70">UK Tier Sponsors</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* User Section */}
          <div className="p-4 border-b border-sidebar-border">
            {user ? (
              <div className="flex items-center gap-3">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-sidebar-foreground truncate">{user.name}</p>
                  <p className="text-xs text-sidebar-foreground/70 truncate">{user.email}</p>
                </div>
                <Button variant="ghost" size="sm" onClick={handleLogout}>
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            ) : (
              <Button 
                onClick={handleLogin}
                className="w-full flex items-center gap-2"
                variant="outline"
              >
                <LogIn className="w-4 h-4" />
                Login
              </Button>
            )}
          </div>

          {/* Data Sections */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-4">
              <h3 className="text-xs font-semibold text-sidebar-foreground/70 uppercase tracking-wider mb-3">
                Data Sections
              </h3>
              <nav className="space-y-1">
                {dataSections.map((section) => {
                  const Icon = section.icon;
                  const active = isActive(section.href);
                  
                  return (
                    <Link
                      key={section.type}
                      to={section.href}
                      onClick={onClose}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors hover:bg-sidebar-accent",
                        active ? "bg-sidebar-accent text-sidebar-accent-foreground" : "text-sidebar-foreground"
                      )}
                    >
                      <Icon className="w-4 h-4" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{section.name}</span>
                          <Badge variant="secondary" className="ml-2 text-xs">
                            {section.count.toLocaleString()}
                          </Badge>
                        </div>
                        <p className="text-xs text-sidebar-foreground/70 truncate mt-0.5">
                          {section.description}
                        </p>
                      </div>
                    </Link>
                  );
                })}
              </nav>

              <Separator className="my-4" />

              {/* Additional Links */}
              <h3 className="text-xs font-semibold text-sidebar-foreground/70 uppercase tracking-wider mb-3">
                Tools & Resources
              </h3>
              <nav className="space-y-1">
                {additionalLinks.map((link) => {
                  const Icon = link.icon;
                  const active = !link.external && isActive(link.href);
                  
                  if (link.external) {
                    return (
                      <a
                        key={link.name}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-sidebar-foreground transition-colors hover:bg-sidebar-accent"
                      >
                        <Icon className="w-4 h-4" />
                        <span>{link.name}</span>
                      </a>
                    );
                  }

                  return (
                    <Link
                      key={link.name}
                      to={link.href}
                      onClick={onClose}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-sidebar-accent",
                        active ? "bg-sidebar-accent text-sidebar-accent-foreground" : "text-sidebar-foreground"
                      )}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{link.name}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-sidebar-border">
            <p className="text-xs text-sidebar-foreground/60 text-center">
              © 2024 UK Tier Sponsors
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
