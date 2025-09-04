import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Construction } from "lucide-react";

interface PlaceholderPageProps {
  title: string;
  description: string;
  icon?: ReactNode;
}

export default function PlaceholderPage({ 
  title, 
  description, 
  icon = <Construction className="w-12 h-12" />
}: PlaceholderPageProps) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="flex justify-center mb-6 text-muted-foreground">
          {icon}
        </div>
        <h1 className="text-2xl font-bold text-foreground mb-4">
          {title}
        </h1>
        <p className="text-muted-foreground mb-8">
          {description}
        </p>
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">
            Continue the conversation to have this page built for you
          </p>
          <Button variant="outline" className="group">
            Request Page Development
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </div>
  );
}
