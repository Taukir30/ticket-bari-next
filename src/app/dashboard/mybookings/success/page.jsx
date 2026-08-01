import { stripe } from '@/lib/stripe';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default async function Success({ searchParams }) {
  const { session_id } = await searchParams;

  if (!session_id) {
    throw new Error('Please provide a valid session_id (`cs_test_...`)');
  }

  // Retrieve Checkout Session from Stripe
  const checkoutSession = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ['line_items', 'payment_intent'],
  });

  const {
    status,
    metadata,
    amount_total,
    currency,
    payment_intent,
    customer_details: { email: customerEmail, name: customerName },
  } = checkoutSession;

  console.log(checkoutSession)

  if (status === 'open') {
    return redirect('/');
  }

  if (status === 'complete') {
    // Sync payment details with your Express / Node Backend
    try {
      await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/payment`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          ...metadata,
          session_id,
          transaction_id: payment_intent.id
        }),
      });
    } catch (error) {
      console.error('Failed to sync payment with backend:', error);
    }

    return (
      <div className="min-h-[85vh] bg-slate-50 flex items-center justify-center px-4 py-12 font-sans">
        {/* SUCCESS CARD */}
        <div className="max-w-lg w-full bg-white rounded-3xl p-8 border border-slate-200/80 shadow-xl relative overflow-hidden">
          
          {/* <!-- Top Emerald Glow Decoration --> */}
          <div className="absolute top-0 inset-x-0 h-2 bg-linear-to-r from-[#00a877] via-emerald-500 to-[#0a3629]" />

          {/* SUCCESS ANIMATED ICON */}
          <div className="mx-auto w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-6 text-[#00a877]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2.5"
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
            </svg>
          </div>

          {/* <!-- HEADER --> */}
          <div className="text-center space-y-2 mb-8">
            <span className="text-xs font-black uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200/60">
              Payment Successful
            </span>
            <h1 className="text-3xl font-black text-slate-800 tracking-tight pt-1">
              Thank You for Your Booking!
            </h1>
            <p className="text-xs font-semibold text-slate-500 max-w-sm mx-auto leading-relaxed">
              We’ve sent a confirmation email to{' '}
              <span className="text-slate-800 font-bold">{customerEmail}</span> with your e-ticket details.
            </p>
          </div>

          {/* <!-- TICKET SUMMARY BREAKDOWN --> */}
          <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200/60 space-y-3 mb-8 text-xs font-semibold">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 border-b border-slate-200 pb-2">
              Booking Overview
            </p>

            {metadata?.ticket_title && (
              <div className="flex justify-between items-center text-slate-700">
                <span className="text-slate-500">Ticket</span>
                <span className="font-bold text-slate-800">{metadata.ticket_title}</span>
              </div>
            )}

            {metadata?.from_location && metadata?.to_location && (
              <div className="flex justify-between items-center text-slate-700">
                <span className="text-slate-500">Route</span>
                <span className="font-bold text-slate-800">
                  {metadata.from_location} → {metadata.to_location}
                </span>
              </div>
            )}

            <div className="flex justify-between items-center text-slate-700">
              <span className="text-slate-500">Transaction ID</span>
              <span className="font-mono text-[11px] text-slate-600 bg-white px-2 py-0.5 rounded border border-slate-200">
                {payment_intent.id}
              </span>
            </div>

            <div className="flex justify-between items-center pt-2 border-t border-slate-200 text-sm">
              <span className="font-bold text-slate-600">Total Paid</span>
              <span className="font-black text-slate-900 text-base">
                ${(amount_total / 100).toFixed(2)} {currency?.toUpperCase()}
              </span>
            </div>
          </div>

          {/* <!-- ACTION BUTTONS --> */}
          <div className="space-y-3">
            <Link
              href="/dashboard/mybookings"
              className="w-full bg-linear-to-r from-[#00a877] to-[#0a3629] text-white font-bold text-sm py-3.5 rounded-full flex items-center justify-center gap-2 shadow-md hover:opacity-90 active:scale-[0.98] transition-all"
            >
              View My Bookings
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2.5"
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </Link>

            <Link
              href="/"
              className="w-full bg-slate-100 text-slate-700 font-bold text-sm py-3.5 rounded-full flex items-center justify-center gap-2 hover:bg-slate-200 transition-all"
            >
              Return to Home
            </Link>
          </div>

          {/* <!-- SUPPORT FOOTER --> */}
          <div className="mt-8 pt-4 border-t border-slate-100 text-center">
            <p className="text-[11px] text-slate-400 font-medium">
              Need assistance? Contact our support at{' '}
              <a href="mailto:support@ticketbari.com" className="text-emerald-600 font-bold hover:underline">
                support@ticketbari.com
              </a>
            </p>
          </div>

        </div>
      </div>
    );
  }
}