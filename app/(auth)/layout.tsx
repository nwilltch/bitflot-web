import Link from "next/link"

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-muted/50 p-4">
            <div className="mb-8">
                <Link href="/" className="flex items-center space-x-2">
                    <span className="text-2xl font-bold tracking-tight">Bitflot</span>
                </Link>
            </div>
            <div className="w-full max-w-[400px]">
                {children}
            </div>
            <div className="mt-8 text-center text-xs text-muted-foreground">
                <div className="flex justify-center gap-4">
                    <Link href="#" className="hover:underline">Pricing</Link>
                    <Link href="#" className="hover:underline">FAQ</Link>
                    <Link href="#" className="hover:underline">Legal</Link>
                    <Link href="#" className="hover:underline">Privacy</Link>
                    <Link href="#" className="hover:underline">Enterprise</Link>
                </div>
                <div className="mt-4">
                    Bitflot © 2025
                </div>
            </div>
        </div>
    )
}
