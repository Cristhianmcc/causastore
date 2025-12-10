import { MessageCircle } from 'lucide-react';
import { Product } from '../types';

interface WhatsAppButtonProps {
  product: Product;
}

export function WhatsAppButton({ product }: WhatsAppButtonProps) {
  const phoneNumber = '1234567890'; // Número de WhatsApp de la tienda
  
  const handleClick = () => {
    const message = encodeURIComponent(
      `Hola! Estoy interesado en el producto:\n\n` +
      `📦 ${product.title}\n` +
      `🏷️ Categoría: ${product.category}\n` +
      `💰 Precio: S/ ${product.price.toFixed(2)}\n\n` +
      `¿Podrías darme más información?`
    );
    
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white px-6 py-4 rounded-full shadow-2xl hover:shadow-green-500/50 transition-all hover:scale-105 group"
      aria-label="Contactar por WhatsApp"
    >
      <MessageCircle className="w-6 h-6 group-hover:animate-bounce" />
      <span className="hidden sm:inline">Consultar por WhatsApp</span>
    </button>
  );
}
