"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

export interface Action {
    id: string
    type: 'create_record' | 'update_record' | 'delete_record' | 'navigate' | 'show_message' | 'send_email'
    config: Record<string, any>
}

export interface ComponentData {
    id: string
    type: string
    props: Record<string, any>
    events?: {
        [eventName: string]: Action[]
    }
    children?: ComponentData[]
}

interface ComponentRendererProps {
    component: ComponentData
    isSelected?: boolean
    onClick?: (e: React.MouseEvent) => void
    runtimeMode?: boolean
    onEventTrigger?: (eventName: string, eventData?: any) => void
}

export function ComponentRenderer({
    component,
    isSelected,
    onClick,
    runtimeMode = false,
    onEventTrigger
}: ComponentRendererProps) {
    const { type, props, children } = component

    const handleRuntimeClick = React.useCallback((e: React.MouseEvent) => {
        if (runtimeMode && onEventTrigger) {
            e.stopPropagation()
            onEventTrigger('onClick')
        } else if (onClick) {
            onClick(e)
        }
    }, [runtimeMode, onEventTrigger, onClick])

    const commonProps = {
        onClick: handleRuntimeClick,
        className: cn(
            "relative transition-all duration-200 outline-none",
            isSelected && "ring-2 ring-primary ring-offset-2",
            props.className
        )
    }

    switch (type) {
        case "container":
            return (
                <div {...commonProps} className={cn("p-4 border border-dashed border-border min-h-[100px] rounded-md", commonProps.className)}>
                    {children?.map((child) => (
                        <ComponentRenderer
                            key={child.id}
                            component={child}
                            isSelected={false}
                            onClick={onClick}
                            runtimeMode={runtimeMode}
                            onEventTrigger={onEventTrigger}
                        />
                    ))}
                    {(!children || children.length === 0) && (
                        <div className="text-xs text-muted-foreground text-center py-8">Container</div>
                    )}
                </div>
            )

        case "columns":
            return (
                <div {...commonProps} className={cn("grid grid-cols-2 gap-4", commonProps.className)}>
                    <div className="p-4 border border-dashed border-border min-h-[100px] rounded-md bg-muted/10">
                        {/* Column 1 Content */}
                    </div>
                    <div className="p-4 border border-dashed border-border min-h-[100px] rounded-md bg-muted/10">
                        {/* Column 2 Content */}
                    </div>
                </div>
            )

        case "text":
            return (
                <p {...commonProps} className={cn("text-base", commonProps.className)}>
                    {props.content || "Edit this text"}
                </p>
            )

        case "image":
            return (
                <div {...commonProps} className={cn("w-full h-48 bg-muted rounded-md flex items-center justify-center overflow-hidden", commonProps.className)}>
                    {props.src ? (
                        <img src={props.src} alt="Component" className="w-full h-full object-cover" />
                    ) : (
                        <span className="text-muted-foreground">Image Placeholder</span>
                    )}
                </div>
            )

        case "button":
            return (
                <Button {...commonProps} variant={props.variant || "default"}>
                    {props.label || "Click Me"}
                </Button>
            )

        case "input":
            return (
                <div {...commonProps} className={cn("grid w-full max-w-sm items-center gap-1.5", commonProps.className)}>
                    <Label htmlFor={component.id}>{props.label || "Label"}</Label>
                    <Input type={props.inputType || "text"} id={component.id} placeholder={props.placeholder || "Placeholder"} />
                </div>
            )

        case "checkbox":
            return (
                <div {...commonProps} className={cn("flex items-center space-x-2", commonProps.className)}>
                    <Checkbox id={component.id} />
                    <Label htmlFor={component.id}>{props.label || "Accept terms"}</Label>
                </div>
            )

        case "list":
            return (
                <div {...commonProps} className={cn("border border-dashed border-border rounded-md p-4 min-h-[200px]", commonProps.className)}>
                    <div className="text-xs text-muted-foreground mb-2">List View</div>
                    <div className="space-y-2">
                        <div className="p-2 bg-muted/50 rounded text-sm">List Item 1</div>
                        <div className="p-2 bg-muted/50 rounded text-sm">List Item 2</div>
                        <div className="p-2 bg-muted/50 rounded text-sm">List Item 3</div>
                    </div>
                </div>
            )

        default:
            return (
                <div {...commonProps} className="p-2 border border-destructive/50 bg-destructive/10 text-destructive text-xs rounded">
                    Unknown component: {type}
                </div>
            )
    }
}
