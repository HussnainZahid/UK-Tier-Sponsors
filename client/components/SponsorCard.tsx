import { Sponsor, SponsorRoute, SponsorType } from "@shared/api";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Building2, Calendar, ExternalLink, Users, Award } from "lucide-react";
import { format } from "date-fns";

interface SponsorCardProps {
  sponsor: Sponsor;
  onSelect?: (sponsor: Sponsor) => void;
}

export default function SponsorCard({ sponsor, onSelect }: SponsorCardProps) {
  const getTypeColor = (type: SponsorType) => {
    switch (type) {
      case SponsorType.WORKER:
        return "bg-brand-100 text-brand-800 border-brand-200";
      case SponsorType.TEMPORARY_WORKER:
        return "bg-warning-100 text-warning-800 border-warning-200";
      case SponsorType.STUDENT:
        return "bg-success-100 text-success-800 border-success-200";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getRouteIcon = (route: SponsorRoute) => {
    switch (route) {
      case SponsorRoute.SKILLED_WORKER:
      case SponsorRoute.GLOBAL_TALENT:
        return <Users className="w-3 h-3" />;
      case SponsorRoute.HEALTH_AND_CARE_WORKER:
        return <Award className="w-3 h-3" />;
      default:
        return <Building2 className="w-3 h-3" />;
    }
  };

  const formatLocation = () => {
    return sponsor.county 
      ? `${sponsor.townCity}, ${sponsor.county}`
      : sponsor.townCity;
  };

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "MMM dd, yyyy");
    } catch {
      return dateString;
    }
  };

  return (
    <Card className="hover:shadow-md transition-shadow cursor-pointer group" onClick={() => onSelect?.(sponsor)}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-lg text-foreground group-hover:text-brand-600 transition-colors truncate">
              {sponsor.organisationName}
            </h3>
            <div className="flex items-center text-muted-foreground mt-1">
              <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
              <span className="text-sm truncate">{formatLocation()}</span>
            </div>
          </div>
          {sponsor.website && (
            <Button
              variant="ghost"
              size="sm"
              className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={(e) => {
                e.stopPropagation();
                window.open(sponsor.website, "_blank");
              }}
            >
              <ExternalLink className="w-4 h-4" />
            </Button>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="space-y-3">
          {/* Type and Route Badges */}
          <div className="flex flex-wrap gap-2">
            <Badge className={getTypeColor(sponsor.type)}>
              {sponsor.type}
            </Badge>
            <Badge variant="outline" className="flex items-center gap-1">
              {getRouteIcon(sponsor.route)}
              {sponsor.route}
            </Badge>
          </div>

          {/* Industry */}
          {sponsor.industry && (
            <div className="flex items-center text-sm text-muted-foreground">
              <Building2 className="w-4 h-4 mr-2" />
              <span>{sponsor.industry}</span>
            </div>
          )}

          {/* Employee Count */}
          {sponsor.employees && (
            <div className="flex items-center text-sm text-muted-foreground">
              <Users className="w-4 h-4 mr-2" />
              <span>{sponsor.employees.toLocaleString()} employees</span>
            </div>
          )}

          {/* Description */}
          {sponsor.description && (
            <p className="text-sm text-muted-foreground line-clamp-2">
              {sponsor.description}
            </p>
          )}

          {/* Date Added */}
          <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t border-border">
            <div className="flex items-center">
              <Calendar className="w-3 h-3 mr-1" />
              <span>Added {formatDate(sponsor.dateAdded)}</span>
            </div>
            {sponsor.sponsorLicenceNumber && (
              <span className="font-mono">
                #{sponsor.sponsorLicenceNumber}
              </span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
