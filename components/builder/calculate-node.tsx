"use client"

import { Handle, Position, NodeProps } from '@xyflow/react'
import { Calculator } from 'lucide-react'

export function CalculateNode({ data, selected }: NodeProps) {
    return (
        <div className={`border-2 rounded-lg p-4 bg-background min-w-[200px] ${selected ? 'border-primary shadow-lg' : 'border-pink-500'
            }`}>
            <Handle type="target" position={Position.Top} />

            <div className="flex items-center gap-2 mb-2">
                <div className="p-2 rounded-lg bg-pink-500/20">
                    <Calculator className="h-4 w-4 text-pink-600" />
                </div>
                <div className="flex-1">
                    <div className="font-semibold text-sm">Calculate</div>
                    <div className="text-xs text-muted-foreground">Math Operations</div>
                </div>
            </div>

            <div className="text-xs space-y-1 mt-3 p-2 bg-muted/50 rounded">
                <div className="font-mono text-xs bg-background p-1 rounded">
                    {String(data.formula || 'a + b')}
                </div>
                <div className="text-muted-foreground mt-1">
                    Supports +, -, *, /, %, ^
                </div>
            </div>

            <Handle type="source" position={Position.Bottom} />
        </div>
    )
}
