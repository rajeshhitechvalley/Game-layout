import { useState } from "react";
import { Link, usePage } from '@inertiajs/react';
import { CATEGORIES } from '@/constants/categories';

interface CategoryPillsProps {
  currentCategory?: string;
  currentSort?: string;
  baseUrl?: string;
  onCategoryChange?: (category: string) => void;
}

const CategoryPills = ({ 
  currentCategory = '', 
  currentSort = '', 
  baseUrl = '/games',
  onCategoryChange 
}: CategoryPillsProps) => {
  const [activeCategory, setActiveCategory] = useState(currentCategory || 'all');
  
  const buildUrl = (catSlug: string) => {
    const params = new URLSearchParams();
    if (currentSort) params.set('sort', currentSort);
    if (catSlug) params.set('category', catSlug);
    const queryString = params.toString();
    return queryString ? `${baseUrl}?${queryString}` : baseUrl;
  };

  const handleCategoryClick = (categoryId: string) => {
    setActiveCategory(categoryId);
    if (onCategoryChange) {
      onCategoryChange(categoryId);
    }
  };

  return (
    <section className="py-6">
      <div className="container mx-auto px-4">
        <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
          {CATEGORIES.map((cat) => {
            const isActive = onCategoryChange 
              ? activeCategory === (cat.slug || 'all')
              : (!currentCategory && !cat.slug) || currentCategory === cat.slug;
            
            if (onCategoryChange) {
              // Use button for callback mode (home page)
              return (
                <button
                  key={cat.slug}
                  onClick={() => handleCategoryClick(cat.slug || 'all')}
                  className={`category-pill flex items-center gap-2 whitespace-nowrap ${
                    isActive ? "active" : ""
                  }`}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.name}</span>
                </button>
              );
            } else {
              // Use Link for URL navigation mode (games page) - same CSS as home page
              return (
                <Link
                  key={cat.slug}
                  href={buildUrl(cat.slug)}
                  className={`category-pill flex items-center gap-2 whitespace-nowrap ${
                    isActive ? "active" : ""
                  }`}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.name}</span>
                </Link>
              );
            }
          })}
        </div>
      </div>
    </section>
  );
};

export default CategoryPills;
