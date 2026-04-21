"use client"

import { Handle, Position, NodeProps } from '@xyflow/react'
import { Sigma, Filter, Database } from 'lucide-react'

export function AggregateNode({ data, selected }: NodeProps) {
    return (
        <div className={`border-2 rounded-lg p-4 bg-background min-w-[200px] ${selected ? 'border-primary shadow-lg' : 'border-orange-500'
            }`}>
            <Handle type="target" position={Position.Top} />

            <div className="flex items-center gap-2 mb-2">
                <div className="p-2 rounded-lg bg-orange-500/20">
                    <Sigma className="h-4 w-4 text-orange-600" />
                </div>
                <div className="flex-1">
                    <div className="font-semibold text-sm">Aggregate</div>
                    <div className="text-xs text-muted-foreground">Sum/Count/Avg</div>
                </div>
            </div>

            <div className="text-xs space-y-1 mt-3 p-2 bg-muted/50 rounded">
                <div><strong>Function:</strong> {String(data.function || 'Count')}</div>
                <div><strong>Field:</strong> {String(data.field || 'id')}</div>
                <div><strong>Group By:</strong> {String(data.groupBy || 'None')}</div>
            </div>

            <Handle type="source" position={Position.Bottom} />
        </div>
    )
}

export function FilterNode({ data, selected }: NodeProps) {
    return (
        <div className={`border-2 rounded-lg p-4 bg-background min-w-[200px] ${selected ? 'border-primary shadow-lg' : 'border-violet-500'
            }`}>
            <Handle type="target" position={Position.Top} />

            <div className="flex items-center gap-2 mb-2">
                <div className="p-2 rounded-lg bg-violet-500/20">
                    <Filter className="h-4 w-4 text-violet-600" />
                </div>
                <div className="flex-1">
                    <div className="font-semibold text-sm">Filter Array</div>
                    <div className="text-xs text-muted-foreground">Subset Data</div>
                </div>
            </div>

            <div className="text-xs space-y-1 mt-3 p-2 bg-muted/50 rounded">
                <div><strong>Input:</strong> {String(data.inputArray || 'Array')}</div>
                <div className="font-mono text-xs bg-background p-1 rounded mt-1">
                    {String(data.condition || 'item.value > 0')}
                </div>
            </div>

            <Handle type="source" position={Position.Bottom} />
        </div>
    )
}

export function SetVariableNode({ data, selected }: NodeProps) {
    return (
        <div className={`border-2 rounded-lg p-4 bg-background min-w-[200px] ${selected ? 'border-primary shadow-lg' : 'border-slate-500'
            }`}>
            <Handle type="target" position={Position.Top} />

            <div className="flex items-center gap-2 mb-2">
                <div className="p-2 rounded-lg bg-slate-500/20">
                    <Database className="h-4 w-4 text-slate-600" />
                </div>
                <div className="flex-1">
                    <div className="font-semibold text-sm">Set Variable</div>
                    <div className="text-xs text-muted-foreground">Store Data</div>
                </div>
            </div>

            <div className="text-xs space-y-1 mt-3 p-2 bg-muted/50 rounded">
                <div><strong>Name:</strong> {String(data.variableName || 'var')}</div>
                <div><strong>Value:</strong> {String(data.value || 'null')}</div>
            </div>

            <Handle type="source" position={Position.Bottom} />
        </div>
    )
}
