export interface Game {
    id: number;
    title: string;
    slug: string;
    description: string;
    category: string;
    image_path?: string;
    image_url: string;
    image: string;
    game_url?: string;
    rating: number;
    plays: string;
    plays_formatted?: string;
    players: string;
    featured: boolean;
    active: boolean;
    is_bookmarked?: boolean;
    is_favorited?: boolean;
    created_at: string;
    updated_at: string;
}

// For components that expect specific format
export interface GameCard {
    id: number;
    title: string;
    slug: string;
    image: string;
    category: string;
    rating: number;
    plays: string;
    game_url?: string;
    is_bookmarked?: boolean;
    is_favorited?: boolean;
}

export interface HeroGame {
    title: string;
    description: string;
    image: string;
    rating: number;
    players: string;
}
