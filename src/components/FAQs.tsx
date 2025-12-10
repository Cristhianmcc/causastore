import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

const faqs = [
  {
    question: '¿Qué métodos de pago aceptan?',
    answer: 'Aceptamos tarjetas de crédito/débito (Visa, Mastercard, American Express), PayPal, transferencias bancarias y criptomonedas. Todos los pagos son procesados de forma segura.'
  },
  {
    question: '¿Puedo personalizar las plantillas?',
    answer: 'Sí, todas nuestras plantillas son 100% personalizables. Puedes modificar colores, textos, imágenes y estructura según tus necesidades. Incluyen documentación completa para facilitar la personalización.'
  },
  {
    question: '¿Ofrecen soporte técnico?',
    answer: 'Sí, ofrecemos soporte técnico completo vía email y WhatsApp. Nuestro equipo responde en menos de 24 horas. También incluimos documentación detallada y tutoriales en video.'
  },
  {
    question: '¿Las plantillas son responsivas?',
    answer: 'Absolutamente. Todas nuestras plantillas están optimizadas para funcionar perfectamente en computadoras, tablets y smartphones. Garantizamos una experiencia de usuario excepcional en todos los dispositivos.'
  },
  {
    question: '¿Puedo usar las plantillas en múltiples proyectos?',
    answer: 'Depende de la licencia. La licencia estándar permite uso en un solo proyecto. Si necesitas usar en múltiples proyectos, ofrecemos licencias extendidas con descuento.'
  },
  {
    question: '¿Ofrecen reembolsos?',
    answer: 'Sí, ofrecemos garantía de reembolso de 14 días si no estás satisfecho con tu compra. Solo necesitas contactarnos y procesaremos tu reembolso sin preguntas.'
  },
  {
    question: '¿Incluyen las plantillas el código fuente?',
    answer: 'Sí, todas las plantillas incluyen el código fuente completo (HTML, CSS, JavaScript/React). Puedes modificar y adaptar el código según tus necesidades sin restricciones.'
  },
  {
    question: '¿Hacen plantillas personalizadas?',
    answer: 'Sí, ofrecemos servicios de desarrollo personalizado. Contáctanos por WhatsApp o email con los detalles de tu proyecto y te enviaremos una cotización en menos de 48 horas.'
  }
];

export function FAQs() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl mb-4 shadow-lg shadow-cyan-500/50">
            <HelpCircle className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl md:text-4xl text-slate-900 dark:text-white mb-4">
            Preguntas Frecuentes
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Encuentra respuestas a las dudas más comunes
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                <span className="text-slate-900 dark:text-white pr-8">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-cyan-500 flex-shrink-0 transition-transform ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              
              {openIndex === index && (
                <div className="px-6 pb-6 pt-0">
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 text-center p-6 bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-950/30 dark:to-blue-950/30 rounded-xl border border-cyan-200 dark:border-cyan-800">
          <p className="text-slate-700 dark:text-slate-300 mb-4">
            ¿No encuentras lo que buscas?
          </p>
          <a
            href="https://wa.me/1234567890"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white rounded-lg transition-colors shadow-lg shadow-cyan-500/30"
          >
            Contáctanos por WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
