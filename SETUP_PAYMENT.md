# 🚀 Guía de Configuración del Sistema de Pagos

## 📋 Pasos para Implementar los Pagos

### 1️⃣ Configurar la Base de Datos

Ejecuta el script SQL en tu base de datos de Supabase:

1. Ve a tu proyecto en [Supabase Dashboard](https://supabase.com/dashboard)
2. Ve a **SQL Editor**
3. Copia y pega el contenido de `supabase/migrations/create_sales_table.sql`
4. Ejecuta el script

Esto creará:
- ✅ Tabla `sales` para registrar ventas
- ✅ Índices para optimizar consultas
- ✅ Políticas de seguridad (RLS)
- ✅ Triggers automáticos

### 2️⃣ Desplegar las Edge Functions

Las Edge Functions procesan pagos de forma segura en el servidor.

#### Opción A: Usando Supabase CLI (Recomendado)

```bash
# Instalar Supabase CLI
npm install -g supabase

# Login en Supabase
supabase login

# Link tu proyecto
supabase link --project-ref TU_PROJECT_REF

# Desplegar las funciones
supabase functions deploy process-payment
supabase functions deploy send-product-email
```

#### Opción B: Manual en el Dashboard

1. Ve a **Edge Functions** en tu dashboard de Supabase
2. Crea una función llamada `process-payment`
3. Copia el código de `supabase/functions/process-payment/index.ts`
4. Repite para `send-product-email`

### 3️⃣ Configurar Variables de Entorno en Supabase

En tu proyecto de Supabase, configura las siguientes variables:

1. Ve a **Project Settings** → **Edge Functions** → **Secrets**
2. Agrega:

```bash
CULQI_SECRET_KEY=sk_test_ebTQE6Q10dAlE5KP
RESEND_API_KEY=tu_api_key_de_resend  # Opcional para emails
```

### 4️⃣ Configurar el Envío de Emails (Opcional)

#### Opción 1: Resend (Recomendado)

1. Crea cuenta en [Resend](https://resend.com)
2. Verifica tu dominio
3. Obtén tu API Key
4. Agrégala en las variables de Supabase

#### Opción 2: SendGrid

Modifica `supabase/functions/send-product-email/index.ts` para usar SendGrid:

```typescript
const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${sendGridApiKey}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    personalizations: [{
      to: [{ email: email }],
      subject: `¡Tu compra de ${product.title} está lista!`,
    }],
    from: { email: 'tu-email@tudominio.com' },
    content: [{
      type: 'text/html',
      value: emailHtml,
    }],
  }),
})
```

### 5️⃣ Agregar Links de Descarga a los Productos

Actualiza tus productos en la base de datos para incluir:

```sql
ALTER TABLE products 
ADD COLUMN IF NOT EXISTS download_url TEXT,
ADD COLUMN IF NOT EXISTS figma_url TEXT;

-- Ejemplo de actualización
UPDATE products 
SET 
  download_url = 'https://drive.google.com/file/d/...',
  figma_url = 'https://figma.com/file/...'
WHERE id = 'product-id';
```

### 6️⃣ Actualizar el archivo .env local

Asegúrate de tener estas variables:

```env
# Supabase
VITE_SUPABASE_URL=https://iqrlhpktqilxahesoxfp.supabase.co
VITE_SUPABASE_ANON_KEY=tu_anon_key

# Culqi (Solo llave pública en el frontend)
VITE_CULQI_PUBLIC_KEY=pk_test_pPcdTJE3bPhKO0FC

# Cloudinary
VITE_CLOUDINARY_CLOUD_NAME=dxhcv6buy
VITE_CLOUDINARY_UPLOAD_PRESET=productos
```

## 🧪 Probar el Sistema de Pagos

### Datos de Prueba de Culqi

Para ambiente de pruebas, usa estas tarjetas:

**Visa - Pago exitoso:**
- Número: `4111 1111 1111 1111`
- CVV: `123`
- Fecha: Cualquier fecha futura
- Email: `test@test.com`

**Visa - Pago rechazado:**
- Número: `4000 0000 0000 0002`

**Mastercard - Pago exitoso:**
- Número: `5111 1111 1111 1118`

### Flujo de Prueba

1. ✅ Selecciona un producto en tu tienda
2. ✅ Click en "Comprar"
3. ✅ Ingresa tu email
4. ✅ Click en "Pagar con Culqi"
5. ✅ Usa una tarjeta de prueba
6. ✅ Verifica el email recibido
7. ✅ Revisa la tabla `sales` en Supabase

## 🔒 Seguridad

### ✅ Implementado:

- Llave secreta solo en el servidor (Edge Functions)
- RLS (Row Level Security) en la tabla de ventas
- Validación de pagos en el backend
- CORS configurado correctamente

### 🚫 NUNCA Hagas Esto:

- Exponer la llave secreta (`sk_`) en el frontend
- Procesar pagos directamente desde el cliente
- Guardar información sensible de tarjetas

## 📊 Monitorear Ventas

### Ver todas las ventas:

```sql
SELECT 
  s.id,
  s.buyer_email,
  s.amount,
  s.payment_status,
  p.title as product_name,
  s.created_at
FROM sales s
JOIN products p ON s.product_id = p.id
ORDER BY s.created_at DESC;
```

### Ventas por producto:

```sql
SELECT 
  p.title,
  COUNT(s.id) as total_sales,
  SUM(s.amount) as revenue
FROM products p
LEFT JOIN sales s ON p.id = s.product_id
GROUP BY p.id, p.title
ORDER BY revenue DESC;
```

## 🔧 Troubleshooting

### Error: "Llave secreta de Culqi no configurada"
- Verifica que `CULQI_SECRET_KEY` esté en las variables de Supabase

### Error: "Producto no encontrado"
- Verifica que el `product_id` exista en la tabla `products`

### Email no se envía:
- Verifica que `RESEND_API_KEY` esté configurada
- Revisa los logs en Supabase Functions

### Pago rechazado:
- Verifica que uses tarjetas de prueba válidas
- Revisa los logs de Culqi en su dashboard

## 🚀 Pasar a Producción

1. **Obtén llaves de producción en Culqi:**
   - Llave pública: `pk_live_...`
   - Llave secreta: `sk_live_...`

2. **Actualiza las variables de entorno:**
   ```env
   VITE_CULQI_PUBLIC_KEY=pk_live_TU_LLAVE_PUBLICA
   ```
   
3. **En Supabase:**
   ```bash
   CULQI_SECRET_KEY=sk_live_TU_LLAVE_SECRETA
   ```

4. **Configura un dominio para emails:**
   - Verifica tu dominio en Resend
   - Cambia el email `from` en la función de email

5. **Prueba exhaustivamente antes de lanzar**

## 📚 Recursos Adicionales

- [Documentación Culqi](https://docs.culqi.com/)
- [Supabase Edge Functions](https://supabase.com/docs/guides/functions)
- [Resend Docs](https://resend.com/docs)

## 💡 Próximas Mejoras

- [ ] Sistema de cupones de descuento
- [ ] Webhooks de Culqi para confirmaciones
- [ ] Panel de administración para ver ventas
- [ ] Reportes y estadísticas de ventas
- [ ] Sistema de reembolsos
- [ ] Integración con más pasarelas de pago
