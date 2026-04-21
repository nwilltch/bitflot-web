"use client"

import { Handle, Position } from '@xyflow/react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Database, Plus, Trash2 } from "lucide-react"
import { useState, useCallback } from 'react';

interface Field {
    name: string;
    type: string;
}

interface SchemaNodeProps {
    data: {
        label: string;
        fields?: Field[];
        onFieldsChange?: (fields: Field[]) => void;
    };
    selected?: boolean;
}

export function SchemaNode({ data, selected }: SchemaNodeProps) {
    const [fields, setFields] = useState<Field[]>(data.fields || []);

    const addField = () => {
        const newFields = [...fields, { name: 'new_field', type: 'text' }];
        setFields(newFields);
        data.onFieldsChange?.(newFields);
    };

    const updateField = (index: number, key: keyof Field, value: string) => {
        const newFields = [...fields];
        newFields[index] = { ...newFields[index], [key]: value };
        setFields(newFields);
        data.onFieldsChange?.(newFields);
    };

    const removeField = (index: number) => {
        const newFields = fields.filter((_, i) => i !== index);
        setFields(newFields);
        data.onFieldsChange?.(newFields);
    };

    return (
        <Card className={`w-80 shadow-md border-2 transition-colors ${selected ? "border-primary" : "border-border"}`}>
            <CardHeader className="p-3 pb-2 bg-muted/20">
                <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-md bg-purple-100 text-purple-700">
                        <Database className="h-4 w-4" />
                    </div>
                    <CardTitle className="text-sm font-medium leading-none">{data.label}</CardTitle>
                </div>
            </CardHeader>
            <CardContent className="p-3 space-y-3">
                <div className="space-y-2">
                    {fields.map((field, index) => (
                        <div key={index} className="flex gap-2 items-center">
                            <Input
                                value={field.name}
                                onChange={(e) => updateField(index, 'name', e.target.value)}
                                className="h-7 text-xs"
                                placeholder="Field Name"
                            />
                            <Select
                                value={field.type}
                                onValueChange={(val) => updateField(index, 'type', val)}
                            >
                                <SelectTrigger className="h-7 w-[100px] text-xs">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="text">Text</SelectItem>
                                    <SelectItem value="number">Number</SelectItem>
                                    <SelectItem value="date">Date</SelectItem>
                                    <SelectItem value="file">File</SelectItem>
                                </SelectContent>
                            </Select>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7 text-muted-foreground hover:text-destructive"
                                onClick={() => removeField(index)}
                            >
                                <Trash2 className="h-3 w-3" />
                            </Button>
                        </div>
                    ))}
                </div>
                <Button variant="outline" size="sm" className="w-full h-7 text-xs gap-1" onClick={addField}>
                    <Plus className="h-3 w-3" />
                    Add Field
                </Button>
            </CardContent>
            <Handle type="source" position={Position.Right} className="w-3 h-3 bg-muted-foreground" />
        </Card>
    );
}
