"use client"

import { Handle, Position, NodeProps } from '@xyflow/react'
import { Copy, Link } from 'lucide-react'

export function DuplicateRecordNode({ data, selected }: NodeProps) {
    return (
        <div className={`border-2 rounded-lg p-4 bg-background min-w-[200px] ${selected ? 'border-primary shadow-lg' : 'border-sky-500'
            }`}>
            <Handle type="target" position={Position.Top} />

            <div className="flex items-center gap-2 mb-2">
                <div className="p-2 rounded-lg bg-sky-500/20">
                    <Copy className="h-4 w-4 text-sky-600" />
                </div>
                <div className="flex-1">
                    <div className="font-semibold text-sm">Duplicate</div>
                    <div className="text-xs text-muted-foreground">Clone Record</div>
                </div>
            </div>

            <div className="text-xs space-y-1 mt-3 p-2 bg-muted/50 rounded">
                <div><strong>Source ID:</strong> {String(data.sourceId || 'id')}</div>
                <div><strong>Overrides:</strong> {Object.keys(data.overrides || {}).length}</div>
            </div>

            <Handle type="source" position={Position.Bottom} />
        </div>
    )
}

export function LinkRecordsNode({ data, selected }: NodeProps) {
    return (
        <div className={`border-2 rounded-lg p-4 bg-background min-w-[200px] ${selected ? 'border-primary shadow-lg' : 'border-fuchsia-500'
            }`}>
            <Handle type="target" position={Position.Top} />

            <div className="flex items-center gap-2 mb-2">
                <div className="p-2 rounded-lg bg-fuchsia-500/20">
                    <Link className="h-4 w-4 text-fuchsia-600" />
                </div>
                <div className="flex-1">
                    <div className="font-semibold text-sm">Link Records</div>
                    <div className="text-xs text-muted-foreground">Create Relation</div>
                </div>
            </div>

            <div className="text-xs space-y-1 mt-3 p-2 bg-muted/50 rounded">
                <div><strong>Parent:</strong> {String(data.parentId || 'id')}</div>
                <div><strong>Child:</strong> {String(data.childId || 'id')}</div>
                <div><strong>Type:</strong> {String(data.relationType || '1:N')}</div>
            </div>

            <Handle type="source" position={Position.Bottom} />
        </div>
    )
}
