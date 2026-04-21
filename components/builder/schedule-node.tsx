"use client"

import { Handle, Position, NodeProps } from '@xyflow/react'
import { Clock } from 'lucide-react'

export function ScheduleNode({ data, selected }: NodeProps) {
    return (
        <div className={`border-2 rounded-lg p-4 bg-background min-w-[200px] ${selected ? 'border-primary shadow-lg' : 'border-teal-500'
            }`}>
            <Handle type="source" position={Position.Bottom} />

            <div className="flex items-center gap-2 mb-2">
                <div className="p-2 rounded-lg bg-teal-500/20">
                    <Clock className="h-4 w-4 text-teal-600" />
                </div>
                <div className="flex-1">
                    <div className="font-semibold text-sm">Schedule Trigger</div>
                    <div className="text-xs text-muted-foreground">Cron Job</div>
                </div>
            </div>

            <div className="text-xs space-y-1 mt-3 p-2 bg-muted/50 rounded">
                <div><strong>Interval:</strong> {String(data.interval || 'Daily')}</div>
                <div><strong>Time:</strong> {String(data.time || '09:00')}</div>
                <div className="text-muted-foreground mt-1">
                    Runs automatically on schedule
                </div>
            </div>
        </div>
    )
}
