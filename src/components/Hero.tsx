import { Sparkles, TrendingUp, Zap } from 'lucide-react';

interface HeroProps {
  productType: 'landing' | 'freepik' | 'templates';
}

export function Hero({ productType }: HeroProps) {
  const content = {
    landing: {
      title: '1,000+ Landing Pages Premium',
      subtitle: 'Código fuente profesional listo para usar. React, Tailwind CSS y componentes modernos.',
      icon: Zap
    },
    freepik: {
      title: 'Assets Freepik de Calidad',
      subtitle: 'Vectores, ilustraciones y elementos gráficos para tus proyectos creativos.',
      icon: Sparkles
    },
    templates: {
      title: 'Plantillas Photoshop & Illustrator',
      subtitle: 'Mockups, flyers y diseños editables para branding profesional.',
      icon: TrendingUp
    }
  };

  const current = content[productType];
  const Icon = current.icon;

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-slate-100 via-slate-50/50 to-transparent dark:from-slate-950 dark:via-slate-900/50 dark:to-transparent py-16 sm:py-20 transition-colors duration-300">
      {/* Animated gradient orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute top-20 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 mb-6">
          <Icon className="h-4 w-4 text-cyan-400" />
          <span className="text-cyan-400">Productos digitales profesionales</span>
        </div>

        <h1 className="bg-gradient-to-r from-slate-900 via-cyan-700 to-blue-600 dark:from-white dark:via-cyan-100 dark:to-blue-200 bg-clip-text text-transparent mb-6">
          {current.title}
        </h1>

        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8">
          {current.subtitle}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-8 text-sm">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-gray-700 dark:text-gray-300">Actualizaciones semanales</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 bg-cyan-500 rounded-full animate-pulse"></div>
            <span className="text-gray-700 dark:text-gray-300">Soporte técnico incluido</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 bg-blue-500 rounded-full animate-pulse"></div>
            <span className="text-gray-700 dark:text-gray-300">Licencia comercial</span>
          </div>
        </div>
      </div>
    </div>
  );
}