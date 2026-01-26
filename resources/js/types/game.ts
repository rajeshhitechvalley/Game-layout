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
    created_at: string;
    updated_at: string;
}

// For components that expect specific format
export interface GameCard {
    id: number;
    title: string;
    image: string;
    category: string;
    rating: number;
    plays: string;
}

export interface HeroGame {
    title: string;
    description: string;
    image: string;
    rating: number;
    players: string;
}
