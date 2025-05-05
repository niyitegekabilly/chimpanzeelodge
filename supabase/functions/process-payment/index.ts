import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';
import Stripe from 'https://esm.sh/stripe@14.14.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { paymentMethod, amount, bookingId, currency = 'USD' } = await req.json();

    // Initialize Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    );

    let paymentResult;

    switch (paymentMethod) {
      case 'card':
        const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') ?? '');
        const paymentIntent = await stripe.paymentIntents.create({
          amount: Math.round(amount * 100), // Convert to cents
          currency,
          payment_method_types: ['card'],
        });
        paymentResult = {
          clientSecret: paymentIntent.client_secret,
          status: 'pending',
        };
        break;

      case 'mobile_money':
        // Simulate mobile money payment
        paymentResult = {
          status: 'pending',
          transactionId: `MM${Date.now()}`,
          message: 'Please complete the payment on your mobile device',
        };
        break;

      case 'bank_deposit':
        // Generate bank deposit details
        paymentResult = {
          status: 'pending',
          bankDetails: {
            accountName: 'Chimpanzee Lodges Ltd',
            accountNumber: '1234567890',
            bankName: 'Example Bank',
            reference: `BK${Date.now()}`,
          },
        };
        break;

      default:
        throw new Error('Unsupported payment method');
    }

    // Create payment record
    const { data: payment, error: paymentError } = await supabaseClient
      .from('payments')
      .insert({
        booking_id: bookingId,
        amount,
        currency,
        payment_method: paymentMethod,
        status: paymentResult.status,
        transaction_id: paymentResult.transactionId || paymentResult.clientSecret,
      })
      .select()
      .single();

    if (paymentError) throw paymentError;

    return new Response(
      JSON.stringify({ 
        success: true, 
        payment,
        paymentDetails: paymentResult 
      }),
      { 
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );

  } catch (error) {
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message 
      }),
      { 
        status: 400,
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  }
});