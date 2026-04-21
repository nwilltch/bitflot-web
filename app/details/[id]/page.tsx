import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { FileText, User, MessageSquare, Check, Layers, Rocket, Zap, Database, Briefcase, Calendar, Users, Settings } from "lucide-react"
import { supabase } from "@/lib/supabase"
import { notFound } from "next/navigation"
import Link from "next/link"

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

async function getAppDetails(id: string) {
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

export default async function DetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const app = await getAppDetails(id)

    if (!app) {
        notFound()
    }

    const config = app.config || {}
    const appIcon = config.icon || "Layers"
    const appColor = config.color || "#3b82f6"
    const Icon = ICON_MAP[appIcon] || Layers
    const resources = config.resources || []
    const views = config.views || []

    // Extract key features from resources
    const keyFeatures = [
        `${resources.length} custom resource${resources.length !== 1 ? 's' : ''}`,
        `${views.length} pre-built view${views.length !== 1 ? 's' : ''}`,
        "Real-time data synchronization",
        "Team collaboration ready",
        "Secure data storage with RLS",
    ]

    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1 container mx-auto py-12 md:py-24">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Left Column: Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Header Info */}
                        <div className="flex gap-6 items-start">
                            <div
                                className="p-4 border rounded-xl shadow-sm"
                                style={{ backgroundColor: appColor + "20" }}
                            >
                                <Icon className="h-10 w-10" style={{ color: appColor }} />
                            </div>
                            <div className="space-y-2">
                                <h1 className="text-3xl font-bold tracking-tight">{app.name}</h1>
                                <p className="text-muted-foreground">
                                    {config.description || 'A custom micro-SaaS application built with Bitflot'}
                                </p>
                                <div className="flex items-center gap-4 pt-2">
                                    <span className="inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-xs font-semibold text-secondary-foreground">
                                        Custom App
                                    </span>
                                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                        <Database className="h-4 w-4" />
                                        <span>{resources.length} Resources</span>
                                    </div>
                                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                        <FileText className="h-4 w-4" />
                                        <span>{views.length} Views</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Media Placeholder */}
                        <div className="w-full aspect-video bg-muted rounded-lg flex items-center justify-center">
                            <div className="text-center space-y-2">
                                <Icon className="h-16 w-16 mx-auto text-muted-foreground" />
                                <p className="text-sm text-muted-foreground">App Preview</p>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-4">
                            <Link href={`/runtime/${app.id}`}>
                                <Button className="w-32 bg-primary text-primary-foreground hover:bg-primary/90">
                                    Launch App
                                </Button>
                            </Link>
                            <Link href="/builder">
                                <Button variant="outline" className="w-32">
                                    Edit in Builder
                                </Button>
                            </Link>
                        </div>

                        {/* App Details Section */}
                        <div className="space-y-4">
                            <h2 className="text-xl font-bold">About this App</h2>
                            <div className="text-muted-foreground space-y-4 leading-relaxed">
                                <p>
                                    {app.name} is a custom micro-SaaS application built on the Bitflot platform.
                                    It provides a complete solution with {resources.length} custom resource{resources.length !== 1 ? 's' : ''}
                                    and {views.length} pre-built view{views.length !== 1 ? 's' : ''}.
                                </p>
                                {resources.length > 0 && (
                                    <div>
                                        <h3 className="font-semibold text-foreground mb-2">Resources:</h3>
                                        <ul className="list-disc list-inside space-y-1">
                                            {resources.map((resource: any, i: number) => (
                                                <li key={i}>
                                                    <strong>{resource.name}</strong> - {resource.fields?.length || 0} fields
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Sidebar */}
                    <div className="space-y-8">
                        {/* Pricing Card */}
                        <Card className="bg-muted/30 border-none shadow-sm">
                            <CardContent className="p-6 space-y-6">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <div className="text-3xl font-bold">Free</div>
                                        <div className="text-sm text-muted-foreground">Open source</div>
                                    </div>
                                    <div className="h-10 w-24">
                                        {/* Sparkline Placeholder */}
                                        <svg viewBox="0 0 100 30" className="w-full h-full overflow-visible">
                                            <path d="M0 25 Q 10 10, 20 15 T 40 5 T 60 15 T 80 10 T 100 5" fill="none" stroke="currentColor" strokeWidth="1.5" />
                                        </svg>
                                    </div>
                                </div>

                                <div className="flex justify-between items-center pt-4 border-t border-border/50">
                                    <span className="text-sm font-medium">Launch</span>
                                    <span className="text-sm text-muted-foreground">Edit</span>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Key Features */}
                        <div className="bg-muted/30 rounded-lg p-6 space-y-4">
                            <h3 className="font-bold">Key Features</h3>
                            <ul className="space-y-3">
                                {keyFeatures.map((feature, i) => (
                                    <li key={i} className="flex gap-3 items-start text-sm text-muted-foreground">
                                        <Check className="h-4 w-4 mt-0.5 shrink-0" />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                            <div className="pt-4 text-right text-xs text-muted-foreground">
                                Built with Bitflot
                            </div>
                        </div>
                    </div>

                </div>
            </main>
            <Footer />
        </div>
    )
}
