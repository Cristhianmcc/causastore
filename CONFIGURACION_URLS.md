# Configuración de URLs de Productos

## Cambios Realizados

Se han realizado las siguientes mejoras al sistema de correos:

1. **Diseño profesional del correo**: El correo ahora tiene un diseño moderno y profesional sin emojis
2. **Inclusión de product_url**: Ahora cada producto puede tener una URL que se enviará por correo al comprador
3. **Formato limpio**: Sin elementos que parezcan generados por IA, con colores profesionales

## Estructura del Correo

El correo ahora incluye:
- Header con gradiente azul profesional
- Saludo formal sin emojis
- Detalles del producto en una caja clara
- Botón prominente para acceder al producto (si tiene product_url)
- El enlace también se muestra como texto copiable
- Sección para Figma (si aplica)
- Nota importante sobre guardar el correo
- Footer profesional

## Cómo Agregar URLs a tus Productos

### Paso 1: Ejecutar la migración en Supabase

1. Ve a tu proyecto en Supabase
2. Ve a la sección "SQL Editor"
3. Ejecuta el contenido del archivo: `supabase/migrations/add_product_url.sql`

Esto agregará las columnas:
- `product_url`: URL principal del producto (Drive, Dropbox, etc.)
- `download_url`: URL de descarga directa (opcional)
- `figma_url`: URL de Figma (opcional)

### Paso 2: Actualizar tus productos

Ve al panel de administración o actualiza directamente en Supabase:

```sql
-- Ejemplo: Actualizar un producto con su URL
UPDATE products 
SET product_url = 'https://drive.google.com/file/d/TU_ID_DE_ARCHIVO/view?usp=sharing'
WHERE id = 'ID_DEL_PRODUCTO';

-- Ejemplo con Figma:
UPDATE products 
SET 
  product_url = 'https://drive.google.com/file/d/TU_ID_DE_ARCHIVO/view?usp=sharing',
  figma_url = 'https://www.figma.com/file/TU_ID_FIGMA/nombre'
WHERE id = 'ID_DEL_PRODUCTO';
```

### Paso 3: Tipos de URLs recomendadas

#### Google Drive:
1. Sube tu archivo a Google Drive
2. Clic derecho > Obtener enlace
3. Cambia a "Cualquier persona con el enlace"
4. Copia el enlace

#### Dropbox:
1. Sube tu archivo a Dropbox
2. Clic en "Compartir"
3. Crea un enlace
4. Copia el enlace

#### Figma:
1. Abre tu archivo en Figma
2. Clic en "Share" (arriba derecha)
3. Cambia a "Anyone with the link can view"
4. Copia el enlace

## Ejemplo de Actualización Masiva

Si quieres actualizar varios productos a la vez:

```sql
-- Actualizar producto 1
UPDATE products SET product_url = 'URL_PRODUCTO_1' WHERE id = 'lp-001';

-- Actualizar producto 2
UPDATE products SET product_url = 'URL_PRODUCTO_2' WHERE id = 'lp-002';

-- Y así sucesivamente...
```

## Verificar que Funciona

1. Ve a tu tienda
2. Realiza una compra de prueba
3. Revisa el correo que llega
4. Verifica que:
   - El diseño se ve profesional
   - El botón "Acceder al Producto" está visible
   - El enlace funciona correctamente
   - No hay emojis
   - Los colores son profesionales

## Notas Importantes

- Si un producto NO tiene `product_url`, esa sección no aparecerá en el correo
- Puedes tener solo `product_url`, solo `figma_url`, o ambos
- Los enlaces no caducan, el comprador puede acceder cuando quiera
- El correo muestra los primeros 8 caracteres del ID de compra para referencia

## Seguridad

- Los enlaces se envían SOLO después de una compra exitosa
- NO se muestran en la página del producto antes de comprar
- Cada compra queda registrada en la tabla `sales` con todos los detalles
