import { useState } from 'react';
import { useProducts } from '../../contexts/ProductContext';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../ui/button';
import { 
  LayoutDashboard, 
  Package, 
  FolderTree, 
  LogOut,
  TrendingUp,
  Eye,
  Download,
  DollarSign,
  ShoppingCart
} from 'lucide-react';
import { ProductsManager } from './ProductsManager';
import { DashboardStats } from './DashboardStats';
import { SalesManager } from './SalesManager';

interface AdminDashboardProps {
  onLogout: () => void;
}

export function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'products' | 'sales'>('products');
  const { logout } = useAuth();
  const { products } = useProducts();

  const handleLogout = () => {
    logout();
    onLogout();
  };

  const menuItems = [
    { id: 'dashboard' as const, icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'products' as const, icon: Package, label: 'Productos' },
    { id: 'sales' as const, icon: ShoppingCart, label: 'Ventas' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Animated background */}
      <div className="fixed inset-0 opacity-30 dark:opacity-30">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:64px_64px]"></div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-800/50 shadow-lg">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 bg-cyan-500 blur-xl opacity-50"></div>
                <div className="relative w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-cyan-500/50">
                  <Package className="w-6 h-6 text-white" />
                </div>
              </div>
              <div>
                <h2 className="font-bold text-slate-900 dark:text-white">Admin Panel</h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">Gestión de tienda</p>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex items-center gap-2">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all font-medium ${
                    activeTab === item.id
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/30'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100/70 dark:hover:bg-slate-800/70'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="hidden sm:inline">{item.label}</span>
                </button>
              ))}
              
              <Button
                onClick={handleLogout}
                variant="outline"
                size="sm"
                className="ml-4 border-red-300 dark:border-red-800 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/50"
              >
                <LogOut className="w-4 h-4 sm:mr-2" />
                <span className="hidden sm:inline">Cerrar Sesión</span>
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          {activeTab === 'dashboard' && <DashboardStats />}
          {activeTab === 'products' && <ProductsManager />}
          {activeTab === 'sales' && <SalesManager />}
        </div>
      </main>
    </div>
  );
}
