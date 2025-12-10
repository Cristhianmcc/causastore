import { useState, useEffect } from 'react';
import { useProducts } from '../../contexts/ProductContext';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { X, Plus } from 'lucide-react';
import { Category, ProductType } from '../../types';
import { toast } from 'sonner';
import { uploadImage } from '../../lib/cloudinary';

interface ProductFormDialogProps {
  isOpen: boolean;
  onClose: () => void;
  productId?: string | null;
}

export function ProductFormDialog({ isOpen, onClose, productId }: ProductFormDialogProps) {
  const { products, addProduct, updateProduct } = useProducts();
  const isEditing = !!productId;
  const product = isEditing ? products.find(p => p.id === productId) : null;

  const [formData, setFormData] = useState({
    title: '',
    category: 'escuela' as Category,
    type: 'landing' as ProductType,
    price: 0,
    image: '',
    description: '',
    features: [''],
    tags: [''],
    preview: ['']
  });
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (product) {
      setFormData({
        title: product.title,
        category: product.category,
        type: product.type,
        price: product.price,
        image: product.image,
        description: product.description,
        features: product.features,
        tags: product.tags,
        preview: product.preview
      });
    } else {
      resetForm();
    }
  }, [product, isOpen]);

  const resetForm = () => {
    setFormData({
      title: '',
      category: 'escuela' as Category,
      type: 'landing' as ProductType,
      price: 0,
      image: '',
      description: '',
      features: [''],
      tags: [''],
      preview: ['']
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.image || formData.price <= 0) {
      toast.error('Por favor completa todos los campos requeridos');
      return;
    }

    const productData = {
      ...formData,
      features: formData.features.filter(f => f.trim() !== ''),
      tags: formData.tags.filter(t => t.trim() !== ''),
      preview: formData.preview.filter(p => p.trim() !== ''),
      downloads: 0,
      rating: 0
    };

    if (isEditing && productId) {
      updateProduct(productId, productData);
      toast.success('Producto actualizado correctamente');
    } else {
      addProduct(productData);
      toast.success('Producto creado correctamente');
    }

    onClose();
  };

  const addArrayField = (field: 'features' | 'tags' | 'preview') => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const updateArrayField = (field: 'features' | 'tags' | 'preview', index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };

  const removeArrayField = (field: 'features' | 'tags' | 'preview', index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      // Usar el upload preset 'productos'
      const url = await uploadImage(file, 'productos');
      setFormData(prev => ({ ...prev, image: url }));
      toast.success('Imagen subida correctamente');
    } catch (err) {
      toast.error('Error al subir imagen');
    } finally {
      setUploading(false);
    }
  };

  const categories: Category[] = [
    'escuela', 'construccion', 'medico', 'veterinaria', 'restaurant',
    'tecnologia', 'inmobiliaria', 'fitness', 'ecommerce', 'corporativo'
  ];

  const types: ProductType[] = ['landing', 'freepik', 'templates'];

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/80 z-[9998]"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[9999] w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white dark:bg-slate-900 rounded-lg shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 p-6 rounded-t-lg z-10">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                {isEditing ? 'Editar Producto' : 'Nuevo Producto'}
              </h2>
              <p className="text-slate-600 dark:text-slate-400 mt-1">
                {isEditing ? 'Modifica los datos del producto' : 'Completa la información del nuevo producto'}
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Información Básica */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg text-slate-900 dark:text-white">Información Básica</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Título *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Nombre del producto"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="price">Precio (S/) *</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.price}
                  onChange={(e) => setFormData(prev => ({ ...prev, price: parseFloat(e.target.value) || 0 }))}
                  required
                  placeholder="Ej: 49.90"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Categoría *</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value: Category) => setFormData(prev => ({ ...prev, category: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat} className="capitalize">
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="type">Tipo *</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value: ProductType) => setFormData(prev => ({ ...prev, type: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {types.map((type) => (
                      <SelectItem key={type} value={type} className="capitalize">
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="image">Imagen *</Label>
                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={uploading}
                />
                {formData.image && (
                  <div className="mt-2 p-3 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg flex items-center gap-3">
                    <img 
                      src={formData.image} 
                      alt="Preview" 
                      style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                      className="rounded border-2 border-green-300 dark:border-green-700 flex-shrink-0" 
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-green-700 dark:text-green-300">✓ Imagen cargada correctamente</p>
                      <p className="text-xs text-green-600 dark:text-green-400 truncate">{formData.image.split('/').pop()}</p>
                    </div>
                  </div>
                )}
                {uploading && (
                  <div className="mt-2 text-sm text-blue-600 dark:text-blue-400 flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    Subiendo imagen...
                  </div>
                )}
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="description">Descripción</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Descripción del producto"
                  rows={3}
                />
              </div>
            </div>
          </div>

          {/* Características */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Características</Label>
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={() => addArrayField('features')}
              >
                <Plus className="w-4 h-4 mr-1" />
                Agregar
              </Button>
            </div>
            <div className="space-y-2">
              {formData.features.map((feature, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={feature}
                    onChange={(e) => updateArrayField('features', index, e.target.value)}
                    placeholder="Nueva característica"
                  />
                  {formData.features.length > 1 && (
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      onClick={() => removeArrayField('features', index)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Tags</Label>
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={() => addArrayField('tags')}
              >
                <Plus className="w-4 h-4 mr-1" />
                Agregar
              </Button>
            </div>
            <div className="space-y-2">
              {formData.tags.map((tag, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={tag}
                    onChange={(e) => updateArrayField('tags', index, e.target.value)}
                    placeholder="Nuevo tag"
                  />
                  {formData.tags.length > 1 && (
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      onClick={() => removeArrayField('tags', index)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* URLs de Preview */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>URLs de Preview</Label>
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={() => addArrayField('preview')}
              >
                <Plus className="w-4 h-4 mr-1" />
                Agregar
              </Button>
            </div>
            <div className="space-y-2">
              {formData.preview.map((url, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={url}
                    onChange={(e) => updateArrayField('preview', index, e.target.value)}
                    placeholder="https://ejemplo.com/preview.jpg"
                  />
                  {formData.preview.length > 1 && (
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      onClick={() => removeArrayField('preview', index)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button
              type="submit"
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
            >
              {isEditing ? 'Actualizar' : 'Crear'} Producto
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
