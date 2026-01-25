import { useState } from "react";

const categories = [
  { id: "all", label: "All Games", emoji: "🎮" },
  { id: "action", label: "Action", emoji: "⚔️" },
  { id: "adventure", label: "Adventure", emoji: "🗺️" },
  { id: "racing", label: "Racing", emoji: "🏎️" },
  { id: "puzzle", label: "Puzzle", emoji: "🧩" },
  { id: "sports", label: "Sports", emoji: "⚽" },
  { id: "shooter", label: "Shooter", emoji: "🎯" },
  { id: "multiplayer", label: "Multiplayer", emoji: "👥" },
  { id: "io", label: ".io Games", emoji: "🌐" },
];

interface CategoryPillsProps {
  onCategoryChange?: (category: string) => void;
}

const CategoryPills = ({ onCategoryChange }: CategoryPillsProps) => {
  const [activeCategory, setActiveCategory] = useState("all");

  const handleCategoryClick = (categoryId: string) => {
    setActiveCategory(categoryId);
    onCategoryChange?.(categoryId);
  };

  return (
    <section className="py-6">
      <div className="container mx-auto px-4">
        <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryClick(category.id)}
              className={`category-pill flex items-center gap-2 whitespace-nowrap ${
                activeCategory === category.id ? "active" : ""
              }`}
            >
              <span>{category.emoji}</span>
              <span>{category.label}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryPills;
