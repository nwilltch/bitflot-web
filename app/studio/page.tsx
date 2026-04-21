"use client"

import * as React from "react"
import { DataSchemaEditor } from "@/components/studio/data-schema-editor"
import { PageCanvas } from "@/components/studio/page-canvas"
import { ComponentSidebar } from "@/components/studio/component-sidebar"
import { PropertiesPanel } from "@/components/studio/properties-panel"
import { PreviewMode } from "@/components/studio/preview-mode"
import { ComponentData } from "@/components/studio/component-renderer"
import { cn } from "@/lib/utils"
import { Play } from "lucide-react"

type StudioTab = "data" | "design" | "logic"

export default function StudioPage() {
    const [activeTab, setActiveTab] = React.useState<StudioTab>("data")
    const [showPreview, setShowPreview] = React.useState(false)

    // Page Builder State (Lifted)
    const [components, setComponents] = React.useState<ComponentData[]>([])
    const [selectedComponentId, setSelectedComponentId] = React.useState<string | null>(null)

    const selectedComponent = React.useMemo(() =>
        components.find(c => c.id === selectedComponentId) || null
        , [components, selectedComponentId])

    const handleUpdateComponent = (id: string, newProps: Record<string, any>) => {
        setComponents(components.map(c =>
            c.id === id ? { ...c, props: newProps } : c
        ))
    }

    const handleDeleteComponent = (id: string) => {
        setComponents(components.filter(c => c.id !== id))
        if (selectedComponentId === id) {
            setSelectedComponentId(null)
        }
    }

    const handleEventsUpdate = (id: string, events: { [eventName: string]: any[] }) => {
        setComponents(components.map(c =>
            c.id === id ? { ...c, events } : c
        ))
    }

    if (showPreview) {
        return <PreviewMode components={components} onClose={() => setShowPreview(false)} />
    }

    return (
        <div className="flex flex-col h-screen">
            <div className="border-b px-6 py-3 flex items-center justify-between bg-background">
                <div className="flex items-center gap-4">
                    <h1 className="font-bold text-lg">Bitflot Studio</h1>
                    <div className="flex items-center gap-1 bg-muted p-1 rounded-md text-sm">
                        <button
                            onClick={() => setActiveTab("data")}
                            className={cn(
                                "px-3 py-1 rounded-sm font-medium transition-all",
                                activeTab === "data" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"
                            )}
                        >
                            Data
                        </button>
                        <button
                            onClick={() => setActiveTab("design")}
                            className={cn(
                                "px-3 py-1 rounded-sm font-medium transition-all",
                                activeTab === "design" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"
                            )}
                        >
                            Design
                        </button>
                        <button
                            onClick={() => setActiveTab("logic")}
                            className={cn(
                                "px-3 py-1 rounded-sm font-medium transition-all",
                                activeTab === "logic" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"
                            )}
                        >
                            Logic
                        </button>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setShowPreview(true)}
                        className="px-4 py-2 bg-secondary text-secondary-foreground rounded-md text-sm font-medium hover:bg-secondary/90 flex items-center gap-2"
                    >
                        <Play className="h-4 w-4" />
                        Preview
                    </button>
                    <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90">
                        Publish App
                    </button>
                </div>
            </div>
            <div className="flex-1 overflow-hidden">
                {activeTab === "data" && <DataSchemaEditor />}
                {activeTab === "design" && (
                    <div className="flex h-full">
                        <ComponentSidebar />
                        <PageCanvas
                            components={components}
                            selectedComponentId={selectedComponentId}
                            onComponentsChange={setComponents}
                            onSelectComponent={setSelectedComponentId}
                        />
                        <PropertiesPanel
                            component={selectedComponent}
                            onUpdate={handleUpdateComponent}
                            onDelete={handleDeleteComponent}
                            onEventsUpdate={handleEventsUpdate}
                        />
                    </div>
                )}
                {activeTab === "logic" && (
                    <div className="flex items-center justify-center h-full text-muted-foreground">
                        Logic Editor Coming Soon
                    </div>
                )}
            </div>
        </div>
    )
}
