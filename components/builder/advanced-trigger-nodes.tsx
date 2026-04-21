"use client"

import { Handle, Position, NodeProps } from '@xyflow/react'
import { Mail, Zap } from 'lucide-react'

export function EmailTriggerNode({ data, selected }: NodeProps) {
    return (
        <div className={`border-2 rounded-lg p-4 bg-background min-w-[200px] ${selected ? 'border-primary shadow-lg' : 'border-blue-600'
            }`}>
            <Handle type="source" position={Position.Bottom} />

            <div className="flex items-center gap-2 mb-2">
                <div className="p-2 rounded-lg bg-blue-600/20">
                    <Mail className="h-4 w-4 text-blue-700" />
                </div>
                <div className="flex-1">
                    <div className="font-semibold text-sm">Email Trigger</div>
                    <div className="text-xs text-muted-foreground">Inbound Email</div>
                </div>
            </div>

            <div className="text-xs space-y-1 mt-3 p-2 bg-muted/50 rounded">
                <div><strong>Address:</strong> {String(data.address || 'app@bitflot.com')}</div>
                <div><strong>Subject Filter:</strong> {String(data.subjectFilter || '*')}</div>
                <div className="text-muted-foreground mt-1">
                    Starts flow on email receipt
                </div>
            </div>
        </div>
    )
}

export function EventTriggerNode({ data, selected }: NodeProps) {
    return (
        <div className={`border-2 rounded-lg p-4 bg-background min-w-[200px] ${selected ? 'border-primary shadow-lg' : 'border-amber-600'
            }`}>
            <Handle type="source" position={Position.Bottom} />

            <div className="flex items-center gap-2 mb-2">
                <div className="p-2 rounded-lg bg-amber-600/20">
                    <Zap className="h-4 w-4 text-amber-700" />
                </div>
                <div className="flex-1">
                    <div className="font-semibold text-sm">Event Trigger</div>
                    <div className="text-xs text-muted-foreground">System Event</div>
                </div>
            </div>

            <div className="text-xs space-y-1 mt-3 p-2 bg-muted/50 rounded">
                <div><strong>Event:</strong> {String(data.eventName || 'user.signup')}</div>
                <div><strong>Source:</strong> {String(data.source || 'System')}</div>
                <div className="text-muted-foreground mt-1">
                    Starts flow on internal event
                </div>
            </div>
        </div>
    )
}
