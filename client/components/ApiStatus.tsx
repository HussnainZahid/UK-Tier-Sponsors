import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Wifi, WifiOff } from "lucide-react";

export default function ApiStatus() {
  const [isOnline, setIsOnline] = useState(true);
  const [lastCheck, setLastCheck] = useState<Date>(new Date());

  useEffect(() => {
    const checkApiHealth = async () => {
      try {
        const response = await fetch('/api/health', {
          headers: { 'Content-Type': 'application/json' }
        });
        setIsOnline(response.ok);
        setLastCheck(new Date());
      } catch (error) {
        setIsOnline(false);
        setLastCheck(new Date());
      }
    };

    // Check immediately
    checkApiHealth();

    // Check every 30 seconds
    const interval = setInterval(checkApiHealth, 30000);

    return () => clearInterval(interval);
  }, []);

  if (!isOnline) {
    return (
      <Badge variant="destructive" className="flex items-center gap-1">
        <WifiOff className="w-3 h-3" />
        API Offline
      </Badge>
    );
  }

  return (
    <Badge variant="secondary" className="flex items-center gap-1">
      <Wifi className="w-3 h-3" />
      API Online
    </Badge>
  );
}
