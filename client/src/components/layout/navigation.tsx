import { Link, useLocation } from "wouter";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";
import { 
  BarChart3, 
  Briefcase, 
  HelpCircle, 
  MessageSquare, 
  Users,
  Plus
} from "lucide-react";

export default function Navigation() {
  const { user } = useAuth();
  const [location] = useLocation();

  const getNavigationItems = () => {
    if (!user) return [];

    switch (user.role) {
      case "freelancer":
        return [
          { href: "/dashboard/freelancer", label: "Dashboard", icon: BarChart3 },
          { href: "/projects", label: "Browse Projects", icon: Briefcase },
          { href: "/qa", label: "Q&A Community", icon: HelpCircle },
          { href: "/messages", label: "Messages", icon: MessageSquare },
        ];
      case "client":
        return [
          { href: "/dashboard/client", label: "Dashboard", icon: BarChart3 },
          { href: "/projects/post", label: "Post Project", icon: Plus },
          { href: "/projects", label: "Browse Talent", icon: Users },
          { href: "/qa", label: "Q&A", icon: HelpCircle },
          { href: "/messages", label: "Messages", icon: MessageSquare },
        ];
      case "agency":
        return [
          { href: "/dashboard/agency", label: "Dashboard", icon: BarChart3 },
          { href: "/projects", label: "Projects", icon: Briefcase },
          { href: "/qa", label: "Knowledge Base", icon: HelpCircle },
          { href: "/messages", label: "Team Chat", icon: MessageSquare },
        ];
      case "enterprise":
        return [
          { href: "/dashboard/enterprise", label: "Dashboard", icon: BarChart3 },
          { href: "/projects", label: "Project Portfolio", icon: Briefcase },
          { href: "/qa", label: "Support Center", icon: HelpCircle },
          { href: "/messages", label: "Communications", icon: MessageSquare },
        ];
      default:
        return [];
    }
  };

  const navigationItems = getNavigationItems();

  const isActiveLink = (href: string) => {
    if (href === "/" && location === "/") return true;
    if (href !== "/" && location.startsWith(href)) return true;
    return false;
  };

  return (
    <nav className="bg-white border-r border-slate-200 w-64 min-h-screen p-4">
      <div className="space-y-2">
        {navigationItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
              isActiveLink(item.href)
                ? "bg-primary text-white"
                : "text-slate-700 hover:bg-slate-100"
            )}
          >
            <item.icon className="h-5 w-5" />
            <span>{item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
