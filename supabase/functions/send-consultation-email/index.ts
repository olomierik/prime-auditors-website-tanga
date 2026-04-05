import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { name, email, phone_number, company_name, message, to_email } = await req.json()

    // Create email content
    const emailContent = `
New Consultation Request - Prime Auditors

Client Information:
- Name: ${name}
- Email: ${email}
- Phone: ${phone_number}
- Company: ${company_name || 'Not provided'}

Message:
${message || 'No additional message provided'}

---
This request was submitted through the Prime Auditors website.
Please follow up with the client within 24 hours.
    `.trim()

    // Real email sending using SendGrid (configured via environment variables)
    const SENDGRID_API_KEY = Deno.env.get('SENDGRID_API_KEY')
    const SENDGRID_FROM = Deno.env.get('SENDGRID_FROM_EMAIL') || 'no-reply@primeauditors.co.tz'

    let emailSent = false

    if (SENDGRID_API_KEY && to_email) {
      const emailData = {
        personalizations: [
          {
            to: [{ email: to_email }],
            subject: 'Prime Auditors Consultation Request'
          }
        ],
        from: { email: SENDGRID_FROM, name: 'Prime Auditors' },
        content: [{ type: 'text/plain', value: emailContent }]
      }

      const res = await fetch('https://api.sendgrid.com/v3/mail/send', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${SENDGRID_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(emailData)
      })

      emailSent = (res.status === 202)
    } else {
      // Fallback: if no API key configured, log and fail gracefully
      console.error('SendGrid API key or to_email not configured in environment. Email will not be sent.')
    }

    if (emailSent) {
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: 'Consultation request received and email sent successfully' 
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200,
        },
      )
    } else {
      throw new Error('Failed to send email')
    }
  } catch (error) {
    console.error('Error in send-consultation-email function:', error)
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: 'Failed to process consultation request' 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      },
    )
  }
})
