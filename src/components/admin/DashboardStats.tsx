import { useProducts } from '../../contexts/ProductContext';
import { TrendingUp, Package, Eye, Download, DollarSign, Star } from 'lucide-react';

export function DashboardStats() {
  const { products } = useProducts();

  const stats = {
    totalProducts: products.length,
    totalDownloads: products.reduce((sum, p) => sum + p.downloads, 0),
    totalViews: products.reduce((sum, p) => sum + (p.views || 0), 0),
    totalRevenue: products.reduce((sum, p) => sum + (p.price * p.downloads), 0),
    avgRating: (products.reduce((sum, p) => sum + p.rating, 0) / products.length).toFixed(1),
    topProducts: products
      .sort((a, b) => b.downloads - a.downloads)
      .slice(0, 5)
  };

  const statCards = [
    {
      title: 'Total Productos',
      value: stats.totalProducts,
      icon: Package,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50 dark:bg-blue-950/30'
    },
    {
      title: 'Total Descargas',
      value: stats.totalDownloads.toLocaleString(),
      icon: Download,
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-50 dark:bg-green-950/30'
    },
    {
      title: 'Total Vistas',
      value: stats.totalViews.toLocaleString(),
      icon: Eye,
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-50 dark:bg-purple-950/30'
    },
    {
      title: 'Ingresos Totales',
      value: `$${stats.totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      color: 'from-orange-500 to-red-500',
      bgColor: 'bg-orange-50 dark:bg-orange-950/30'
    }
  ];

  return (
    <div className="space-y-8">
      <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl rounded-xl p-6 border border-slate-200/50 dark:border-slate-800/50 shadow-xl">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2">Dashboard</h1>
        <p className="text-slate-600 dark:text-slate-400">
          Estadísticas generales de tu tienda
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat) => (
          <div
            key={stat.title}
            className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl rounded-xl p-6 border border-slate-200/50 dark:border-slate-800/50 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`w-6 h-6 text-transparent bg-gradient-to-br ${stat.color} bg-clip-text`} style={{ fill: 'currentColor' }} />
              </div>
            </div>
            <h3 className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">
              {stat.title}
            </h3>
            <p className="text-2xl font-bold text-slate-900 dark:text-white">
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Top Products */}
      <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl rounded-xl p-6 border border-slate-200/50 dark:border-slate-800/50 shadow-xl">
        <div className="flex items-center gap-2 mb-6">
          <div className="p-2 bg-cyan-50 dark:bg-cyan-950/30 rounded-lg">
            <TrendingUp className="w-5 h-5 text-cyan-500" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Productos Más Descargados
          </h2>
        </div>

        <div className="space-y-3">
          {stats.topProducts.map((product, index) => (
            <div
              key={product.id}
              className="flex items-center gap-4 p-4 rounded-lg bg-slate-50/70 dark:bg-slate-800/70 hover:bg-slate-100/90 dark:hover:bg-slate-700/90 transition-all duration-200 border border-slate-200/50 dark:border-slate-700/50"
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 text-white font-bold shadow-lg shadow-cyan-500/30">
                #{index + 1}
              </div>
              <img
                src={product.image}
                alt={product.title}
                className="w-16 h-16 rounded-lg object-cover ring-2 ring-slate-200 dark:ring-slate-700"
              />
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-slate-900 dark:text-white truncate">
                  {product.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 capitalize">
                  {product.category}
                </p>
              </div>
              <div className="flex flex-col items-end gap-1">
                <div className="flex items-center gap-1 text-slate-900 dark:text-white font-semibold">
                  <Download className="w-4 h-4" />
                  <span>{product.downloads}</span>
                </div>
                <div className="flex items-center gap-1 text-yellow-500">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="text-sm font-medium">{product.rating}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Charts placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl rounded-xl p-6 border border-slate-200/50 dark:border-slate-800/50 shadow-xl">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
            Productos por Categoría
          </h3>
          <div className="h-64 flex items-center justify-center text-slate-400 bg-slate-50/50 dark:bg-slate-800/50 rounded-lg border border-slate-200/50 dark:border-slate-700/50">
            Gráfico en desarrollo...
          </div>
        </div>

        <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl rounded-xl p-6 border border-slate-200/50 dark:border-slate-800/50 shadow-xl">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
            Ventas Mensuales
          </h3>
          <div className="h-64 flex items-center justify-center text-slate-400 bg-slate-50/50 dark:bg-slate-800/50 rounded-lg border border-slate-200/50 dark:border-slate-700/50">
            Gráfico en desarrollo...
          </div>
        </div>
      </div>
    </div>
  );
}
