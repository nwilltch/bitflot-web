"use client"

import * as React from "react"
import { Plus, Table as TableIcon, Trash2, MoreVertical, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DataSpreadsheetView } from "@/components/studio/data-spreadsheet-view"

// Types for our Data Schema
type FieldType = "text" | "number" | "email" | "boolean" | "date" | "relation" | "json"

interface SchemaField {
    id: string
    name: string
    type: FieldType
    required: boolean
    unique: boolean
}

interface SchemaTable {
    id: string
    name: string
    description?: string
    fields: SchemaField[]
}

export function DataSchemaEditor() {
    // Load initial data from localStorage or use defaults
    const getInitialTables = (): SchemaTable[] => {
        if (typeof window === 'undefined') return []

        const stored = localStorage.getItem('bitflot_schema_tables')
        if (stored) {
            try {
                return JSON.parse(stored)
            } catch (error) {
                console.error('Failed to parse stored tables:', error)
            }
        }

        // Default tables if nothing in localStorage
        return [
            {
                id: "1",
                name: "users",
                description: "System users and authentication",
                fields: [
                    { id: "f1", name: "id", type: "text", required: true, unique: true },
                    { id: "f2", name: "email", type: "email", required: true, unique: true },
                    { id: "f3", name: "full_name", type: "text", required: true, unique: false },
                    { id: "f4", name: "created_at", type: "date", required: true, unique: false },
                ],
            },
            {
                id: "2",
                name: "invoices",
                description: "Customer invoices",
                fields: [
                    { id: "f1", name: "id", type: "text", required: true, unique: true },
                    { id: "f2", name: "amount", type: "number", required: true, unique: false },
                    { id: "f3", name: "status", type: "text", required: true, unique: false },
                    { id: "f4", name: "user_id", type: "relation", required: true, unique: false },
                ],
            },
        ]
    }

    const [tables, setTables] = React.useState<SchemaTable[]>(getInitialTables)
    const [selectedTableId, setSelectedTableId] = React.useState<string>(tables[0]?.id || "")
    const selectedTable = tables.find((t) => t.id === selectedTableId)

    // Persist tables to localStorage whenever they change
    React.useEffect(() => {
        if (typeof window !== 'undefined' && tables.length > 0) {
            localStorage.setItem('bitflot_schema_tables', JSON.stringify(tables))
        }
    }, [tables])

    // State for Add Table Dialog
    const [isAddTableOpen, setIsAddTableOpen] = React.useState(false)
    const [newTableName, setNewTableName] = React.useState("")
    const [newTableDesc, setNewTableDesc] = React.useState("")

    // State for Add Field Dialog
    const [isAddFieldOpen, setIsAddFieldOpen] = React.useState(false)
    const [newFieldName, setNewFieldName] = React.useState("")
    const [newFieldType, setNewFieldType] = React.useState<FieldType>("text")
    const [newFieldRequired, setNewFieldRequired] = React.useState(false)
    const [newFieldUnique, setNewFieldUnique] = React.useState(false)

    const handleAddTable = () => {
        if (!newTableName) return
        const newTable: SchemaTable = {
            id: Math.random().toString(36).substr(2, 9),
            name: newTableName.toLowerCase().replace(/\s+/g, "_"),
            description: newTableDesc,
            fields: [
                { id: Math.random().toString(36).substr(2, 9), name: "id", type: "text", required: true, unique: true },
            ],
        }
        setTables([...tables, newTable])
        setSelectedTableId(newTable.id)
        setNewTableName("")
        setNewTableDesc("")
        setIsAddTableOpen(false)
    }

    const handleAddField = () => {
        if (!newFieldName || !selectedTable) return
        const newField: SchemaField = {
            id: Math.random().toString(36).substr(2, 9),
            name: newFieldName.toLowerCase().replace(/\s+/g, "_"),
            type: newFieldType,
            required: newFieldRequired,
            unique: newFieldUnique,
        }

        const updatedTables = tables.map(t => {
            if (t.id === selectedTable.id) {
                return { ...t, fields: [...t.fields, newField] }
            }
            return t
        })

        setTables(updatedTables)
        setNewFieldName("")
        setNewFieldType("text")
        setNewFieldRequired(false)
        setNewFieldUnique(false)
        setIsAddFieldOpen(false)
    }

    const handleDeleteField = (fieldId: string) => {
        if (!selectedTable) return
        const updatedTables = tables.map(t => {
            if (t.id === selectedTable.id) {
                return { ...t, fields: t.fields.filter(f => f.id !== fieldId) }
            }
            return t
        })
        setTables(updatedTables)
    }

    return (
        <div className="flex h-[calc(100vh-4rem)] w-full bg-background">
            {/* Sidebar: Table List */}
            <div className="w-64 border-r bg-muted/10 flex flex-col">
                <div className="p-4 border-b flex items-center justify-between">
                    <span className="font-semibold text-sm">Collections</span>
                    <Dialog open={isAddTableOpen} onOpenChange={setIsAddTableOpen}>
                        <DialogTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Plus className="h-4 w-4" />
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Create New Collection</DialogTitle>
                                <DialogDescription>
                                    Create a new database table to store your data.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="name">Collection Name</Label>
                                    <Input
                                        id="name"
                                        placeholder="e.g. products"
                                        value={newTableName}
                                        onChange={(e) => setNewTableName(e.target.value)}
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="description">Description</Label>
                                    <Input
                                        id="description"
                                        placeholder="Optional description"
                                        value={newTableDesc}
                                        onChange={(e) => setNewTableDesc(e.target.value)}
                                    />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button onClick={handleAddTable}>Create Collection</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
                <div className="flex-1 overflow-y-auto p-2 space-y-1">
                    {tables.map((table) => (
                        <button
                            key={table.id}
                            onClick={() => setSelectedTableId(table.id)}
                            className={`w-full flex items-center gap-2 px-3 py-2 text-sm rounded-md transition-colors ${selectedTableId === table.id
                                ? "bg-primary/10 text-primary font-medium"
                                : "hover:bg-muted text-muted-foreground"
                                }`}
                        >
                            <TableIcon className="h-4 w-4" />
                            {table.name}
                        </button>
                    ))}
                </div>
            </div>

            {/* Main Content: Schema Editor */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {selectedTable ? (
                    <Tabs defaultValue="schema" className="flex-1 flex flex-col h-full">
                        {/* Table Header */}
                        <div className="px-6 py-4 border-b flex items-center justify-between bg-background z-10">
                            <div>
                                <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
                                    {selectedTable.name}
                                    <Badge variant="outline" className="font-normal text-xs text-muted-foreground">
                                        Collection
                                    </Badge>
                                </h2>
                                <p className="text-muted-foreground text-sm">
                                    {selectedTable.description || "No description provided"}
                                </p>
                            </div>
                            <div className="flex items-center gap-4">
                                <TabsList>
                                    <TabsTrigger value="schema">Schema</TabsTrigger>
                                    <TabsTrigger value="data">Data</TabsTrigger>
                                </TabsList>
                                <Separator orientation="vertical" className="h-6" />
                                <Button variant="outline" size="sm">
                                    <Settings className="h-4 w-4 mr-2" />
                                    Settings
                                </Button>
                            </div>
                        </div>

                        {/* Schema Tab */}
                        <TabsContent value="schema" className="flex-1 overflow-y-auto p-6 m-0 border-0">
                            <div className="flex justify-end mb-4">
                                <Dialog open={isAddFieldOpen} onOpenChange={setIsAddFieldOpen}>
                                    <DialogTrigger asChild>
                                        <Button size="sm">
                                            <Plus className="h-4 w-4 mr-2" />
                                            Add Field
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>Add New Field</DialogTitle>
                                            <DialogDescription>
                                                Add a new column to the {selectedTable.name} table.
                                            </DialogDescription>
                                        </DialogHeader>
                                        <div className="grid gap-4 py-4">
                                            <div className="grid gap-2">
                                                <Label htmlFor="fieldName">Field Name</Label>
                                                <Input
                                                    id="fieldName"
                                                    placeholder="e.g. price"
                                                    value={newFieldName}
                                                    onChange={(e) => setNewFieldName(e.target.value)}
                                                />
                                            </div>
                                            <div className="grid gap-2">
                                                <Label htmlFor="fieldType">Field Type</Label>
                                                <Select value={newFieldType} onValueChange={(v) => setNewFieldType(v as FieldType)}>
                                                    <SelectTrigger>
                                                        <SelectValue />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="text">Text</SelectItem>
                                                        <SelectItem value="number">Number</SelectItem>
                                                        <SelectItem value="email">Email</SelectItem>
                                                        <SelectItem value="boolean">Boolean</SelectItem>
                                                        <SelectItem value="date">Date</SelectItem>
                                                        <SelectItem value="relation">Relation</SelectItem>
                                                        <SelectItem value="json">JSON</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <div className="flex items-center gap-2">
                                                    <input
                                                        type="checkbox"
                                                        id="required"
                                                        checked={newFieldRequired}
                                                        onChange={(e) => setNewFieldRequired(e.target.checked)}
                                                        className="rounded border-gray-300"
                                                    />
                                                    <Label htmlFor="required">Required</Label>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <input
                                                        type="checkbox"
                                                        id="unique"
                                                        checked={newFieldUnique}
                                                        onChange={(e) => setNewFieldUnique(e.target.checked)}
                                                        className="rounded border-gray-300"
                                                    />
                                                    <Label htmlFor="unique">Unique</Label>
                                                </div>
                                            </div>
                                        </div>
                                        <DialogFooter>
                                            <Button onClick={handleAddField}>Add Field</Button>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>
                            </div>

                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-base">Schema Fields</CardTitle>
                                    <CardDescription>
                                        Define the structure of your data collection.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="p-0">
                                    <div className="border-t">
                                        <div className="grid grid-cols-12 gap-4 p-4 bg-muted/50 text-xs font-medium text-muted-foreground border-b">
                                            <div className="col-span-3">Name</div>
                                            <div className="col-span-3">Type</div>
                                            <div className="col-span-4">Attributes</div>
                                            <div className="col-span-2 text-right">Actions</div>
                                        </div>
                                        {selectedTable.fields.map((field) => (
                                            <div
                                                key={field.id}
                                                className="grid grid-cols-12 gap-4 p-4 items-center border-b last:border-0 hover:bg-muted/5 transition-colors"
                                            >
                                                <div className="col-span-3 font-medium">{field.name}</div>
                                                <div className="col-span-3">
                                                    <Badge variant="secondary" className="font-mono text-xs">
                                                        {field.type}
                                                    </Badge>
                                                </div>
                                                <div className="col-span-4 flex gap-2">
                                                    {field.required && (
                                                        <Badge variant="outline" className="text-[10px] h-5">
                                                            Required
                                                        </Badge>
                                                    )}
                                                    {field.unique && (
                                                        <Badge variant="outline" className="text-[10px] h-5">
                                                            Unique
                                                        </Badge>
                                                    )}
                                                </div>
                                                <div className="col-span-2 flex justify-end gap-1">
                                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                                        <Settings className="h-4 w-4 text-muted-foreground" />
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-8 w-8 hover:text-destructive"
                                                        onClick={() => handleDeleteField(field.id)}
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        {/* Data Tab */}
                        <TabsContent value="data" className="flex-1 overflow-hidden m-0 border-0">
                            <DataSpreadsheetView table={selectedTable} />
                        </TabsContent>
                    </Tabs>
                ) : (
                    <div className="flex-1 flex items-center justify-center text-muted-foreground">
                        Select a collection to edit its schema
                    </div>
                )}
            </div>
        </div>
    )
}
