import { useState } from 'react';
import { Button } from './ui/button';
import { Slider } from './ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { SlidersHorizontal, X } from 'lucide-react';

interface AdvancedFiltersProps {
  onFilterChange: (filters: FilterOptions) => void;
}

export interface FilterOptions {
  priceRange: [number, number];
  sortBy: 'popularity' | 'price-asc' | 'price-desc' | 'rating' | 'newest';
}

export function AdvancedFilters({ onFilterChange }: AdvancedFiltersProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    priceRange: [0, 100],
    sortBy: 'popularity'
  });

  const handlePriceChange = (value: number[]) => {
    const newFilters = { ...filters, priceRange: [value[0], value[1]] as [number, number] };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleSortChange = (value: FilterOptions['sortBy']) => {
    const newFilters = { ...filters, sortBy: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const resetFilters = () => {
    const defaultFilters: FilterOptions = {
      priceRange: [0, 100],
      sortBy: 'popularity'
    };
    setFilters(defaultFilters);
    onFilterChange(defaultFilters);
  };

  return (
    <div className="relative">
      <Button
        onClick={() => setIsOpen(!isOpen)}
        variant="outline"
        className="border-slate-300 dark:border-slate-700"
      >
        <SlidersHorizontal className="w-4 h-4 mr-2" />
        Filtros Avanzados
      </Button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-full right-0 mt-2 w-80 bg-white dark:bg-slate-900 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 z-50">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg text-slate-900 dark:text-white">
                Filtros
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-6">
              {/* Price Range */}
              <div className="space-y-3">
                <label className="text-sm text-slate-700 dark:text-slate-300">
                  Rango de Precio
                </label>
                <div className="px-2">
                  <Slider
                    value={filters.priceRange}
                    onValueChange={handlePriceChange}
                    min={0}
                    max={100}
                    step={1}
                    className="mb-2"
                  />
                </div>
                <div className="flex justify-between text-sm text-slate-600 dark:text-slate-400">
                  <span>S/ {filters.priceRange[0]}</span>
                  <span>S/ {filters.priceRange[1]}</span>
                </div>
              </div>

              {/* Sort By */}
              <div className="space-y-3">
                <label className="text-sm text-slate-700 dark:text-slate-300">
                  Ordenar por
                </label>
                <Select value={filters.sortBy} onValueChange={handleSortChange}>
                  <SelectTrigger className="bg-slate-50 dark:bg-slate-800">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="popularity">Más Popular</SelectItem>
                    <SelectItem value="rating">Mejor Calificado</SelectItem>
                    <SelectItem value="price-asc">Precio: Menor a Mayor</SelectItem>
                    <SelectItem value="price-desc">Precio: Mayor a Menor</SelectItem>
                    <SelectItem value="newest">Más Reciente</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Reset Button */}
              <Button
                onClick={resetFilters}
                variant="outline"
                className="w-full"
              >
                Restablecer Filtros
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
