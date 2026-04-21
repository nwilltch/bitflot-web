import { AppCard } from "@/components/app-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, ChevronDown, Plus } from "lucide-react"
import { supabase } from "@/lib/supabase"
import Link from "next/link"

async function getProjects() {
    const { data: apps, error } = await supabase
        .from('apps')
        .select('*')
        .order('created_at', { ascending: false })

    if (error) {
        console.error('Error fetching apps:', error)
        return []
    }

    return apps || []
}

export default async function ProjectsPage() {
    const projects = await getProjects()

    return (
        <div className="flex flex-col gap-8 h-full">
            {/* Search Header */}
            <div className="flex justify-center w-full">
                <div className="w-full max-w-xl relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search ..."
                        className="pl-10 bg-muted/50 border-none shadow-none h-10 rounded-md"
                    />
                </div>
            </div>

            <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-light text-muted-foreground">Projects</h1>
                    <Link href="/builder">
                        <Button>
                            <Plus className="mr-2 h-4 w-4" />
                            New Project
                        </Button>
                    </Link>
                </div>

                {/* Filter */}
                <div>
                    <Button variant="outline" size="sm" className="h-8 gap-2 bg-muted/30 border-none">
                        <span className="text-xs text-muted-foreground">Filter</span>
                        <ChevronDown className="h-3 w-3 text-muted-foreground" />
                    </Button>
                </div>

                {/* Projects Grid */}
                {projects.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                        <p className="text-muted-foreground mb-4">No projects yet</p>
                        <p className="text-sm text-muted-foreground">Create your first app using the Builder</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {projects.map((project) => (
                            <AppCard
                                key={project.id}
                                id={project.id}
                                title={project.name}
                                description={project.config?.description || 'No description'}
                                category="Custom App"
                                price="Free"
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
