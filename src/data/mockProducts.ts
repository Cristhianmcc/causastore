import { Product } from '../types';

export const mockProducts: Product[] = [
  // Landing Pages
  {
    id: 'lp-001',
    title: 'Academia Pro - Plataforma Educativa',
    category: 'escuela',
    type: 'landing',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1732721093900-5b1f9091cf5e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBzY2hvb2wlMjBlZHVjYXRpb258ZW58MXx8fHwxNzY1MTYxNzA4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Landing page completa para instituciones educativas con sistema de inscripciones, galería de cursos y sección de testimonios. Diseño moderno y responsivo.',
    features: [
      'Diseño 100% responsivo',
      'Formulario de inscripción integrado',
      'Sección de cursos destacados',
      'Galería de fotos',
      'Testimonios de estudiantes',
      'Mapa de ubicación',
      'Optimizado para SEO'
    ],
    tags: ['React', 'Tailwind', 'Educación', 'Responsivo'],
    preview: [
      'https://images.unsplash.com/photo-1732721093900-5b1f9091cf5e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
      'https://images.unsplash.com/photo-1732721093900-5b1f9091cf5e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
      'https://images.unsplash.com/photo-1732721093900-5b1f9091cf5e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400'
    ],
    downloads: 1247,
    rating: 4.8
  },
  {
    id: 'lp-002',
    title: 'ConstructPro - Empresa de Construcción',
    category: 'construccion',
    type: 'landing',
    price: 59.99,
    image: 'https://images.unsplash.com/photo-1630259970029-7b1e1160243e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25zdHJ1Y3Rpb24lMjBidWlsZGluZyUyMHNpdGV8ZW58MXx8fHwxNzY1MjAzNzUzfDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Template profesional para empresas constructoras. Incluye portafolio de proyectos, cotizador en línea y sección de servicios con animaciones modernas.',
    features: [
      'Portafolio de proyectos con filtros',
      'Cotizador interactivo',
      'Sección de servicios detallada',
      'Certificaciones y licencias',
      'Animaciones suaves',
      'Formulario de contacto',
      'Diseño industrial'
    ],
    tags: ['React', 'Construcción', 'Portafolio', 'Animaciones'],
    preview: [
      'https://images.unsplash.com/photo-1630259970029-7b1e1160243e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
      'https://images.unsplash.com/photo-1630259970029-7b1e1160243e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
      'https://images.unsplash.com/photo-1630259970029-7b1e1160243e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400'
    ],
    downloads: 892,
    rating: 4.9
  },
  {
    id: 'lp-003',
    title: 'MedicalCare - Clínica Médica',
    category: 'medico',
    type: 'landing',
    price: 69.99,
    image: 'https://images.unsplash.com/photo-1710074213379-2a9c2653046a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwaG9zcGl0YWx8ZW58MXx8fHwxNzY1MjE3OTI1fDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Landing page premium para clínicas y consultorios médicos. Sistema de citas online, perfiles de doctores y sección de especialidades médicas.',
    features: [
      'Sistema de reserva de citas',
      'Perfiles de médicos especialistas',
      'Catálogo de especialidades',
      'Blog médico integrado',
      'Horarios de atención',
      'Ubicación con Google Maps',
      'Certificaciones médicas'
    ],
    tags: ['Healthcare', 'Citas Online', 'Médico', 'Premium'],
    preview: [
      'https://images.unsplash.com/photo-1710074213379-2a9c2653046a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
      'https://images.unsplash.com/photo-1710074213379-2a9c2653046a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
      'https://images.unsplash.com/photo-1710074213379-2a9c2653046a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400'
    ],
    downloads: 2103,
    rating: 4.9
  },
  {
    id: 'lp-004',
    title: 'PetCare Plus - Clínica Veterinaria',
    category: 'veterinaria',
    type: 'landing',
    price: 54.99,
    image: 'https://images.unsplash.com/photo-1621371236495-1520d8dc72a5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2ZXRlcmluYXJ5JTIwcGV0JTIwY2xpbmljfGVufDF8fHx8MTc2NTIxNzkyNXww&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Template encantador para veterinarias y pet shops. Incluye servicios de grooming, tienda de productos y blog de cuidado de mascotas.',
    features: [
      'Catálogo de servicios veterinarios',
      'Tienda de productos para mascotas',
      'Sistema de citas',
      'Blog de cuidado animal',
      'Galería de pacientes',
      'Consejos veterinarios',
      'Diseño amigable'
    ],
    tags: ['Veterinaria', 'Mascotas', 'Ecommerce', 'Blog'],
    preview: [
      'https://images.unsplash.com/photo-1621371236495-1520d8dc72a5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
      'https://images.unsplash.com/photo-1621371236495-1520d8dc72a5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
      'https://images.unsplash.com/photo-1621371236495-1520d8dc72a5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400'
    ],
    downloads: 1567,
    rating: 4.7
  },
  {
    id: 'lp-005',
    title: 'Sabor Gourmet - Restaurante',
    category: 'restaurant',
    type: 'landing',
    price: 44.99,
    image: 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwZm9vZHxlbnwxfHx8fDE3NjUxMjIyMzN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Landing page elegante para restaurantes. Menú digital interactivo, sistema de reservas, galería de platos y reseñas de clientes.',
    features: [
      'Menú digital interactivo',
      'Sistema de reservas online',
      'Galería de platos',
      'Reseñas de clientes',
      'Horarios y ubicación',
      'Integración redes sociales',
      'Diseño gastronómico elegante'
    ],
    tags: ['Restaurant', 'Menú Digital', 'Reservas', 'Gourmet'],
    preview: [
      'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
      'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
      'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400'
    ],
    downloads: 3421,
    rating: 4.8
  },
  {
    id: 'lp-006',
    title: 'TechInnovate - Startup Tecnológica',
    category: 'tecnologia',
    type: 'landing',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1611648694931-1aeda329f9da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNobm9sb2d5JTIwZGlnaXRhbHxlbnwxfHx8fDE3NjUxNzUxNzR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Template futurista para empresas tech. Animaciones avanzadas, sección de productos SaaS, dashboard demo y precios por planes.',
    features: [
      'Diseño ultra moderno',
      'Animaciones 3D',
      'Dashboard demo interactivo',
      'Pricing tables',
      'Integraciones API',
      'Sección de características',
      'CTA optimizados'
    ],
    tags: ['Tech', 'SaaS', 'Startup', 'Animaciones 3D'],
    preview: [
      'https://images.unsplash.com/photo-1611648694931-1aeda329f9da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
      'https://images.unsplash.com/photo-1611648694931-1aeda329f9da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
      'https://images.unsplash.com/photo-1611648694931-1aeda329f9da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400'
    ],
    downloads: 4892,
    rating: 5.0
  },
  {
    id: 'lp-007',
    title: 'LuxuryHome - Inmobiliaria Premium',
    category: 'inmobiliaria',
    type: 'landing',
    price: 64.99,
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWFsJTIwZXN0YXRlJTIwcHJvcGVydHl8ZW58MXx8fHwxNzY1MTc1MDQzfDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Landing page exclusiva para inmobiliarias. Tour virtual 360°, filtros avanzados de búsqueda, comparador de propiedades y calculadora de hipotecas.',
    features: [
      'Tour virtual 360°',
      'Buscador avanzado',
      'Comparador de propiedades',
      'Calculadora hipoteca',
      'Mapa interactivo',
      'Galería de imágenes HD',
      'Formulario de contacto agentes'
    ],
    tags: ['Inmobiliaria', 'Tour Virtual', 'Filtros', 'Premium'],
    preview: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400'
    ],
    downloads: 2187,
    rating: 4.9
  },
  {
    id: 'lp-008',
    title: 'FitZone - Gimnasio y Fitness',
    category: 'fitness',
    type: 'landing',
    price: 39.99,
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXRuZXNzJTIwZ3ltfGVufDF8fHx8MTc2NTEzMzIxOHww&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Template energético para gimnasios. Horarios de clases, perfiles de entrenadores, calculadora IMC y sistema de membresías.',
    features: [
      'Horario de clases grupales',
      'Perfiles de entrenadores',
      'Calculadora de IMC',
      'Planes de membresía',
      'Galería de instalaciones',
      'Testimonios transformación',
      'App de reservas'
    ],
    tags: ['Fitness', 'Gym', 'Salud', 'Membresías'],
    preview: [
      'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
      'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
      'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400'
    ],
    downloads: 1876,
    rating: 4.6
  },
  {
    id: 'lp-009',
    title: 'ShopPro - Tienda Online',
    category: 'ecommerce',
    type: 'landing',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1658297063569-162817482fb6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvbmxpbmUlMjBzaG9wcGluZyUyMGVjb21tZXJjZXxlbnwxfHx8fDE3NjUxODg2NTN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Landing completa para ecommerce. Catálogo de productos, carrito de compras, sistema de pago, tracking de pedidos y área de cliente.',
    features: [
      'Catálogo completo',
      'Carrito de compras',
      'Múltiples métodos de pago',
      'Tracking de envíos',
      'Sistema de reseñas',
      'Wishlist',
      'Panel de usuario'
    ],
    tags: ['Ecommerce', 'Tienda', 'Carrito', 'Pagos'],
    preview: [
      'https://images.unsplash.com/photo-1658297063569-162817482fb6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
      'https://images.unsplash.com/photo-1658297063569-162817482fb6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
      'https://images.unsplash.com/photo-1658297063569-162817482fb6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400'
    ],
    downloads: 5621,
    rating: 4.9
  },
  {
    id: 'lp-010',
    title: 'Corporate Elite - Empresa Corporativa',
    category: 'corporativo',
    type: 'landing',
    price: 74.99,
    image: 'https://images.unsplash.com/photo-1426523038054-a260f3ef5bc9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3Jwb3JhdGUlMjBidXNpbmVzcyUyMG9mZmljZXxlbnwxfHx8fDE3NjUyMTc5Mjd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Template profesional para empresas corporativas. Sección de equipo, servicios, casos de éxito, blog corporativo y formulario de contacto.',
    features: [
      'Presentación corporativa',
      'Equipo y perfiles',
      'Portafolio de servicios',
      'Casos de éxito',
      'Blog empresarial',
      'Formulario multi-paso',
      'Newsletter integrado'
    ],
    tags: ['Corporativo', 'Empresa', 'Profesional', 'B2B'],
    preview: [
      'https://images.unsplash.com/photo-1426523038054-a260f3ef5bc9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
      'https://images.unsplash.com/photo-1426523038054-a260f3ef5bc9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
      'https://images.unsplash.com/photo-1426523038054-a260f3ef5bc9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400'
    ],
    downloads: 3254,
    rating: 4.8
  },

  // Freepik Resources
  {
    id: 'fp-001',
    title: 'Pack Vectores Médicos - 500 Elementos',
    category: 'medico',
    type: 'freepik',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1727534089841-966acefef7fc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2ZWN0b3IlMjBpbGx1c3RyYXRpb258ZW58MXx8fHwxNzY1MjE3OTI4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Colección completa de vectores médicos. Incluye iconos de órganos, herramientas médicas, símbolos de salud y más.',
    features: [
      '500+ elementos vectoriales',
      'Formato AI, EPS, SVG',
      'Totalmente editables',
      'Múltiples colores',
      'Uso comercial',
      'Actualizaciones gratis'
    ],
    tags: ['Vectores', 'Médico', 'Iconos', 'SVG'],
    preview: [
      'https://images.unsplash.com/photo-1727534089841-966acefef7fc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
      'https://images.unsplash.com/photo-1727534089841-966acefef7fc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
      'https://images.unsplash.com/photo-1727534089841-966acefef7fc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400'
    ],
    downloads: 4521,
    rating: 4.9
  },
  {
    id: 'fp-002',
    title: 'Ilustraciones Construcción - Bundle',
    category: 'construccion',
    type: 'freepik',
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1497091071254-cc9b2ba7c48a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmFwaGljJTIwZGVzaWduJTIwY3JlYXRpdmV8ZW58MXx8fHwxNzY1MTM0MTEwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Pack de ilustraciones isométricas para industria de construcción. Edificios, maquinaria, trabajadores y más.',
    features: [
      'Ilustraciones isométricas',
      '300+ elementos',
      'Estilo moderno',
      'Alta resolución',
      'Múltiples formatos',
      'Licencia extendida'
    ],
    tags: ['Ilustraciones', 'Construcción', 'Isométrico', 'Bundle'],
    preview: [
      'https://images.unsplash.com/photo-1497091071254-cc9b2ba7c48a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
      'https://images.unsplash.com/photo-1497091071254-cc9b2ba7c48a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
      'https://images.unsplash.com/photo-1497091071254-cc9b2ba7c48a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400'
    ],
    downloads: 2134,
    rating: 4.7
  },

  // Photoshop/Illustrator Templates
  {
    id: 'ps-001',
    title: 'Mockups Médicos - 50 PSD',
    category: 'medico',
    type: 'templates',
    price: 34.99,
    image: 'https://images.unsplash.com/photo-1497091071254-cc9b2ba7c48a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmFwaGljJTIwZGVzaWduJTIwY3JlYXRpdmV8ZW58MXx8fHwxNzY1MTM0MTEwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Colección de mockups profesionales para clínicas y hospitales. Tarjetas, folders, uniformes, señalética y más.',
    features: [
      '50 mockups PSD',
      'Smart objects',
      'Alta resolución 4K',
      'Capas organizadas',
      'Fácil personalización',
      'Guía de uso incluida'
    ],
    tags: ['Photoshop', 'Mockups', 'Médico', 'Branding'],
    preview: [
      'https://images.unsplash.com/photo-1497091071254-cc9b2ba7c48a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
      'https://images.unsplash.com/photo-1497091071254-cc9b2ba7c48a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
      'https://images.unsplash.com/photo-1497091071254-cc9b2ba7c48a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400'
    ],
    downloads: 1876,
    rating: 4.8
  },
  {
    id: 'ps-002',
    title: 'Flyers Restaurante - Pack Illustrator',
    category: 'restaurant',
    type: 'templates',
    price: 19.99,
    image: 'https://images.unsplash.com/photo-1497091071254-cc9b2ba7c48a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmFwaGljJTIwZGVzaWduJTIwY3JlYXRpdmV8ZW58MXx8fHwxNzY1MTM0MTEwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Plantillas editables de flyers para restaurantes y cafeterías. Diseños modernos y listos para imprimir.',
    features: [
      '30 diseños únicos',
      'Formato AI',
      'Tamaños estándar',
      'Listo para imprimir',
      'Fuentes incluidas',
      'CMYK'
    ],
    tags: ['Illustrator', 'Flyers', 'Restaurant', 'Print'],
    preview: [
      'https://images.unsplash.com/photo-1497091071254-cc9b2ba7c48a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
      'https://images.unsplash.com/photo-1497091071254-cc9b2ba7c48a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
      'https://images.unsplash.com/photo-1497091071254-cc9b2ba7c48a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400'
    ],
    downloads: 3421,
    rating: 4.6
  }
];
