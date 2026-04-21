import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LucideIcon, Layers } from "lucide-react"

interface AppCardProps {
    id?: string
    title: string
    price: string
    description: string
    category: string
    icon?: LucideIcon
}

export function AppCard({ id, title, price, description, category, icon }: AppCardProps) {
    const Icon = icon || Layers

    return (
        <Link href={`/details/${id ?? "fileshare"}`} className="block h-full">
            <Card className="flex flex-col justify-between h-full transition-all hover:shadow-md">
                <CardHeader className="flex flex-row items-start space-y-0 pb-2 gap-4">
                    <div className="p-2 border rounded-md">
                        <Icon className="h-6 w-6 text-foreground" />
                    </div>
                    <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-base font-medium leading-none">
                                {title}
                            </CardTitle>
                            <div className="text-lg font-bold">
                                {price}
                                <span className="text-[10px] font-normal text-muted-foreground ml-1">/mo</span>
                            </div>
                        </div>
                        <p className="text-xs text-muted-foreground line-clamp-2">
                            {description}
                        </p>
                    </div>
                </CardHeader>
                <CardContent className="pt-0 mt-auto">
                    <div className="mt-2">
                        <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80">
                            {category}
                        </span>
                    </div>
                </CardContent>
            </Card>
        </Link>
    )
}
