"use server"

import { auth } from "@clerk/nextjs/server"
import { supabase } from "@/lib/supabase"

/**
 * Send SMS via Twilio (Placeholder)
 */
export async function sendSmsAction(
    to: string,
    message: string
) {
    const { userId } = await auth()
    if (!userId) return { error: "Unauthorized" }

    // Placeholder for Twilio integration
    // const client = require('twilio')(accountSid, authToken);
    // await client.messages.create({ body: message, from: '+12345678901', to });

    console.log(`[SMS] To: ${to}, Message: ${message}`)

    return { success: true, simulated: true }
}

/**
 * Make generic HTTP Request
 */
export async function httpRequestAction(
    url: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
    headers: Record<string, string> = {},
    body?: any
) {
    const { userId } = await auth()
    if (!userId) return { error: "Unauthorized" }

    try {
        const response = await fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json',
                ...headers
            },
            body: body ? JSON.stringify(body) : undefined
        })

        const data = await response.json().catch(() => ({}))

        return {
            success: response.ok,
            status: response.status,
            data
        }
    } catch (error: any) {
        return { error: error.message }
    }
}

/**
 * Get signed upload URL for file storage
 */
export async function getUploadUrlAction(
    bucket: string,
    path: string
) {
    const { userId } = await auth()
    if (!userId) return { error: "Unauthorized" }

    const { data, error } = await supabase
        .storage
        .from(bucket)
        .createSignedUrl(path, 60) // 60 seconds expiry

    if (error) return { error: error.message }

    return { success: true, url: data.signedUrl }
}

/**
 * Send Push Notification (Placeholder)
 */
export async function sendPushNotificationAction(
    userId: string,
    title: string,
    body: string
) {
    const { userId: currentUserId } = await auth()
    if (!currentUserId) return { error: "Unauthorized" }

    // Placeholder for FCM / Expo Push
    console.log(`[PUSH] User: ${userId}, Title: ${title}, Body: ${body}`)

    return { success: true, simulated: true }
}
