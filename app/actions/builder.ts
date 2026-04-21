"use server"

import { supabase } from "@/lib/supabase"
import { auth } from "@clerk/nextjs/server"
import { getCreatorSubscription, canPublishApp } from "./subscriptions"

export async function saveAppConfig(name: string, config: any) {
    const { userId } = await auth()

    if (!userId) {
        return { error: "Authentication required" }
    }

    // 1. Check Creator subscription and app limits
    const publishCheck = await canPublishApp(userId)

    if (!publishCheck.canPublish) {
        return {
            error: publishCheck.message,
            requiresUpgrade: true,
            currentCount: publishCheck.currentCount,
            maxApps: publishCheck.maxApps
        }
    }

    // 2. Get subscription to validate Premium Nodes
    const subscription = await getCreatorSubscription(userId)

    // 3. Validate Premium Nodes in config
    const premiumNodeTypes = ['openai', 'custom-code', 'stripe-payment', 'paywall']
    const hasPremiumNodes = config.flows?.some((flow: any) =>
        flow.nodes?.some((node: any) =>
            premiumNodeTypes.includes(node.type)
        )
    )

    if (hasPremiumNodes && !subscription.features?.premium_nodes) {
        return {
            error: "Premium Nodes require PRO plan. Please upgrade to publish apps with OpenAI, Custom Code, or Payment nodes.",
            requiresUpgrade: true
        }
    }

    // 4. Save app to database
    const { data, error } = await supabase
        .from("apps")
        .insert([{
            name,
            config,
            created_by: userId,
            published: true
        }])
        .select()
        .single()

    if (error) {
        return { error: error.message }
    }

    return { success: true, data }
}
