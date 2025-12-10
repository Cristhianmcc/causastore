import { Product } from '../types';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Star, Download, Check, ShoppingCart, ArrowLeft, Heart, Eye, CreditCard } from 'lucide-react';
import { ImageCarousel } from './ImageCarousel';
import { WhatsAppButton } from './WhatsAppButton';
import { Breadcrumbs } from './Breadcrumbs';
import { SocialShare } from './SocialShare';
import { CulqiPayment } from './CulqiPayment';
import { useFavorites } from '../contexts/FavoritesContext';
import { useProducts } from '../contexts/ProductContext';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

interface ProductDetailPageProps {
  product: Product;
  onBack: () => void;
}

export function ProductDetailPage({ product, onBack }: ProductDetailPageProps) {
  const allImages = [product.image, ...product.preview];
  const { toggleFavorite, isFavorite } = useFavorites();
  const { incrementViews } = useProducts();
  const isProductFavorite = isFavorite(product.id);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  // Increment view count when component mounts
  useEffect(() => {
    incrementViews(product.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product.id]);

  const handlePaymentSuccess = (token: string) => {
    console.log('Token de pago recibido:', token);
    toast.success('¡Pago procesado exitosamente! Recibirás el producto en tu email.');
    // Aquí deberías enviar el token a tu backend para procesar el pago
  };

  return (
    <div className="min-h-screen">
      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <Breadcrumbs
          items={[
            { label: 'Inicio', onClick: onBack },
            { label: product.category, onClick: onBack },
            { label: product.title }
          ]}
        />
      </div>

      {/* Back button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Button
          variant="ghost"
          onClick={onBack}
          className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Volver a la tienda
        </Button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left: Image Carousel */}
          <div className="space-y-6">
            <div className="relative">
              <ImageCarousel images={allImages} alt={product.title} />
              
              <div className="absolute top-4 left-4 z-10">
                <Badge className="bg-gradient-to-r from-pink-500 to-purple-600 border-0">
                  {product.type === 'landing' ? 'Landing Page' : product.type === 'freepik' ? 'Freepik Asset' : 'PSD/AI Template'}
                </Badge>
              </div>
            </div>

            {/* Additional info cards */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white dark:bg-slate-900/50 rounded-xl p-4 border border-slate-200 dark:border-slate-800 text-center">
                <Star className="h-6 w-6 fill-yellow-500 text-yellow-500 mx-auto mb-2" />
                <div className="text-gray-900 dark:text-white">{product.rating}</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Calificación</div>
              </div>
              <div className="bg-white dark:bg-slate-900/50 rounded-xl p-4 border border-slate-200 dark:border-slate-800 text-center">
                <Download className="h-6 w-6 text-cyan-500 mx-auto mb-2" />
                <div className="text-gray-900 dark:text-white">{product.downloads.toLocaleString()}</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Descargas</div>
              </div>
              <div className="bg-white dark:bg-slate-900/50 rounded-xl p-4 border border-slate-200 dark:border-slate-800 text-center">
                <Eye className="h-6 w-6 text-purple-500 mx-auto mb-2" />
                <div className="text-gray-900 dark:text-white">{(product.views || 0).toLocaleString()}</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Vistas</div>
              </div>
            </div>
          </div>

          {/* Right: Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl sm:text-4xl bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-500 bg-clip-text text-transparent mb-4">
                {product.title}
              </h1>
              
              <div className="flex items-center gap-4 mb-6">
                <Badge variant="outline" className="border-cyan-500/50 text-cyan-600 dark:text-cyan-400">
                  {product.category}
                </Badge>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                  <span>{product.rating}</span>
                  <span className="text-sm">(245 reseñas)</span>
                </div>
              </div>
            </div>

            {/* Price */}
            <div className="bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-slate-900/80 dark:to-slate-800/80 rounded-xl p-6 border border-cyan-200 dark:border-slate-700">
              <div className="flex items-baseline gap-3 mb-4">
                <span className="text-4xl bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-500 bg-clip-text text-transparent">
                  S/ {product.price.toFixed(2)}
                </span>
                <span className="text-gray-500 dark:text-gray-400 line-through">S/ {(product.price * 1.5).toFixed(2)}</span>
                <Badge className="bg-green-500 hover:bg-green-600">33% OFF</Badge>
              </div>
              
              <div className="space-y-3">
                <Button 
                  size="lg"
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 shadow-lg shadow-cyan-500/50"
                  onClick={() => setShowPaymentModal(true)}
                >
                  <CreditCard className="h-5 w-5 mr-2" />
                  Pagar con Tarjeta/Yape
                </Button>
                
                <Button 
                  size="lg"
                  variant="outline"
                  className="w-full border-green-300 dark:border-green-800 text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-950/20"
                  onClick={() => {
                    const message = `Hola! Estoy interesado en: ${product.title}\nPrecio: S/ ${product.price.toFixed(2)}`;
                    const whatsappUrl = `https://wa.me/51977535389?text=${encodeURIComponent(message)}`;
                    window.open(whatsappUrl, '_blank');
                  }}
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Comprar por WhatsApp
                </Button>
                
                <Button 
                  size="lg"
                  variant="outline"
                  className={`w-full border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 ${
                    isProductFavorite ? 'bg-red-50 dark:bg-red-950/20 border-red-300 dark:border-red-800' : ''
                  }`}
                  onClick={() => toggleFavorite(product.id)}
                >
                  <Heart className={`h-5 w-5 mr-2 ${isProductFavorite ? 'fill-red-500 text-red-500' : ''}`} />
                  {isProductFavorite ? 'Guardado en Favoritos' : 'Agregar a Favoritos'}
                </Button>
              </div>
            </div>

            {/* Social Share */}
            <div className="flex gap-3">
              <SocialShare product={product} />
            </div>

            {/* Description */}
            <div>
              <h3 className="text-gray-900 dark:text-white mb-3">Descripción</h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Features */}
            <div>
              <h3 className="text-gray-900 dark:text-white mb-4">Características incluidas</h3>
              <div className="grid grid-cols-1 gap-3">
                {product.features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3 bg-white dark:bg-slate-900/30 p-3 rounded-lg border border-slate-200 dark:border-slate-800">
                    <div className="mt-0.5 rounded-full bg-cyan-100 dark:bg-cyan-500/20 p-1">
                      <Check className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
                    </div>
                    <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div>
              <h3 className="text-gray-900 dark:text-white mb-3">Tecnologías y etiquetas</h3>
              <div className="flex flex-wrap gap-2">
                {product.tags.map(tag => (
                  <Badge 
                    key={tag}
                    variant="outline" 
                    className="border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-gray-700 dark:text-gray-300"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Guarantee */}
            <div className="bg-green-50 dark:bg-green-950/20 rounded-xl p-4 border border-green-200 dark:border-green-900">
              <div className="flex items-center gap-3">
                <div className="bg-green-500 rounded-full p-2">
                  <Check className="h-5 w-5 text-white" />
                </div>
                <div>
                  <div className="text-green-900 dark:text-green-400">Garantía de 30 días</div>
                  <div className="text-sm text-green-700 dark:text-green-500">100% reembolso si no estás satisfecho</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* WhatsApp Button */}
      <WhatsAppButton product={product} />
      
      {/* Culqi Payment Modal */}
      {showPaymentModal && (
        <CulqiPayment
          product={product}
          onClose={() => setShowPaymentModal(false)}
          onSuccess={handlePaymentSuccess}
        />
      )}
    </div>
  );
}