import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { AppCard } from "@/components/app-card"
import { ChevronLeft, ChevronRight, Search } from "lucide-react"
import { supabase } from "@/lib/supabase"

async function getPublishedApps() {
    const { data: apps, error } = await supabase
        .from('apps')
        .select('*')
        .eq('published', true)
        .order('created_at', { ascending: false })
        .limit(9)

    if (error) {
        console.error('Error fetching apps:', error)
        return []
    }

    return apps || []
}

async function getPopularApps() {
    // For now, just get recent apps
    // In production, you'd track usage metrics
    const { data: apps, error } = await supabase
        .from('apps')
        .select('*')
        .eq('published', true)
        .order('created_at', { ascending: false })
        .limit(3)

    if (error) {
        console.error('Error fetching popular apps:', error)
        return []
    }

    return apps || []
}

export default async function DiscoverPage() {
    const allApps = await getPublishedApps()
    const popularApps = await getPopularApps()
    const newApps = allApps.slice(0, 3)

    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1 container py-12 md:py-24 mx-auto">
                {/* Hero Section */}
                <div className="flex flex-col items-center text-center space-y-4 mb-16">
                    <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                        Discover microsaas
                    </h1>
                    <p className="mx-auto max-w-[700px] text-muted-foreground md:text-lg">
                        Browse applications. Find your needs and start free trial
                    </p>
                    <div className="w-full max-w-md relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search..."
                            className="pl-10 bg-muted/50 border-none shadow-none h-10 rounded-full"
                        />
                    </div>
                </div>

                {/* All Apps Section */}
                <section className="mb-16">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-sm font-medium text-muted-foreground">All Apps</h2>
                        <div className="flex gap-2">
                            <Button variant="outline" size="icon" className="h-8 w-8 rounded-full bg-primary text-primary-foreground border-none hover:bg-primary/90">
                                <ChevronLeft className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="icon" className="h-8 w-8 rounded-full bg-primary text-primary-foreground border-none hover:bg-primary/90">
                                <ChevronRight className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                    {allApps.length === 0 ? (
                        <div className="text-center py-12">
                            <p className="text-muted-foreground">No apps published yet</p>
                            <p className="text-sm text-muted-foreground mt-2">Be the first to create an app!</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {allApps.map((app) => (
                                <AppCard
                                    key={app.id}
                                    id={app.id}
                                    title={app.name}
                                    description={app.config?.description || 'No description available'}
                                    category="Custom App"
                                    price="Free"
                                />
                            ))}
                        </div>
                    )}
                </section>

                {/* Popular Section */}
                {popularApps.length > 0 && (
                    <section className="mb-16">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-sm font-medium text-muted-foreground">Popular</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {popularApps.map((app) => (
                                <AppCard
                                    key={app.id}
                                    id={app.id}
                                    title={app.name}
                                    description={app.config?.description || 'No description available'}
                                    category="Custom App"
                                    price="Free"
                                />
                            ))}
                        </div>
                    </section>
                )}

                {/* New Section */}
                {newApps.length > 0 && (
                    <section className="mb-16">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-2">
                                <Button variant="secondary" size="sm" className="h-7 text-xs rounded-md px-3">
                                    New
                                </Button>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {newApps.map((app) => (
                                <AppCard
                                    key={app.id}
                                    id={app.id}
                                    title={app.name}
                                    description={app.config?.description || 'No description available'}
                                    category="Custom App"
                                    price="Free"
                                />
                            ))}
                        </div>
                    </section>
                )}

            </main>
            <Footer />
        </div>
    )
}
