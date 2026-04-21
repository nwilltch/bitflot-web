import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarDateRangePicker } from "@/components/date-range-picker"
import { Overview } from "@/components/overview"
import { RecentSales } from "@/components/recent-sales"
import { StatCard } from "@/components/stat-card"
import { Plus } from "lucide-react"
import Link from "next/link"
import { supabase } from "@/lib/supabase"

async function getDashboardStats() {
    // Get total apps count
    const { count: appsCount } = await supabase
        .from('apps')
        .select('*', { count: 'exact', head: true })

    // Get published apps count
    const { count: publishedCount } = await supabase
        .from('apps')
        .select('*', { count: 'exact', head: true })
        .eq('published', true)

    // Get total records across all apps (from records table)
    const { count: recordsCount } = await supabase
        .from('records')
        .select('*', { count: 'exact', head: true })

    // Get teams count
    const { count: teamsCount } = await supabase
        .from('teams')
        .select('*', { count: 'exact', head: true })

    return {
        totalApps: appsCount || 0,
        publishedApps: publishedCount || 0,
        totalRecords: recordsCount || 0,
        totalTeams: teamsCount || 0,
    }
}

export default async function DashboardPage() {
    const stats = await getDashboardStats()

    return (
        <div className="p-8 space-y-8">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
                <div className="flex items-center space-x-2">
                    <CalendarDateRangePicker />
                    <Link href="/builder">
                        <Button>
                            <Plus className="mr-2 h-4 w-4" />
                            New App
                        </Button>
                    </Link>
                </div>
            </div>
            <Tabs defaultValue="overview" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="analytics" disabled>
                        Analytics
                    </TabsTrigger>
                    <TabsTrigger value="reports" disabled>
                        Reports
                    </TabsTrigger>
                    <TabsTrigger value="notifications" disabled>
                        Notifications
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="overview" className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        <StatCard
                            title="Total Apps"
                            amount={stats.totalApps.toString()}
                            trend="up"
                            userCount={stats.totalApps}
                        />
                        <StatCard
                            title="Published Apps"
                            amount={stats.publishedApps.toString()}
                            trend="up"
                            userCount={stats.publishedApps}
                        />
                        <StatCard
                            title="Total Records"
                            amount={stats.totalRecords.toString()}
                            trend="up"
                            userCount={stats.totalRecords}
                        />
                        <StatCard
                            title="Teams"
                            amount={stats.totalTeams.toString()}
                            trend="up"
                            userCount={stats.totalTeams}
                        />
                    </div>

                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                        <Card className="col-span-4">
                            <CardHeader>
                                <CardTitle>Overview</CardTitle>
                                <CardDescription>App creation activity over time</CardDescription>
                            </CardHeader>
                            <CardContent className="pl-2">
                                <Overview />
                            </CardContent>
                        </Card>
                        <Card className="col-span-3">
                            <CardHeader>
                                <CardTitle>Recent Activity</CardTitle>
                                <CardDescription>
                                    Latest apps created on the platform
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <RecentSales />
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
}
