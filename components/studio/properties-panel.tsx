"use client"

import * as React from "react"
import { ComponentData } from "@/components/studio/component-renderer"
import { ActionConfigurator } from "@/components/studio/action-configurator"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Trash2 } from "lucide-react"

interface PropertiesPanelProps {
    component: ComponentData | null
    onUpdate: (id: string, newProps: Record<string, any>) => void
    onDelete: (id: string) => void
    onEventsUpdate: (id: string, events: { [eventName: string]: any[] }) => void
}

export function PropertiesPanel({ component, onUpdate, onDelete, onEventsUpdate }: PropertiesPanelProps) {
    if (!component) {
        return (
            <div className="w-64 border-l bg-background p-4 flex flex-col items-center justify-center text-center h-full text-muted-foreground">
                <p className="text-sm">Select a component on the canvas to edit its properties.</p>
            </div>
        )
    }

    const handleChange = (key: string, value: any) => {
        onUpdate(component.id, { ...component.props, [key]: value })
    }

    return (
        <div className="w-64 border-l bg-background flex flex-col h-full">
            <div className="p-4 border-b">
                <h2 className="font-semibold text-sm flex items-center gap-2">
                    Properties
                    <span className="text-xs font-normal text-muted-foreground bg-muted px-1.5 py-0.5 rounded capitalize">
                        {component.type}
                    </span>
                </h2>
                <div className="text-xs text-muted-foreground mt-1 truncate">
                    ID: {component.id}
                </div>
            </div>

            <Tabs defaultValue="properties" className="flex-1 flex flex-col overflow-hidden">
                <TabsList className="w-full grid grid-cols-2 mx-4 mt-2">
                    <TabsTrigger value="properties">Properties</TabsTrigger>
                    <TabsTrigger value="events">Events</TabsTrigger>
                </TabsList>

                <TabsContent value="properties" className="flex-1 overflow-y-auto p-4 space-y-6 mt-0">
                    {/* Specific Properties based on Type */}
                    {component.type === "text" && (
                        <div className="space-y-4">
                            <div className="grid gap-2">
                                <Label htmlFor="content">Content</Label>
                                <Input
                                    id="content"
                                    value={component.props.content || ""}
                                    onChange={(e) => handleChange("content", e.target.value)}
                                />
                            </div>
                        </div>
                    )}

                    {component.type === "button" && (
                        <div className="space-y-4">
                            <div className="grid gap-2">
                                <Label htmlFor="label">Label</Label>
                                <Input
                                    id="label"
                                    value={component.props.label || ""}
                                    onChange={(e) => handleChange("label", e.target.value)}
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="variant">Variant</Label>
                                <Select
                                    value={component.props.variant || "default"}
                                    onValueChange={(v) => handleChange("variant", v)}
                                >
                                    <SelectTrigger id="variant">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="default">Default</SelectItem>
                                        <SelectItem value="secondary">Secondary</SelectItem>
                                        <SelectItem value="outline">Outline</SelectItem>
                                        <SelectItem value="ghost">Ghost</SelectItem>
                                        <SelectItem value="destructive">Destructive</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    )}

                    {component.type === "image" && (
                        <div className="space-y-4">
                            <div className="grid gap-2">
                                <Label htmlFor="src">Image URL</Label>
                                <Input
                                    id="src"
                                    value={component.props.src || ""}
                                    placeholder="https://..."
                                    onChange={(e) => handleChange("src", e.target.value)}
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="alt">Alt Text</Label>
                                <Input
                                    id="alt"
                                    value={component.props.alt || ""}
                                    onChange={(e) => handleChange("alt", e.target.value)}
                                />
                            </div>
                        </div>
                    )}

                    {(component.type === "input" || component.type === "checkbox") && (
                        <div className="space-y-4">
                            <div className="grid gap-2">
                                <Label htmlFor="label">Label</Label>
                                <Input
                                    id="label"
                                    value={component.props.label || ""}
                                    onChange={(e) => handleChange("label", e.target.value)}
                                />
                            </div>
                            {component.type === "input" && (
                                <div className="grid gap-2">
                                    <Label htmlFor="placeholder">Placeholder</Label>
                                    <Input
                                        id="placeholder"
                                        value={component.props.placeholder || ""}
                                        onChange={(e) => handleChange("placeholder", e.target.value)}
                                    />
                                </div>
                            )}
                        </div>
                    )}

                    <Separator />

                    {/* Style / Layout (Basic) */}
                    <div className="space-y-4">
                        <h3 className="text-xs font-semibold text-muted-foreground">Style</h3>
                        <div className="grid gap-2">
                            <Label htmlFor="className">CSS Classes</Label>
                            <Input
                                id="className"
                                value={component.props.className || ""}
                                placeholder="p-4 bg-red-500..."
                                onChange={(e) => handleChange("className", e.target.value)}
                            />
                        </div>
                    </div>
                </TabsContent>

                <TabsContent value="events" className="flex-1 overflow-y-auto p-4 mt-0">
                    <ActionConfigurator
                        componentId={component.id}
                        events={component.events}
                        onEventsChange={onEventsUpdate}
                    />
                </TabsContent>
            </Tabs>

            <div className="p-4 border-t bg-muted/10">
                <Button
                    variant="destructive"
                    size="sm"
                    className="w-full"
                    onClick={() => onDelete(component.id)}
                >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Component
                </Button>
            </div>
        </div>
    )
}

