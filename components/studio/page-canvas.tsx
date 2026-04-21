"use client"

import * as React from "react"

import { Smartphone, Monitor, Tablet, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ComponentRenderer, ComponentData } from "@/components/studio/component-renderer"

interface PageCanvasProps {
    components: ComponentData[]
    selectedComponentId: string | null
    onComponentsChange: (components: ComponentData[]) => void
    onSelectComponent: (id: string | null) => void
}

export function PageCanvas({
    components,
    selectedComponentId,
    onComponentsChange,
    onSelectComponent
}: PageCanvasProps) {
    const [viewport, setViewport] = React.useState<"mobile" | "tablet" | "desktop">("mobile")

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault()
        e.dataTransfer.dropEffect = "copy"
    }

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault()
        const type = e.dataTransfer.getData("componentType")
        if (!type) return

        const newComponent: ComponentData = {
            id: Math.random().toString(36).substr(2, 9),
            type,
            props: {
                label: type === "button" ? "New Button" : type === "text" ? "New Text Block" : undefined,
                content: type === "text" ? "Double click to edit text" : undefined,
                placeholder: type === "input" ? "Enter text..." : undefined,
            },
            children: []
        }

        onComponentsChange([...components, newComponent])
        onSelectComponent(newComponent.id)
    }

    const handleDeleteSelected = () => {
        if (!selectedComponentId) return
        onComponentsChange(components.filter(c => c.id !== selectedComponentId))
        onSelectComponent(null)
    }

    return (
        <div className="flex-1 flex flex-col bg-muted/20 h-full relative">
            {/* Canvas Toolbar */}
            <div className="h-12 border-b bg-background flex items-center justify-between px-4 gap-2">
                <div className="flex-1"></div>
                <div className="flex items-center bg-muted/50 p-1 rounded-md">
                    <Button
                        variant="ghost"
                        size="icon"
                        className={cn("h-7 w-7", viewport === "mobile" && "bg-background shadow-sm")}
                        onClick={() => setViewport("mobile")}
                    >
                        <Smartphone className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        className={cn("h-7 w-7", viewport === "tablet" && "bg-background shadow-sm")}
                        onClick={() => setViewport("tablet")}
                    >
                        <Tablet className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        className={cn("h-7 w-7", viewport === "desktop" && "bg-background shadow-sm")}
                        onClick={() => setViewport("desktop")}
                    >
                        <Monitor className="h-4 w-4" />
                    </Button>
                </div>
                <div className="flex-1 flex justify-end">
                    {selectedComponentId && (
                        <Button variant="ghost" size="sm" onClick={handleDeleteSelected} className="text-destructive hover:text-destructive hover:bg-destructive/10">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                        </Button>
                    )}
                </div>
            </div>

            {/* Canvas Area */}
            <div className="flex-1 overflow-auto p-8 flex items-start justify-center" onClick={() => onSelectComponent(null)}>
                <div
                    className={cn(
                        "bg-background shadow-2xl transition-all duration-300 flex flex-col relative",
                        viewport === "mobile" && "w-[375px] min-h-[667px] rounded-[3rem] border-[8px] border-zinc-800 overflow-hidden",
                        viewport === "tablet" && "w-[768px] min-h-[1024px] rounded-xl border border-border",
                        viewport === "desktop" && "w-[1280px] min-h-[800px] rounded-md border border-border"
                    )}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                >
                    {/* Status Bar for Mobile */}
                    {viewport === "mobile" && (
                        <div className="h-6 bg-zinc-800 w-full flex items-center justify-between px-6 shrink-0">
                            <div className="text-[10px] font-medium text-white">9:41</div>
                            <div className="flex gap-1">
                                <div className="w-3 h-3 rounded-full bg-zinc-700" />
                                <div className="w-3 h-3 rounded-full bg-zinc-700" />
                            </div>
                        </div>
                    )}

                    {/* Canvas Content (Droppable Area) */}
                    <div className="flex-1 p-4 relative group overflow-y-auto">
                        {components.length === 0 && (
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-50">
                                <div className="border-2 border-dashed border-primary/20 rounded-lg p-4 bg-primary/5 text-primary text-sm font-medium flex items-center gap-2">
                                    <Plus className="h-4 w-4" />
                                    Drop components here
                                </div>
                            </div>
                        )}

                        <div className="space-y-2">
                            {components.map((component) => (
                                <div key={component.id} onClick={(e) => { e.stopPropagation(); onSelectComponent(component.id); }}>
                                    <ComponentRenderer
                                        component={component}
                                        isSelected={selectedComponentId === component.id}
                                        onClick={() => onSelectComponent(component.id)}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Home Indicator for Mobile */}
                    {viewport === "mobile" && (
                        <div className="h-1 bg-zinc-800 w-1/3 mx-auto rounded-full mb-2 shrink-0" />
                    )}
                </div>
            </div>
        </div>
    )
}
