-- Agregar columna product_url a la tabla products
ALTER TABLE products 
ADD COLUMN IF NOT EXISTS product_url TEXT;

-- Agregar columnas adicionales para download_url y figma_url si no existen
ALTER TABLE products 
ADD COLUMN IF NOT EXISTS download_url TEXT;

ALTER TABLE products 
ADD COLUMN IF NOT EXISTS figma_url TEXT;

-- Comentarios para documentación
COMMENT ON COLUMN products.product_url IS 'URL principal del producto (se envía por correo tras la compra)';
COMMENT ON COLUMN products.download_url IS 'URL de descarga directa del producto';
COMMENT ON COLUMN products.figma_url IS 'URL del archivo Figma del producto';
