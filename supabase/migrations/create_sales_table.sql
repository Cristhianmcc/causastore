-- Crear tabla de ventas
CREATE TABLE IF NOT EXISTS sales (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  buyer_email VARCHAR(255) NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'PEN',
  payment_provider VARCHAR(50) DEFAULT 'culqi',
  payment_id VARCHAR(255) NOT NULL,
  payment_status VARCHAR(50) DEFAULT 'completed',
  product_data JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para mejorar el rendimiento
CREATE INDEX IF NOT EXISTS idx_sales_product_id ON sales(product_id);
CREATE INDEX IF NOT EXISTS idx_sales_buyer_email ON sales(buyer_email);
CREATE INDEX IF NOT EXISTS idx_sales_payment_id ON sales(payment_id);
CREATE INDEX IF NOT EXISTS idx_sales_created_at ON sales(created_at DESC);

-- Trigger para actualizar updated_at
CREATE OR REPLACE FUNCTION update_sales_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER sales_updated_at
BEFORE UPDATE ON sales
FOR EACH ROW
EXECUTE FUNCTION update_sales_updated_at();

-- Habilitar RLS (Row Level Security)
ALTER TABLE sales ENABLE ROW LEVEL SECURITY;

-- Política: Solo admins pueden ver todas las ventas
CREATE POLICY "Admins can view all sales"
ON sales FOR SELECT
TO authenticated
USING (
  auth.jwt() ->> 'email' IN (
    SELECT email FROM auth.users WHERE raw_user_meta_data->>'role' = 'admin'
  )
);

-- Política: Los usuarios pueden ver solo sus propias compras
CREATE POLICY "Users can view their own purchases"
ON sales FOR SELECT
TO authenticated
USING (buyer_email = auth.jwt() ->> 'email');

-- Política: Solo el sistema puede insertar ventas (mediante service role)
CREATE POLICY "Service role can insert sales"
ON sales FOR INSERT
TO service_role
WITH CHECK (true);

-- Comentarios para documentación
COMMENT ON TABLE sales IS 'Registro de todas las ventas realizadas en la plataforma';
COMMENT ON COLUMN sales.product_data IS 'Snapshot del producto al momento de la venta (JSONB)';
COMMENT ON COLUMN sales.payment_status IS 'Estado del pago: pending, completed, failed, refunded';
