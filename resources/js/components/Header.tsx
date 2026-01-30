import { Search, Gamepad2, Menu, X, Home, Trophy, Grid3X3, LayoutDashboard, User2Icon, UserCircle } from "lucide-react";
import { useState } from "react";
import { Link, usePage } from '@inertiajs/react';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { auth } = usePage().props as any;

  const navigationItems = auth?.user ? [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Home", href: "/", icon: Home },
    { name: "Games", href: "/games", icon: Grid3X3 },
    { name: "Trending", href: "/games?sort=trending", icon: Trophy },
  ] : [
    { name: "Home", href: "/", icon: Home },
    { name: "Games", href: "/games", icon: Grid3X3 },
    { name: "Trending", href: "/games?sort=trending", icon: Trophy },
    { name: "Login", href: "/login", icon: UserCircle },
    { name: "Register", href: "/register", icon: User2Icon },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/games?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 rounded-xl gradient-bg-primary flex items-center justify-center">
              <Gamepad2 className="w-6 h-6 text-background" />
            </div>
            <span className="text-2xl font-black gradient-text hidden sm:block">
              PlayZone
            </span>
          </Link>

          {/* Search Bar - Hidden on mobile, visible on tablet+ */}
          <form onSubmit={handleSearch} className="hidden sm:flex flex-1 max-w-xl relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search games..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input w-full pl-12"
            />
          </form>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="nav-link flex items-center gap-2"
              >
                <item.icon className="w-4 h-4" />
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden p-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Search - Only visible when menu is open */}
        {isMobileMenuOpen && (
          <div className="sm:hidden mt-4">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search games..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input w-full pl-12"
                autoFocus
              />
            </form>
          </div>
        )}

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <nav className="lg:hidden mt-4 pt-4 border-t border-border">
            <div className="space-y-2">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-muted transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <item.icon className="w-5 h-5 text-muted-foreground" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
