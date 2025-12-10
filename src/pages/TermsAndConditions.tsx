import { ArrowRight, FileText } from 'lucide-react';

interface TermsAndConditionsProps {
  onBackToHome: () => void;
}

export function TermsAndConditions({ onBackToHome }: TermsAndConditionsProps) {
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
            <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/50">
              <FileText className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl text-slate-900 dark:text-white">
                Términos y Condiciones
              </h1>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                Última actualización: Diciembre 2024
              </p>
            </div>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none">
            <h2 className="text-2xl text-slate-900 dark:text-white mt-8 mb-4">1. Aceptación de Términos</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              Al acceder y utilizar este sitio web, aceptas cumplir con estos términos y condiciones de uso. Si no estás de acuerdo con alguno de estos términos, no utilices este sitio.
            </p>

            <h2 className="text-2xl text-slate-900 dark:text-white mt-8 mb-4">2. Licencia de Uso</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              Al comprar una plantilla, recibes una licencia no exclusiva para usar el producto en:
            </p>
            <ul className="list-disc pl-6 text-slate-600 dark:text-slate-400 mb-4 space-y-2">
              <li>Un solo proyecto comercial (Licencia Estándar)</li>
              <li>Múltiples proyectos (Licencia Extendida, vendida por separado)</li>
              <li>Modificación del código según tus necesidades</li>
            </ul>

            <h2 className="text-2xl text-slate-900 dark:text-white mt-8 mb-4">3. Restricciones</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              No está permitido:
            </p>
            <ul className="list-disc pl-6 text-slate-600 dark:text-slate-400 mb-4 space-y-2">
              <li>Revender, redistribuir o compartir las plantillas</li>
              <li>Reclamar las plantillas como trabajo propio</li>
              <li>Usar las plantillas en proyectos ilegales o poco éticos</li>
              <li>Extraer gráficos o elementos para revender por separado</li>
            </ul>

            <h2 className="text-2xl text-slate-900 dark:text-white mt-8 mb-4">4. Pagos y Reembolsos</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              Todos los precios están en dólares estadounidenses (USD). Ofrecemos garantía de reembolso de 14 días si el producto no cumple con las especificaciones descritas.
            </p>

            <h2 className="text-2xl text-slate-900 dark:text-white mt-8 mb-4">5. Propiedad Intelectual</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              Todos los productos, contenidos y materiales disponibles en este sitio son propiedad de nuestra empresa o de sus licenciantes y están protegidos por leyes de propiedad intelectual.
            </p>

            <h2 className="text-2xl text-slate-900 dark:text-white mt-8 mb-4">6. Soporte Técnico</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              Proporcionamos soporte técnico para ayudarte con la instalación y uso básico de las plantillas. No incluye servicios de personalización avanzada o desarrollo adicional.
            </p>

            <h2 className="text-2xl text-slate-900 dark:text-white mt-8 mb-4">7. Actualizaciones</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              Los clientes que compren plantillas recibirán actualizaciones gratuitas durante 12 meses desde la fecha de compra.
            </p>

            <h2 className="text-2xl text-slate-900 dark:text-white mt-8 mb-4">8. Limitación de Responsabilidad</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              No nos hacemos responsables de daños indirectos, incidentales o consecuentes derivados del uso o incapacidad de uso de nuestros productos.
            </p>

            <h2 className="text-2xl text-slate-900 dark:text-white mt-8 mb-4">9. Modificaciones</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              Nos reservamos el derecho de modificar estos términos en cualquier momento. Los cambios entrarán en vigor inmediatamente después de su publicación en el sitio.
            </p>

            <h2 className="text-2xl text-slate-900 dark:text-white mt-8 mb-4">10. Contacto</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              Para preguntas sobre estos términos, contáctanos en:
            </p>
            <ul className="list-none text-slate-600 dark:text-slate-400 mb-4 space-y-2">
              <li>Email: legal@tienda.com</li>
              <li>WhatsApp: +1 234 567 890</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
