import { Play, Star, Users } from "lucide-react";

interface HeroSectionProps {
  game: {
    title: string;
    description: string;
    image: string;
    rating: number;
    players: string;
  };
}

const HeroSection = ({ game }: HeroSectionProps) => {
  return (
    <section className="relative overflow-hidden py-8 md:py-12">
      <div className="container mx-auto px-4">
        <div className="relative rounded-3xl overflow-hidden h-[400px] md:h-[500px]">
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${game.image})` }}
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
          
          {/* Content */}
          <div className="relative h-full flex flex-col justify-end p-6 md:p-12 max-w-2xl">
            <div className="animate-slide-up">
              <div className="flex items-center gap-4 mb-4">
                <span className="px-3 py-1 rounded-full bg-gaming-orange/20 text-gaming-orange font-bold text-sm">
                  🔥 Featured
                </span>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-gaming-yellow fill-gaming-yellow" />
                  <span className="font-bold">{game.rating}</span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Users className="w-4 h-4" />
                  <span className="text-sm">{game.players}</span>
                </div>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-black mb-4">
                {game.title}
              </h1>
              
              <p className="text-lg text-muted-foreground mb-6 line-clamp-2">
                {game.description}
              </p>
              
              <button className="play-button animate-pulse-glow">
                <Play className="w-6 h-6 fill-current" />
                Play Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
