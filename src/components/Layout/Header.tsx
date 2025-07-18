
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Bell, User, Menu, X, ChevronDown, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';

interface HeaderProps {
  variant?: 'landing' | 'app';
  user?: {
    name: string;
    avatar: string;
    role: 'freelancer' | 'client' | 'agency';
    notifications: number;
  };
  onTrendingClick?: () => void;
}

export const Header = ({ variant = 'app', user: propUser, onTrendingClick }: HeaderProps) => {
  const { user: authUser, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const location = useLocation();

  // Use auth user if available, otherwise use prop user
  const user = authUser || propUser;

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = () => setIsUserMenuOpen(false);
    if (isUserMenuOpen) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [isUserMenuOpen]);

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
  };

  const isLanding = variant === 'landing';

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navItems = [
    { label: 'Features', href: '#features', onClick: () => scrollToSection('features') },
    { label: 'Projects', href: '#projects', onClick: () => scrollToSection('projects') },
    { label: 'Talents', href: '#talents', onClick: () => scrollToSection('talents') },
    { label: 'Pricing', href: '/pricing' },
    { label: 'About', href: '#about', onClick: () => scrollToSection('about') }
  ];

  const appNavItems = [
    { label: 'Jobs', href: '/home' },
    { label: 'Q&A', href: '/qa' },
    { label: 'Projects', href: '/freelancer-dashboard' },
    { label: 'Profile', href: '/profile' }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md border-b border-border shadow-soft">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 hover-scale">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">C</span>
            </div>
            <span className="font-heading font-bold text-xl text-foreground">Conectify</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {isLanding ? (
              navItems.map((item) => (
                item.onClick ? (
                  <button
                    key={item.href}
                    onClick={item.onClick}
                    className="text-muted-foreground hover:text-foreground transition-fast font-medium"
                  >
                    {item.label}
                  </button>
                ) : (
                  <Link
                    key={item.href}
                    to={item.href}
                    className="text-muted-foreground hover:text-foreground transition-fast font-medium"
                  >
                    {item.label}
                  </Link>
                )
              ))
            ) : (
              <>
                {/* Trending Button */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onTrendingClick}
                  className="text-trending hover:text-trending-foreground hover:bg-trending/10"
                >
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Trending
                </Button>

                {/* Search Bar */}
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search jobs, skills, freelancers..."
                    className="w-full pl-10 pr-4 py-2 bg-secondary rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-fast"
                  />
                </div>

                {appNavItems.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    className={`text-sm font-medium transition-fast ${
                      location.pathname === item.href
                        ? 'text-primary'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </>
            )}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {isLanding ? (
              <>
                <Link to="/login">
                  <Button variant="ghost" size="sm" className="hidden md:flex">
                    Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button size="sm" className="bg-gradient-primary hover:opacity-90">
                    Sign Up
                  </Button>
                </Link>
              </>
            ) : user ? (
              <>
                {/* Notifications */}
                <div className="relative">
                  <Button variant="ghost" size="sm" className="relative">
                    <Bell className="w-5 h-5" />
                    {(user.notifications || 0) > 0 && (
                      <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center bg-trending text-trending-foreground text-xs">
                        {user.notifications || 0}
                      </Badge>
                    )}
                  </Button>
                </div>

                {/* User Menu */}
                <div className="relative">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsUserMenuOpen(!isUserMenuOpen);
                    }}
                    className="flex items-center space-x-2 p-2 rounded-lg hover:bg-secondary transition-fast"
                  >
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <span className="hidden md:block text-sm font-medium">{user.name}</span>
                    <ChevronDown className="w-4 h-4" />
                  </button>

                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-card rounded-lg shadow-large border border-border py-2 z-50">
                      <div className="px-4 py-2 border-b border-border">
                        <p className="text-sm font-medium">{user.name}</p>
                        <p className="text-xs text-muted-foreground capitalize">{user.role}</p>
                      </div>
                      <Link 
                        to="/profile" 
                        className="block px-4 py-2 text-sm hover:bg-secondary"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        Profile
                      </Link>
                      <Link 
                        to="/dashboard" 
                        className="block px-4 py-2 text-sm hover:bg-secondary"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        Dashboard
                      </Link>
                      <Link 
                        to="/settings" 
                        className="block px-4 py-2 text-sm hover:bg-secondary"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        Settings
                      </Link>
                      <hr className="my-2" />
                      <button 
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm hover:bg-secondary text-destructive"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <Link to="/login">
                <Button size="sm" className="bg-gradient-primary hover:opacity-90">
                  Login
                </Button>
              </Link>
            )}

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-border">
            <nav className="flex flex-col space-y-3">
              {isLanding ? (
                <>
                  {navItems.map((item) => (
                    item.onClick ? (
                      <button
                        key={item.href}
                        onClick={() => {
                          item.onClick();
                          setIsMobileMenuOpen(false);
                        }}
                        className="text-muted-foreground hover:text-foreground transition-fast font-medium py-2 text-left"
                      >
                        {item.label}
                      </button>
                    ) : (
                      <Link
                        key={item.href}
                        to={item.href}
                        className="text-muted-foreground hover:text-foreground transition-fast font-medium py-2"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                    )
                  ))}
                  <div className="flex flex-col space-y-2 pt-4">
                    <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                      <Button variant="outline" className="w-full">
                        Login
                      </Button>
                    </Link>
                    <Link to="/signup" onClick={() => setIsMobileMenuOpen(false)}>
                      <Button className="w-full bg-gradient-primary hover:opacity-90">
                        Sign Up
                      </Button>
                    </Link>
                  </div>
                </>
              ) : (
                <>
                  {/* Mobile Trending Button */}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      onTrendingClick?.();
                      setIsMobileMenuOpen(false);
                    }}
                    className="text-trending hover:text-trending-foreground hover:bg-trending/10 justify-start"
                  >
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Trending
                  </Button>
                  
                  {appNavItems.map((item) => (
                    <Link
                      key={item.href}
                      to={item.href}
                      className={`font-medium py-2 transition-fast ${
                        location.pathname === item.href
                          ? 'text-primary'
                          : 'text-muted-foreground hover:text-foreground'
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
