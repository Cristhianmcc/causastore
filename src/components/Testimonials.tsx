import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'María González',
    role: 'Directora de Marketing',
    company: 'TechStart SA',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
    rating: 5,
    text: 'Excelente calidad de plantillas. Implementamos la landing page de tecnología y nuestras conversiones aumentaron un 300%. Totalmente recomendado.'
  },
  {
    id: 2,
    name: 'Carlos Ramírez',
    role: 'CEO',
    company: 'Construcciones PRO',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
    rating: 5,
    text: 'La plantilla de construcción superó nuestras expectativas. El diseño es profesional y fácil de personalizar. Gran inversión para nuestro negocio.'
  },
  {
    id: 3,
    name: 'Ana Martínez',
    role: 'Propietaria',
    company: 'Academia Futuro',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
    rating: 5,
    text: 'Perfecta para nuestra institución educativa. Los padres están encantados con la nueva web. El soporte técnico es excelente.'
  },
  {
    id: 4,
    name: 'Roberto Silva',
    role: 'Médico Veterinario',
    company: 'Clínica VetPlus',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
    rating: 5,
    text: 'La landing page de veterinaria es exactamente lo que necesitábamos. Ahora recibimos más consultas online y el sistema de citas funciona perfecto.'
  }
];

export function Testimonials() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl text-slate-900 dark:text-white mb-4">
            Lo Que Dicen Nuestros Clientes
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Miles de empresas confían en nuestras plantillas para impulsar su presencia digital
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-lg border border-slate-200 dark:border-slate-800 hover:shadow-xl transition-shadow relative"
            >
              <Quote className="absolute top-4 right-4 w-8 h-8 text-cyan-200 dark:text-cyan-900 opacity-50" />
              
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="text-slate-900 dark:text-white">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {testimonial.role}
                  </p>
                </div>
              </div>

              <div className="flex gap-1 mb-3">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed mb-3">
                {testimonial.text}
              </p>

              <p className="text-xs text-cyan-600 dark:text-cyan-400">
                {testimonial.company}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
