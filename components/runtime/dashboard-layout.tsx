"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Plus, Search, Filter, MoreHorizontal, Database } from "lucide-react"
import { Input } from "@/components/ui/input"
import { DashboardSidebar } from "@/components/runtime/dashboard-sidebar"
import { Layers, Rocket, Zap, FileText, MessageSquare, Briefcase, Calendar, Users, Settings, Lock } from "lucide-react"
import { checkPaywallAccess } from "@/app/actions/subscriptions"
import { CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

const ICON_MAP: Record<string, any> = {
    Layers,
    Rocket,
    Zap,
    Database,
    FileText,
    MessageSquare,
    Briefcase,
    Calendar,
    Users,
    Settings,
}

interface DashboardLayoutProps {
    app: any
}

export function DashboardLayout({ app }: DashboardLayoutProps) {
    const config = app.config || {}
    const appIcon = config.icon || "Layers"
    const appColor = config.color || "#3b82f6"
    const Icon = ICON_MAP[appIcon] || Layers
    const resources = config.resources || []
    const [paywallBlocked, setPaywallBlocked] = useState(false)
    const [requiredPlan, setRequiredPlan] = useState('')
    const [loading, setLoading] = useState(true)

    // Check for paywall nodes in config
    useEffect(() => {
        async function checkPaywalls() {
            // Check if config has paywall nodes
            const paywallNodes = config.flows?.[0]?.nodes?.filter(
                (n: any) => n.type === 'paywall'
            ) || []

            if (paywallNodes.length > 0) {
                const paywall = paywallNodes[0]
                const access = await checkPaywallAccess(app.id, paywall.data.requiredPlan || 'PRO')

                if (!access.hasAccess) {
                    setPaywallBlocked(true)
                    setRequiredPlan(paywall.data.requiredPlan || 'PRO')
                }
            }
            setLoading(false)
        }
        checkPaywalls()
    }, [app, config])

    // Show paywall UI if blocked
    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                    <p className="text-muted-foreground">Loading...</p>
                </div>
            </div>
        )
    }

    if (paywallBlocked) {
        return (
            <div className="flex items-center justify-center h-screen bg-muted/20">
                <Card className="max-w-md w-full mx-4">
                    <CardHeader className="text-center pb-4">
                        <div
                            className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
                            style={{ backgroundColor: appColor + "20" }}
                        >
                            <Lock className="h-8 w-8" style={{ color: appColor }} />
                        </div>
                        <CardTitle className="text-2xl">Subscription Required</CardTitle>
                        <CardDescription className="mt-2">
                            This feature requires a <strong>{requiredPlan}</strong> subscription to {app.name}
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                            <h4 className="font-semibold text-sm">What you'll get:</h4>
                            <ul className="space-y-1 text-sm text-muted-foreground">
                                <li className="flex items-center gap-2">
                                    <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                                    Full access to all resources
                                </li>
                                <li className="flex items-center gap-2">
                                    <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                                    Unlimited records
                                </li>
                                <li className="flex items-center gap-2">
                                    <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                                    Priority support
                                </li>
                            </ul>
                        </div>
                        <Button
                            className="w-full"
                            size="lg"
                            style={{ backgroundColor: appColor }}
                        >
                            Upgrade to {requiredPlan}
                        </Button>
                        <p className="text-xs text-center text-muted-foreground">
                            Cancel anytime • 14-day money-back guarantee
                        </p>
                    </CardContent>
                </Card>
            </div>
        )
    }

    return (
        <div className="flex h-screen bg-background">
            {/* Sidebar */}
            <DashboardSidebar app={app} appIcon={Icon} appColor={appColor} />

            {/* Main Content */}
            <main className="flex-1 overflow-auto">
                {/* Breadcrumb Header */}
                <div className="border-b bg-background sticky top-0 z-10">
                    <div className="px-6 py-4 flex items-center gap-2 text-sm">
                        <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-muted transition-colors">
                            <Database className="h-4 w-4" />
                            <span className="font-medium">Home</span>
                        </button>
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">All Resources</span>

                        {/* Right side actions */}
                        <div className="ml-auto flex items-center gap-2">
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <Users className="h-4 w-4" />
                                <span className="text-sm">4+</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content Area */}
                <div className="p-6">
                    <div className="max-w-6xl mx-auto space-y-6">
                        {/* Search and Actions */}
                        <div className="flex items-center gap-3">
                            <div className="relative flex-1 max-w-md">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="Search..."
                                    className="pl-9 bg-muted/50 border-none"
                                />
                            </div>
                            <Button variant="outline" size="sm" className="gap-2">
                                <Filter className="h-4 w-4" />
                                Filter
                            </Button>
                            <Button
                                size="sm"
                                className="gap-2"
                                style={{ backgroundColor: appColor }}
                            >
                                <Plus className="h-4 w-4" />
                                New
                            </Button>
                        </div>

                        {/* Resources Grid */}
                        <div>
                            <h2 className="text-lg font-semibold mb-4">Your Resources</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {resources.map((resource: any, i: number) => (
                                    <Card key={i} className="hover:shadow-md transition-shadow cursor-pointer group">
                                        <CardContent className="p-6">
                                            <div className="flex items-start justify-between mb-4">
                                                <div
                                                    className="w-12 h-12 rounded-lg flex items-center justify-center"
                                                    style={{ backgroundColor: appColor + "20" }}
                                                >
                                                    <Database className="h-6 w-6" style={{ color: appColor }} />
                                                </div>
                                                <button className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-muted rounded">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </button>
                                            </div>
                                            <h3 className="font-semibold mb-2">{resource.name}</h3>
                                            <p className="text-sm text-muted-foreground mb-4">
                                                {resource.fields?.length || 0} fields • 0 records
                                            </p>
                                            <div className="flex items-center gap-2">
                                                <Button variant="outline" size="sm" className="flex-1">
                                                    View
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    className="flex-1"
                                                    style={{ backgroundColor: appColor }}
                                                >
                                                    Add Record
                                                </Button>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>

                            {resources.length === 0 && (
                                <Card className="p-12 text-center">
                                    <div
                                        className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
                                        style={{ backgroundColor: appColor + "20" }}
                                    >
                                        <Database className="h-8 w-8" style={{ color: appColor }} />
                                    </div>
                                    <h3 className="text-lg font-semibold mb-2">No resources yet</h3>
                                    <p className="text-muted-foreground mb-4">
                                        Create your first resource to start managing data
                                    </p>
                                    <Button style={{ backgroundColor: appColor }}>
                                        <Plus className="h-4 w-4 mr-2" />
                                        Create Resource
                                    </Button>
                                </Card>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

function ChevronRight({ className }: { className?: string }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
    )
}
