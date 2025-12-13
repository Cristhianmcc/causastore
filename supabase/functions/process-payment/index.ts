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
                      <span class="order-value">${sale.id.substring(0, 13).toUpperCase()}</span>
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
            subject: `Confirmación de compra - ${product.title}`,
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
