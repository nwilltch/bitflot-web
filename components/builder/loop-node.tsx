"use client"

import { Handle, Position, NodeProps } from '@xyflow/react'
import { Repeat } from 'lucide-react'

export function LoopNode({ data, selected }: NodeProps) {
    return (
        <div className={`border-2 rounded-lg p-4 bg-background min-w-[200px] ${selected ? 'border-primary shadow-lg' : 'border-indigo-500'
            }`}>
            <Handle type="target" position={Position.Top} />

            <div className="flex items-center gap-2 mb-2">
                <div className="p-2 rounded-lg bg-indigo-500/20">
                    <Repeat className="h-4 w-4 text-indigo-600" />
                </div>
                <div className="flex-1">
                    <div className="font-semibold text-sm">Loop / For Each</div>
                    <div className="text-xs text-muted-foreground">Iterate Array</div>
                </div>
            </div>

            <div className="text-xs space-y-1 mt-3 p-2 bg-muted/50 rounded">
                <div><strong>Array:</strong> {String(data.arraySource || 'None')}</div>
                <div><strong>Item Variable:</strong> {String(data.itemVar || 'item')}</div>
                <div className="text-muted-foreground mt-1">
                    Repeats child nodes for each item
                </div>
            </div>

            <Handle type="source" position={Position.Bottom} />
        </div>
    )
}
