import { useEffect, useState } from 'react';
import { X, CreditCard, Loader2 } from 'lucide-react';
import { Product } from '../types';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { toast } from 'sonner';

interface CulqiPaymentProps {
  product: Product;
  onClose: () => void;
  onSuccess: (token: string) => void;
}

declare global {
  interface Window {
    Culqi: any;
    culqi: () => void;
  }
}

export function CulqiPayment({ product, onClose, onSuccess }: CulqiPaymentProps) {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');

  useEffect(() => {
    // Cargar el script de Culqi
    const script = document.createElement('script');
    script.src = 'https://checkout.culqi.com/js/v4';
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      configureCulqi();
    };

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, [product]);

  const configureCulqi = () => {
    const publicKey = import.meta.env.VITE_CULQI_PUBLIC_KEY;
    
    if (!publicKey) {
      toast.error('Error de configuración: Llave pública de Culqi no encontrada');
      return;
    }

    window.Culqi = {
      publicKey,
      settings: {
        title: 'CodeMarket Pro',
        currency: 'PEN',
        amount: Math.round(product.price * 100), // Culqi espera el monto en centavos
      },
      options: {
        lang: 'es',
        installments: false,
        paymentMethods: {
          tarjeta: true,
          yape: true,
          billetera: false,
          bancaMovil: false,
          agente: false,
          cuotealo: false,
        },
      },
    };

    window.culqi = function () {
      if (window.Culqi.token) {
        const token = window.Culqi.token.id;
        toast.success('¡Pago procesado exitosamente!');
        onSuccess(token);
        onClose();
      } else if (window.Culqi.error) {
        console.error('Error de Culqi:', window.Culqi.error);
        toast.error('Error al procesar el pago. Por favor, intenta nuevamente.');
        setLoading(false);
      }
    };
  };

  const handlePayment = () => {
    if (!email) {
      toast.error('Por favor ingresa tu email');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error('Por favor ingresa un email válido');
      return;
    }

    setLoading(true);
    
    if (window.Culqi && window.Culqi.open) {
      window.Culqi.settings.description = product.title;
      window.Culqi.options.email = email;
      window.Culqi.open();
      setLoading(false);
    } else {
      toast.error('Error al cargar Culqi. Por favor recarga la página.');
      setLoading(false);
    }
  };

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[9998]"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[9999] w-full max-w-md p-4">
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 relative border border-slate-200 dark:border-slate-800 shadow-2xl">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-cyan-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <CreditCard className="w-8 h-8 text-cyan-500" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Realizar Pago</h2>
            <p className="text-slate-600 dark:text-slate-400">{product.title}</p>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-4 mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-slate-600 dark:text-slate-400">Producto:</span>
              <span className="text-slate-900 dark:text-white font-semibold text-sm truncate max-w-[200px]">{product.title}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-600 dark:text-slate-400">Total a pagar:</span>
              <span className="text-2xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                S/ {product.price.toFixed(2)}
              </span>
            </div>
          </div>

          <div className="mb-6">
            <Label htmlFor="email" className="text-slate-700 dark:text-slate-300">
              Email *
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tucorreo@ejemplo.com"
              className="mt-2 bg-slate-50 dark:bg-slate-800 border-slate-300 dark:border-slate-700"
              required
            />
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Recibirás el producto en este email
            </p>
          </div>

          <Button
            onClick={handlePayment}
            disabled={loading || !email}
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white shadow-lg shadow-cyan-500/50"
            size="lg"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin mr-2" />
                Procesando...
              </>
            ) : (
              <>
                <CreditCard className="w-5 h-5 mr-2" />
                Pagar con Culqi
              </>
            )}
          </Button>

          <div className="mt-4 text-center text-xs text-slate-500 dark:text-slate-400 space-y-1">
            <p>✓ Acepta tarjetas Visa, Mastercard y Yape</p>
            <p>✓ Pago seguro procesado por Culqi</p>
            <p>✓ SSL encriptado de extremo a extremo</p>
          </div>
        </div>
      </div>
    </>
  );
}
