"use client"

import { Handle, Position, NodeProps } from '@xyflow/react'
import { GitMerge, Timer } from 'lucide-react'

export function SwitchNode({ data, selected }: NodeProps) {
    return (
        <div className={`border-2 rounded-lg p-4 bg-background min-w-[200px] ${selected ? 'border-primary shadow-lg' : 'border-yellow-600'
            }`}>
            <Handle type="target" position={Position.Top} />

            <div className="flex items-center gap-2 mb-2">
                <div className="p-2 rounded-lg bg-yellow-600/20">
                    <GitMerge className="h-4 w-4 text-yellow-700" />
                </div>
                <div className="flex-1">
                    <div className="font-semibold text-sm">Switch / Case</div>
                    <div className="text-xs text-muted-foreground">Multi-path Branching</div>
                </div>
            </div>

            <div className="text-xs space-y-1 mt-3 p-2 bg-muted/50 rounded">
                <div><strong>Variable:</strong> {String(data.variable || 'value')}</div>
                <div><strong>Cases:</strong> {Object.keys(data.cases || {}).length}</div>
            </div>

            <div className="flex justify-between mt-2 px-1">
                <div className="text-[10px] text-muted-foreground">Input</div>
                <div className="text-[10px] text-muted-foreground">Cases</div>
            </div>

            <Handle type="source" position={Position.Bottom} />
        </div>
    )
}

export function DelayNode({ data, selected }: NodeProps) {
    return (
        <div className={`border-2 rounded-lg p-4 bg-background min-w-[200px] ${selected ? 'border-primary shadow-lg' : 'border-stone-500'
            }`}>
            <Handle type="target" position={Position.Top} />

            <div className="flex items-center gap-2 mb-2">
                <div className="p-2 rounded-lg bg-stone-500/20">
                    <Timer className="h-4 w-4 text-stone-600" />
                </div>
                <div className="flex-1">
                    <div className="font-semibold text-sm">Delay</div>
                    <div className="text-xs text-muted-foreground">Pause Execution</div>
                </div>
            </div>

            <div className="text-xs space-y-1 mt-3 p-2 bg-muted/50 rounded">
                <div><strong>Duration:</strong> {String(data.duration || '0')} {String(data.unit || 'seconds')}</div>
                <div className="text-muted-foreground mt-1">
                    Waits before continuing
                </div>
            </div>

            <Handle type="source" position={Position.Bottom} />
        </div>
    )
}
