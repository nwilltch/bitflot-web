"use server"

import { auth } from "@clerk/nextjs/server"

// Initialize Resend (placeholder until API key is added)
// import { Resend } from 'resend';
// const resend = new Resend(process.env.RESEND_API_KEY);

// Initialize Stripe (placeholder until API key is added)
// import Stripe from 'stripe';
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

/**
 * Send an email via Resend
 */
export async function sendEmailAction(
    to: string,
    subject: string,
    html: string
) {
    const { userId } = await auth()
    if (!userId) return { error: "Unauthorized" }

    if (!process.env.RESEND_API_KEY) {
        console.warn("Resend API key not configured")
        return { success: true, simulated: true }
    }

    try {
        // const data = await resend.emails.send({
        //     from: 'Bitflot App <onboarding@resend.dev>',
        //     to: [to],
        //     subject: subject,
        //     html: html,
        // });
        // return { success: true, data };

        return { success: true, simulated: true }
    } catch (error: any) {
        return { error: error.message }
    }
}

/**
 * Create a Stripe Payment Intent
 */
export async function createPaymentIntentAction(
    amount: number,
    currency: string = 'usd'
) {
    const { userId } = await auth()
    if (!userId) return { error: "Unauthorized" }

    if (!process.env.STRIPE_SECRET_KEY) {
        console.warn("Stripe Secret key not configured")
        return { success: true, simulated: true, clientSecret: 'simulated_secret' }
    }

    try {
        // const paymentIntent = await stripe.paymentIntents.create({
        //     amount: Math.round(amount * 100), // Convert to cents
        //     currency: currency,
        //     automatic_payment_methods: {
        //         enabled: true,
        //     },
        // });
        // return { success: true, clientSecret: paymentIntent.client_secret };

        return { success: true, simulated: true, clientSecret: 'simulated_secret' }
    } catch (error: any) {
        return { error: error.message }
    }
}
