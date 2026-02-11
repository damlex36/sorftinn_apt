// app/Bookings/[roomId]/actions.ts
'use server';

import { redirect } from 'next/navigation';

export type FormState = {
  error?: string | null;
};

export async function createBooking(
  prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://127.0.0.1:8000';

  // Extract form data
  const roomId    = formData.get('room')      as string | null;
  const checkIn   = formData.get('check_in')  as string | null;
  const checkOut  = formData.get('check_out') as string | null;
  const fullName  = formData.get('full_name') as string | null;
  const email     = formData.get('email')     as string | null;
  const phone     = formData.get('phone')     as string | null;

  // Basic validation
  if (!roomId || !checkIn || !checkOut || !fullName || !email || !phone) {
    return { error: 'Please fill in all required fields.' };
  }

  let success = false;
  let errorMessage: string | null = null;

  try {
    const response = await fetch(`${apiBase}/api/bookings/create/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        room:      Number(roomId),
        check_in:  checkIn,
        check_out: checkOut,
        full_name: fullName,
        email,
        phone,
      }),
    });

    if (!response.ok) {
      let message = 'Booking failed. Please try again.';

      try {
        const errorData = await response.json();

        message =
          errorData.detail ||
          errorData.non_field_errors?.[0] ||
          errorData.room?.[0] ||
          errorData.email?.[0] ||
          errorData.phone?.[0] ||
          errorData.check_in?.[0] ||
          errorData.check_out?.[0] ||
          (typeof errorData === 'object' && Object.values(errorData).flat()[0]) ||
          message;
      } catch {
        // JSON parsing failed → keep generic message
      }

      errorMessage = message;
    } else {
      success = true;
    }
  } catch (err) {
    console.error('[createBooking network error]', err);

    let message = 'Unable to connect to the server. Please try again later.';

    if (err instanceof Error) {
      if (err.message.includes('fetch') || err.message.includes('network')) {
        message = 'Network error — please check your internet connection.';
      } else if (err.message.includes('timeout')) {
        message = 'Request timed out. Please try again.';
      }
    }

    errorMessage = message;
  }

  // Handle result after try/catch
  if (success) {
    // This redirect is now safe — won't be caught by our try/catch
    redirect(`/Bookings/${roomId}/bookingSuccess`);
  }

  // If we reached here → there was an error
  return { error: errorMessage || 'An unexpected error occurred.' };
}