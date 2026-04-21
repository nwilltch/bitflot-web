"use client"

import { Handle, Position, NodeProps } from '@xyflow/react'
import { Search } from 'lucide-react'

export function QueryNode({ data, selected }: NodeProps) {
    return (
        <div className={`border-2 rounded-lg p-4 bg-background min-w-[200px] ${selected ? 'border-primary shadow-lg' : 'border-blue-500'
            }`}>
            <Handle type="target" position={Position.Top} />

            <div className="flex items-center gap-2 mb-2">
                <div className="p-2 rounded-lg bg-blue-500/20">
                    <Search className="h-4 w-4 text-blue-600" />
                </div>
                <div className="flex-1">
                    <div className="font-semibold text-sm">Query Records</div>
                    <div className="text-xs text-muted-foreground">Fetch & Filter</div>
                </div>
            </div>

            <div className="text-xs space-y-1 mt-3 p-2 bg-muted/50 rounded">
                <div><strong>Resource:</strong> {data.resource || 'None'}</div>
                <div><strong>Filters:</strong> {data.filters?.length || 0}</div>
                <div><strong>Limit:</strong> {data.limit || 'All'}</div>
            </div>

            <Handle type="source" position={Position.Bottom} />
        </div>
    )
}
