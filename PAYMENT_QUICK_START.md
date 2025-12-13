# 💳 Sistema de Pagos - Guía Rápida

## ✅ Lo que ya está implementado:

### Frontend:
- ✅ Componente de pago con Culqi integrado
- ✅ Validación de email
- ✅ Interfaz de pago moderna
- ✅ Manejo de errores y mensajes

### Backend:
- ✅ Edge Function para procesar pagos (`process-payment`)
- ✅ Edge Function para enviar emails (`send-product-email`)
- ✅ Tabla de ventas con RLS
- ✅ Registro automático de ventas
- ✅ Sistema de seguridad completo

### Admin:
- ✅ Panel de ventas con estadísticas
- ✅ Historial de transacciones
- ✅ Métricas en tiempo real

## 🚀 Pasos para Activar el Sistema:

### 1. Crear la tabla de ventas
```bash
# En Supabase SQL Editor, ejecuta:
supabase/migrations/create_sales_table.sql
```

### 2. Desplegar las Edge Functions

**Opción fácil - Usando CLI:**
```bash
# Instala Supabase CLI
npm install -g supabase

# Login
supabase login

# Vincula tu proyecto (reemplaza con tu project-ref)
supabase link --project-ref iqrlhpktqilxahesoxfp

# Despliega las funciones
supabase functions deploy process-payment
supabase functions deploy send-product-email
```

**Opción manual - Dashboard:**
1. Ve a tu proyecto en supabase.com/dashboard
2. Edge Functions → Create Function
3. Copia el código de cada función

### 3. Configurar Variables en Supabase

En **Project Settings → Edge Functions → Secrets**:

```bash
CULQI_SECRET_KEY=sk_test_ebTQE6Q10dAlE5KP
```

### 4. Configurar Email (Opcional)

Para enviar emails automáticos:

**Opción A - Resend (Gratis 3,000/mes):**
```bash
# 1. Regístrate en resend.com
# 2. Agrega en Supabase Secrets:
RESEND_API_KEY=re_xxx
```

**Opción B - Sin servicio de email:**
El sistema funciona sin esto, solo no enviará emails automáticamente.

### 5. Agregar Links de Descarga a Productos

```sql
-- Actualiza tus productos con links
UPDATE products 
SET 
  download_url = 'https://drive.google.com/tu-link',
  figma_url = 'https://figma.com/tu-link'
WHERE id = 'id-del-producto';
```

## 🧪 Probar el Sistema

### Tarjetas de Prueba Culqi:

**Visa - Pago Exitoso:**
```
Número: 4111 1111 1111 1111
CVV: 123
Vencimiento: Cualquier fecha futura
```

**Visa - Pago Rechazado:**
```
Número: 4000 0000 0000 0002
```

### Flujo de Prueba:
1. Abre tu tienda
2. Selecciona un producto
3. Click "Comprar"
4. Ingresa tu email
5. Usa la tarjeta de prueba
6. Verifica:
   - ✅ Toast de éxito
   - ✅ Registro en tabla `sales` (Supabase)
   - ✅ Email recibido (si configuraste)

## 🔍 Verificar que Todo Funciona

### Ver ventas en Supabase:
```sql
SELECT * FROM sales ORDER BY created_at DESC;
```

### Ver estadísticas:
- Ve al panel admin de tu tienda
- Click en "Ventas"
- Deberías ver las estadísticas y transacciones

## ⚠️ Importante:

### ✅ Seguridad:
- La llave secreta **SOLO** está en el servidor (Edge Functions)
- Nunca expongas `sk_test_` o `sk_live_` en el frontend
- La llave pública `pk_test_` sí puede estar en el frontend

### 🔑 Variables de Entorno:

**.env (Frontend):**
```env
VITE_CULQI_PUBLIC_KEY=pk_test_pPcdTJE3bPhKO0FC
VITE_SUPABASE_URL=https://iqrlhpktqilxahesoxfp.supabase.co
VITE_SUPABASE_ANON_KEY=tu_anon_key
```

**Supabase Secrets (Backend):**
```env
CULQI_SECRET_KEY=sk_test_ebTQE6Q10dAlE5KP
RESEND_API_KEY=re_xxx (opcional)
```

## 🐛 Solución de Problemas

### Error: "Function not found"
- Asegúrate de haber desplegado las Edge Functions
- Verifica en el dashboard que existen

### Error: "Llave secreta no configurada"
- Ve a Project Settings → Edge Functions → Secrets
- Agrega `CULQI_SECRET_KEY`

### Email no llega:
- Si no configuraste RESEND_API_KEY, no se enviarán emails
- El pago seguirá funcionando, solo sin email

### Pago se procesa pero no se registra:
- Verifica que la tabla `sales` existe
- Revisa los logs de la Edge Function en Supabase

## 🚀 Ir a Producción

### 1. Obtén llaves de producción en Culqi:
- Panel: panel.culqi.com
- Llave pública: `pk_live_...`
- Llave secreta: `sk_live_...`

### 2. Actualiza las variables:
```env
# Frontend
VITE_CULQI_PUBLIC_KEY=pk_live_TU_LLAVE

# Supabase
CULQI_SECRET_KEY=sk_live_TU_LLAVE
```

### 3. Configura dominio de email:
- Verifica tu dominio en Resend
- Cambia el email `from` en la función

## 📊 Panel de Administración

Accede a `/admin` con tu cuenta de administrador para:
- Ver estadísticas de ventas
- Historial de transacciones
- Ingresos totales
- Ventas por periodo

## 📞 Soporte

Si tienes problemas:
1. Revisa los logs en Supabase (Edge Functions → Logs)
2. Verifica las variables de entorno
3. Prueba con tarjetas de prueba de Culqi
4. Revisa la consola del navegador

## 📚 Recursos

- [Documentación Culqi](https://docs.culqi.com/)
- [Supabase Docs](https://supabase.com/docs)
- [Resend Docs](https://resend.com/docs)

---

**¡Todo listo! 🎉** Ahora solo necesitas desplegar las funciones y probar.
