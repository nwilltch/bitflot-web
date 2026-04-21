"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Database, Layers, Rocket, Zap, FileText, MessageSquare, Briefcase, Calendar, Users, Settings } from "lucide-react"
import Link from "next/link"
import { SignInButton, SignUpButton, useUser } from "@clerk/nextjs"

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

interface AppLandingPageProps {
    app: any
}

export function AppLandingPage({ app }: AppLandingPageProps) {
    const { isSignedIn, user } = useUser()
    const config = app.config || {}
    const appIcon = config.icon || "Layers"
    const appColor = config.color || "#3b82f6"
    const Icon = ICON_MAP[appIcon] || Layers
    const resources = config.resources || []

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <header className="border-b">
                <div className="container mx-auto px-6 h-16 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2">
                        <span className="font-bold text-lg">Bitflot</span>
                    </Link>
                    <div className="flex items-center gap-4">
                        {!isSignedIn ? (
                            <>
                                <SignInButton mode="modal">
                                    <Button variant="ghost">Sign In</Button>
                                </SignInButton>
                                <SignUpButton mode="modal">
                                    <Button>Get Started</Button>
                                </SignUpButton>
                            </>
                        ) : (
                            <Link href={`/runtime/${app.id}/dashboard`}>
                                <Button>Go to Dashboard</Button>
                            </Link>
                        )}
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto px-6 py-12">
                <div className="max-w-5xl mx-auto">
                    {/* App Header */}
                    <div className="flex items-center gap-3 mb-12">
                        <div className="w-10 h-10 rounded bg-muted flex items-center justify-center">
                            <Icon className="h-5 w-5" />
                        </div>
                        <h1 className="text-xl font-semibold">{app.name}</h1>
                    </div>

                    {/* Hero Section */}
                    <div className="text-center mb-16 space-y-6">
                        <div className="inline-flex items-center gap-2 text-sm text-muted-foreground mb-4">
                            <span>✨ New method to share files</span>
                        </div>

                        <h2 className="text-5xl font-bold tracking-tight leading-tight max-w-3xl mx-auto">
                            {config.description || `Share files easily\nwith your teams`}
                        </h2>

                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Empowering creators, makers, and developers to build, launch,
                            and monetize applications in one seamless hybrid environment.
                        </p>

                        <div className="pt-4">
                            {!isSignedIn ? (
                                <SignUpButton mode="modal">
                                    <Button
                                        size="lg"
                                        className="rounded-full px-8"
                                        style={{ backgroundColor: appColor }}
                                    >
                                        Start free
                                    </Button>
                                </SignUpButton>
                            ) : (
                                <Button
                                    size="lg"
                                    className="rounded-full px-8"
                                    style={{ backgroundColor: appColor }}
                                    asChild
                                >
                                    <Link href={`/runtime/${app.id}/dashboard`}>Launch App</Link>
                                </Button>
                            )}
                        </div>
                    </div>

                    {/* Templates Section */}
                    <div className="mb-12">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h3 className="text-lg font-semibold mb-1">Template</h3>
                                <p className="text-sm text-muted-foreground">
                                    Explore apps I have already built
                                </p>
                            </div>
                            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                                Browse all →
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {resources.slice(0, 3).map((resource: any, i: number) => (
                                <Card key={i} className="border hover:shadow-md transition-shadow cursor-pointer">
                                    <CardContent className="p-6">
                                        <div className="flex items-start gap-3 mb-4">
                                            <div className="w-10 h-10 rounded bg-muted flex items-center justify-center shrink-0">
                                                <Database className="h-5 w-5" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h4 className="font-semibold mb-1">{resource.name}</h4>
                                                <p className="text-xs text-muted-foreground line-clamp-2">
                                                    Manage your {resource.name.toLowerCase()} with {resource.fields?.length || 0} fields
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between pt-4 border-t">
                                            <span className="text-xs text-muted-foreground">Productivity</span>
                                            <span className="text-sm font-semibold">Free</span>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>

                    {/* Recents Section */}
                    <div>
                        <div className="mb-6">
                            <h3 className="text-lg font-semibold mb-1">Recents</h3>
                            <p className="text-sm text-muted-foreground">
                                Explore apps I have already built
                            </p>
                        </div>

                        <div className="border rounded-lg overflow-hidden">
                            <table className="w-full">
                                <thead className="bg-muted/50">
                                    <tr>
                                        <th className="text-left p-4 font-medium text-sm">Name</th>
                                        <th className="text-left p-4 font-medium text-sm">Ouvert</th>
                                        <th className="text-left p-4 font-medium text-sm">Proprietaire</th>
                                        <th className="text-left p-4 font-medium text-sm">Activité</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {resources.map((resource: any, i: number) => (
                                        <tr key={i} className="border-t hover:bg-muted/50 cursor-pointer">
                                            <td className="p-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded bg-muted flex items-center justify-center">
                                                        <Database className="h-4 w-4" />
                                                    </div>
                                                    <div>
                                                        <div className="font-medium text-sm">{resource.name}</div>
                                                        <div className="text-xs text-muted-foreground">
                                                            {resource.fields?.length || 0} fields
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-4 text-sm text-muted-foreground">-</td>
                                            <td className="p-4 text-sm text-muted-foreground">-</td>
                                            <td className="p-4 text-sm text-muted-foreground">-</td>
                                        </tr>
                                    ))}
                                    {resources.length === 0 && (
                                        <tr>
                                            <td colSpan={4} className="p-8 text-center text-sm text-muted-foreground">
                                                No resources available
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Footer */}
                    <footer className="mt-16 pt-8 border-t">
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                            <div className="flex items-center gap-2">
                                <span>{app.name} © 2025</span>
                            </div>
                            <div className="flex items-center gap-6">
                                <Link href="#" className="hover:text-foreground">Pricing</Link>
                                <Link href="#" className="hover:text-foreground">FAQ</Link>
                                <Link href="#" className="hover:text-foreground">Legacy</Link>
                                <Link href="#" className="hover:text-foreground">Privacy</Link>
                                <Link href="/" className="hover:text-foreground font-medium">Bitflot</Link>
                            </div>
                        </div>
                    </footer>
                </div>
            </main>
        </div>
    )
}
