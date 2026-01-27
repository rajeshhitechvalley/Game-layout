import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import CategoryPills from "@/components/CategoryPills";
import GameGrid from "@/components/GameGrid";
import Footer from "@/components/Footer";

// Import game images
import heroGame from "@/assets/hero-game.jpg";
import gameRacing from "@/assets/game-racing.jpg";
import gamePuzzle from "@/assets/game-puzzle.jpg";
import gameShooter from "@/assets/game-shooter.jpg";
import gameAdventure from "@/assets/game-adventure.jpg";
import gameSports from "@/assets/game-sports.jpg";
import gameIo from "@/assets/game-io.jpg";
import gameRpg from "@/assets/game-rpg.jpg";

const featuredGame = {
  title: "Shadow Blade: Elemental Fury",
  description: "Wield the power of dual elemental blades in this epic action RPG. Master both light and dark magic as you battle through stunning realms and defeat legendary bosses.",
  image: heroGame,
  rating: 4.9,
  players: "2.3M plays",
};

const trendingGames = [
  { id: 1, title: "Turbo Rush X", image: gameRacing, category: "Racing", rating: 4.8, plays: "1.2M" },
  { id: 2, title: "Crystal Quest", image: gamePuzzle, category: "Puzzle", rating: 4.7, plays: "890K" },
  { id: 3, title: "Nova Strike", image: gameShooter, category: "Shooter", rating: 4.6, plays: "1.5M" },
  { id: 4, title: "Island Jumper", image: gameAdventure, category: "Adventure", rating: 4.9, plays: "2.1M" },
  { id: 5, title: "Goal Master", image: gameSports, category: "Sports", rating: 4.5, plays: "780K" },
  { id: 6, title: "Neon Arena", image: gameIo, category: ".io", rating: 4.8, plays: "3.2M" },
];

const newGames = [
  { id: 7, title: "Dragon's Lair", image: gameRpg, category: "RPG", rating: 4.9, plays: "450K" },
  { id: 8, title: "Speed Demons", image: gameRacing, category: "Racing", rating: 4.4, plays: "320K" },
  { id: 9, title: "Gem Blaster", image: gamePuzzle, category: "Puzzle", rating: 4.6, plays: "210K" },
  { id: 10, title: "Cyber Ops", image: gameShooter, category: "Action", rating: 4.7, plays: "180K" },
  { id: 11, title: "Sky Runner", image: gameAdventure, category: "Adventure", rating: 4.8, plays: "290K" },
  { id: 12, title: "Battle Arena", image: gameIo, category: ".io", rating: 4.5, plays: "410K" },
];

const actionGames = [
  { id: 13, title: "Blade Fury", image: gameShooter, category: "Action", rating: 4.8, plays: "1.8M" },
  { id: 14, title: "Epic Quest", image: gameRpg, category: "RPG", rating: 4.9, plays: "2.4M" },
  { id: 15, title: "Storm Rider", image: gameAdventure, category: "Adventure", rating: 4.7, plays: "950K" },
  { id: 16, title: "Chaos Arena", image: gameIo, category: "Battle", rating: 4.6, plays: "1.1M" },
  { id: 17, title: "Fire Strike", image: gameShooter, category: "Shooter", rating: 4.5, plays: "720K" },
  { id: 18, title: "Shadow Quest", image: gameRpg, category: "RPG", rating: 4.8, plays: "1.3M" },
];

const Index = () => {
  const handleCategoryChange = (category: string) => {
    // Navigate to games page with category filter
    window.location.href = category === 'all' ? '/games' : `/games?category=${category}`;
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection game={featuredGame} />
        <CategoryPills onCategoryChange={handleCategoryChange} />
        <GameGrid title="Trending Now" games={trendingGames} icon="🔥" />
        <GameGrid title="New Games" games={newGames} icon="✨" />
        <GameGrid title="Action & Adventure" games={actionGames} icon="⚔️" />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
