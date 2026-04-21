"use client"

import * as React from "react"
import { Action } from "@/components/studio/component-renderer"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Plus, Trash2, ChevronDown, ChevronUp } from "lucide-react"
import { Card } from "@/components/ui/card"

interface ActionConfiguratorProps {
    componentId: string
    events?: { [eventName: string]: Action[] }
    onEventsChange: (componentId: string, events: { [eventName: string]: Action[] }) => void
}

const EVENT_TYPES = [
    { value: 'onClick', label: 'On Click' },
    { value: 'onSubmit', label: 'On Submit' },
    { value: 'onLoad', label: 'On Load' },
    { value: 'onChange', label: 'On Change' },
]

const ACTION_TYPES = [
    { value: 'create_record', label: 'Create Record' },
    { value: 'update_record', label: 'Update Record' },
    { value: 'delete_record', label: 'Delete Record' },
    { value: 'navigate', label: 'Navigate To' },
    { value: 'show_message', label: 'Show Message' },
    { value: 'send_email', label: 'Send Email' },
]

export function ActionConfigurator({ componentId, events = {}, onEventsChange }: ActionConfiguratorProps) {
    const [selectedEvent, setSelectedEvent] = React.useState<string>('onClick')
    const [expandedActionId, setExpandedActionId] = React.useState<string | null>(null)

    const currentActions = events[selectedEvent] || []

    const handleAddAction = () => {
        const newAction: Action = {
            id: Math.random().toString(36).substr(2, 9),
            type: 'show_message',
            config: { message: 'Hello!', type: 'success' }
        }

        const updatedEvents = {
            ...events,
            [selectedEvent]: [...currentActions, newAction]
        }

        onEventsChange(componentId, updatedEvents)
        setExpandedActionId(newAction.id)
    }

    const handleDeleteAction = (actionId: string) => {
        const updatedEvents = {
            ...events,
            [selectedEvent]: currentActions.filter(a => a.id !== actionId)
        }

        onEventsChange(componentId, updatedEvents)
        if (expandedActionId === actionId) {
            setExpandedActionId(null)
        }
    }

    const handleUpdateAction = (actionId: string, updates: Partial<Action>) => {
        const updatedEvents = {
            ...events,
            [selectedEvent]: currentActions.map(a =>
                a.id === actionId ? { ...a, ...updates } : a
            )
        }

        onEventsChange(componentId, updatedEvents)
    }

    const handleMoveAction = (actionId: string, direction: 'up' | 'down') => {
        const index = currentActions.findIndex(a => a.id === actionId)
        if (index === -1) return
        if (direction === 'up' && index === 0) return
        if (direction === 'down' && index === currentActions.length - 1) return

        const newIndex = direction === 'up' ? index - 1 : index + 1
        const newActions = [...currentActions]
        const [removed] = newActions.splice(index, 1)
        newActions.splice(newIndex, 0, removed)

        const updatedEvents = {
            ...events,
            [selectedEvent]: newActions
        }

        onEventsChange(componentId, updatedEvents)
    }

    return (
        <div className="space-y-4">
            <div className="grid gap-2">
                <Label htmlFor="event-type">Event Type</Label>
                <Select value={selectedEvent} onValueChange={setSelectedEvent}>
                    <SelectTrigger id="event-type">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        {EVENT_TYPES.map(event => (
                            <SelectItem key={event.value} value={event.value}>
                                {event.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <Separator />

            <div className="space-y-2">
                <div className="flex items-center justify-between">
                    <Label className="text-sm font-medium">Actions</Label>
                    <span className="text-xs text-muted-foreground">
                        {currentActions.length} action{currentActions.length !== 1 ? 's' : ''}
                    </span>
                </div>

                {currentActions.length === 0 && (
                    <div className="text-center py-8 text-sm text-muted-foreground border border-dashed rounded-md">
                        No actions configured
                    </div>
                )}

                <div className="space-y-2">
                    {currentActions.map((action, index) => (
                        <ActionItem
                            key={action.id}
                            action={action}
                            index={index}
                            isExpanded={expandedActionId === action.id}
                            onToggleExpand={() => setExpandedActionId(expandedActionId === action.id ? null : action.id)}
                            onUpdate={(updates) => handleUpdateAction(action.id, updates)}
                            onDelete={() => handleDeleteAction(action.id)}
                            onMoveUp={() => handleMoveAction(action.id, 'up')}
                            onMoveDown={() => handleMoveAction(action.id, 'down')}
                            canMoveUp={index > 0}
                            canMoveDown={index < currentActions.length - 1}
                        />
                    ))}
                </div>

                <Button onClick={handleAddAction} variant="outline" size="sm" className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Action
                </Button>
            </div>
        </div>
    )
}

interface ActionItemProps {
    action: Action
    index: number
    isExpanded: boolean
    onToggleExpand: () => void
    onUpdate: (updates: Partial<Action>) => void
    onDelete: () => void
    onMoveUp: () => void
    onMoveDown: () => void
    canMoveUp: boolean
    canMoveDown: boolean
}

function ActionItem({
    action,
    index,
    isExpanded,
    onToggleExpand,
    onUpdate,
    onDelete,
    onMoveUp,
    onMoveDown,
    canMoveUp,
    canMoveDown
}: ActionItemProps) {
    const actionType = ACTION_TYPES.find(t => t.value === action.type)

    return (
        <Card className="p-3">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 flex-1">
                    <span className="text-xs font-medium text-muted-foreground w-6">{index + 1}.</span>
                    <button
                        onClick={onToggleExpand}
                        className="flex items-center gap-2 flex-1 text-left hover:text-primary transition-colors"
                    >
                        <span className="text-sm font-medium">{actionType?.label || action.type}</span>
                        {isExpanded ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                    </button>
                </div>
                <div className="flex items-center gap-1">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={onMoveUp}
                        disabled={!canMoveUp}
                    >
                        <ChevronUp className="h-3 w-3" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={onMoveDown}
                        disabled={!canMoveDown}
                    >
                        <ChevronDown className="h-3 w-3" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 text-destructive hover:text-destructive"
                        onClick={onDelete}
                    >
                        <Trash2 className="h-3 w-3" />
                    </Button>
                </div>
            </div>

            {isExpanded && (
                <div className="mt-3 pt-3 border-t space-y-3">
                    <div className="grid gap-2">
                        <Label htmlFor={`action-type-${action.id}`}>Action Type</Label>
                        <Select
                            value={action.type}
                            onValueChange={(value) => onUpdate({ type: value as Action['type'] })}
                        >
                            <SelectTrigger id={`action-type-${action.id}`}>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                {ACTION_TYPES.map(type => (
                                    <SelectItem key={type.value} value={type.value}>
                                        {type.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <ActionConfig action={action} onUpdate={onUpdate} />
                </div>
            )}
        </Card>
    )
}

interface ActionConfigProps {
    action: Action
    onUpdate: (updates: Partial<Action>) => void
}

function ActionConfig({ action, onUpdate }: ActionConfigProps) {
    const updateConfig = (key: string, value: any) => {
        onUpdate({
            config: { ...action.config, [key]: value }
        })
    }

    switch (action.type) {
        case 'show_message':
            return (
                <div className="space-y-3">
                    <div className="grid gap-2">
                        <Label>Message</Label>
                        <Input
                            value={action.config.message || ''}
                            onChange={(e) => updateConfig('message', e.target.value)}
                            placeholder="Enter message..."
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label>Type</Label>
                        <Select
                            value={action.config.type || 'success'}
                            onValueChange={(v) => updateConfig('type', v)}
                        >
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="success">Success</SelectItem>
                                <SelectItem value="error">Error</SelectItem>
                                <SelectItem value="info">Info</SelectItem>
                                <SelectItem value="warning">Warning</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            )

        case 'navigate':
            return (
                <div className="grid gap-2">
                    <Label>Destination</Label>
                    <Input
                        value={action.config.path || ''}
                        onChange={(e) => updateConfig('path', e.target.value)}
                        placeholder="/dashboard"
                    />
                </div>
            )

        case 'create_record':
        case 'update_record':
        case 'delete_record':
            return (
                <div className="grid gap-2">
                    <Label>Table</Label>
                    <Input
                        value={action.config.table || ''}
                        onChange={(e) => updateConfig('table', e.target.value)}
                        placeholder="users"
                    />
                </div>
            )

        case 'send_email':
            return (
                <div className="space-y-3">
                    <div className="grid gap-2">
                        <Label>To</Label>
                        <Input
                            value={action.config.to || ''}
                            onChange={(e) => updateConfig('to', e.target.value)}
                            placeholder="user@example.com"
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label>Subject</Label>
                        <Input
                            value={action.config.subject || ''}
                            onChange={(e) => updateConfig('subject', e.target.value)}
                            placeholder="Email subject"
                        />
                    </div>
                </div>
            )

        default:
            return null
    }
}
