"use server"

import { supabase } from "@/lib/supabase"
import { auth } from "@clerk/nextjs/server"

/**
 * Create a new notification for a user
 */
export async function createNotificationAction(
    appId: string,
    userId: string,
    message: string,
    type: 'info' | 'success' | 'warning' | 'error' = 'info'
) {
    // In a real app, this would be called by the system or another user
    // For now, we allow the current user to trigger it (e.g. testing)
    const { userId: currentUserId } = await auth()
    if (!currentUserId) return { error: "Unauthorized" }

    const { data, error } = await supabase
        .from('notifications')
        .insert([{
            app_id: appId,
            user_id: userId,
            message,
            type,
            read: false
        }])
        .select()
        .single()

    if (error) {
        console.error('Notification error:', error)
        return { error: error.message }
    }

    return { success: true, data }
}

/**
 * Get notifications for the current user
 */
export async function getNotificationsAction(appId: string) {
    const { userId } = await auth()
    if (!userId) return { error: "Unauthorized" }

    const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .eq('app_id', appId)
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(50)

    if (error) {
        return { error: error.message }
    }

    return { success: true, data }
}

/**
 * Mark a notification as read
 */
export async function markNotificationReadAction(notificationId: string) {
    const { userId } = await auth()
    if (!userId) return { error: "Unauthorized" }

    const { error } = await supabase
        .from('notifications')
        .update({ read: true })
        .eq('id', notificationId)
        .eq('user_id', userId) // Security check

    if (error) {
        return { error: error.message }
    }

    return { success: true }
}

/**
 * Schedule a job (Placeholder)
 * In a real production app, this would interface with a job queue like BullMQ, 
 * or a service like Quirrel/Upstash QStash/Inngest.
 */
export async function scheduleJobAction(
    appId: string,
    schedule: string, // Cron expression
    flowId: string
) {
    const { userId } = await auth()
    if (!userId) return { error: "Unauthorized" }

    // Placeholder: Log the schedule request
    console.log(`[SCHEDULE] App: ${appId}, Schedule: ${schedule}, Flow: ${flowId}`)

    // In a real implementation, we would store this in a 'schedules' table
    // and set up the external trigger.

    return { success: true, message: "Schedule registered (simulated)" }
}
