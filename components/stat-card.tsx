"use client"

import { Card, CardContent } from "@/components/ui/card"
import { ArrowUp, ArrowDown, User } from "lucide-react"
import { cn } from "@/lib/utils"
import { Area, AreaChart, ResponsiveContainer } from "recharts"

interface StatCardProps {
    title: string
    subtitle?: string
    amount: string
    trend: "up" | "down"
    userCount: number
    chartData?: { value: number }[]
    className?: string
}

const defaultData = [
    { value: 10 }, { value: 20 }, { value: 15 }, { value: 40 }, { value: 30 }, { value: 60 }, { value: 50 }
]

export function StatCard({ title, subtitle, amount, trend, userCount, chartData = defaultData, className }: StatCardProps) {
    return (
        <Card className={cn("overflow-hidden border-none shadow-sm bg-muted/30", className)}>
            <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                    <div className="flex flex-col">
                        {subtitle && <span className="text-[10px] text-muted-foreground uppercase">{subtitle}</span>}
                        <span className="text-lg font-light text-muted-foreground">{title}</span>
                    </div>
                    <div className="flex flex-col items-end">
                        <div className="flex items-center gap-1">
                            <span className="text-xl font-bold">{amount}</span>
                            {trend === "up" ? (
                                <ArrowUp className="h-4 w-4 text-green-500" />
                            ) : (
                                <ArrowDown className="h-4 w-4 text-red-500" />
                            )}
                        </div>
                        <div className="flex items-center gap-1 text-muted-foreground">
                            <User className="h-3 w-3" />
                            <span className="text-sm">{userCount}</span>
                            {trend === "up" ? (
                                <ArrowDown className="h-3 w-3 text-red-500" />
                            ) : (
                                <ArrowUp className="h-3 w-3 text-green-500" />
                            )}
                        </div>
                    </div>
                </div>

                {/* Sparkline Area */}
                <div className="h-12 w-full mt-4">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={chartData}>
                            <defs>
                                <linearGradient id={`gradient-${title}`} x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="currentColor" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="currentColor" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <Area
                                type="monotone"
                                dataKey="value"
                                stroke="currentColor"
                                fillOpacity={1}
                                fill={`url(#gradient-${title})`}
                                className="text-foreground"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    )
}
