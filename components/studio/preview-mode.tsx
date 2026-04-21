"use client"

import * as React from "react"
import { ComponentData } from "@/components/studio/component-renderer"
import { ComponentRenderer } from "@/components/studio/component-renderer"
import { RuntimeProvider, useRuntime } from "@/components/studio/runtime-context"
import { Button } from "@/components/ui/button"
import { X, Play } from "lucide-react"

interface PreviewModeProps {
    components: ComponentData[]
    onClose: () => void
}

function PreviewContent({ components }: { components: ComponentData[] }) {
    const runtime = useRuntime()

    const handleEventTrigger = React.useCallback((componentId: string, eventName: string, eventData?: any) => {
        const component = findComponentById(components, componentId)
        if (component?.events?.[eventName]) {
            runtime.executeActionStack(component.events[eventName], eventData)
        }
    }, [components, runtime])

    return (
        <div className="flex-1 overflow-auto p-8 bg-muted/10">
            <div className="max-w-4xl mx-auto bg-background rounded-lg shadow-lg p-6">
                <div className="space-y-4">
                    {components.map((component) => (
                        <ComponentRendererWithEvents
                            key={component.id}
                            component={component}
                            onEventTrigger={(eventName, eventData) => handleEventTrigger(component.id, eventName, eventData)}
                        />
                    ))}
                    {components.length === 0 && (
                        <div className="text-center py-12 text-muted-foreground">
                            <p>No components to preview.</p>
                            <p className="text-sm mt-2">Add components in the Design tab first.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

function ComponentRendererWithEvents({
    component,
    onEventTrigger
}: {
    component: ComponentData
    onEventTrigger: (eventName: string, eventData?: any) => void
}) {
    return (
        <ComponentRenderer
            component={component}
            runtimeMode={true}
            onEventTrigger={onEventTrigger}
        />
    )
}

function findComponentById(components: ComponentData[], id: string): ComponentData | null {
    for (const component of components) {
        if (component.id === id) return component
        if (component.children) {
            const found = findComponentById(component.children, id)
            if (found) return found
        }
    }
    return null
}

export function PreviewMode({ components, onClose }: PreviewModeProps) {
    return (
        <div className="fixed inset-0 z-50 bg-background flex flex-col">
            {/* Preview Header */}
            <div className="h-14 border-b bg-background flex items-center justify-between px-6">
                <div className="flex items-center gap-3">
                    <Play className="h-5 w-5 text-primary" />
                    <h2 className="font-semibold">Preview Mode</h2>
                    <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                        Live Testing
                    </span>
                </div>
                <Button variant="ghost" size="icon" onClick={onClose}>
                    <X className="h-5 w-5" />
                </Button>
            </div>

            {/* Preview Content with Runtime */}
            <RuntimeProvider>
                <PreviewContent components={components} />
            </RuntimeProvider>
        </div>
    )
}
