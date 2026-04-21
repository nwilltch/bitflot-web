"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    LayoutDashboard,
    Folder,
    Database,
    CreditCard,
    Settings,
    Plus
} from "lucide-react"
import { UserButton } from "@clerk/nextjs"

const sidebarItems = [
    {
        title: "Home",
        href: "/dashboard",
        icon: LayoutDashboard,
    },
    {
        title: "Projects",
        href: "/dashboard/projects",
        icon: Folder,
    },
    {
        title: "Resources",
        href: "/dashboard/resources",
        icon: Database,
    },
    {
        title: "Billing",
        href: "/dashboard/billing",
        icon: CreditCard,
    },
    {
        title: "Settings",
        href: "/dashboard/settings",
        icon: Settings,
    },
]

export function Sidebar() {
    const pathname = usePathname()

    return (
        <div className="flex h-full w-16 flex-col border-r bg-muted/40 md:w-64">
            <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                <Link href="/" className="flex items-center gap-2 font-semibold">
                    <span className="text-xl font-bold">Bitflot</span>
                </Link>
            </div>
            <div className="flex-1 overflow-auto py-2">
                <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                    <div className="mb-4 px-2">
                        <Link href="/builder">
                            <Button className="w-full justify-start gap-2" size="sm">
                                <Plus className="h-4 w-4" />
                                <span className="hidden md:inline">New Project</span>
                            </Button>
                        </Link>
                    </div>
                    {sidebarItems.map((item, index) => (
                        <Link
                            key={index}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary",
                                pathname === item.href
                                    ? "bg-muted text-primary"
                                    : "text-muted-foreground"
                            )}
                        >
                            <item.icon className="h-4 w-4" />
                            <span className="hidden md:inline">{item.title}</span>
                        </Link>
                    ))}
                </nav>
            </div>
            <div className="mt-auto p-4">
                <div className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground">
                    <UserButton showName />
                </div>
            </div>
        </div>
    )
}
