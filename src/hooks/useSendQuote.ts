import { useState } from 'react';
import { showToast } from '@/components/ui/Toast';

export interface QuoteFormState {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

export function useSendQuote() {
  const [isSending, setIsSending] = useState(false);

  const sendQuote = async (form: QuoteFormState) => {
    setIsSending(true);
    try {
      console.log('Sending quote:', form);
      const res = await fetch("/api/sendQuote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to send quote");
      
      showToast("Quote request sent! We will get back to you soon.", 'success');
      return true; // indicates success so the form can be cleared
    } catch (err: any) {
      showToast(err.message, 'error');
      return false;
    } finally {
      setIsSending(false);
    }
  };

  return { sendQuote, isSending };
}
