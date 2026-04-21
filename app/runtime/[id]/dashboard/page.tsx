import { supabase } from "@/lib/supabase"
import { notFound } from "next/navigation"
import { DashboardLayout } from "@/components/runtime/dashboard-layout"
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

export default async function DashboardPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const { userId } = await auth()

    if (!userId) {
        notFound()
    }

    const app = await getApp(id)

    if (!app) {
        notFound()
    }

    return <DashboardLayout app={app} />
}
