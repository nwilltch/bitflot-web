"use client"

import { Handle, Position } from '@xyflow/react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { List, Plus } from "lucide-react"

interface ListNodeProps {
    data: {
        label: string;
        resourceId?: string;
        columns?: string[];
    };
    selected?: boolean;
}

export function ListNode({ data, selected }: ListNodeProps) {
    return (
        <Card className={`w-80 shadow-md border-2 transition-colors ${selected ? "border-primary" : "border-border"}`}>
            <CardHeader className="p-3 pb-2 bg-muted/20">
                <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-md bg-green-100 text-green-700">
                        <List className="h-4 w-4" />
                    </div>
                    <CardTitle className="text-sm font-medium leading-none">{data.label}</CardTitle>
                </div>
            </CardHeader>
            <CardContent className="p-3">
                <div className="text-xs text-muted-foreground space-y-2">
                    {data.resourceId ? (
                        <>
                            <p className="font-medium">Data Source: {data.resourceId}</p>
                            {data.columns && data.columns.length > 0 ? (
                                <div>
                                    <p className="mb-1">Columns:</p>
                                    <ul className="list-disc list-inside space-y-0.5">
                                        {data.columns.map((col, idx) => (
                                            <li key={idx}>{col}</li>
                                        ))}
                                    </ul>
                                </div>
                            ) : (
                                <p className="text-muted-foreground/60">All fields displayed</p>
                            )}
                        </>
                    ) : (
                        <div className="flex items-center gap-2 text-muted-foreground/60">
                            <Plus className="h-3 w-3" />
                            <span>Connect to a Resource</span>
                        </div>
                    )}
                </div>
            </CardContent>
            <Handle type="target" position={Position.Left} className="w-3 h-3 bg-muted-foreground" />
            <Handle type="source" position={Position.Right} className="w-3 h-3 bg-muted-foreground" />
        </Card>
    );
}
