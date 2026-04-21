import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Navbar() {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="mx-auto container flex h-14 items-center justify-between">
                <div className="flex items-center gap-2">
                    <Link href="/" className="flex items-center space-x-2">
                        <span className="text-xl font-bold tracking-tight">Bitflot</span>
                    </Link>
                </div>
                <nav className="flex items-center gap-4">
                    <Link href="/discover" className="text-sm font-medium hover:underline underline-offset-4">
                        Discover
                    </Link>
                    <Link href="/sign-in">
                        <Button variant="ghost" size="sm">
                            Sign in
                        </Button>
                    </Link>
                    <Link href="/sign-up">
                        <Button size="sm">Get started</Button>
                    </Link>
                </nav>
            </div>
        </header>
    )
}
