"use client"

import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Node } from '@xyflow/react'

interface EnhancedPropertiesPanelProps {
    selectedNode: Node | null
    allNodes: Node[]
    onClose: () => void
    onUpdateNode: (nodeId: string, data: any) => void
}

export function EnhancedPropertiesPanel({
    selectedNode,
    allNodes,
    onClose,
    onUpdateNode
}: EnhancedPropertiesPanelProps) {
    if (!selectedNode) return null

    const resourceNodes = allNodes.filter(n => n.type === 'schema')

    const handleLabelChange = (value: string) => {
        onUpdateNode(selectedNode.id, { ...selectedNode.data, label: value })
    }

    const handleResourceConnection = (resourceId: string) => {
        onUpdateNode(selectedNode.id, { ...selectedNode.data, resourceId })
    }

    const handleLayoutChange = (layout: string) => {
        onUpdateNode(selectedNode.id, { ...selectedNode.data, layout })
    }

    const renderNodeSpecificFields = () => {
        switch (selectedNode.type) {
            case 'schema':
                return (
                    <div className="space-y-3">
                        <div>
                            <Label className="text-xs">Resource Type</Label>
                            <p className="text-sm text-muted-foreground mt-1">Data Table</p>
                        </div>
                        <div>
                            <Label className="text-xs">Fields</Label>
                            <p className="text-xs text-muted-foreground mt-1">
                                {(selectedNode.data.fields && Array.isArray(selectedNode.data.fields)) ? selectedNode.data.fields.length : 0} fields defined
                            </p>
                        </div>
                    </div>
                )

            case 'form':
                return (
                    <div className="space-y-3">
                        <div>
                            <Label htmlFor="resource-select" className="text-xs">Connect to Resource</Label>
                            <Select
                                value={selectedNode.data.resourceId || ''}
                                onValueChange={handleResourceConnection}
                            >
                                <SelectTrigger id="resource-select" className="h-8 text-xs mt-1">
                                    <SelectValue placeholder="Select a resource..." />
                                </SelectTrigger>
                                <SelectContent>
                                    {resourceNodes.length === 0 ? (
                                        <div className="p-2 text-xs text-muted-foreground">
                                            No resources available. Add a Resource node first.
                                        </div>
                                    ) : (
                                        resourceNodes.map(node => (
                                            <SelectItem key={node.id} value={node.id}>
                                                {node.data.label}
                                            </SelectItem>
                                        ))
                                    )}
                                </SelectContent>
                            </Select>
                        </div>
                        {selectedNode.data.resourceId && (
                            <div className="p-2 bg-muted/50 rounded text-xs">
                                <p className="font-medium">Form Mode</p>
                                <p className="text-muted-foreground mt-1">Create/Edit records</p>
                            </div>
                        )}
                    </div>
                )

            case 'list':
                return (
                    <div className="space-y-3">
                        <div>
                            <Label htmlFor="list-resource" className="text-xs">Data Source</Label>
                            <Select
                                value={selectedNode.data.resourceId || ''}
                                onValueChange={handleResourceConnection}
                            >
                                <SelectTrigger id="list-resource" className="h-8 text-xs mt-1">
                                    <SelectValue placeholder="Select a resource..." />
                                </SelectTrigger>
                                <SelectContent>
                                    {resourceNodes.length === 0 ? (
                                        <div className="p-2 text-xs text-muted-foreground">
                                            No resources available. Add a Resource node first.
                                        </div>
                                    ) : (
                                        resourceNodes.map(node => (
                                            <SelectItem key={node.id} value={node.id}>
                                                {node.data.label}
                                            </SelectItem>
                                        ))
                                    )}
                                </SelectContent>
                            </Select>
                        </div>
                        {selectedNode.data.resourceId && (
                            <div className="p-2 bg-muted/50 rounded text-xs">
                                <p className="font-medium">Display Mode</p>
                                <p className="text-muted-foreground mt-1">Table with pagination</p>
                            </div>
                        )}
                    </div>
                )

            case 'detail':
                return (
                    <div className="space-y-3">
                        <div>
                            <Label htmlFor="detail-resource" className="text-xs">Viewing Resource</Label>
                            <Select
                                value={selectedNode.data.resourceId || ''}
                                onValueChange={handleResourceConnection}
                            >
                                <SelectTrigger id="detail-resource" className="h-8 text-xs mt-1">
                                    <SelectValue placeholder="Select a resource..." />
                                </SelectTrigger>
                                <SelectContent>
                                    {resourceNodes.length === 0 ? (
                                        <div className="p-2 text-xs text-muted-foreground">
                                            No resources available. Add a Resource node first.
                                        </div>
                                    ) : (
                                        resourceNodes.map(node => (
                                            <SelectItem key={node.id} value={node.id}>
                                                {node.data.label}
                                            </SelectItem>
                                        ))
                                    )}
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label htmlFor="layout-select" className="text-xs">Layout</Label>
                            <Select
                                value={selectedNode.data.layout || 'single-column'}
                                onValueChange={handleLayoutChange}
                            >
                                <SelectTrigger id="layout-select" className="h-8 text-xs mt-1">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="single-column">Single Column</SelectItem>
                                    <SelectItem value="two-column">Two Columns</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                )

            default:
                return (
                    <div className="text-xs text-muted-foreground">
                        No additional properties available
                    </div>
                )
        }
    }

    return (
        <div className="absolute top-0 right-0 w-80 h-full bg-background border-l shadow-lg z-10 flex flex-col">
            <div className="p-4 border-b flex items-center justify-between">
                <h3 className="font-semibold text-sm">Properties</h3>
                <Button variant="ghost" size="icon" className="h-6 w-6" onClick={onClose}>
                    <X className="h-4 w-4" />
                </Button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                <Card>
                    <CardHeader className="p-3">
                        <CardTitle className="text-sm">Basic Settings</CardTitle>
                    </CardHeader>
                    <CardContent className="p-3 pt-0 space-y-3">
                        <div>
                            <Label htmlFor="node-label" className="text-xs">Label</Label>
                            <Input
                                id="node-label"
                                value={selectedNode.data.label || ''}
                                onChange={(e) => handleLabelChange(e.target.value)}
                                className="h-8 text-xs mt-1"
                                placeholder="Enter node label..."
                            />
                        </div>
                        <div>
                            <Label className="text-xs">Type</Label>
                            <p className="text-sm font-medium mt-1 capitalize">{selectedNode.type}</p>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="p-3">
                        <CardTitle className="text-sm">Configuration</CardTitle>
                    </CardHeader>
                    <CardContent className="p-3 pt-0">
                        {renderNodeSpecificFields()}
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="p-3">
                        <CardTitle className="text-sm">Node Info</CardTitle>
                    </CardHeader>
                    <CardContent className="p-3 pt-0 space-y-2 text-xs">
                        <div>
                            <span className="text-muted-foreground">ID:</span>
                            <span className="ml-2 font-mono">{selectedNode.id}</span>
                        </div>
                        <div>
                            <span className="text-muted-foreground">Position:</span>
                            <span className="ml-2">
                                x: {Math.round(selectedNode.position.x)},
                                y: {Math.round(selectedNode.position.y)}
                            </span>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
