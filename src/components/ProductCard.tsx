import { Product } from '../types';
import { Badge } from './ui/badge';
import { Star, Download, ShoppingCart, ArrowRight, Heart } from 'lucide-react';
import { Button } from './ui/button';
import { useFavorites } from '../contexts/FavoritesContext';

interface ProductCardProps {
  product: Product;
  onClick: () => void;
}

export function ProductCard({ product, onClick }: ProductCardProps) {
  const { toggleFavorite, isFavorite } = useFavorites();
  const isProductFavorite = isFavorite(product.id);

  return (
    <div 
      className="group relative bg-white dark:bg-slate-900/50 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 hover:border-cyan-500/50 transition-all duration-300 cursor-pointer hover:shadow-2xl hover:shadow-cyan-500/20 hover:-translate-y-1"
      onClick={onClick}
    >
      {/* Image */}
      <div className="relative aspect-video overflow-hidden bg-slate-100 dark:bg-slate-800">
        <img 
          src={product.image} 
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Badge */}
        <div className="absolute top-3 right-3">
          <Badge className="bg-gradient-to-r from-pink-500 to-purple-600 border-0">
            {product.type === 'landing' ? 'Landing Page' : product.type === 'freepik' ? 'Freepik' : 'Template'}
          </Badge>
        </div>

        {/* Favorite Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(product.id);
          }}
          className="absolute top-3 left-3 p-2 rounded-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm border border-slate-200 dark:border-slate-700 hover:scale-110 transition-transform"
        >
          <Heart
            className={`w-5 h-5 transition-colors ${
              isProductFavorite
                ? 'fill-red-500 text-red-500'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          />
        </button>

        {/* Quick action overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="text-gray-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors line-clamp-2">
            {product.title}
          </h3>
        </div>

        <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2 mb-4">
          {product.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-4">
          {product.tags.slice(0, 3).map(tag => (
            <span 
              key={tag}
              className="px-2 py-1 bg-slate-100 dark:bg-slate-800 text-cyan-600 dark:text-cyan-400 text-xs rounded"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-1">
              <Star className="h-3.5 w-3.5 fill-yellow-500 text-yellow-500" />
              <span>{product.rating}</span>
            </div>
            <div className="flex items-center gap-1">
              <Download className="h-3.5 w-3.5" />
              <span>{product.downloads.toLocaleString()}</span>
            </div>
          </div>
          <div>
            <span className="bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-500 bg-clip-text text-transparent">
              S/ {product.price.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Action buttons */}
        <div className="mt-4 flex gap-2">
          <Button 
            className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 group/btn"
            onClick={(e) => {
              e.stopPropagation();
              onClick();
            }}
          >
            Ver detalles
            <ArrowRight className="h-4 w-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
          </Button>
          <Button 
            size="icon"
            variant="outline"
            className="border-slate-300 dark:border-slate-700 hover:bg-cyan-50 dark:hover:bg-cyan-950 hover:border-cyan-500"
            onClick={(e) => {
              e.stopPropagation();
              // Add to cart logic
            }}
          >
            <ShoppingCart className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Glow effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-600 blur opacity-25"></div>
      </div>
    </div>
  );
}