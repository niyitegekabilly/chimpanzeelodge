import { useState } from 'react';
import { supabase } from '../lib/supabase';

interface PaymentOptions {
  amount: number;
  bookingId: string;
  paymentMethod: 'card' | 'mobile_money' | 'bank_deposit';
  currency?: string;
}

export const usePayment = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const processPayment = async ({ amount, bookingId, paymentMethod, currency = 'USD' }: PaymentOptions) => {
    setLoading(true);
    setError(null);

    try {
      const { data: functionData, error: functionError } = await supabase.functions.invoke(
        'process-payment',
        {
          body: JSON.stringify({
            amount,
            bookingId,
            paymentMethod,
            currency,
          }),
        }
      );

      if (functionError) throw functionError;

      return functionData;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    processPayment,
    loading,
    error,
  };
};