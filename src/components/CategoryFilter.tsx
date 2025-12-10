import { Button } from './ui/button';
import { 
  GraduationCap, 
  Building2, 
  Stethoscope, 
  Dog, 
  UtensilsCrossed, 
  Laptop, 
  Home,
  Dumbbell,
  ShoppingBag,
  Briefcase
} from 'lucide-react';
import { Category } from '../types';

interface CategoryFilterProps {
  selectedCategory: Category | 'all';
  setSelectedCategory: (category: Category | 'all') => void;
  productType: 'landing' | 'freepik' | 'templates';
}

const categories = [
  { id: 'all' as const, label: 'Todas', icon: ShoppingBag },
  { id: 'escuela' as Category, label: 'Escuela', icon: GraduationCap },
  { id: 'construccion' as Category, label: 'Construcción', icon: Building2 },
  { id: 'medico' as Category, label: 'Médico', icon: Stethoscope },
  { id: 'veterinaria' as Category, label: 'Veterinaria', icon: Dog },
  { id: 'restaurant' as Category, label: 'Restaurant', icon: UtensilsCrossed },
  { id: 'tecnologia' as Category, label: 'Tecnología', icon: Laptop },
  { id: 'inmobiliaria' as Category, label: 'Inmobiliaria', icon: Home },
  { id: 'fitness' as Category, label: 'Fitness', icon: Dumbbell },
  { id: 'ecommerce' as Category, label: 'Ecommerce', icon: ShoppingBag },
  { id: 'corporativo' as Category, label: 'Corporativo', icon: Briefcase },
];

export function CategoryFilter({ selectedCategory, setSelectedCategory, productType }: CategoryFilterProps) {
  return (
    <div className="mb-8">
      <h2 className="text-gray-700 dark:text-gray-300 mb-4">Categorías</h2>
      
      <div className="flex flex-wrap gap-2">
        {categories.map(({ id, label, icon: Icon }) => (
          <Button
            key={id}
            variant={selectedCategory === id ? 'default' : 'outline'}
            onClick={() => setSelectedCategory(id)}
            className={
              selectedCategory === id
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 border-0 hover:from-cyan-600 hover:to-blue-700 shadow-lg shadow-cyan-500/50'
                : 'border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900/50 text-gray-700 dark:text-gray-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-cyan-500/50 hover:text-gray-900 dark:hover:text-white'
            }
          >
            <Icon className="h-4 w-4 mr-2" />
            {label}
          </Button>
        ))}
      </div>
    </div>
  );
}