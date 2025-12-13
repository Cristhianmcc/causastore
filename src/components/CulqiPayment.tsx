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
  const [showProcessing, setShowProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

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
        
        // Cerrar el modal de Culqi inmediatamente
        if (window.Culqi.close) {
          window.Culqi.close();
        }
        
        // Mostrar modal de procesamiento
        setShowProcessing(true);
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
          setShowProcessing(false);
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

      // Ocultar modal de procesamiento y mostrar éxito
      setShowProcessing(false);
      setShowSuccess(true);

      // Después de 2.5 segundos, cerrar todo
      setTimeout(() => {
        onSuccess(token);
        onClose();
      }, 2500);
    } catch (error: any) {
      console.error('Error al procesar el pago:', error);
      toast.error(error.message || 'Error al procesar el pago. Por favor, intenta nuevamente.');
      setShowProcessing(false);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 z-[9998]"
        style={{ background: 'rgba(0, 0, 0, 0.5)' }}
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[9999]">
        <div style={{
          background: '#fff',
          borderRadius: '10px',
          padding: '30px',
          width: '400px',
          maxWidth: '90vw',
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
          position: 'relative'
        }}>
          <button
            onClick={onClose}
            style={{
              position: 'absolute',
              top: '15px',
              right: '15px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#999',
              fontSize: '24px',
              lineHeight: '1',
              padding: '0',
              width: '24px',
              height: '24px'
            }}
          >
            ×
          </button>

          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <div style={{
              width: '60px',
              height: '60px',
              background: 'linear-gradient(135deg, #06b6d4 0%, #2563eb 100%)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 15px'
            }}>
              <CreditCard style={{ width: '30px', height: '30px', color: 'white' }} />
            </div>
            <h2 style={{
              fontSize: '20px',
              fontWeight: '700',
              color: '#111',
              margin: '0 0 8px 0'
            }}>
              Realizar Pago
            </h2>
            <p style={{
              fontSize: '14px',
              color: '#666',
              margin: 0
            }}>
              {product.title}
            </p>
          </div>

          <div style={{
            background: '#f9fafb',
            borderRadius: '8px',
            padding: '16px',
            marginBottom: '20px'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '8px'
            }}>
              <span style={{ fontSize: '14px', color: '#666' }}>Producto:</span>
              <span style={{
                fontSize: '14px',
                color: '#111',
                fontWeight: '600',
                maxWidth: '200px',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
              }}>
                {product.title}
              </span>
            </div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingTop: '8px',
              borderTop: '1px solid #e5e7eb'
            }}>
              <span style={{ fontSize: '14px', color: '#666' }}>Total a pagar:</span>
              <span style={{
                fontSize: '24px',
                fontWeight: '700',
                background: 'linear-gradient(135deg, #06b6d4 0%, #2563eb 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                S/ {product.price.toFixed(2)}
              </span>
            </div>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <Label htmlFor="email" style={{
              fontSize: '14px',
              fontWeight: '500',
              color: '#333',
              display: 'block',
              marginBottom: '8px'
            }}>
              Email *
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tucorreo@ejemplo.com"
              style={{
                width: '100%',
                padding: '10px 12px',
                fontSize: '14px',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                background: '#fff'
              }}
              required
            />
            <p style={{
              fontSize: '12px',
              color: '#666',
              marginTop: '6px'
            }}>
              Recibirás el producto en este email
            </p>
          </div>

          <Button
            onClick={handlePayment}
            disabled={loading || !email}
            style={{
              width: '100%',
              padding: '12px',
              fontSize: '15px',
              fontWeight: '600',
              color: 'white',
              background: loading || !email 
                ? '#94a3b8' 
                : 'linear-gradient(135deg, #06b6d4 0%, #2563eb 100%)',
              border: 'none',
              borderRadius: '6px',
              cursor: loading || !email ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}
          >
            {loading ? (
              <>
                <Loader2 style={{ width: '18px', height: '18px', animation: 'spin 1s linear infinite' }} />
                Procesando...
              </>
            ) : (
              <>
                <CreditCard style={{ width: '18px', height: '18px' }} />
                Pagar con Culqi
              </>
            )}
          </Button>

          <div style={{
            marginTop: '16px',
            textAlign: 'center',
            fontSize: '11px',
            color: '#999',
            lineHeight: '1.5'
          }}>
            <p style={{ margin: '4px 0' }}>✓ Acepta tarjetas Visa, Mastercard y Yape</p>
            <p style={{ margin: '4px 0' }}>✓ Pago seguro procesado por Culqi</p>
            <p style={{ margin: '4px 0' }}>✓ SSL encriptado de extremo a extremo</p>
          </div>
        </div>
      </div>

      {/* Modal de Procesamiento */}
      {showProcessing && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center" style={{ background: 'rgba(0, 0, 0, 0.5)' }}>
          <div style={{
            background: '#fff',
            padding: '30px 40px',
            borderRadius: '10px',
            textAlign: 'center',
            width: '320px',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
            animation: 'scaleIn 0.3s ease'
          }}>
            <h2 style={{
              margin: '0 0 15px',
              fontSize: '18px',
              color: '#333',
              fontWeight: '600'
            }}>
              Procesando pago
            </h2>
            <div style={{
              margin: '20px auto 10px',
              width: '50px',
              height: '50px',
              border: '6px solid #e0e0e0',
              borderTop: '6px solid #3498db',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite'
            }}></div>
            <div style={{
              marginTop: '10px',
              fontSize: '14px',
              color: '#555'
            }}>
              Espere por favor...
            </div>
          </div>
        </div>
      )}

      {/* Modal de Éxito */}
      {showSuccess && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center" style={{ background: 'rgba(0, 0, 0, 0.5)' }}>
          <div style={{
            background: '#fff',
            padding: '30px 40px',
            borderRadius: '10px',
            textAlign: 'center',
            width: '320px',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
            animation: 'scaleIn 0.3s ease'
          }}>
            <div style={{
              width: '72px',
              height: '72px',
              margin: '12px auto 8px'
            }}>
              <svg style={{ width: '72px', height: '72px', display: 'block' }} viewBox="0 0 52 52" focusable="false">
                <circle 
                  cx="26" 
                  cy="26" 
                  r="25" 
                  fill="none"
                  stroke="#22c55e"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeDasharray="157"
                  strokeDashoffset="157"
                  style={{
                    animation: 'drawCircle 550ms ease forwards'
                  }}
                />
                <path 
                  fill="none"
                  stroke="#22c55e"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeDasharray="50"
                  strokeDashoffset="50"
                  d="M14 27.5 L22 35.5 L38 18"
                  style={{
                    animation: 'drawCheck 450ms 250ms ease forwards'
                  }}
                />
              </svg>
            </div>
            <div style={{
              marginTop: '8px',
              fontSize: '16px',
              fontWeight: '700',
              color: '#111'
            }}>
              ¡Pago aprobado!
            </div>
            <div style={{
              marginTop: '6px',
              fontSize: '13px',
              color: '#666'
            }}>
              Estamos confirmando tu transacción.
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes scaleIn {
          from {
            transform: scale(0.9);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes drawCircle {
          to {
            stroke-dashoffset: 0;
          }
        }

        @keyframes drawCheck {
          to {
            stroke-dashoffset: 0;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          * {
            animation: none !important;
          }
        }
      `}</style>
    </>
  );
}