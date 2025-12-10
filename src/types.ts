export type Category = 
  | 'escuela' 
  | 'construccion' 
  | 'medico' 
  | 'veterinaria' 
  | 'restaurant' 
  | 'tecnologia'
  | 'inmobiliaria'
  | 'fitness'
  | 'ecommerce'
  | 'corporativo';

export type ProductType = 'landing' | 'freepik' | 'templates';

export interface Product {
  id: string;
  title: string;
  category: Category;
  type: ProductType;
  price: number;
  image: string;
  description: string;
  features: string[];
  tags: string[];
  preview: string[];
  downloads: number;
  rating: number;
  views?: number;
}

export type PageType = 
  | 'home' 
  | 'detail' 
  | 'admin' 
  | 'how-to-buy' 
  | 'terms' 
  | 'privacy' 
  | 'refund';
