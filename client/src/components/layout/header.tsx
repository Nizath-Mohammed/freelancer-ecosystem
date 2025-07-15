import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { UserAvatar } from "@/components/ui/user-avatar";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { 
  Network, 
  Menu, 
  Bell, 
  MessageSquare, 
  Settings, 
  LogOut,
  Briefcase,
  HelpCircle,
  Users,
  BarChart3,
  User
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function Header() {
  const { user, isAuthenticated } = useAuth();
  const [location] = useLocation();
  const [notifications] = useState([
    { id: 1, title: "New project match", message: "94% compatibility found", time: "2m ago" },
    { id: 2, title: "Proposal accepted", message: "E-commerce project", time: "1h ago" },
  ]);

  const getNavigationItems = () => {
    if (!user) return [];

    const baseItems = [
      { href: "/projects", label: "Projects", icon: Briefcase },
      { href: "/qa", label: "Q&A", icon: HelpCircle },
      { href: "/messages", label: "Messages", icon: MessageSquare },
    ];

    switch (user.role) {
      case "freelancer":
        return [
          { href: "/dashboard/freelancer", label: "Dashboard", icon: BarChart3 },
          ...baseItems,
        ];
      case "client":
        return [
          { href: "/dashboard/client", label: "Dashboard", icon: BarChart3 },
          { href: "/projects/post", label: "Post Project", icon: Briefcase },
          { href: "/projects", label: "Browse Talent", icon: Users },
          { href: "/qa", label: "Q&A", icon: HelpCircle },
          { href: "/messages", label: "Messages", icon: MessageSquare },
        ];
      case "agency":
        return [
          { href: "/dashboard/agency", label: "Dashboard", icon: BarChart3 },
          { href: "/projects", label: "Projects", icon: Briefcase },
          { href: "/qa", label: "Q&A", icon: HelpCircle },
          { href: "/messages", label: "Messages", icon: MessageSquare },
        ];
      case "enterprise":
        return [
          { href: "/dashboard/enterprise", label: "Dashboard", icon: BarChart3 },
          { href: "/projects", label: "Projects", icon: Briefcase },
          { href: "/qa", label: "Q&A", icon: HelpCircle },
          { href: "/messages", label: "Messages", icon: MessageSquare },
        ];
      default:
        return baseItems;
    }
  };

  const navigationItems = getNavigationItems();

  const isActiveLink = (href: string) => {
    if (href === "/" && location === "/") return true;
    if (href !== "/" && location.startsWith(href)) return true;
    return false;
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "freelancer":
        return "bg-blue-100 text-blue-800";
      case "client":
        return "bg-green-100 text-green-800";
      case "agency":
        return "bg-purple-100 text-purple-800";
      case "enterprise":
        return "bg-amber-100 text-amber-800";
      default:
        return "bg-slate-100 text-slate-800";
    }
  };

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <header className="bg-white shadow-sm border-b border-slate-200 sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Network className="text-white h-5 w-5" />
            </div>
            <span className="text-xl font-bold text-slate-900">Conectify</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-slate-600 hover:text-primary transition-colors font-medium",
                  isActiveLink(item.href) && "text-primary"
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="relative">
                  <Bell className="h-5 w-5" />
                  {notifications.length > 0 && (
                    <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                      {notifications.length}
                    </span>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {notifications.map((notification) => (
                  <DropdownMenuItem key={notification.id} className="flex-col items-start p-3">
                    <div className="font-medium">{notification.title}</div>
                    <div className="text-sm text-slate-600">{notification.message}</div>
                    <div className="text-xs text-slate-500 mt-1">{notification.time}</div>
                  </DropdownMenuItem>
                ))}
                {notifications.length === 0 && (
                  <DropdownMenuItem disabled>No new notifications</DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-2 hover:bg-slate-100">
                  <UserAvatar user={user} size="sm" />
                  <div className="hidden sm:block text-left">
                    <p className="text-sm font-medium text-slate-900">
                      {user.firstName} {user.lastName}
                    </p>
                    <Badge 
                      variant="secondary" 
                      className={cn("text-xs", getRoleBadgeColor(user.role))}
                    >
                      {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                    </Badge>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {user.firstName} {user.lastName}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href={`/profile/${user.id}`} className="flex items-center">
                    <User className="mr-2 h-4 w-4" />
                    View Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/profile/edit" className="flex items-center">
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <a href="/api/logout" className="flex items-center text-red-600">
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </a>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <SheetHeader>
                  <SheetTitle>Navigation</SheetTitle>
                  <SheetDescription>
                    Access all platform features
                  </SheetDescription>
                </SheetHeader>
                <div className="mt-6 space-y-4">
                  {navigationItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "flex items-center space-x-3 p-3 rounded-lg transition-colors",
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
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </header>
  );
}
