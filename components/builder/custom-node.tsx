import { Handle, Position } from '@xyflow/react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LucideIcon, Zap, Play, Box } from "lucide-react"
import { cn } from "@/lib/utils"

// Map string icon names to Lucide components
const iconMap: Record<string, LucideIcon> = {
    trigger: Zap,
    action: Play,
    logic: Box,
};

interface CustomNodeProps {
    data: {
        label: string;
        type: string;
        icon?: string;
    };
    selected?: boolean;
}

export function CustomNode({ data, selected }: CustomNodeProps) {
    const Icon = data.icon && iconMap[data.icon] ? iconMap[data.icon] : Box;

    return (
        <Card className={cn("w-64 shadow-md border-2 transition-colors", selected ? "border-primary" : "border-border")}>
            <Handle type="target" position={Position.Left} className="w-3 h-3 bg-muted-foreground" />
            <CardHeader className="p-3 pb-0">
                <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-md bg-secondary text-secondary-foreground">
                        <Icon className="h-4 w-4" />
                    </div>
                    <CardTitle className="text-sm font-medium leading-none">{data.label}</CardTitle>
                </div>
            </CardHeader>
            <CardContent className="p-3 pt-2">
                <p className="text-xs text-muted-foreground capitalize">{data.type} Node</p>
            </CardContent>
            <Handle type="source" position={Position.Right} className="w-3 h-3 bg-muted-foreground" />
        </Card>
    );
}
