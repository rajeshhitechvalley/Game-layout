import { Play, Star, Users, ExternalLink, Bookmark, Heart } from "lucide-react";
import { Link, router } from '@inertiajs/react';
import { useState } from 'react';
import type { GameCard as GameCardType } from '@/types';
import { showToast } from './Toaster';

interface GameCardProps {
  game: GameCardType & { 
    game_url?: string;
    is_bookmarked?: boolean;
    is_favorited?: boolean;
  };
}

const GameCard = ({ game }: GameCardProps) => {
  const [isTouched, setIsTouched] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(game.is_bookmarked || false);
  const [isFavorited, setIsFavorited] = useState(game.is_favorited || false);

  const handleBookmark = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    try {
      if (isBookmarked) {
        // Remove bookmark
        await router.delete(`/bookmarks/game/${game.id}`, {
          onSuccess: () => {
            setIsBookmarked(false);
            showToast('unbookmark', 'Removed from bookmarks', game.title);
          },
          onError: (errors: any) => {
            console.error('Error removing bookmark:', errors);
          }
        });
      } else {
        // Add bookmark
        await router.post('/bookmarks', {
          game_id: game.id,
          category: 'general',
          notes: '',
        }, {
          onSuccess: () => {
            setIsBookmarked(true);
            showToast('bookmark', 'Added to bookmarks', game.title);
          },
          onError: (errors: any) => {
            console.error('Error bookmarking game:', errors);
          }
        });
      }
    } catch (error) {
      console.error('Error bookmarking game:', error);
    }
  };

  const handleFavorite = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    try {
      await router.post('/favorites/toggle', {
        game_id: game.id,
      }, {
        onSuccess: (response: any) => {
          const favorited = response.props.favorited;
          setIsFavorited(favorited);
          if (favorited) {
            showToast('favorite', 'Added to favorites', game.title);
          } else {
            showToast('unfavorite', 'Removed from favorites', game.title);
          }
        },
        onError: (errors: any) => {
          console.error('Error toggling favorite:', errors);
        }
      });
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  return (
    <div className="game-card group">
      {/* Image Container */}
      <div 
        className="relative aspect-[4/3] overflow-hidden"
        onTouchStart={() => setIsTouched(true)}
        onTouchEnd={() => setTimeout(() => setIsTouched(false), 300)}
      >
        <img
          src={game.image}
          alt={game.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Play Overlay */}
        <div className={`absolute inset-0 bg-background/60 transition-opacity duration-300 flex items-center justify-center ${
          isTouched || 'group-hover:opacity-100 opacity-0'
        }`}>
          {game.game_url ? (
            <Link
              href={`/games/${game.slug}/play`}
              className={`w-16 h-16 rounded-full gradient-bg-primary flex items-center justify-center transform transition-transform duration-300 ${
                isTouched || 'group-hover:scale-100 scale-0'
              }`}
            >
              <Play className="w-8 h-8 text-background fill-current ml-1" />
            </Link>
          ) : (
            <div className={`w-16 h-16 rounded-full gradient-bg-primary flex items-center justify-center transform transition-transform duration-300 ${
              isTouched || 'group-hover:scale-100 scale-0'
            }`}>
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

        {/* Action Buttons */}
        <div className="absolute bottom-3 right-3 flex gap-2">
          <button
            onClick={handleBookmark}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
              isBookmarked 
                ? 'bg-blue-500 text-white' 
                : 'bg-background/80 backdrop-blur-sm text-foreground hover:bg-background'
            }`}
            title="Bookmark"
          >
            <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
          </button>
          <button
            onClick={handleFavorite}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
              isFavorited 
                ? 'bg-red-500 text-white' 
                : 'bg-background/80 backdrop-blur-sm text-foreground hover:bg-background'
            }`}
            title="Favorite"
          >
            <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
          </button>
        </div>
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
