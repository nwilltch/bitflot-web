"use client"

import * as React from "react"
import { Plus, Search, Filter, Download, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Re-using types from parent (in a real app these would be shared)
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

interface DataSpreadsheetViewProps {
    table: SchemaTable
}

export function DataSpreadsheetView({ table }: DataSpreadsheetViewProps) {
    // Load data from localStorage or use defaults
    const getInitialData = (tableId: string) => {
        if (typeof window === 'undefined') return []

        const stored = localStorage.getItem(`bitflot_data_${tableId}`)
        if (stored) {
            try {
                return JSON.parse(stored)
            } catch (error) {
                console.error('Failed to parse stored data:', error)
            }
        }

        // Default data if nothing in localStorage
        if (tableId === "1") { // Users
            return [
                { id: "usr_1", email: "john@example.com", full_name: "John Doe", created_at: "2024-01-15" },
                { id: "usr_2", email: "jane@studio.com", full_name: "Jane Smith", created_at: "2024-02-20" },
                { id: "usr_3", email: "bob@builder.io", full_name: "Bob Wilson", created_at: "2024-03-10" },
            ]
        }
        if (tableId === "2") { // Invoices
            return [
                { id: "inv_1", amount: 1200.50, status: "paid", user_id: "usr_1" },
                { id: "inv_2", amount: 850.00, status: "pending", user_id: "usr_2" },
                { id: "inv_3", amount: 2300.00, status: "draft", user_id: "usr_1" },
            ]
        }
        return []
    }

    const [data, setData] = React.useState<any[]>(() => getInitialData(table.id))

    // Persist data to localStorage whenever it changes
    React.useEffect(() => {
        if (typeof window !== 'undefined' && data.length >= 0) {
            localStorage.setItem(`bitflot_data_${table.id}`, JSON.stringify(data))
        }
    }, [data, table.id])

    // Reset data when table changes
    React.useEffect(() => {
        setData(getInitialData(table.id))
    }, [table.id])

    return (
        <div className="flex flex-col h-full">
            {/* Toolbar */}
            <div className="flex items-center justify-between p-4 border-b bg-background">
                <div className="flex items-center gap-2">
                    <div className="relative">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Search records..." className="pl-8 w-64" />
                    </div>
                    <Button variant="outline" size="sm">
                        <Filter className="h-4 w-4 mr-2" />
                        Filter
                    </Button>
                    <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Export
                    </Button>
                </div>
                <Button size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    New Record
                </Button>
            </div>

            {/* Spreadsheet Table */}
            <div className="flex-1 overflow-auto">
                <Table>
                    <TableHeader>
                        <TableRow>
                            {table.fields.map((field) => (
                                <TableHead key={field.id} className="min-w-[150px]">
                                    <div className="flex items-center gap-2">
                                        {field.name}
                                        <span className="text-[10px] font-normal text-muted-foreground bg-muted px-1.5 py-0.5 rounded">
                                            {field.type}
                                        </span>
                                    </div>
                                </TableHead>
                            ))}
                            <TableHead className="w-[50px]"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.length > 0 ? (
                            data.map((row, rowIndex) => (
                                <TableRow key={rowIndex}>
                                    {table.fields.map((field) => (
                                        <TableCell key={field.id} className="font-medium">
                                            {row[field.name] || <span className="text-muted-foreground italic">null</span>}
                                        </TableCell>
                                    ))}
                                    <TableCell>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" className="h-8 w-8 p-0">
                                                    <span className="sr-only">Open menu</span>
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                <DropdownMenuItem>Edit Record</DropdownMenuItem>
                                                <DropdownMenuItem>Duplicate</DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={table.fields.length + 1} className="h-24 text-center">
                                    No records found. Create one to get started.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Footer / Pagination */}
            <div className="border-t p-4 text-xs text-muted-foreground flex items-center justify-between">
                <div>
                    Showing {data.length} records
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm" disabled>Previous</Button>
                    <Button variant="outline" size="sm" disabled>Next</Button>
                </div>
            </div>
        </div>
    )
}
