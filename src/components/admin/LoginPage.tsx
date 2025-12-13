import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Lock, Mail, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

interface LoginPageProps {
  onLoginSuccess: () => void;
}

export function LoginPage({ onLoginSuccess }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const success = await login(email, password);
      if (success) {
        toast.success('¡Bienvenido al panel de administración!');
        onLoginSuccess();
      } else {
        toast.error('Credenciales incorrectas');
      }
    } catch (error) {
      toast.error('Error al iniciar sesión');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Patrón de fondo sutil */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(6, 182, 212, 0.08) 1px, transparent 0)',
        backgroundSize: '40px 40px'
      }} />

      <div style={{
        position: 'relative',
        zIndex: 10,
        width: '100%',
        maxWidth: '440px'
      }}>
        <div style={{
          background: '#fff',
          borderRadius: '16px',
          padding: '40px',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.08)',
          border: '1px solid rgba(6, 182, 212, 0.1)',
          position: 'relative'
        }} className="dark:bg-slate-900 dark:border-cyan-500/20">
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <div style={{
              width: '80px',
              height: '80px',
              background: 'linear-gradient(135deg, #06b6d4 0%, #2563eb 100%)',
              borderRadius: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px',
              boxShadow: '0 10px 30px rgba(6, 182, 212, 0.3)',
              position: 'relative'
            }}>
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(135deg, #06b6d4 0%, #2563eb 100%)',
                borderRadius: '20px',
                filter: 'blur(20px)',
                opacity: 0.5
              }} />
              <Lock style={{ width: '40px', height: '40px', color: 'white', position: 'relative', zIndex: 1 }} />
            </div>
            <h1 style={{
              fontSize: '28px',
              fontWeight: '700',
              color: '#1a202c',
              margin: '0 0 8px 0'
            }} className="dark:text-white">
              Panel de Administración
            </h1>
            <p style={{
              fontSize: '15px',
              color: '#718096',
              margin: 0
            }} className="dark:text-slate-400">
              Ingresa tus credenciales para continuar
            </p>
          </div>

          {/* Info credentials */}
          <div style={{
            background: 'rgba(6, 182, 212, 0.05)',
            border: '1px solid rgba(6, 182, 212, 0.2)',
            borderRadius: '12px',
            padding: '16px',
            marginBottom: '24px'
          }} className="dark:bg-cyan-500/10 dark:border-cyan-500/20">
            <div style={{ display: 'flex', gap: '12px' }}>
              <AlertCircle style={{ width: '20px', height: '20px', color: '#06b6d4', flexShrink: 0, marginTop: '2px' }} />
              <div style={{ fontSize: '13px', lineHeight: '1.6' }}>
                <p style={{ color: '#4a5568', margin: '0 0 8px 0', fontWeight: '600' }} className="dark:text-cyan-100">
                  Credenciales de prueba:
                </p>
                <p style={{ color: '#06b6d4', margin: '4px 0', fontWeight: '500' }}>
                  Email: admin@tienda.com
                </p>
                <p style={{ color: '#06b6d4', margin: '4px 0', fontWeight: '500' }}>
                  Contraseña: admin123
                </p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '20px' }}>
              <Label htmlFor="email" style={{
                fontSize: '14px',
                fontWeight: '600',
                color: '#2d3748',
                display: 'block',
                marginBottom: '8px'
              }} className="dark:text-slate-300">
                Correo electrónico
              </Label>
              <div style={{ position: 'relative' }}>
                <Mail style={{
                  position: 'absolute',
                  left: '14px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: '20px',
                  height: '20px',
                  color: '#a0aec0'
                }} />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@tienda.com"
                  style={{
                    width: '100%',
                    paddingLeft: '44px',
                    paddingRight: '14px',
                    paddingTop: '12px',
                    paddingBottom: '12px',
                    fontSize: '14px',
                    border: '2px solid #e2e8f0',
                    borderRadius: '10px',
                    background: '#f7fafc',
                    transition: 'all 0.2s'
                  }}
                  className="dark:bg-slate-800 dark:border-slate-700"
                  onFocus={(e) => {
                    e.target.style.borderColor = '#06b6d4';
                    e.target.style.boxShadow = '0 0 0 3px rgba(6, 182, 212, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#e2e8f0';
                    e.target.style.boxShadow = 'none';
                  }}
                  required
                />
              </div>
            </div>

            <div style={{ marginBottom: '28px' }}>
              <Label htmlFor="password" style={{
                fontSize: '14px',
                fontWeight: '600',
                color: '#2d3748',
                display: 'block',
                marginBottom: '8px'
              }} className="dark:text-slate-300">
                Contraseña
              </Label>
              <div style={{ position: 'relative' }}>
                <Lock style={{
                  position: 'absolute',
                  left: '14px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: '20px',
                  height: '20px',
                  color: '#a0aec0'
                }} />
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  style={{
                    width: '100%',
                    paddingLeft: '44px',
                    paddingRight: '14px',
                    paddingTop: '12px',
                    paddingBottom: '12px',
                    fontSize: '14px',
                    border: '2px solid #e2e8f0',
                    borderRadius: '10px',
                    background: '#f7fafc',
                    transition: 'all 0.2s'
                  }}
                  className="dark:bg-slate-800 dark:border-slate-700"
                  onFocus={(e) => {
                    e.target.style.borderColor = '#06b6d4';
                    e.target.style.boxShadow = '0 0 0 3px rgba(6, 182, 212, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#e2e8f0';
                    e.target.style.boxShadow = 'none';
                  }}
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              style={{
                width: '100%',
                padding: '14px',
                fontSize: '16px',
                fontWeight: '600',
                color: 'white',
                background: isLoading 
                  ? '#a0aec0' 
                  : 'linear-gradient(135deg, #06b6d4 0%, #2563eb 100%)',
                border: 'none',
                borderRadius: '10px',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                boxShadow: isLoading 
                  ? 'none' 
                  : '0 10px 25px rgba(6, 182, 212, 0.3)',
                transition: 'all 0.3s',
                transform: isLoading ? 'none' : 'translateY(0)'
              }}
              onMouseEnter={(e) => {
                if (!isLoading) {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 15px 35px rgba(6, 182, 212, 0.4)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isLoading) {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 10px 25px rgba(6, 182, 212, 0.3)';
                }
              }}
            >
              {isLoading ? 'Ingresando...' : 'Iniciar Sesión'}
            </Button>
          </form>

          <div style={{
            marginTop: '24px',
            textAlign: 'center',
            fontSize: '12px',
            color: '#a0aec0'
          }}>
            <p style={{ margin: 0 }}>
              © 2024 Tienda Virtual. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
