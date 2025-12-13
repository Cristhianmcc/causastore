# 🚀 PASOS PARA ACTIVAR EL SISTEMA DE PAGOS

## ✅ PASO 1: CREAR TABLA DE VENTAS (2 minutos)

1. Abre tu proyecto en Supabase: https://supabase.com/dashboard/project/iqrlhpktqilxahesoxfp

2. En el menú lateral, ve a **SQL Editor**

3. Click en **New Query**

4. Copia y pega TODO este código:

```sql
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

-- Agregar columnas de descarga a productos si no existen
ALTER TABLE products ADD COLUMN IF NOT EXISTS download_url TEXT;
ALTER TABLE products ADD COLUMN IF NOT EXISTS figma_url TEXT;
```

5. Click en **RUN** (o presiona F5)

6. Deberías ver: ✅ "Success. No rows returned"

---

## ✅ PASO 2: CREAR EDGE FUNCTION - PROCESS-PAYMENT (3 minutos)

1. En Supabase, ve a **Edge Functions** en el menú lateral

2. Click en **Create a new function**

3. Nombre: `process-payment`

4. Copia y pega este código completo:

```typescript
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface PaymentRequest {
  token: string
  productId: string
  email: string
  amount: number
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { token, productId, email, amount }: PaymentRequest = await req.json()

    if (!token || !productId || !email || !amount) {
      throw new Error('Faltan parámetros requeridos')
    }

    // Validar y crear cargo con Culqi
    const culqiSecretKey = Deno.env.get('CULQI_SECRET_KEY')
    if (!culqiSecretKey) {
      throw new Error('Llave secreta de Culqi no configurada')
    }

    // Crear cargo en Culqi
    const chargeResponse = await fetch('https://api.culqi.com/v2/charges', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${culqiSecretKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: Math.round(amount * 100), // Convertir a centavos
        currency_code: 'PEN',
        email: email,
        source_id: token,
      }),
    })

    const chargeData = await chargeResponse.json()

    if (!chargeResponse.ok || chargeData.object === 'error') {
      console.error('Error de Culqi:', chargeData)
      throw new Error(chargeData.user_message || 'Error al procesar el pago')
    }

    // Verificar que el cargo fue exitoso
    if (chargeData.outcome?.type !== 'venta_exitosa') {
      throw new Error('El pago no pudo ser procesado')
    }

    // Guardar la venta en Supabase
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseKey)

    // Obtener información del producto
    const { data: product, error: productError } = await supabase
      .from('products')
      .select('*')
      .eq('id', productId)
      .single()

    if (productError || !product) {
      throw new Error('Producto no encontrado')
    }

    // Registrar la venta
    const { data: sale, error: saleError } = await supabase
      .from('sales')
      .insert({
        product_id: productId,
        buyer_email: email,
        amount: amount,
        currency: 'PEN',
        payment_provider: 'culqi',
        payment_id: chargeData.id,
        payment_status: 'completed',
        product_data: product,
      })
      .select()
      .single()

    if (saleError) {
      console.error('Error al guardar la venta:', saleError)
      throw new Error('Error al registrar la venta')
    }

    // Enviar email con el producto
    await fetch(`${supabaseUrl}/functions/v1/send-product-email`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${supabaseKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        product: product,
        saleId: sale.id,
      }),
    })

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Pago procesado exitosamente',
        saleId: sale.id,
        chargeId: chargeData.id,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )
  } catch (error) {
    console.error('Error en process-payment:', error)
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message || 'Error al procesar el pago',
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      },
    )
  }
})
```

5. Click en **Deploy**

---

## ✅ PASO 3: CREAR EDGE FUNCTION - SEND-PRODUCT-EMAIL (2 minutos)

1. Click en **Create a new function**

2. Nombre: `send-product-email`

3. Copia y pega este código:

```typescript
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface EmailRequest {
  email: string
  product: any
  saleId: string
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { email, product, saleId }: EmailRequest = await req.json()

    // Aquí puedes usar servicios como Resend, SendGrid, etc.
    // Por ahora, usaremos un ejemplo con Resend
    const resendApiKey = Deno.env.get('RESEND_API_KEY')

    if (!resendApiKey) {
      console.log('Resend API Key no configurada, simulando envío de email')
      return new Response(
        JSON.stringify({
          success: true,
          message: 'Email simulado (configura RESEND_API_KEY para envío real)',
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200,
        },
      )
    }

    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(to right, #06b6d4, #2563eb); padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .header h1 { color: white; margin: 0; }
            .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
            .product-info { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
            .download-button { display: inline-block; background: linear-gradient(to right, #06b6d4, #2563eb); color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; margin: 20px 0; }
            .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>¡Gracias por tu compra! 🎉</h1>
            </div>
            <div class="content">
              <p>Hola,</p>
              <p>Tu pago ha sido procesado exitosamente. Aquí está tu producto:</p>
              
              <div class="product-info">
                <h2>${product.title}</h2>
                <p>${product.description}</p>
                <p><strong>Precio:</strong> S/ ${product.price}</p>
                <p><strong>ID de compra:</strong> ${saleId}</p>
              </div>

              ${product.download_url ? `
                <a href="${product.download_url}" class="download-button">
                  Descargar Producto
                </a>
              ` : ''}

              ${product.figma_url ? `
                <p><strong>Link de Figma:</strong> <a href="${product.figma_url}">${product.figma_url}</a></p>
              ` : ''}

              <p>Si tienes alguna pregunta, no dudes en contactarnos.</p>
              
              <div class="footer">
                <p>CodeMarket Pro - Tu tienda de plantillas digitales</p>
                <p>Este es un correo automático, por favor no respondas a este mensaje.</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'CodeMarket Pro <onboarding@resend.dev>', // Cambia esto a tu dominio verificado
        to: [email],
        subject: `¡Tu compra de ${product.title} está lista!`,
        html: emailHtml,
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(`Error al enviar email: ${JSON.stringify(data)}`)
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Email enviado exitosamente',
        emailId: data.id,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )
  } catch (error) {
    console.error('Error en send-product-email:', error)
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      },
    )
  }
})
```

4. Click en **Deploy**

---

## ✅ PASO 4: CONFIGURAR VARIABLES SECRETAS (1 minuto)

1. En Supabase, ve a **Project Settings** (⚙️ abajo a la izquierda)

2. Click en **Edge Functions** en el menú lateral

3. Scroll hasta **Environment variables**

4. Click en **Add variable**

5. Agrega esta variable:
   - **Name:** `CULQI_SECRET_KEY`
   - **Value:** `sk_test_ebTQE6Q10dAlE5KP`
   - Click **Save**

6. (OPCIONAL) Si quieres emails automáticos:
   - Regístrate en https://resend.com (gratis 3,000 emails/mes)
   - Obtén tu API Key
   - Agrega otra variable:
     - **Name:** `RESEND_API_KEY`
     - **Value:** tu API key de Resend

---

## ✅ PASO 5: AGREGAR LINKS DE DESCARGA A PRODUCTOS (2 minutos)

1. Ve a **Table Editor** en Supabase

2. Selecciona la tabla **products**

3. Para cada producto que quieras vender:
   - Click en el producto para editarlo
   - Agrega `download_url`: Link de Google Drive, Dropbox, etc.
   - Agrega `figma_url`: Link de Figma (si aplica)
   - Click **Save**

Ejemplo:
- `download_url`: `https://drive.google.com/file/d/TU_ID/view?usp=sharing`
- `figma_url`: `https://www.figma.com/file/TU_ID/nombre`

---

## ✅ PASO 6: PROBAR EL SISTEMA (5 minutos)

1. Abre tu tienda en el navegador

2. Selecciona un producto y click en **Comprar**

3. Ingresa tu email real

4. Click en **Pagar con Culqi**

5. Usa esta tarjeta de prueba:
   - **Número:** `4111 1111 1111 1111`
   - **CVV:** `123`
   - **Vencimiento:** Cualquier fecha futura (ej: 12/26)
   - **Email:** tu email

6. Click en **Pagar**

7. Deberías ver:
   - ✅ Toast de éxito
   - ✅ Modal se cierra

8. Verifica la venta:
   - Ve a tu panel admin (agrega `/admin` a tu URL)
   - Click en "Ventas"
   - Deberías ver la transacción

9. Verifica en Supabase:
   - Ve a **Table Editor** → **sales**
   - Deberías ver tu venta registrada

---

## 🎉 ¡LISTO! Tu sistema de pagos está funcionando

### Lo que ya funciona:
✅ Pagos seguros con Culqi
✅ Registro automático de ventas
✅ Panel de administración con estadísticas
✅ Emails automáticos (si configuraste Resend)

### Siguiente paso: Producción
Cuando estés listo para ventas reales:
1. Obtén llaves de producción en panel.culqi.com
2. Reemplaza `pk_test_` y `sk_test_` por `pk_live_` y `sk_live_`

---

## 🆘 ¿Problemas?

### "Error: Llave secreta no configurada"
→ Verifica que agregaste `CULQI_SECRET_KEY` en las variables

### "Producto no encontrado"
→ Verifica que el producto existe en la tabla `products`

### Email no llega
→ Es normal si no configuraste RESEND_API_KEY. El pago funciona igual.

### Ver logs de errores:
- Supabase → **Edge Functions** → Click en una función → **Logs**
