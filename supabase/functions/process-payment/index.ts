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

    // Enviar email directamente con Resend
    try {
      const resendApiKey = Deno.env.get('RESEND_API_KEY')
      
      if (resendApiKey) {
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
                    <p>${product.description || 'Producto digital'}</p>
                    <p><strong>Precio:</strong> S/ ${product.price}</p>
                    <p><strong>ID de compra:</strong> ${sale.id}</p>
                  </div>

                  ${product.download_url ? `
                    <a href="${product.download_url}" class="download-button">
                      📥 Descargar Producto
                    </a>
                  ` : ''}

                  ${product.figma_url ? `
                    <p><strong>🎨 Link de Figma:</strong> <a href="${product.figma_url}" style="color: #06b6d4;">${product.figma_url}</a></p>
                  ` : ''}

                  <p>Si tienes alguna pregunta, no dudes en contactarnos.</p>
                  
                  <div class="footer">
                    <p>Monterrial - Tu tienda de plantillas digitales</p>
                    <p>Este es un correo automático, por favor no respondas a este mensaje.</p>
                  </div>
                </div>
              </div>
            </body>
          </html>
        `

        console.log('📧 Enviando email a:', email)
        
        const emailResponse = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${resendApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: 'ventas@monterrial.com',
            to: [email],
            subject: `¡Tu compra de ${product.title} está lista! 🎉`,
            html: emailHtml,
          }),
        })

        const emailData = await emailResponse.json()
        console.log('📬 Respuesta email:', emailResponse.status, JSON.stringify(emailData))
        
        if (emailResponse.ok) {
          console.log('✅ Email enviado exitosamente. ID:', emailData.id)
        } else {
          console.error('❌ Error al enviar email:', emailData)
        }
      } else {
        console.log('⚠️ RESEND_API_KEY no configurada')
      }
    } catch (emailError) {
      console.error('💥 Error al enviar email (no bloquea venta):', emailError)
    }

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
