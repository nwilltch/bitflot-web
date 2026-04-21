"use client"

import { Handle, Position, NodeProps } from '@xyflow/react'
import { MessageSquare, Globe, UploadCloud, Smartphone } from 'lucide-react'

export function SMSNode({ data, selected }: NodeProps) {
    return (
        <div className={`border-2 rounded-lg p-4 bg-background min-w-[200px] ${selected ? 'border-primary shadow-lg' : 'border-green-600'
            }`}>
            <Handle type="target" position={Position.Top} />

            <div className="flex items-center gap-2 mb-2">
                <div className="p-2 rounded-lg bg-green-600/20">
                    <MessageSquare className="h-4 w-4 text-green-700" />
                </div>
                <div className="flex-1">
                    <div className="font-semibold text-sm">Send SMS</div>
                    <div className="text-xs text-muted-foreground">Twilio Integration</div>
                </div>
            </div>

            <div className="text-xs space-y-1 mt-3 p-2 bg-muted/50 rounded">
                <div><strong>To:</strong> {String(data.to || '+1234567890')}</div>
                <div><strong>Message:</strong> {String(data.message || 'Hello').substring(0, 20)}...</div>
            </div>

            <Handle type="source" position={Position.Bottom} />
        </div>
    )
}

export function HTTPRequestNode({ data, selected }: NodeProps) {
    return (
        <div className={`border-2 rounded-lg p-4 bg-background min-w-[200px] ${selected ? 'border-primary shadow-lg' : 'border-indigo-600'
            }`}>
            <Handle type="target" position={Position.Top} />

            <div className="flex items-center gap-2 mb-2">
                <div className="p-2 rounded-lg bg-indigo-600/20">
                    <Globe className="h-4 w-4 text-indigo-700" />
                </div>
                <div className="flex-1">
                    <div className="font-semibold text-sm">HTTP Request</div>
                    <div className="text-xs text-muted-foreground">External API</div>
                </div>
            </div>

            <div className="text-xs space-y-1 mt-3 p-2 bg-muted/50 rounded">
                <div><strong>Method:</strong> {String(data.method || 'GET')}</div>
                <div className="truncate max-w-[150px]">{String(data.url || 'https://api.example.com')}</div>
            </div>

            <Handle type="source" position={Position.Bottom} />
        </div>
    )
}

export function FileUploadNode({ data, selected }: NodeProps) {
    return (
        <div className={`border-2 rounded-lg p-4 bg-background min-w-[200px] ${selected ? 'border-primary shadow-lg' : 'border-cyan-600'
            }`}>
            <Handle type="target" position={Position.Top} />

            <div className="flex items-center gap-2 mb-2">
                <div className="p-2 rounded-lg bg-cyan-600/20">
                    <UploadCloud className="h-4 w-4 text-cyan-700" />
                </div>
                <div className="flex-1">
                    <div className="font-semibold text-sm">File Upload</div>
                    <div className="text-xs text-muted-foreground">Storage Bucket</div>
                </div>
            </div>

            <div className="text-xs space-y-1 mt-3 p-2 bg-muted/50 rounded">
                <div><strong>Bucket:</strong> {String(data.bucket || 'uploads')}</div>
                <div><strong>Access:</strong> {String(data.access || 'private')}</div>
            </div>

            <Handle type="source" position={Position.Bottom} />
        </div>
    )
}

export function PushNotificationNode({ data, selected }: NodeProps) {
    return (
        <div className={`border-2 rounded-lg p-4 bg-background min-w-[200px] ${selected ? 'border-primary shadow-lg' : 'border-rose-600'
            }`}>
            <Handle type="target" position={Position.Top} />

            <div className="flex items-center gap-2 mb-2">
                <div className="p-2 rounded-lg bg-rose-600/20">
                    <Smartphone className="h-4 w-4 text-rose-700" />
                </div>
                <div className="flex-1">
                    <div className="font-semibold text-sm">Push Notification</div>
                    <div className="text-xs text-muted-foreground">Mobile Alert</div>
                </div>
            </div>

            <div className="text-xs space-y-1 mt-3 p-2 bg-muted/50 rounded">
                <div><strong>Title:</strong> {String(data.title || 'Alert')}</div>
                <div><strong>Body:</strong> {String(data.body || 'Message').substring(0, 20)}...</div>
            </div>

            <Handle type="source" position={Position.Bottom} />
        </div>
    )
}
