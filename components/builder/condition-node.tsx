"use client"

import { Handle, Position, NodeProps } from '@xyflow/react'
import { GitBranch } from 'lucide-react'

export function ConditionNode({ data, selected }: NodeProps) {
    return (
        <div className={`border-2 rounded-lg p-4 bg-background min-w-[220px] ${selected ? 'border-primary shadow-lg' : 'border-yellow-500'
            }`}>
            <Handle type="target" position={Position.Top} />

            <div className="flex items-center gap-2 mb-2">
                <div className="p-2 rounded-lg bg-yellow-500/20">
                    <GitBranch className="h-4 w-4 text-yellow-600" />
                </div>
                <div className="flex-1">
                    <div className="font-semibold text-sm">If / Else</div>
                    <div className="text-xs text-muted-foreground">Conditional Branch</div>
                </div>
            </div>

            <div className="text-xs space-y-2 mt-3 p-2 bg-muted/50 rounded">
                <div><strong>Condition:</strong></div>
                <div className="font-mono text-xs bg-background p-1 rounded">
                    {String(data.leftValue || 'value')} {String(data.operator || '==')} {String(data.rightValue || 'value')}
                </div>
                <div className="flex gap-2 mt-2">
                    <div className="flex-1 text-green-600">✓ True path</div>
                    <div className="flex-1 text-red-600">✗ False path</div>
                </div>
            </div>

            {/* Standard input handle */}
            <Handle type="target" position={Position.Top} />

            {/* Two output handles for branching */}
            <div className="absolute bottom-0 left-0 w-full flex justify-between px-8">
                <Handle
                    type="source"
                    position={Position.Bottom}
                    id="true"
                    style={{ left: '30%', bottom: -4 }}
                    className="bg-green-500"
                />
                <Handle
                    type="source"
                    position={Position.Bottom}
                    id="false"
                    style={{ left: '70%', bottom: -4 }}
                    className="bg-red-500"
                />
            </div>
        </div>
    )
}
