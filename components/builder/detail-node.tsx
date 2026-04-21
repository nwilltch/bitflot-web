"use client"

import { Handle, Position } from '@xyflow/react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye, Plus } from "lucide-react"

interface DetailNodeProps {
    data: {
        label: string;
        resourceId?: string;
        layout?: 'single-column' | 'two-column';
    };
    selected?: boolean;
}

export function DetailNode({ data, selected }: DetailNodeProps) {
    return (
        <Card className={`w-80 shadow-md border-2 transition-colors ${selected ? "border-primary" : "border-border"}`}>
            <CardHeader className="p-3 pb-2 bg-muted/20">
                <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-md bg-indigo-100 text-indigo-700">
                        <Eye className="h-4 w-4" />
                    </div>
                    <CardTitle className="text-sm font-medium leading-none">{data.label}</CardTitle>
                </div>
            </CardHeader>
            <CardContent className="p-3">
                <div className="text-xs text-muted-foreground space-y-2">
                    {data.resourceId ? (
                        <>
                            <p className="font-medium">Viewing: {data.resourceId}</p>
                            <p>Layout: {data.layout || 'single-column'}</p>
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
