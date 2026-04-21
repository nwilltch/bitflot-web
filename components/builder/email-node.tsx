"use client"

import { Handle, Position, NodeProps } from '@xyflow/react'
import { Mail } from 'lucide-react'

export function EmailNode({ data, selected }: NodeProps) {
    return (
        <div className={`border-2 rounded-lg p-4 bg-background min-w-[200px] ${selected ? 'border-primary shadow-lg' : 'border-blue-500'
            }`}>
            <Handle type="target" position={Position.Top} />

            <div className="flex items-center gap-2 mb-2">
                <div className="p-2 rounded-lg bg-blue-500/20">
                    <Mail className="h-4 w-4 text-blue-600" />
                </div>
                <div className="flex-1">
                    <div className="font-semibold text-sm">Send Email</div>
                    <div className="text-xs text-muted-foreground">Transactional</div>
                </div>
            </div>

            <div className="text-xs space-y-1 mt-3 p-2 bg-muted/50 rounded">
                <div><strong>To:</strong> {String(data.to || 'user@example.com')}</div>
                <div><strong>Subject:</strong> {String(data.subject || 'Notification')}</div>
                <div className="text-muted-foreground mt-1">
                    Via Resend API
                </div>
            </div>

            <Handle type="source" position={Position.Bottom} />
        </div>
    )
}
