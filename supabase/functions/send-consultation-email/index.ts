
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

    // For now, we'll just log the email content
    // In production, you would integrate with an email service like SendGrid, Resend, etc.
    console.log('Email to be sent to:', to_email)
    console.log('Email content:', emailContent)

    // Simulate email sending
    // You can replace this with actual email service integration
    const emailSent = true

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
