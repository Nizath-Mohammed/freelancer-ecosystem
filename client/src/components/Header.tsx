import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import NotificationDropdown from "@/components/NotificationDropdown";
import RealTimeNotifications from "@/components/notifications/real-time-notifications";
import { 
  Target, 
  Bell, 
  Search,
  Menu,
  X,
  Home,
  Briefcase,
  MessageSquare,
  Users,
  TrendingUp,
  User,
  Settings,
  LogOut,
  BarChart3,
  Shield,
  Building2,
  Globe
} from "lucide-react";
import { Link, useLocation } from "wouter";

export default function Header() {
  const { user, isAuthenticated } = useAuth();
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigation = [
    { name: "Talent Marketplace", href: "/projects", icon: Target },
    { name: "Expert Network", href: "/freelancers", icon: Users },
    { name: "Knowledge Hub", href: "/qa", icon: MessageSquare },
    { name: "Enterprise Solutions", href: "/enterprise", icon: Building2 },
  ];

  const handleLogout = () => {
    window.location.href = "/api/logout";
  };

  return (
    <header className="bg-white dark:bg-gray-900 shadow-lg border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50 backdrop-blur-md">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-8">
            <Link href="/">
              <div className="flex items-center space-x-3 cursor-pointer group">
                <div className="w-10 h-10 bg-conectify-primary rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform duration-200 enterprise-shadow">
                  <Globe className="text-white w-6 h-6" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-bold text-conectify-secondary tracking-tight">Conectify</span>
                  <span className="text-xs text-conectify-neutral font-medium -mt-1">Enterprise</span>
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex space-x-1">
              {navigation.map((item) => {
                const Icon = item.icon;
                const isActive = location === item.href;
                return (
                  <Link key={item.name} href={item.href}>
                    <div className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive 
                        ? 'text-conectify-primary bg-conectify-primary/10 border border-conectify-primary/20' 
                        : 'text-conectify-neutral hover:text-conectify-secondary hover:bg-conectify-accent/50 hover:border hover:border-conectify-primary/10'
                    }`}>
                      <Icon className="h-4 w-4" />
                      <span>{item.name}</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                {/* Search (Desktop) */}
                <div className="hidden lg:block">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-conectify-neutral h-4 w-4" />
                    <input
                      type="text"
                      placeholder="Search projects, talent, or skills..."
                      className="pl-10 pr-4 py-2.5 border border-conectify-neutral/20 rounded-lg focus:ring-2 focus:ring-conectify-primary focus:border-conectify-primary/50 w-72 bg-conectify-accent/30 text-conectify-secondary placeholder:text-conectify-neutral/70 transition-all duration-200"
                    />
                  </div>
                </div>

                {/* Real-time Notifications */}
                <RealTimeNotifications />

                {/* Level Badge */}
                <Badge variant="outline" className="text-conectify-primary border-conectify-primary/30 bg-conectify-primary/5 font-medium">
                  <Shield className="w-3 h-3 mr-1" />
                  Level {user?.level || 1}
                </Badge>

                {/* User Profile with Dashboard Details */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-10 w-10 rounded-full border-2 border-conectify-primary/20 hover:border-conectify-primary/40 transition-all duration-200">
                      <Avatar className="h-9 w-9">
                        <AvatarImage src={user?.profileImageUrl} />
                        <AvatarFallback className="bg-conectify-primary text-white font-semibold">
                          {user?.firstName?.[0]}{user?.lastName?.[0]}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-80 p-6 enterprise-shadow rounded-xl" align="end">
                    <div className="space-y-4">
                      {/* User Info */}
                      <div className="flex items-center space-x-4">
                        <Avatar className="h-14 w-14 border-2 border-conectify-primary/20">
                          <AvatarImage src={user?.profileImageUrl} />
                          <AvatarFallback className="bg-conectify-primary text-white font-semibold text-lg">
                            {user?.firstName?.[0]}{user?.lastName?.[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <p className="font-semibold text-base text-conectify-secondary">
                            {user?.firstName} {user?.lastName}
                          </p>
                          <p className="text-sm text-conectify-neutral">
                            {user?.email}
                          </p>
                          <div className="flex items-center space-x-2 mt-2">
                            <Badge variant="outline" className="text-xs text-conectify-primary border-conectify-primary/30 bg-conectify-primary/5">
                              <Shield className="w-3 h-3 mr-1" />
                              Level {user?.level || 1}
                            </Badge>
                            <Badge variant="outline" className="text-xs text-conectify-success border-conectify-success/30 bg-conectify-success/5">
                              <BarChart3 className="w-3 h-3 mr-1" />
                              {user?.totalEarnings || "$0"} earned
                            </Badge>
                          </div>
                        </div>
                      </div>
                      
                      <DropdownMenuSeparator />
                      
                      {/* Quick Stats */}
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="text-center p-3 bg-conectify-accent/50 rounded-lg">
                          <div className="font-semibold text-xl text-conectify-secondary">{user?.completedProjects || 0}</div>
                          <div className="text-conectify-neutral">Projects</div>
                        </div>
                        <div className="text-center p-3 bg-conectify-accent/50 rounded-lg">
                          <div className="font-semibold text-xl text-conectify-secondary">{user?.averageRating || "0.0"}★</div>
                          <div className="text-conectify-neutral">Rating</div>
                        </div>
                      </div>
                      
                      <DropdownMenuSeparator />
                    </div>
                    
                    <Link href="/dashboard">
                      <DropdownMenuItem className="cursor-pointer">
                        <Home className="mr-2 h-4 w-4" />
                        Dashboard
                      </DropdownMenuItem>
                    </Link>
                    <Link href="/profile">
                      <DropdownMenuItem className="cursor-pointer">
                        <User className="mr-2 h-4 w-4" />
                        Profile
                      </DropdownMenuItem>
                    </Link>
                    <DropdownMenuItem className="cursor-pointer">
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                      <LogOut className="mr-2 h-4 w-4" />
                      Log out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* Mobile menu button */}
                <div className="lg:hidden">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="text-conectify-neutral hover:text-conectify-secondary hover:bg-conectify-accent/50"
                  >
                    {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                  </Button>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <Button variant="ghost" onClick={() => window.location.href = "/api/login"} className="text-conectify-secondary hover:text-conectify-primary hover:bg-conectify-accent/50">
                  Sign In
                </Button>
                <Button onClick={() => window.location.href = "/api/login"} className="bg-conectify-primary hover:bg-conectify-primary/90 text-white enterprise-shadow">
                  Join Enterprise
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        {isAuthenticated && mobileMenuOpen && (
          <div className="lg:hidden border-t border-conectify-neutral/20 py-4">
            <div className="space-y-2">
              {navigation.map((item) => {
                const Icon = item.icon;
                const isActive = location === item.href;
                return (
                  <Link key={item.name} href={item.href}>
                    <div
                      className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                        isActive 
                          ? 'text-conectify-primary bg-conectify-primary/10 border-l-4 border-conectify-primary' 
                          : 'text-conectify-neutral hover:text-conectify-secondary hover:bg-conectify-accent/50'
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{item.name}</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
