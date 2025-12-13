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
      <html lang="es">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { 
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
              line-height: 1.6; 
              color: #1a1a1a;
              background-color: #f5f5f5;
            }
            .email-container { 
              max-width: 600px; 
              margin: 0 auto; 
              background-color: #ffffff;
            }
            .header { 
              background: linear-gradient(135deg, #0891b2 0%, #1e40af 100%);
              padding: 48px 40px;
              text-align: center;
            }
            .header h1 { 
              color: #ffffff; 
              font-size: 26px;
              font-weight: 600;
              letter-spacing: -0.5px;
              margin: 0;
            }
            .content { 
              padding: 40px;
            }
            .greeting {
              font-size: 15px;
              color: #4b5563;
              line-height: 1.8;
              margin-bottom: 32px;
            }
            .greeting p {
              margin: 0 0 12px 0;
            }
            .order-summary { 
              background-color: #fafafa;
              border: 1px solid #e5e7eb;
              border-radius: 6px;
              padding: 28px;
              margin: 32px 0;
            }
            .order-summary h2 {
              color: #1f2937;
              font-size: 18px;
              font-weight: 600;
              margin: 0 0 20px 0;
              padding-bottom: 16px;
              border-bottom: 2px solid #e5e7eb;
            }
            .order-item {
              display: flex;
              justify-content: space-between;
              padding: 12px 0;
              border-bottom: 1px solid #f3f4f6;
            }
            .order-item:last-child {
              border-bottom: none;
            }
            .order-label {
              color: #6b7280;
              font-size: 14px;
              font-weight: 500;
            }
            .order-value {
              color: #1f2937;
              font-weight: 600;
              font-size: 14px;
            }
            .download-section {
              background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
              border-left: 4px solid #1e40af;
              padding: 28px;
              margin: 32px 0;
              border-radius: 4px;
            }
            .download-section h3 {
              color: #1e40af;
              font-size: 16px;
              font-weight: 600;
              margin: 0 0 16px 0;
            }
            .download-section p {
              color: #475569;
              font-size: 14px;
              margin: 0 0 20px 0;
              line-height: 1.6;
            }
            .download-button {
              display: inline-block;
              background: linear-gradient(135deg, #0891b2 0%, #1e40af 100%);
              color: #ffffff;
              text-decoration: none;
              padding: 14px 32px;
              border-radius: 4px;
              font-weight: 600;
              font-size: 15px;
              text-align: center;
              transition: all 0.3s ease;
            }
            .download-link {
              display: block;
              color: #475569;
              font-size: 12px;
              word-break: break-all;
              background-color: #ffffff;
              padding: 12px;
              border-radius: 4px;
              margin-top: 16px;
              border: 1px solid #e5e7eb;
            }
            .important-note {
              background-color: #fef3c7;
              border-left: 4px solid #f59e0b;
              padding: 20px;
              margin: 32px 0;
              border-radius: 4px;
            }
            .important-note p {
              color: #78350f;
              font-size: 13px;
              margin: 0;
              line-height: 1.6;
            }
            .support {
              margin-top: 40px;
              padding-top: 28px;
              border-top: 1px solid #e5e7eb;
              text-align: center;
            }
            .support p {
              color: #6b7280;
              font-size: 13px;
              margin: 8px 0;
            }
            .footer { 
              background-color: #fafafa;
              padding: 32px 40px;
              text-align: center;
              border-top: 1px solid #e5e7eb;
            }
            .footer-brand {
              color: #1f2937;
              font-weight: 700;
              font-size: 18px;
              margin: 0 0 8px 0;
              letter-spacing: -0.3px;
            }
            .footer-text {
              color: #6b7280;
              font-size: 12px;
              line-height: 1.6;
              margin: 4px 0;
            }
          </style>
        </head>
        <body>
          <div class="email-container">
            <div class="header">
              <h1>Confirmación de Pedido</h1>
            </div>
            
            <div class="content">
              <div class="greeting">
                <p>Estimado cliente,</p>
                <p>Le confirmamos que su pago ha sido procesado correctamente. A continuación encontrará los detalles de su compra y el acceso a su producto digital.</p>
              </div>
              
              <div class="order-summary">
                <h2>Resumen del Pedido</h2>
                <div class="order-item">
                  <span class="order-label">Producto</span>
                  <span class="order-value">${product.title}</span>
                </div>
                <div class="order-item">
                  <span class="order-label">Descripción</span>
                  <span class="order-value">${product.description || 'Plantilla digital profesional'}</span>
                </div>
                <div class="order-item">
                  <span class="order-label">Total pagado</span>
                  <span class="order-value">S/ ${product.price.toFixed(2)}</span>
                </div>
                <div class="order-item">
                  <span class="order-label">ID de transacción</span>
                  <span class="order-value">${saleId.substring(0, 13).toUpperCase()}</span>
                </div>
              </div>

              ${product.download_url ? `
              <div class="download-section">
                <h3>Acceso a su Producto</h3>
                <p>Su producto digital está listo para descargar. Haga clic en el botón a continuación para acceder:</p>
                <a href="${product.download_url}" class="download-button">Descargar Producto</a>
                <div class="download-link">${product.download_url}</div>
              </div>
              ` : ''}

              <div class="important-note">
                <p><strong>Importante:</strong> Conserve este correo para futuras referencias. El enlace de descarga no tiene fecha de caducidad y podrá acceder a su producto en cualquier momento.</p>
              </div>

              <div class="support">
                <p><strong>¿Necesita asistencia?</strong></p>
                <p>Nuestro equipo de soporte está disponible para ayudarle. Responda a este correo o contacte con nosotros.</p>
              </div>
            </div>
            
            <div class="footer">
              <p class="footer-brand">MONTERRIAL</p>
              <p class="footer-text">Plantillas Digitales Profesionales</p>
              <p class="footer-text">Este es un correo automático generado por el sistema. Por favor, no responda directamente a este mensaje.</p>
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
        subject: `Confirmación de compra - ${product.title}`,
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
