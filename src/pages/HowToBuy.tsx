import { ShoppingCart, CreditCard, Download, CheckCircle, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/button';

interface HowToBuyProps {
  onBackToHome: () => void;
}

export function HowToBuy({ onBackToHome }: HowToBuyProps) {
  const steps = [
    {
      icon: ShoppingCart,
      title: 'Explora y Selecciona',
      description: 'Navega por nuestro catálogo de más de 1 millón de plantillas. Usa los filtros por categoría, precio y popularidad para encontrar la perfecta para tu proyecto.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: CreditCard,
      title: 'Realiza el Pago',
      description: 'Haz clic en "Ver detalles" y contacta con nosotros por WhatsApp para procesar tu pago de forma segura. Aceptamos tarjetas, PayPal y transferencias.',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Download,
      title: 'Descarga Instantánea',
      description: 'Una vez confirmado el pago, recibirás un enlace de descarga inmediato por email. Incluye todos los archivos fuente y documentación completa.',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: CheckCircle,
      title: 'Soporte Continuo',
      description: 'Disfruta de soporte técnico ilimitado. Estamos aquí para ayudarte con cualquier duda o personalización que necesites para tu proyecto.',
      color: 'from-orange-500 to-red-500'
    }
  ];

  const paymentMethods = [
    'Tarjetas de Crédito/Débito',
    'PayPal',
    'Transferencia Bancaria',
    'Criptomonedas (Bitcoin, USDT)',
    'Mercado Pago',
    'Stripe'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 mb-8 transition-colors"
          >
            <ArrowRight className="w-4 h-4 rotate-180" />
            Volver a la tienda
          </button>
          
          <h1 className="text-4xl md:text-5xl text-slate-900 dark:text-white mb-6">
            ¿Cómo Comprar?
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
            Un proceso simple y seguro en solo 4 pasos
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-white dark:bg-slate-900 rounded-2xl p-8 border border-slate-200 dark:border-slate-800 shadow-lg hover:shadow-xl transition-shadow relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-bl-full" />
              
              <div className="relative">
                <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${step.color} rounded-xl mb-6 shadow-lg`}>
                  <step.icon className="w-8 h-8 text-white" />
                </div>
                
                <div className="absolute -top-2 -left-2 w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center text-white shadow-lg">
                  {index + 1}
                </div>

                <h3 className="text-2xl text-slate-900 dark:text-white mb-3">
                  {step.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Payment Methods */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 border border-slate-200 dark:border-slate-800 shadow-lg mb-16">
          <h2 className="text-2xl text-slate-900 dark:text-white mb-6 text-center">
            Métodos de Pago Disponibles
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {paymentMethods.map((method, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-800 rounded-lg"
              >
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span className="text-slate-700 dark:text-slate-300">{method}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Guarantees */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 rounded-xl p-6 border border-green-200 dark:border-green-800">
            <CheckCircle className="w-12 h-12 text-green-500 mb-4" />
            <h3 className="text-lg text-slate-900 dark:text-white mb-2">
              Compra Segura
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Todas las transacciones están protegidas con cifrado SSL de nivel bancario
            </p>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
            <Download className="w-12 h-12 text-blue-500 mb-4" />
            <h3 className="text-lg text-slate-900 dark:text-white mb-2">
              Descarga Inmediata
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Acceso instantáneo a todos los archivos después de confirmar el pago
            </p>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 rounded-xl p-6 border border-purple-200 dark:border-purple-800">
            <ShoppingCart className="w-12 h-12 text-purple-500 mb-4" />
            <h3 className="text-lg text-slate-900 dark:text-white mb-2">
              Garantía 14 Días
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Reembolso completo si no estás satisfecho con tu compra
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button
            onClick={onBackToHome}
            className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-8 py-6 text-lg shadow-2xl shadow-cyan-500/50"
          >
            Comenzar a Comprar
          </Button>
        </div>
      </div>
    </div>
  );
}
