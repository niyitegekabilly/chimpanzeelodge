import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { SmtpClient } from 'https://deno.land/x/denomailer@1.6.0/mod.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { to, subject, template, data } = await req.json();

    // Create SMTP client
    const client = new SmtpClient();

    // Configure SMTP client
    await client.connectTLS({
      hostname: Deno.env.get('SMTP_HOSTNAME') || '',
      port: Number(Deno.env.get('SMTP_PORT')) || 587,
      username: Deno.env.get('SMTP_USERNAME') || '',
      password: Deno.env.get('SMTP_PASSWORD') || '',
    });

    // Get email template
    const emailTemplate = await getEmailTemplate(template, data);

    // Send email
    await client.send({
      from: Deno.env.get('SMTP_FROM') || 'Chimpanzee Lodge <noreply@chimpanzeelodge.com>',
      to: to,
      subject: subject,
      content: emailTemplate,
      html: emailTemplate,
    });

    await client.close();

    return new Response(
      JSON.stringify({ message: 'Email sent successfully' }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    );
  }
});

async function getEmailTemplate(template: string, data: any): Promise<string> {
  switch (template) {
    case 'booking-confirmation':
      return `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2F855A;">Booking Confirmation</h2>
          <p>Dear ${data.guestName},</p>
          <p>Thank you for choosing to stay with us at ${data.hotelName}. Your booking has been confirmed.</p>
          
          <div style="background-color: #F7FAFC; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #2D3748;">Booking Details</h3>
            <p><strong>Booking ID:</strong> ${data.bookingId}</p>
            <p><strong>Check-in:</strong> ${data.checkIn}</p>
            <p><strong>Check-out:</strong> ${data.checkOut}</p>
            <p><strong>Room:</strong> ${data.roomName}</p>
            <p><strong>Board Type:</strong> ${data.boardType}</p>
            <p><strong>Total Price:</strong> $${data.totalPrice}</p>
          </div>

          <div style="background-color: #F7FAFC; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #2D3748;">Hotel Information</h3>
            <p><strong>Address:</strong> ${data.hotelAddress}</p>
            <p><strong>Phone:</strong> ${data.hotelPhone}</p>
            <p><strong>Email:</strong> ${data.hotelEmail}</p>
          </div>

          <p>If you have any questions or special requests, please don't hesitate to contact us.</p>
          <p>We look forward to welcoming you!</p>
          
          <p style="margin-top: 30px;">Best regards,<br>${data.hotelName} Team</p>
        </div>
      `;

    case 'booking-cancellation':
      return `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #E53E3E;">Booking Cancellation</h2>
          <p>Dear ${data.guestName},</p>
          <p>This email confirms that your booking at ${data.hotelName} has been cancelled.</p>
          
          <div style="background-color: #F7FAFC; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #2D3748;">Cancelled Booking Details</h3>
            <p><strong>Booking ID:</strong> ${data.bookingId}</p>
            <p><strong>Check-in:</strong> ${data.checkIn}</p>
            <p><strong>Check-out:</strong> ${data.checkOut}</p>
            <p><strong>Room:</strong> ${data.roomName}</p>
          </div>

          <p>If you would like to make a new booking or have any questions, please contact us:</p>
          <p><strong>Phone:</strong> ${data.hotelPhone}</p>
          <p><strong>Email:</strong> ${data.hotelEmail}</p>
          
          <p style="margin-top: 30px;">Best regards,<br>${data.hotelName} Team</p>
        </div>
      `;

    case 'admin-notification':
      return `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2F855A;">Booking ${data.status === 'confirmed' ? 'Confirmation' : 'Cancellation'} Notification</h2>
          
          <div style="background-color: #F7FAFC; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #2D3748;">Booking Details</h3>
            <p><strong>Booking ID:</strong> ${data.bookingId}</p>
            <p><strong>Guest Name:</strong> ${data.guestName}</p>
            <p><strong>Guest Email:</strong> ${data.guestEmail}</p>
            <p><strong>Check-in:</strong> ${data.checkIn}</p>
            <p><strong>Check-out:</strong> ${data.checkOut}</p>
            <p><strong>Room:</strong> ${data.roomName}</p>
            <p><strong>Board Type:</strong> ${data.boardType}</p>
            <p><strong>Total Price:</strong> $${data.totalPrice}</p>
            <p><strong>Status:</strong> ${data.status}</p>
          </div>

          <p>This is an automated notification. Please log in to the admin dashboard for more details.</p>
        </div>
      `;

    default:
      throw new Error('Invalid email template');
  }
} 