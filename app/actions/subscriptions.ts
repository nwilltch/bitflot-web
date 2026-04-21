"use server"

import { supabase } from "@/lib/supabase"
import { auth } from "@clerk/nextjs/server"

/**
 * Get Creator subscription details
 * Creates a FREE subscription if none exists
 */
export async function getCreatorSubscription(creatorId?: string) {
    const { userId } = await auth()
    const targetId = creatorId || userId

    if (!targetId) {
        return {
            plan: 'FREE',
            max_apps: 1,
            features: { premium_nodes: false, custom_branding: false },
            status: 'active'
        }
    }

    const { data, error } = await supabase
        .from('creator_subscriptions')
        .select('*')
        .eq('creator_id', targetId)
        .single()

    if (error || !data) {
        // Create default FREE subscription
        const { data: newSub, error: insertError } = await supabase
            .from('creator_subscriptions')
            .insert([{
                creator_id: targetId,
                plan: 'FREE',
                status: 'active',
                max_apps: 1,
                features: { premium_nodes: false, custom_branding: false }
            }])
            .select()
            .single()

        if (insertError) {
            console.error('Error creating subscription:', insertError)
            return {
                plan: 'FREE',
                max_apps: 1,
                features: { premium_nodes: false },
                status: 'active'
            }
        }

        return newSub
    }

    return data
}

/**
 * Get End-User subscription for a specific app
 */
export async function getEndUserSubscription(appId: string, userId?: string) {
    const { userId: authUserId } = await auth()
    const targetUserId = userId || authUserId

    if (!targetUserId) return null

    const { data } = await supabase
        .from('end_user_subscriptions')
        .select('*')
        .eq('application_id', appId)
        .eq('end_user_id', targetUserId)
        .eq('status', 'active')
        .single()

    return data
}

/**
 * Check if End-User has access based on paywall requirements
 */
export async function checkPaywallAccess(appId: string, requiredPlan: string) {
    const subscription = await getEndUserSubscription(appId)

    if (!subscription) {
        return {
            hasAccess: false,
            message: "Subscription required to access this feature"
        }
    }

    if (subscription.plan !== requiredPlan) {
        return {
            hasAccess: false,
            message: `${requiredPlan} plan required to access this feature`
        }
    }

    return { hasAccess: true }
}

/**
 * Get Creator's app count
 */
export async function getCreatorAppCount(creatorId?: string) {
    const { userId } = await auth()
    const targetId = creatorId || userId

    if (!targetId) return 0

    const { count } = await supabase
        .from('apps')
        .select('*', { count: 'exact', head: true })
        .eq('created_by', targetId)

    return count || 0
}

/**
 * Check if Creator can publish more apps based on their plan
 */
export async function canPublishApp(creatorId?: string) {
    const subscription = await getCreatorSubscription(creatorId)
    const appCount = await getCreatorAppCount(creatorId)

    if (appCount >= subscription.max_apps) {
        return {
            canPublish: false,
            message: `${subscription.plan} plan limited to ${subscription.max_apps} app(s). Upgrade to publish more.`,
            currentCount: appCount,
            maxApps: subscription.max_apps
        }
    }

    return {
        canPublish: true,
        currentCount: appCount,
        maxApps: subscription.max_apps
    }
}

/**
 * Check if Creator has access to Premium Nodes
 */
export async function hasPremiumNodesAccess(creatorId?: string) {
    const subscription = await getCreatorSubscription(creatorId)
    return subscription.features?.premium_nodes === true
}

/**
 * Create or update Creator subscription
 */
export async function updateCreatorSubscription(
    creatorId: string,
    plan: 'FREE' | 'PRO' | 'ENTERPRISE',
    stripeData?: {
        customerId?: string
        subscriptionId?: string
        periodEnd?: Date
    }
) {
    const maxApps = plan === 'FREE' ? 1 : plan === 'PRO' ? 999 : 9999
    const features = {
        premium_nodes: plan !== 'FREE',
        custom_branding: plan === 'ENTERPRISE'
    }

    const { data, error } = await supabase
        .from('creator_subscriptions')
        .upsert([{
            creator_id: creatorId,
            plan,
            max_apps: maxApps,
            features,
            stripe_customer_id: stripeData?.customerId,
            stripe_subscription_id: stripeData?.subscriptionId,
            current_period_end: stripeData?.periodEnd,
            status: 'active'
        }], {
            onConflict: 'creator_id'
        })
        .select()
        .single()

    if (error) {
        console.error('Error updating subscription:', error)
        return { success: false, error: error.message }
    }

    return { success: true, data }
}
