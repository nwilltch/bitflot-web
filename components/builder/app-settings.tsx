"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {
    Layers,
    Rocket,
    Zap,
    Database,
    FileText,
    MessageSquare,
    Briefcase,
    Calendar,
    Users,
    Settings,
    ChevronDown
} from "lucide-react"

const AVAILABLE_ICONS = [
    { name: "Layers", icon: Layers },
    { name: "Rocket", icon: Rocket },
    { name: "Zap", icon: Zap },
    { name: "Database", icon: Database },
    { name: "FileText", icon: FileText },
    { name: "MessageSquare", icon: MessageSquare },
    { name: "Briefcase", icon: Briefcase },
    { name: "Calendar", icon: Calendar },
    { name: "Users", icon: Users },
    { name: "Settings", icon: Settings },
]

const AVAILABLE_COLORS = [
    { name: "Blue", value: "#3b82f6" },
    { name: "Purple", value: "#a855f7" },
    { name: "Green", value: "#22c55e" },
    { name: "Orange", value: "#f97316" },
    { name: "Pink", value: "#ec4899" },
    { name: "Red", value: "#ef4444" },
    { name: "Yellow", value: "#eab308" },
    { name: "Teal", value: "#14b8a6" },
]

interface AppSettingsProps {
    appName: string
    appIcon: string
    appColor: string
    onUpdate: (settings: { name: string; icon: string; color: string }) => void
}

export function AppSettings({ appName, appIcon, appColor, onUpdate }: AppSettingsProps) {
    const [name, setName] = useState(appName)
    const [selectedIcon, setSelectedIcon] = useState(appIcon)
    const [selectedColor, setSelectedColor] = useState(appColor)
    const [open, setOpen] = useState(false)

    const handleSave = () => {
        onUpdate({ name, icon: selectedIcon, color: selectedColor })
        setOpen(false)
    }

    const SelectedIcon = AVAILABLE_ICONS.find(i => i.name === selectedIcon)?.icon || Layers

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button variant="ghost" className="gap-2 font-semibold hover:bg-muted">
                    <div
                        className="p-1.5 rounded-md"
                        style={{ backgroundColor: selectedColor + "20", color: selectedColor }}
                    >
                        <SelectedIcon className="h-4 w-4" />
                    </div>
                    <span>{name}</span>
                    <ChevronDown className="h-3 w-3 text-muted-foreground" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80" align="start">
                <div className="space-y-4">
                    <div className="space-y-2">
                        <h4 className="font-medium text-sm">App Settings</h4>
                        <p className="text-xs text-muted-foreground">
                            Customize your app's name, icon, and color
                        </p>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="app-name" className="text-xs">App Name</Label>
                        <Input
                            id="app-name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter app name..."
                            className="h-8 text-sm"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label className="text-xs">Icon</Label>
                        <div className="grid grid-cols-5 gap-2">
                            {AVAILABLE_ICONS.map((iconItem) => {
                                const Icon = iconItem.icon
                                return (
                                    <button
                                        key={iconItem.name}
                                        onClick={() => setSelectedIcon(iconItem.name)}
                                        className={`p-2 rounded-md border transition-colors hover:bg-muted ${selectedIcon === iconItem.name
                                            ? "border-primary bg-primary/10"
                                            : "border-border"
                                            }`}
                                    >
                                        <Icon className="h-4 w-4 mx-auto" />
                                    </button>
                                )
                            })}
                        </div>
                    </div>

                    {/* Color picker removed - design system locked to default blue */}
                    {/* Per architecture requirements: strict Shadcn/Tailwind, no Creator customization */}

                    <div className="flex gap-2 pt-2">
                        <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setOpen(false)}
                            className="flex-1"
                        >
                            Cancel
                        </Button>
                        <Button
                            size="sm"
                            onClick={handleSave}
                            className="flex-1"
                        >
                            Save
                        </Button>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    )
}
