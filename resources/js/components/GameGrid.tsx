import GameCard from "./GameCard";

interface Game {
  id: number;
  title: string;
  image: string;
  category: string;
  rating: number;
  plays: string;
}

interface GameGridProps {
  title: string;
  games: Game[];
  icon?: string;
}

const GameGrid = ({ title, games, icon }: GameGridProps) => {
  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl md:text-3xl font-black flex items-center gap-3">
            {icon && <span>{icon}</span>}
            {title}
          </h2>
          <button className="text-primary font-semibold hover:underline">
            See All →
          </button>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {games.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default GameGrid;
