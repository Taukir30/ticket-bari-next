import { NextResponse } from 'next/server'
import { headers } from 'next/headers'

import { stripe } from '../../../lib/stripe'
import { auth } from '@/lib/auth'
import { Currency } from 'lucide-react'

export async function POST(request) {
    try {
        const headersList = await headers()
        const origin = headersList.get('origin')

        const formData = await request.formData();

        const userSession = await auth.api.getSession({
            headers: await headers() // you need to pass the headers object.
        });

        const user = userSession?.user;

        const price = formData.get('price')
        const ticket_title = formData.get('ticket_title')
        const ticket_id = formData.get('ticket_id')
        const booking_id = formData.get('booking_id')
        const booking_quantity = formData.get('booking_quantity')
        const user_id = user.id;
        const user_email = user.email;


        // Create Checkout Sessions from body params.
        const session = await stripe.checkout.sessions.create({
            customer_email: user.email,
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: ticket_title
                        },
                        unit_amount: Number(price) * 100
                    },
                    quantity: 1,
                },
            ],
            metadata: {
                user_id,
                user_email,
                ticket_id,
                booking_id,
                ticket_title,
                booking_quantity,
                price
            },
            mode: 'payment',
            success_url: `${origin}/dashboard/user/mybookings/success?session_id={CHECKOUT_SESSION_ID}`,
        });
        return NextResponse.redirect(session.url, 303)
    } catch (err) {
        return NextResponse.json(
            { error: err.message },
            { status: err.statusCode || 500 }
        )
    }
}