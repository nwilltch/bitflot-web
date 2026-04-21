"use client"

import * as React from "react"
import {
    Type,
    Image as ImageIcon,
    Square,
    LayoutTemplate,
    FormInput,
    CheckSquare,
    List,
    Columns
} from "lucide-react"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

interface DraggableComponentProps {
    type: string
    label: string
    icon: React.ReactNode
}

function DraggableComponent({ type, label, icon }: DraggableComponentProps) {
    return (
        <div
            className="flex items-center gap-3 p-3 rounded-md border bg-card hover:bg-accent hover:text-accent-foreground cursor-grab active:cursor-grabbing transition-colors shadow-sm"
            draggable
            onDragStart={(e) => {
                e.dataTransfer.setData("componentType", type)
            }}
        >
            <div className="text-muted-foreground">
                {icon}
            </div>
            <span className="text-sm font-medium">{label}</span>
        </div>
    )
}

export function ComponentSidebar() {
    return (
        <div className="w-64 border-r bg-background flex flex-col h-full">
            <div className="p-4 border-b">
                <h2 className="font-semibold text-sm">Components</h2>
            </div>
            <div className="flex-1 overflow-y-auto">
                <Accordion type="multiple" defaultValue={["layout", "basic", "forms"]} className="w-full">

                    <AccordionItem value="layout">
                        <AccordionTrigger className="px-4 py-2 text-sm hover:no-underline">Layout</AccordionTrigger>
                        <AccordionContent className="px-4 pb-4 pt-1 grid grid-cols-1 gap-2">
                            <DraggableComponent type="container" label="Container" icon={<Square className="h-4 w-4" />} />
                            <DraggableComponent type="columns" label="Columns" icon={<Columns className="h-4 w-4" />} />
                            <DraggableComponent type="list" label="List View" icon={<List className="h-4 w-4" />} />
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="basic">
                        <AccordionTrigger className="px-4 py-2 text-sm hover:no-underline">Basic</AccordionTrigger>
                        <AccordionContent className="px-4 pb-4 pt-1 grid grid-cols-1 gap-2">
                            <DraggableComponent type="text" label="Text" icon={<Type className="h-4 w-4" />} />
                            <DraggableComponent type="image" label="Image" icon={<ImageIcon className="h-4 w-4" />} />
                            <DraggableComponent type="button" label="Button" icon={<Square className="h-4 w-4" />} />
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="forms">
                        <AccordionTrigger className="px-4 py-2 text-sm hover:no-underline">Forms</AccordionTrigger>
                        <AccordionContent className="px-4 pb-4 pt-1 grid grid-cols-1 gap-2">
                            <DraggableComponent type="input" label="Input" icon={<FormInput className="h-4 w-4" />} />
                            <DraggableComponent type="checkbox" label="Checkbox" icon={<CheckSquare className="h-4 w-4" />} />
                        </AccordionContent>
                    </AccordionItem>

                </Accordion>
            </div>
        </div>
    )
}
