"use client"

import { Handle, Position, NodeProps } from '@xyflow/react'
import { BarChart, Calendar } from 'lucide-react'

export function ChartViewNode({ data, selected }: NodeProps) {
    return (
        <div className={`border-2 rounded-lg p-4 bg-background min-w-[200px] ${selected ? 'border-primary shadow-lg' : 'border-indigo-500'
            }`}>
            <Handle type="target" position={Position.Top} />

            <div className="flex items-center gap-2 mb-2">
                <div className="p-2 rounded-lg bg-indigo-500/20">
                    <BarChart className="h-4 w-4 text-indigo-600" />
                </div>
                <div className="flex-1">
                    <div className="font-semibold text-sm">Chart View</div>
                    <div className="text-xs text-muted-foreground">Visualize Data</div>
                </div>
            </div>

            <div className="text-xs space-y-1 mt-3 p-2 bg-muted/50 rounded">
                <div><strong>Type:</strong> {String(data.chartType || 'Bar')}</div>
                <div><strong>Source:</strong> {String(data.dataSource || 'None')}</div>
                <div className="text-muted-foreground mt-1">
                    X: {String(data.xAxis || 'None')}, Y: {String(data.yAxis || 'None')}
                </div>
            </div>

            <Handle type="source" position={Position.Bottom} />
        </div>
    )
}

export function CalendarViewNode({ data, selected }: NodeProps) {
    return (
        <div className={`border-2 rounded-lg p-4 bg-background min-w-[200px] ${selected ? 'border-primary shadow-lg' : 'border-blue-500'
            }`}>
            <Handle type="target" position={Position.Top} />

            <div className="flex items-center gap-2 mb-2">
                <div className="p-2 rounded-lg bg-blue-500/20">
                    <Calendar className="h-4 w-4 text-blue-600" />
                </div>
                <div className="flex-1">
                    <div className="font-semibold text-sm">Calendar View</div>
                    <div className="text-xs text-muted-foreground">Date Display</div>
                </div>
            </div>

            <div className="text-xs space-y-1 mt-3 p-2 bg-muted/50 rounded">
                <div><strong>Source:</strong> {String(data.dataSource || 'None')}</div>
                <div><strong>Date Field:</strong> {String(data.dateField || 'date')}</div>
                <div><strong>Title Field:</strong> {String(data.titleField || 'title')}</div>
            </div>

            <Handle type="source" position={Position.Bottom} />
        </div>
    )
}
