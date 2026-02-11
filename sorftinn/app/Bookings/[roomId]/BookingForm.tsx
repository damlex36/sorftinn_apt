// app/Bookings/[roomId]/BookingForm.tsx
'use client';

import { useActionState } from 'react';
import { createBooking, type FormState } from './actions';
// ↑ removed: import { useFormStatus } from 'react-dom';

interface BookingFormProps {
  roomId: string;
  checkInStr: string;
  checkOutStr: string;
}

export default function BookingForm({
  roomId,
  checkInStr,
  checkOutStr,
}: BookingFormProps) {
  const initialState: FormState = { error: null };

  const [state, formAction, isPending] = useActionState(
    createBooking,
    initialState,
  );

  return (
    <form action={formAction} className="space-y-6">
      <input type="hidden" name="room" value={roomId} />
      <input type="hidden" name="check_in" value={checkInStr} />
      <input type="hidden" name="check_out" value={checkOutStr} />

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Full Name *
        </label>
        <input
          type="text"
          name="full_name"
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition"
          placeholder="Eniola Adebayo"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Email *
        </label>
        <input
          type="email"
          name="email"
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition"
          placeholder="eniola@example.com"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Phone *
        </label>
        <input
          type="tel"
          name="phone"
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition"
          placeholder="+2348012345678"
        />
      </div>

      {state?.error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
          {state.error}
        </div>
      )}

      <SubmitButton isPending={isPending} />
    </form>
  );
}

function SubmitButton({ isPending }: { isPending: boolean }) {
  return (
    <button
      type="submit"
      disabled={isPending}
      className={`
        w-full bg-amber-600 hover:bg-amber-700 
        text-white font-bold py-4 rounded-xl 
        transition-colors duration-200
        disabled:opacity-60 disabled:cursor-not-allowed
        flex items-center justify-center gap-3
      `}
    >
      {isPending ? (
        <>
          <span className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          Processing...
        </>
      ) : (
        'Confirm Booking'
      )}
    </button>
  );
}