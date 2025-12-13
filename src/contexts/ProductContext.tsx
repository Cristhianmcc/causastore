import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { Product } from '../types';
import { supabase } from '../lib/supabase';
import { toast } from 'sonner';

interface ProductContextType {
  products: Product[];
  loading: boolean;
  addProduct: (product: Omit<Product, 'id'>) => Promise<void>;
  updateProduct: (id: string, product: Partial<Product>) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  incrementViews: (id: string) => Promise<void>;
  getProductById: (id: string) => Product | undefined;
  refreshProducts: () => Promise<void>;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export function ProductProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setProducts(data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error('Error al cargar productos');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();

    // Suscribirse a cambios en tiempo real
    const subscription = supabase
      .channel('products_changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'products' },
        (payload) => {
          console.log('Change received!', payload);
          fetchProducts();
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [fetchProducts]);

  const addProduct = useCallback(async (product: Omit<Product, 'id'>) => {
    try {
      const { data, error } = await supabase
        .from('products')
        .insert([{
          title: product.title,
          category: product.category,
          type: product.type,
          price: product.price,
          image: product.image,
          description: product.description || '',
          features: product.features || [],
          tags: product.tags || [],
          preview: product.preview || [],
          downloads: 0,
          rating: 0,
          views: 0
        }])
        .select()
        .single();

      if (error) throw error;

      toast.success('Producto creado correctamente');
      await fetchProducts();
    } catch (error) {
      console.error('Error adding product:', error);
      toast.error('Error al crear producto: ' + (error as any)?.message || 'Error desconocido');
      throw error;
    }
  }, [fetchProducts]);

  const updateProduct = useCallback(async (id: string, updates: Partial<Product>) => {
    try {
      const { error } = await supabase
        .from('products')
        .update({
          title: updates.title,
          category: updates.category,
          type: updates.type,
          price: updates.price,
          image: updates.image,
          description: updates.description,
          features: updates.features,
          tags: updates.tags,
          preview: updates.preview
        })
        .eq('id', id);

      if (error) throw error;

      toast.success('Producto actualizado correctamente');
      await fetchProducts();
    } catch (error) {
      console.error('Error updating product:', error);
      toast.error('Error al actualizar producto');
      throw error;
    }
  }, [fetchProducts]);

  const deleteProduct = useCallback(async (id: string) => {
    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast.success('Producto eliminado correctamente');
      await fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.error('Error al eliminar producto');
      throw error;
    }
  }, [fetchProducts]);

  const incrementViews = useCallback(async (id: string) => {
    try {
      // Verificar si el ID es un UUID válido
      const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
      
      if (uuidRegex.test(id)) {
        const { error } = await supabase.rpc('increment_views', { product_id: id });
        
        if (error) throw error;
      }

      // Actualizar localmente sin refrescar toda la lista
      setProducts(prev => prev.map(p => 
        p.id === id ? { ...p, views: (p.views || 0) + 1 } : p
      ));
    } catch (error) {
      console.error('Error incrementing views:', error);
    }
  }, []);

  const getProductById = useCallback((id: string) => {
    return products.find(p => p.id === id);
  }, [products]);

  return (
    <ProductContext.Provider value={{
      products,
      loading,
      addProduct,
      updateProduct,
      deleteProduct,
      incrementViews,
      getProductById,
      refreshProducts: fetchProducts
    }}>
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
}
