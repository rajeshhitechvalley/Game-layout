import { Search, Gamepad2, Menu } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl gradient-bg-primary flex items-center justify-center">
              <Gamepad2 className="w-6 h-6 text-background" />
            </div>
            <span className="text-2xl font-black gradient-text hidden sm:block">
              PlayZone
            </span>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-xl relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search games..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input w-full pl-12"
            />
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <a href="#" className="nav-link">New</a>
            <a href="#" className="nav-link">Trending</a>
            <a href="#" className="nav-link">Categories</a>
          </nav>

          {/* Mobile Menu */}
          <button className="md:hidden p-2 rounded-lg bg-muted">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
