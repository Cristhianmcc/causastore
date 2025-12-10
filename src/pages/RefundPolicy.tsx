import { ArrowRight, RefreshCw } from 'lucide-react';

interface RefundPolicyProps {
  onBackToHome: () => void;
}

export function RefundPolicy({ onBackToHome }: RefundPolicyProps) {
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
            <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/50">
              <RefreshCw className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl text-slate-900 dark:text-white">
                Política de Reembolso
              </h1>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                Última actualización: Diciembre 2024
              </p>
            </div>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none">
            <div className="bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-lg p-6 mb-8">
              <h3 className="text-lg text-green-900 dark:text-green-100 mb-2">
                Garantía de Satisfacción
              </h3>
              <p className="text-green-700 dark:text-green-300 m-0">
                Ofrecemos una garantía de reembolso de 14 días en todas nuestras plantillas. Tu satisfacción es nuestra prioridad.
              </p>
            </div>

            <h2 className="text-2xl text-slate-900 dark:text-white mt-8 mb-4">1. Período de Reembolso</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              Tienes 14 días calendario desde la fecha de compra para solicitar un reembolso completo si no estás satisfecho con tu compra.
            </p>

            <h2 className="text-2xl text-slate-900 dark:text-white mt-8 mb-4">2. Motivos Válidos para Reembolso</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              Se aceptan solicitudes de reembolso por:
            </p>
            <ul className="list-disc pl-6 text-slate-600 dark:text-slate-400 mb-4 space-y-2">
              <li>El producto no funciona como se describe</li>
              <li>Problemas técnicos graves que no se pueden resolver</li>
              <li>Archivos corruptos o incompletos</li>
              <li>Diferencias significativas con la descripción del producto</li>
            </ul>

            <h2 className="text-2xl text-slate-900 dark:text-white mt-8 mb-4">3. Casos NO Elegibles</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              No se procesarán reembolsos en los siguientes casos:
            </p>
            <ul className="list-disc pl-6 text-slate-600 dark:text-slate-400 mb-4 space-y-2">
              <li>Después del período de 14 días</li>
              <li>Cambio de opinión sin motivo técnico</li>
              <li>Falta de conocimiento técnico para usar el producto</li>
              <li>Problemas causados por modificaciones incorrectas</li>
              <li>Incompatibilidad con software de terceros no mencionado</li>
            </ul>

            <h2 className="text-2xl text-slate-900 dark:text-white mt-8 mb-4">4. Proceso de Solicitud</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              Para solicitar un reembolso:
            </p>
            <ol className="list-decimal pl-6 text-slate-600 dark:text-slate-400 mb-4 space-y-2">
              <li>Envía un email a reembolsos@tienda.com con tu número de pedido</li>
              <li>Explica detalladamente el motivo de tu solicitud</li>
              <li>Proporciona capturas de pantalla si hay problemas técnicos</li>
              <li>Espera nuestra respuesta en un plazo de 48 horas</li>
            </ol>

            <h2 className="text-2xl text-slate-900 dark:text-white mt-8 mb-4">5. Tiempo de Procesamiento</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              Una vez aprobado el reembolso:
            </p>
            <ul className="list-disc pl-6 text-slate-600 dark:text-slate-400 mb-4 space-y-2">
              <li>Procesamos el reembolso en 1-2 días hábiles</li>
              <li>Los fondos aparecen en tu cuenta en 5-10 días hábiles</li>
              <li>El tiempo puede variar según tu método de pago</li>
            </ul>

            <h2 className="text-2xl text-slate-900 dark:text-white mt-8 mb-4">6. Reembolsos Parciales</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              En algunos casos, podemos ofrecer reembolsos parciales si:
            </p>
            <ul className="list-disc pl-6 text-slate-600 dark:text-slate-400 mb-4 space-y-2">
              <li>Solo una parte del producto tiene problemas</li>
              <li>Has usado extensivamente el producto antes de reportar problemas</li>
              <li>Hay una solución alternativa disponible</li>
            </ul>

            <h2 className="text-2xl text-slate-900 dark:text-white mt-8 mb-4">7. Alternativas al Reembolso</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              Antes de procesar un reembolso, podemos ofrecer:
            </p>
            <ul className="list-disc pl-6 text-slate-600 dark:text-slate-400 mb-4 space-y-2">
              <li>Soporte técnico extendido para resolver problemas</li>
              <li>Cambio por otro producto de igual valor</li>
              <li>Crédito en tienda para futuras compras</li>
              <li>Actualización gratuita a una versión premium</li>
            </ul>

            <h2 className="text-2xl text-slate-900 dark:text-white mt-8 mb-4">8. Licencias Extendidas</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              Las licencias extendidas son reembolsables bajo las mismas condiciones, pero deben solicitarse antes de usar el producto en proyectos múltiples.
            </p>

            <h2 className="text-2xl text-slate-900 dark:text-white mt-8 mb-4">9. Productos en Oferta</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              Los productos adquiridos con descuento o en promoción son elegibles para reembolso bajo las mismas condiciones, recibiendo el monto efectivamente pagado.
            </p>

            <h2 className="text-2xl text-slate-900 dark:text-white mt-8 mb-4">10. Contacto</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              Para solicitudes de reembolso o preguntas:
            </p>
            <ul className="list-none text-slate-600 dark:text-slate-400 mb-4 space-y-2">
              <li>Email: reembolsos@tienda.com</li>
              <li>WhatsApp: +1 234 567 890 (horario: 9am - 6pm)</li>
              <li>Tiempo de respuesta: {'<'} 48 horas</li>
            </ul>

            <div className="bg-cyan-50 dark:bg-cyan-950/30 border border-cyan-200 dark:border-cyan-800 rounded-lg p-6 mt-8">
              <h3 className="text-lg text-cyan-900 dark:text-cyan-100 mb-2">
                Nuestro Compromiso
              </h3>
              <p className="text-cyan-700 dark:text-cyan-300 m-0">
                Estamos comprometidos con tu satisfacción. Si tienes algún problema con tu compra, contáctanos primero. En la mayoría de los casos, podemos resolver cualquier inconveniente rápidamente.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
