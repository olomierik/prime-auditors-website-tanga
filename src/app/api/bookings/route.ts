import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { createClient } from '@supabase/supabase-js';

const resend = new Resend(process.env.RESEND_API_KEY);
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, company, service, message } = body;

    // 1. Save to Supabase
    const { error: supabaseError } = await supabase
      .from('bookings')
      .insert([
        { name, email, phone, company, service, message }
      ]);

    if (supabaseError) {
      console.error('Supabase error:', supabaseError);
      return NextResponse.json({ error: 'Failed to save booking' }, { status: 500 });
    }

    // 2. Send email via Resend
    try {
      await resend.emails.send({
        from: 'Prime Auditors <notifications@primeauditors.co.tz>',
        to: ['info@primeauditors.co.tz'],
        subject: `New Booking Request from ${name}`,
        html: `
          <h1>New Booking Request</h1>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Company:</strong> ${company || 'N/A'}</p>
          <p><strong>Service:</strong> ${service || 'General'}</p>
          <p><strong>Message:</strong> ${message || 'No message provided'}</p>
        `,
      });

      // Send confirmation to user
      await resend.emails.send({
        from: 'Prime Auditors <info@primeauditors.co.tz>',
        to: [email],
        subject: 'Consultation Request Received - Prime Auditors',
        html: `
          <h1>Hello ${name},</h1>
          <p>Thank you for reaching out to Prime Auditors. We have received your request for a consultation regarding ${service || 'our services'}.</p>
          <p>Our team will review your information and get back to you shortly.</p>
          <p>Best regards,<br/>Prime Auditors Team</p>
        `,
      });
    } catch (emailError) {
      console.error('Email error:', emailError);
      // We don't necessarily want to fail the whole request if email fails but DB succeeded
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
