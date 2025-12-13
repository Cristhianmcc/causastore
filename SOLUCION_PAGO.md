# 🔧 Solución: Producto no encontrado

## Problema
El error "Producto no encontrado" ocurre porque estás usando productos mock (con IDs como 'tp-001') pero la Edge Function busca productos en la base de datos de Supabase.

## Solución Rápida

### Opción 1: Subir tu producto a Supabase (Recomendado)

1. Ve al panel admin de tu tienda: `http://localhost:3001/admin`
2. Inicia sesión con tu cuenta de admin
3. Ve a la sección "Productos"
4. Agrega tu producto "Academia Pro - Plataforma Educativa" con:
   - Título, descripción, precio (S/ 49.99)
   - Categoría, imágenes
   - **Importante:** Agrega el `download_url` con el link de descarga

Una vez que el producto esté en Supabase, el pago funcionará correctamente.

### Opción 2: Pasar datos del producto en la petición

Si quieres que funcione con productos mock, puedo modificar el código para que envíe todos los datos del producto en la petición de pago (no solo el ID).

## ¿Qué prefieres?

1. **Subir el producto a Supabase** (más profesional y correcto)
2. **Modificar el código para productos mock** (más rápido para pruebas)

Dime cuál prefieres y te ayudo a implementarlo.
