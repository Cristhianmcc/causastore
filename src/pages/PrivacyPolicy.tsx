import { ArrowRight, Shield } from 'lucide-react';

interface PrivacyPolicyProps {
  onBackToHome: () => void;
}

export function PrivacyPolicy({ onBackToHome }: PrivacyPolicyProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={onBackToHome}
          className="inline-flex items-center gap-2 text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 mb-8 transition-colors"
        >
          <ArrowRight className="w-4 h-4 rotate-180" />
          Volver a la tienda
        </button>

        <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 md:p-12 border border-slate-200 dark:border-slate-800 shadow-lg">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-green-500/50">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl text-slate-900 dark:text-white">
                Política de Privacidad
              </h1>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                Última actualización: Diciembre 2024
              </p>
            </div>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none">
            <h2 className="text-2xl text-slate-900 dark:text-white mt-8 mb-4">1. Información que Recopilamos</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              Recopilamos información que nos proporcionas directamente cuando:
            </p>
            <ul className="list-disc pl-6 text-slate-600 dark:text-slate-400 mb-4 space-y-2">
              <li>Creas una cuenta en nuestro sitio</li>
              <li>Realizas una compra</li>
              <li>Te suscribes a nuestro boletín</li>
              <li>Contactas con nuestro equipo de soporte</li>
            </ul>

            <h2 className="text-2xl text-slate-900 dark:text-white mt-8 mb-4">2. Tipos de Datos Recopilados</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              Los datos que podemos recopilar incluyen:
            </p>
            <ul className="list-disc pl-6 text-slate-600 dark:text-slate-400 mb-4 space-y-2">
              <li>Nombre y apellidos</li>
              <li>Dirección de correo electrónico</li>
              <li>Información de pago (procesada de forma segura por terceros)</li>
              <li>Dirección IP y datos de navegación</li>
              <li>Preferencias de usuario y configuraciones</li>
            </ul>

            <h2 className="text-2xl text-slate-900 dark:text-white mt-8 mb-4">3. Uso de la Información</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              Utilizamos la información recopilada para:
            </p>
            <ul className="list-disc pl-6 text-slate-600 dark:text-slate-400 mb-4 space-y-2">
              <li>Procesar y gestionar tus compras</li>
              <li>Proporcionar soporte técnico y atención al cliente</li>
              <li>Enviar actualizaciones sobre productos y servicios</li>
              <li>Mejorar la experiencia de usuario en nuestro sitio</li>
              <li>Cumplir con obligaciones legales</li>
            </ul>

            <h2 className="text-2xl text-slate-900 dark:text-white mt-8 mb-4">4. Compartir Información</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              No vendemos ni alquilamos tu información personal. Podemos compartir información con:
            </p>
            <ul className="list-disc pl-6 text-slate-600 dark:text-slate-400 mb-4 space-y-2">
              <li>Procesadores de pago para completar transacciones</li>
              <li>Servicios de hosting y análisis web</li>
              <li>Autoridades legales cuando sea requerido por ley</li>
            </ul>

            <h2 className="text-2xl text-slate-900 dark:text-white mt-8 mb-4">5. Cookies</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              Utilizamos cookies y tecnologías similares para mejorar tu experiencia. Puedes configurar tu navegador para rechazar cookies, aunque esto puede afectar algunas funcionalidades del sitio.
            </p>

            <h2 className="text-2xl text-slate-900 dark:text-white mt-8 mb-4">6. Seguridad</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              Implementamos medidas de seguridad técnicas y organizativas para proteger tu información:
            </p>
            <ul className="list-disc pl-6 text-slate-600 dark:text-slate-400 mb-4 space-y-2">
              <li>Cifrado SSL para todas las transacciones</li>
              <li>Servidores seguros y protegidos</li>
              <li>Acceso limitado a datos personales</li>
              <li>Auditorías de seguridad regulares</li>
            </ul>

            <h2 className="text-2xl text-slate-900 dark:text-white mt-8 mb-4">7. Tus Derechos</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              Tienes derecho a:
            </p>
            <ul className="list-disc pl-6 text-slate-600 dark:text-slate-400 mb-4 space-y-2">
              <li>Acceder a tu información personal</li>
              <li>Corregir datos inexactos</li>
              <li>Solicitar la eliminación de tus datos</li>
              <li>Oponerte al procesamiento de tu información</li>
              <li>Solicitar la portabilidad de tus datos</li>
            </ul>

            <h2 className="text-2xl text-slate-900 dark:text-white mt-8 mb-4">8. Retención de Datos</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              Conservamos tu información personal solo durante el tiempo necesario para cumplir con los propósitos descritos en esta política o según lo requiera la ley.
            </p>

            <h2 className="text-2xl text-slate-900 dark:text-white mt-8 mb-4">9. Cambios en la Política</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              Podemos actualizar esta política periódicamente. Te notificaremos sobre cambios significativos publicando la nueva política en esta página.
            </p>

            <h2 className="text-2xl text-slate-900 dark:text-white mt-8 mb-4">10. Contacto</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              Para preguntas sobre esta política de privacidad o ejercer tus derechos:
            </p>
            <ul className="list-none text-slate-600 dark:text-slate-400 mb-4 space-y-2">
              <li>Email: privacidad@tienda.com</li>
              <li>WhatsApp: +1 234 567 890</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
