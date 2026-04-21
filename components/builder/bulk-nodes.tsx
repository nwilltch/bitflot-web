"use client"

import { Handle, Position, NodeProps } from '@xyflow/react'
import { Layers, Download, Upload } from 'lucide-react'

export function BulkUpdateNode({ data, selected }: NodeProps) {
    return (
        <div className={`border-2 rounded-lg p-4 bg-background min-w-[200px] ${selected ? 'border-primary shadow-lg' : 'border-emerald-500'
            }`}>
            <Handle type="target" position={Position.Top} />

            <div className="flex items-center gap-2 mb-2">
                <div className="p-2 rounded-lg bg-emerald-500/20">
                    <Layers className="h-4 w-4 text-emerald-600" />
                </div>
                <div className="flex-1">
                    <div className="font-semibold text-sm">Bulk Update</div>
                    <div className="text-xs text-muted-foreground">Batch Changes</div>
                </div>
            </div>

            <div className="text-xs space-y-1 mt-3 p-2 bg-muted/50 rounded">
                <div><strong>Resource:</strong> {String(data.resourceName || 'None')}</div>
                <div><strong>Filter:</strong> {String(data.filter || 'All')}</div>
                <div className="text-muted-foreground mt-1">
                    Updates multiple records at once
                </div>
            </div>

            <Handle type="source" position={Position.Bottom} />
        </div>
    )
}

export function ExportDataNode({ data, selected }: NodeProps) {
    return (
        <div className={`border-2 rounded-lg p-4 bg-background min-w-[200px] ${selected ? 'border-primary shadow-lg' : 'border-lime-500'
            }`}>
            <Handle type="target" position={Position.Top} />

            <div className="flex items-center gap-2 mb-2">
                <div className="p-2 rounded-lg bg-lime-500/20">
                    <Download className="h-4 w-4 text-lime-600" />
                </div>
                <div className="flex-1">
                    <div className="font-semibold text-sm">Export Data</div>
                    <div className="text-xs text-muted-foreground">Download CSV/JSON</div>
                </div>
            </div>

            <div className="text-xs space-y-1 mt-3 p-2 bg-muted/50 rounded">
                <div><strong>Format:</strong> {String(data.format || 'CSV')}</div>
                <div><strong>Resource:</strong> {String(data.resourceName || 'None')}</div>
            </div>

            <Handle type="source" position={Position.Bottom} />
        </div>
    )
}

export function ImportDataNode({ data, selected }: NodeProps) {
    return (
        <div className={`border-2 rounded-lg p-4 bg-background min-w-[200px] ${selected ? 'border-primary shadow-lg' : 'border-green-500'
            }`}>
            <Handle type="target" position={Position.Top} />

            <div className="flex items-center gap-2 mb-2">
                <div className="p-2 rounded-lg bg-green-500/20">
                    <Upload className="h-4 w-4 text-green-600" />
                </div>
                <div className="flex-1">
                    <div className="font-semibold text-sm">Import Data</div>
                    <div className="text-xs text-muted-foreground">Upload CSV/JSON</div>
                </div>
            </div>

            <div className="text-xs space-y-1 mt-3 p-2 bg-muted/50 rounded">
                <div><strong>Target:</strong> {String(data.resourceName || 'None')}</div>
                <div><strong>Mapping:</strong> {String(data.mapping || 'Auto')}</div>
            </div>

            <Handle type="source" position={Position.Bottom} />
        </div>
    )
}
