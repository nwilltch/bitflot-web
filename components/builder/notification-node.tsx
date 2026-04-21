"use client"

import { Handle, Position, NodeProps } from '@xyflow/react'
import { Bell } from 'lucide-react'

export function NotificationNode({ data, selected }: NodeProps) {
    return (
        <div className={`border-2 rounded-lg p-4 bg-background min-w-[200px] ${selected ? 'border-primary shadow-lg' : 'border-amber-500'
            }`}>
            <Handle type="target" position={Position.Top} />

            <div className="flex items-center gap-2 mb-2">
                <div className="p-2 rounded-lg bg-amber-500/20">
                    <Bell className="h-4 w-4 text-amber-600" />
                </div>
                <div className="flex-1">
                    <div className="font-semibold text-sm">Notification</div>
                    <div className="text-xs text-muted-foreground">In-App Alert</div>
                </div>
            </div>

            <div className="text-xs space-y-1 mt-3 p-2 bg-muted/50 rounded">
                <div><strong>User:</strong> {String(data.userId || 'Current user')}</div>
                <div><strong>Type:</strong> {String(data.type || 'info')}</div>
                <div><strong>Message:</strong> {String(data.message || 'Notification').substring(0, 30)}...</div>
            </div>

            <Handle type="source" position={Position.Bottom} />
        </div>
    )
}
