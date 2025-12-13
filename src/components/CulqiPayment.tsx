import { useState, useEffect } from 'react';
import { CreditCard, Shield, AlertCircle, X, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
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

export function CulqiPayment({ 
  product,
  onClose,
  onSuccess
}: CulqiPaymentProps) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Cargar script de Culqi
    const script = document.createElement('script');
    script.src = 'https://checkout.culqi.com/js/v4';
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      const publicKey = import.meta.env.VITE_CULQI_PUBLIC_KEY;
      if (publicKey) {
        window.Culqi.publicKey = publicKey;
        window.Culqi.init();
      }
    };

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  // Configurar el callback de Culqi
  useEffect(() => {
    const currentEmail = email; // Capturar el email actual
    
    window.culqi = async function () {
      if (window.Culqi.token) {
        const token = window.Culqi.token.id;
        setLoading(true);
        
        try {
          // Usar currentEmail en lugar de email del estado
          const paymentData = {
            token,
            productId: product.id,
            email: currentEmail || email, // Usar el email capturado
            amount: product.price,
          };
          
          console.log('Datos de pago:', paymentData);
          await processPayment(token, currentEmail || email);
        } catch (error) {
          console.error('Error al procesar el pago:', error);
          setLoading(false);
        }
      } else if (window.Culqi.error) {
        console.error('Error de Culqi:', window.Culqi.error);
        toast.error(window.Culqi.error.user_message || 'Error al procesar el pago');
        setLoading(false);
      }
    };
  }, [product, email]); // Agregar email como dependencia

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

    if (typeof window.Culqi === 'undefined') {
      toast.error('Error al cargar Culqi. Por favor recarga la página.');
      return;
    }

    // Configurar el checkout
    window.Culqi.settings({
      title: 'CodeMarket Pro',
      currency: 'PEN',
      amount: Math.round(product.price * 100),
    });

    window.Culqi.options({
      lang: 'auto',
      installments: false,
      paymentMethods: {
        tarjeta: true,
        yape: true,
        bancaMovil: false,
        agente: false,
        billetera: false,
        cuotealo: false,
      },
    });

    // Abrir el modal
    window.Culqi.open();
  };

  const processPayment = async (token: string, paymentEmail: string) => {
    try {
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

      if (!supabaseUrl || !supabaseAnonKey) {
        throw new Error('Configuración de Supabase no encontrada');
      }

      const paymentData = {
        token: token,
        productId: product.id,
        email: paymentEmail,
        amount: product.price,
      };

      console.log('Enviando pago con datos:', paymentData);

      const response = await fetch(`${supabaseUrl}/functions/v1/process-payment`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${supabaseAnonKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentData),
      });

      const data = await response.json();
      console.log('Respuesta del servidor:', data);

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Error al procesar el pago');
      }

      // Mostrar mensaje de éxito
      toast.success('¡Pago exitoso! Revisa tu email para acceder al producto.');

      onSuccess(token);
      onClose();
    } catch (error: any) {
      console.error('Error al procesar el pago:', error);
      toast.error(error.message || 'Error al procesar el pago. Por favor, intenta nuevamente.');
      throw error;
    } finally {
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