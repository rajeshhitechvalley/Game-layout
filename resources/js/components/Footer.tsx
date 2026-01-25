import { Gamepad2, Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border py-12 mt-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl gradient-bg-primary flex items-center justify-center">
                <Gamepad2 className="w-6 h-6 text-background" />
              </div>
              <span className="text-2xl font-black gradient-text">
                PlayZone
              </span>
            </div>
            <p className="text-muted-foreground text-sm">
              The best place to play free online games. New games added daily!
            </p>
          </div>
          
          {/* Links */}
          <div>
            <h4 className="font-bold mb-4">Categories</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Action Games</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Adventure Games</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Racing Games</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Puzzle Games</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Popular</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">New Games</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Trending</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Most Played</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">.io Games</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">About</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © 2024 PlayZone. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            Made with <Heart className="w-4 h-4 text-gaming-pink fill-gaming-pink" /> for gamers
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
