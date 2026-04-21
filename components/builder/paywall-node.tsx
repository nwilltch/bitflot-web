"use client"

import { Handle, Position, NodeProps } from '@xyflow/react'
import { CreditCard } from 'lucide-react'

export function PaywallNode({ data, selected }: NodeProps) {
    return (
        <div className={`border-2 rounded-lg p-4 bg-background min-w-[200px] ${selected ? 'border-primary shadow-lg' : 'border-green-500'
            }`}>
            <Handle type="target" position={Position.Top} />

            <div className="flex items-center gap-2 mb-2">
                <div className="p-2 rounded-lg bg-green-500/20">
                    <CreditCard className="h-4 w-4 text-green-600" />
                </div>
                <div className="flex-1">
                    <div className="font-semibold text-sm">Stripe Paywall</div>
                    <div className="text-xs text-muted-foreground">Payment Required</div>
                </div>
            </div>

            <div className="text-xs space-y-1 mt-3 p-2 bg-muted/50 rounded">
                <div><strong>Plan:</strong> {data.requiredPlan || 'PRO'}</div>
                <div><strong>Price:</strong> ${data.price || '9.99'}/mo</div>
                <div className="text-muted-foreground mt-2">
                    Users must subscribe to access features beyond this node
                </div>
            </div>

            <Handle type="source" position={Position.Bottom} />
        </div>
    )
}
