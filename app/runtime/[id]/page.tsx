import { supabase } from "@/lib/supabase"
import { notFound, redirect } from "next/navigation"
import { AppLandingPage } from "@/components/runtime/app-landing"
import { auth } from "@clerk/nextjs/server"

async function getApp(id: string) {
    const { data: app, error } = await supabase
        .from('apps')
        .select('*')
        .eq('id', id)
        .single()

    if (error || !app) {
        return null
    }

    return app
}

async function checkSubscription(userId: string, appId: string) {
    // Check if user has subscribed to this app
    // For now, we'll return false (not subscribed)
    // In production, you'd check a subscriptions table
    return false
}

export default async function RuntimePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const app = await getApp(id)

    if (!app) {
        notFound()
    }

    // Check if user is authenticated
    const { userId } = await auth()

    // If user is authenticated, check subscription
    if (userId) {
        const isSubscribed = await checkSubscription(userId, id)

        if (isSubscribed) {
            // Redirect to app dashboard
            redirect(`/runtime/${id}/dashboard`)
        }
    }

    // Show landing page for non-subscribed users
    return <AppLandingPage app={app} />
}
