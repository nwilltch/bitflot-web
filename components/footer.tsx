import Link from "next/link"

export function Footer() {
    return (
        <footer className="w-full border-t bg-background py-6">
            <div className="mx-auto container flex flex-col items-center justify-between gap-4 md:h-14 md:flex-row md:py-0">
                <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
                    <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
                        Built by Bitflot
                    </p>
                </div>
                <div className="flex gap-4 text-sm text-muted-foreground">
                    <Link href="#">Pricing</Link>
                    <Link href="#">FAQ</Link>
                    <Link href="#">Privacy</Link>
                    <Link href="#">Terms</Link>
                    <Link href="#">Enterprise</Link>
                </div>
            </div>
        </footer>
    )
}
