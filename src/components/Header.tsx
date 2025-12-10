import { Code2, ShoppingCart, Menu, Package, FileImage, Palette, Sun, Moon } from 'lucide-react';
import { Button } from './ui/button';
import { useTheme } from '../contexts/ThemeContext';

interface HeaderProps {
  productType: 'landing' | 'freepik' | 'templates';
  setProductType: (type: 'landing' | 'freepik' | 'templates') => void;
}

export function Header({ productType, setProductType }: HeaderProps) {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <header className="border-b border-cyan-500/20 dark:border-cyan-500/20 bg-white/80 dark:bg-slate-950/50 backdrop-blur-xl sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 bg-cyan-500 blur-xl opacity-50"></div>
              <Code2 className="h-8 w-8 text-cyan-400 relative" />
            </div>
            <div>
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">CodeMarket Pro</span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-2">
            <Button
              variant={productType === 'landing' ? 'default' : 'ghost'}
              onClick={() => setProductType('landing')}
              className={productType === 'landing' 
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700' 
                : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'}
            >
              <Package className="h-4 w-4 mr-2" />
              Landing Pages
            </Button>
            <Button
              variant={productType === 'freepik' ? 'default' : 'ghost'}
              onClick={() => setProductType('freepik')}
              className={productType === 'freepik' 
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700' 
                : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'}
            >
              <FileImage className="h-4 w-4 mr-2" />
              Freepik Assets
            </Button>
            <Button
              variant={productType === 'templates' ? 'default' : 'ghost'}
              onClick={() => setProductType('templates')}
              className={productType === 'templates' 
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700' 
                : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'}
            >
              <Palette className="h-4 w-4 mr-2" />
              PSD/AI Templates
            </Button>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <Button 
              size="icon" 
              variant="ghost" 
              onClick={toggleTheme}
              className="hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              {theme === 'light' ? (
                <Moon className="h-5 w-5 text-slate-700" />
              ) : (
                <Sun className="h-5 w-5 text-yellow-500" />
              )}
            </Button>
            <Button size="sm" variant="ghost" className="relative hover:bg-slate-100 dark:hover:bg-slate-800">
              <ShoppingCart className="h-5 w-5 text-cyan-400" />
              <span className="absolute -top-1 -right-1 bg-gradient-to-r from-pink-500 to-purple-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                3
              </span>
            </Button>
            <Button size="icon" variant="ghost" className="md:hidden hover:bg-slate-100 dark:hover:bg-slate-800">
              <Menu className="h-5 w-5 text-cyan-400" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}