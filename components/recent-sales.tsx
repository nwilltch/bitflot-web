"use client"

import {
    Avatar,
    AvatarFallback,
} from "@/components/ui/avatar"
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

interface App {
    id: string
    name: string
    created_at: string
    owner_id: string
}

export function RecentSales() {
    const [recentApps, setRecentApps] = useState<App[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchRecentApps() {
            const { data, error } = await supabase
                .from('apps')
                .select('*')
                .order('created_at', { ascending: false })
                .limit(5)

            if (!error && data) {
                setRecentApps(data)
            }
            setLoading(false)
        }

        fetchRecentApps()
    }, [])

    if (loading) {
        return <div className="text-sm text-muted-foreground">Loading...</div>
    }

    if (recentApps.length === 0) {
        return (
            <div className="text-sm text-muted-foreground text-center py-8">
                No apps created yet. Create your first app to see activity here.
            </div>
        )
    }

    return (
        <div className="space-y-8">
            {recentApps.map((app) => {
                const initials = app.name
                    .split(' ')
                    .map(word => word[0])
                    .join('')
                    .toUpperCase()
                    .slice(0, 2)

                const createdDate = new Date(app.created_at).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                })

                return (
                    <div key={app.id} className="flex items-center">
                        <Avatar className="h-9 w-9">
                            <AvatarFallback>{initials}</AvatarFallback>
                        </Avatar>
                        <div className="ml-4 space-y-1">
                            <p className="text-sm font-medium leading-none">{app.name}</p>
                            <p className="text-sm text-muted-foreground">
                                Created on {createdDate}
                            </p>
                        </div>
                        <div className="ml-auto text-sm text-muted-foreground">
                            New
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
