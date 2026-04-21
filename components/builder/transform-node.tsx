"use client"

import { Handle, Position, NodeProps } from '@xyflow/react'
import { Shuffle } from 'lucide-react'

export function TransformNode({ data, selected }: NodeProps) {
    return (
        <div className={`border-2 rounded-lg p-4 bg-background min-w-[200px] ${selected ? 'border-primary shadow-lg' : 'border-cyan-500'
            }`}>
            <Handle type="target" position={Position.Top} />

            <div className="flex items-center gap-2 mb-2">
                <div className="p-2 rounded-lg bg-cyan-500/20">
                    <Shuffle className="h-4 w-4 text-cyan-600" />
                </div>
                <div className="flex-1">
                    <div className="font-semibold text-sm">Transform Data</div>
                    <div className="text-xs text-muted-foreground">Map/Format</div>
                </div>
            </div>

            <div className="text-xs space-y-1 mt-3 p-2 bg-muted/50 rounded">
                <div><strong>Mappings:</strong> {Object.keys(data.mappings || {}).length}</div>
                <div className="text-muted-foreground mt-1">
                    Transforms input → output structure
                </div>
            </div>

            <Handle type="source" position={Position.Bottom} />
        </div>
    )
}
