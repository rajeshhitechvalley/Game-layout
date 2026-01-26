import { Play, Star, Users, ExternalLink } from "lucide-react";
import { Link } from '@inertiajs/react';
import type { GameCard as GameCardType } from '@/types';

interface GameCardProps {
  game: GameCardType & { game_url?: string };
}

const GameCard = ({ game }: GameCardProps) => {
  return (
    <div className="game-card group">
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={game.image}
          alt={game.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Play Overlay */}
        <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          {game.game_url ? (
            <Link
              href={`/games/${game.id}/play`}
              className="w-16 h-16 rounded-full gradient-bg-primary flex items-center justify-center transform scale-0 group-hover:scale-100 transition-transform duration-300"
            >
              <Play className="w-8 h-8 text-background fill-current ml-1" />
            </Link>
          ) : (
            <div className="w-16 h-16 rounded-full gradient-bg-primary flex items-center justify-center transform scale-0 group-hover:scale-100 transition-transform duration-300">
              <Play className="w-8 h-8 text-background fill-current ml-1" />
            </div>
          )}
        </div>
        
        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span className="px-2 py-1 rounded-lg bg-background/80 backdrop-blur-sm text-xs font-bold">
            {game.category}
          </span>
        </div>

        {/* Play Button Indicator */}
        {game.game_url && (
          <div className="absolute top-3 right-3">
            <div className="w-8 h-8 rounded-full bg-gaming-orange flex items-center justify-center">
              <ExternalLink className="w-4 h-4 text-background" />
            </div>
          </div>
        )}
      </div>
      
      {/* Info */}
      <div className="p-4">
        <h3 className="font-bold text-lg mb-2 line-clamp-1 group-hover:text-primary transition-colors">
          {game.title}
        </h3>
        
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-gaming-yellow fill-gaming-yellow" />
            <span className="font-semibold">{game.rating}</span>
          </div>
          
          <div className="flex items-center gap-1 text-muted-foreground">
            <Users className="w-4 h-4" />
            <span>{game.plays}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameCard;
