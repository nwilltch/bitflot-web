"use client"

import { Handle, Position, NodeProps } from '@xyflow/react'
import { Sparkles } from 'lucide-react'

export function OpenAINode({ data, selected }: NodeProps) {
    return (
        <div className={`border-2 rounded-lg p-4 bg-background min-w-[200px] ${selected ? 'border-primary shadow-lg' : 'border-purple-500'
            }`}>
            <Handle type="target" position={Position.Top} />

            <div className="flex items-center gap-2 mb-2">
                <div className="p-2 rounded-lg bg-purple-500/20">
                    <Sparkles className="h-4 w-4 text-purple-600" />
                </div>
                <div className="flex-1">
                    <div className="font-semibold text-sm">OpenAI</div>
                    <div className="text-xs text-muted-foreground">AI Processing</div>
                </div>
                <div className="px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-600 text-xs font-semibold">
                    PRO
                </div>
            </div>

            <div className="text-xs space-y-1 mt-3 p-2 bg-muted/50 rounded">
                <div><strong>Model:</strong> {data.model || 'gpt-4'}</div>
                <div><strong>Max Tokens:</strong> {data.maxTokens || 500}</div>
                <div className="text-muted-foreground mt-2">
                    Executes server-side with secure API keys
                </div>
            </div>

            <Handle type="source" position={Position.Bottom} />
        </div>
    )
}
