"use client"

import { Handle, Position, NodeProps } from '@xyflow/react'
import { Plus, Edit, Trash2 } from 'lucide-react'

export function CreateRecordNode({ data, selected }: NodeProps) {
    return (
        <div className={`border-2 rounded-lg p-4 bg-background min-w-[200px] ${selected ? 'border-primary shadow-lg' : 'border-green-500'
            }`}>
            <Handle type="target" position={Position.Top} />

            <div className="flex items-center gap-2 mb-2">
                <div className="p-2 rounded-lg bg-green-500/20">
                    <Plus className="h-4 w-4 text-green-600" />
                </div>
                <div className="flex-1">
                    <div className="font-semibold text-sm">Create Record</div>
                    <div className="text-xs text-muted-foreground">Insert Data</div>
                </div>
            </div>

            <div className="text-xs space-y-1 mt-3 p-2 bg-muted/50 rounded">
                <div><strong>Resource:</strong> {data.resource || 'None'}</div>
                <div><strong>Fields:</strong> {Object.keys(data.fields || {}).length}</div>
            </div>

            <Handle type="source" position={Position.Bottom} />
        </div>
    )
}

export function UpdateRecordNode({ data, selected }: NodeProps) {
    return (
        <div className={`border-2 rounded-lg p-4 bg-background min-w-[200px] ${selected ? 'border-primary shadow-lg' : 'border-orange-500'
            }`}>
            <Handle type="target" position={Position.Top} />

            <div className="flex items-center gap-2 mb-2">
                <div className="p-2 rounded-lg bg-orange-500/20">
                    <Edit className="h-4 w-4 text-orange-600" />
                </div>
                <div className="flex-1">
                    <div className="font-semibold text-sm">Update Record</div>
                    <div className="text-xs text-muted-foreground">Modify Data</div>
                </div>
            </div>

            <div className="text-xs space-y-1 mt-3 p-2 bg-muted/50 rounded">
                <div><strong>Resource:</strong> {data.resource || 'None'}</div>
                <div><strong>Updates:</strong> {Object.keys(data.updates || {}).length}</div>
            </div>

            <Handle type="source" position={Position.Bottom} />
        </div>
    )
}

export function DeleteRecordNode({ data, selected }: NodeProps) {
    return (
        <div className={`border-2 rounded-lg p-4 bg-background min-w-[200px] ${selected ? 'border-primary shadow-lg' : 'border-red-500'
            }`}>
            <Handle type="target" position={Position.Top} />

            <div className="flex items-center gap-2 mb-2">
                <div className="p-2 rounded-lg bg-red-500/20">
                    <Trash2 className="h-4 w-4 text-red-600" />
                </div>
                <div className="flex-1">
                    <div className="font-semibold text-sm">Delete Record</div>
                    <div className="text-xs text-muted-foreground">Remove Data</div>
                </div>
            </div>

            <div className="text-xs space-y-1 mt-3 p-2 bg-muted/50 rounded">
                <div><strong>Resource:</strong> {data.resource || 'None'}</div>
                <div className="text-red-600 text-xs mt-1">⚠️ Permanent deletion</div>
            </div>

            <Handle type="source" position={Position.Bottom} />
        </div>
    )
}
