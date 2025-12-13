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

    console.log('Enviando email a:', email)
    console.log('Producto:', product.title)
    
    const response = await fetch('https://api.resend.com/emails', {
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
    
    console.log('Respuesta de Resend:', response.status)

    const data = await response.json()
    
    console.log('Datos de respuesta:', JSON.stringify(data))

    if (!response.ok) {
      console.error('Error al enviar email:', data)
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
