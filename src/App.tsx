import { useState, useEffect, useMemo } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CategoryFilter } from './components/CategoryFilter';
import { ProductGrid } from './components/ProductGrid';
import { ProductDetailPage } from './components/ProductDetailPage';
import { LoginPage } from './components/admin/LoginPage';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { Product, Category } from './types';
import { mockProducts } from './data/mockProducts';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ProductProvider, useProducts } from './contexts/ProductContext';
import { FavoritesProvider } from './contexts/FavoritesContext';

function AppContent() {
  const [selectedCategory, setSelectedCategory] = useState<Category | 'all'>('all');
  const [productType, setProductType] = useState<'landing' | 'freepik' | 'templates'>('landing');
  const [currentPage, setCurrentPage] = useState<'home' | 'detail' | 'admin'>('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const { isAuthenticated, logout } = useAuth();
  const { products: supabaseProducts } = useProducts();

  // Combinar productos de Supabase con datos de demostración
  const allProducts = useMemo(() => {
    return [...supabaseProducts, ...mockProducts];
  }, [supabaseProducts]);

  // Manejar navegación por URL
  useEffect(() => {
    const handleNavigation = () => {
      const path = window.location.pathname;
      if (path === '/admin' || path === '/admin/') {
        setCurrentPage('admin');
      } else {
        setCurrentPage('home');
      }
    };

    handleNavigation();
    window.addEventListener('popstate', handleNavigation);
    return () => window.removeEventListener('popstate', handleNavigation);
  }, []);

  const filteredProducts = allProducts.filter(product => {
    const categoryMatch = selectedCategory === 'all' || product.category === selectedCategory;
    const typeMatch = product.type === productType;
    return categoryMatch && typeMatch;
  });

  const selectedProduct = selectedProductId 
    ? allProducts.find(p => p.id === selectedProductId) 
    : null;

  const handleProductClick = (productId: string) => {
    setSelectedProductId(productId);
    setCurrentPage('detail');
    window.scrollTo(0, 0);
  };

  const handleBackToHome = () => {
    setCurrentPage('home');
    setSelectedProductId(null);
    window.history.pushState({}, '', '/');
  };

  const handleProductTypeChange = (type: 'landing' | 'freepik' | 'templates') => {
    setProductType(type);
    // Si estamos en la página de detalles, volver al inicio
    if (currentPage === 'detail') {
      setCurrentPage('home');
      setSelectedProductId(null);
      window.history.pushState({}, '', '/');
    }
    window.scrollTo(0, 0);
  };

  const handleLoginSuccess = () => {
    // Después del login exitoso, el dashboard se mostrará automáticamente
  };

  const handleLogout = () => {
    logout();
    setCurrentPage('home');
    window.history.pushState({}, '', '/');
  };

  // Renderizar panel de admin
  if (currentPage === 'admin') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 transition-colors duration-300">
        {isAuthenticated ? (
          <AdminDashboard onLogout={handleLogout} />
        ) : (
          <LoginPage onLoginSuccess={handleLoginSuccess} />
        )}
      </div>
    );
  }

  // Renderizar tienda principal
  return (
    <FavoritesProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 transition-colors duration-300">
        {/* Animated background */}
        <div className="fixed inset-0 opacity-30 dark:opacity-30">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:64px_64px]"></div>
        </div>

        <div className="relative z-10">
          <Header productType={productType} setProductType={handleProductTypeChange} />
          
          {currentPage === 'home' ? (
            <>
              <Hero productType={productType} />
              <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <CategoryFilter 
                  selectedCategory={selectedCategory}
                  setSelectedCategory={setSelectedCategory}
                  productType={productType}
                />
                
                <ProductGrid 
                  products={filteredProducts}
                  onProductClick={handleProductClick}
                />
              </main>
            </>
          ) : selectedProduct ? (
            <ProductDetailPage 
              product={selectedProduct}
              onBack={handleBackToHome}
            />
          ) : null}
        </div>
      </div>
    </FavoritesProvider>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ProductProvider>
          <AppContent />
        </ProductProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}