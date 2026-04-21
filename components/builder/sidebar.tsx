"use client"

import { Card } from "@/components/ui/card"
import { Zap, Play, Box, GripVertical, Database, FileText, List, Eye, CreditCard, Sparkles, Crown, Search, Plus, Edit, Trash2, Repeat, GitBranch, Mail, Clock, Bell, Shuffle, Calculator, BarChart, Calendar, Sigma, Filter, Layers, Download, Upload, Copy, Link, GitMerge, Timer, MessageSquare, Globe, UploadCloud, Smartphone } from "lucide-react"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

export function BuilderSidebar() {
    const onDragStart = (event: React.DragEvent, nodeType: string, label: string, icon: string) => {
        event.dataTransfer.setData('application/reactflow', JSON.stringify({ type: nodeType, label, icon }));
        event.dataTransfer.effectAllowed = 'move';
    };

    return (
        <aside className="w-64 border-r bg-muted/10 p-4 flex flex-col gap-2 h-full overflow-y-auto">
            <Accordion type="multiple" defaultValue={["triggers", "views", "actions", "data", "logic", "integration", "automation"]} className="w-full">
                {/* TRIGGERS */}
                <AccordionItem value="triggers">
                    <AccordionTrigger className="text-sm font-semibold text-muted-foreground hover:no-underline py-2">
                        Triggers
                    </AccordionTrigger>
                    <AccordionContent className="space-y-2 pb-2">
                        <div
                            className="flex items-center gap-2 p-3 bg-background border rounded-md cursor-grab active:cursor-grabbing hover:border-primary transition-colors"
                            draggable
                            onDragStart={(e) => onDragStart(e, 'trigger', 'Webhook', 'trigger')}
                        >
                            <GripVertical className="h-4 w-4 text-muted-foreground" />
                            <div className="p-1 rounded bg-yellow-100 text-yellow-700">
                                <Zap className="h-4 w-4" />
                            </div>
                            <span className="text-sm font-medium">Webhook</span>
                        </div>
                        <div
                            className="flex items-center gap-2 p-3 bg-background border rounded-md cursor-grab active:cursor-grabbing hover:border-primary transition-colors"
                            draggable
                            onDragStart={(e) => onDragStart(e, 'schedule', 'Schedule Trigger', 'trigger')}
                        >
                            <GripVertical className="h-4 w-4 text-muted-foreground" />
                            <div className="p-1 rounded bg-teal-100 text-teal-700">
                                <Clock className="h-4 w-4" />
                            </div>
                            <span className="text-sm font-medium">Schedule Trigger</span>
                        </div>
                        <div
                            className="flex items-center gap-2 p-3 bg-background border rounded-md cursor-grab active:cursor-grabbing hover:border-primary transition-colors"
                            draggable
                            onDragStart={(e) => onDragStart(e, 'email-trigger', 'Email Trigger', 'trigger')}
                        >
                            <GripVertical className="h-4 w-4 text-muted-foreground" />
                            <div className="p-1 rounded bg-blue-100 text-blue-700">
                                <Mail className="h-4 w-4" />
                            </div>
                            <span className="text-sm font-medium">Email Trigger</span>
                        </div>
                        <div
                            className="flex items-center gap-2 p-3 bg-background border rounded-md cursor-grab active:cursor-grabbing hover:border-primary transition-colors"
                            draggable
                            onDragStart={(e) => onDragStart(e, 'event-trigger', 'Event Trigger', 'trigger')}
                        >
                            <GripVertical className="h-4 w-4 text-muted-foreground" />
                            <div className="p-1 rounded bg-amber-100 text-amber-700">
                                <Zap className="h-4 w-4" />
                            </div>
                            <span className="text-sm font-medium">Event Trigger</span>
                        </div>
                    </AccordionContent>
                </AccordionItem>

                {/* VIEWS */}
                <AccordionItem value="views">
                    <AccordionTrigger className="text-sm font-semibold text-muted-foreground hover:no-underline py-2">
                        Views
                    </AccordionTrigger>
                    <AccordionContent className="space-y-2 pb-2">
                        <div
                            className="flex items-center gap-2 p-3 bg-background border rounded-md cursor-grab active:cursor-grabbing hover:border-primary transition-colors"
                            draggable
                            onDragStart={(e) => onDragStart(e, 'form', 'Form', 'view')}
                        >
                            <GripVertical className="h-4 w-4 text-muted-foreground" />
                            <div className="p-1 rounded bg-blue-100 text-blue-700">
                                <FileText className="h-4 w-4" />
                            </div>
                            <span className="text-sm font-medium">Form</span>
                        </div>
                        <div
                            className="flex items-center gap-2 p-3 bg-background border rounded-md cursor-grab active:cursor-grabbing hover:border-primary transition-colors"
                            draggable
                            onDragStart={(e) => onDragStart(e, 'list', 'List', 'view')}
                        >
                            <GripVertical className="h-4 w-4 text-muted-foreground" />
                            <div className="p-1 rounded bg-green-100 text-green-700">
                                <List className="h-4 w-4" />
                            </div>
                            <span className="text-sm font-medium">List</span>
                        </div>
                        <div
                            className="flex items-center gap-2 p-3 bg-background border rounded-md cursor-grab active:cursor-grabbing hover:border-primary transition-colors"
                            draggable
                            onDragStart={(e) => onDragStart(e, 'detail', 'Detail', 'view')}
                        >
                            <GripVertical className="h-4 w-4 text-muted-foreground" />
                            <div className="p-1 rounded bg-indigo-100 text-indigo-700">
                                <Eye className="h-4 w-4" />
                            </div>
                            <span className="text-sm font-medium">Detail</span>
                        </div>
                        <div
                            className="flex items-center gap-2 p-3 bg-background border rounded-md cursor-grab active:cursor-grabbing hover:border-primary transition-colors"
                            draggable
                            onDragStart={(e) => onDragStart(e, 'chart-view', 'Chart View', 'view')}
                        >
                            <GripVertical className="h-4 w-4 text-muted-foreground" />
                            <div className="p-1 rounded bg-indigo-100 text-indigo-700">
                                <BarChart className="h-4 w-4" />
                            </div>
                            <span className="text-sm font-medium">Chart View</span>
                        </div>
                        <div
                            className="flex items-center gap-2 p-3 bg-background border rounded-md cursor-grab active:cursor-grabbing hover:border-primary transition-colors"
                            draggable
                            onDragStart={(e) => onDragStart(e, 'calendar-view', 'Calendar View', 'view')}
                        >
                            <GripVertical className="h-4 w-4 text-muted-foreground" />
                            <div className="p-1 rounded bg-blue-100 text-blue-700">
                                <Calendar className="h-4 w-4" />
                            </div>
                            <span className="text-sm font-medium">Calendar View</span>
                        </div>
                    </AccordionContent>
                </AccordionItem>

                {/* ACTIONS */}
                <AccordionItem value="actions">
                    <AccordionTrigger className="text-sm font-semibold text-muted-foreground hover:no-underline py-2">
                        Actions
                    </AccordionTrigger>
                    <AccordionContent className="space-y-2 pb-2">
                        <div
                            className="flex items-center gap-2 p-3 bg-background border rounded-md cursor-grab active:cursor-grabbing hover:border-primary transition-colors"
                            draggable
                            onDragStart={(e) => onDragStart(e, 'create-record', 'Create Record', 'action')}
                        >
                            <GripVertical className="h-4 w-4 text-muted-foreground" />
                            <div className="p-1 rounded bg-green-100 text-green-700">
                                <Plus className="h-4 w-4" />
                            </div>
                            <span className="text-sm font-medium">Create Record</span>
                        </div>
                        <div
                            className="flex items-center gap-2 p-3 bg-background border rounded-md cursor-grab active:cursor-grabbing hover:border-primary transition-colors"
                            draggable
                            onDragStart={(e) => onDragStart(e, 'update-record', 'Update Record', 'action')}
                        >
                            <GripVertical className="h-4 w-4 text-muted-foreground" />
                            <div className="p-1 rounded bg-orange-100 text-orange-700">
                                <Edit className="h-4 w-4" />
                            </div>
                            <span className="text-sm font-medium">Update Record</span>
                        </div>
                        <div
                            className="flex items-center gap-2 p-3 bg-background border rounded-md cursor-grab active:cursor-grabbing hover:border-primary transition-colors"
                            draggable
                            onDragStart={(e) => onDragStart(e, 'delete-record', 'Delete Record', 'action')}
                        >
                            <GripVertical className="h-4 w-4 text-muted-foreground" />
                            <div className="p-1 rounded bg-red-100 text-red-700">
                                <Trash2 className="h-4 w-4" />
                            </div>
                            <span className="text-sm font-medium">Delete Record</span>
                        </div>
                    </AccordionContent>
                </AccordionItem>

                {/* DATA */}
                <AccordionItem value="data">
                    <AccordionTrigger className="text-sm font-semibold text-muted-foreground hover:no-underline py-2">
                        Data
                    </AccordionTrigger>
                    <AccordionContent className="space-y-2 pb-2">
                        <div
                            className="flex items-center gap-2 p-3 bg-background border rounded-md cursor-grab active:cursor-grabbing hover:border-primary transition-colors"
                            draggable
                            onDragStart={(e) => onDragStart(e, 'schema', 'Resource', 'database')}
                        >
                            <GripVertical className="h-4 w-4 text-muted-foreground" />
                            <div className="p-1 rounded bg-purple-100 text-purple-700">
                                <Database className="h-4 w-4" />
                            </div>
                            <span className="text-sm font-medium">Resource (Table)</span>
                        </div>
                        <div
                            className="flex items-center gap-2 p-3 bg-background border rounded-md cursor-grab active:cursor-grabbing hover:border-primary transition-colors"
                            draggable
                            onDragStart={(e) => onDragStart(e, 'query', 'Query Records', 'data')}
                        >
                            <GripVertical className="h-4 w-4 text-muted-foreground" />
                            <div className="p-1 rounded bg-blue-100 text-blue-700">
                                <Search className="h-4 w-4" />
                            </div>
                            <span className="text-sm font-medium">Query Records</span>
                        </div>
                    </AccordionContent>
                </AccordionItem>

                {/* LOGIC */}
                <AccordionItem value="logic">
                    <AccordionTrigger className="text-sm font-semibold text-muted-foreground hover:no-underline py-2">
                        Logic
                    </AccordionTrigger>
                    <AccordionContent className="space-y-2 pb-2">
                        <div
                            className="flex items-center gap-2 p-3 bg-background border rounded-md cursor-grab active:cursor-grabbing hover:border-primary transition-colors"
                            draggable
                            onDragStart={(e) => onDragStart(e, 'condition', 'If / Else', 'logic')}
                        >
                            <GripVertical className="h-4 w-4 text-muted-foreground" />
                            <div className="p-1 rounded bg-yellow-100 text-yellow-700">
                                <GitBranch className="h-4 w-4" />
                            </div>
                            <span className="text-sm font-medium">If / Else</span>
                        </div>
                        <div
                            className="flex items-center gap-2 p-3 bg-background border rounded-md cursor-grab active:cursor-grabbing hover:border-primary transition-colors"
                            draggable
                            onDragStart={(e) => onDragStart(e, 'switch', 'Switch / Case', 'logic')}
                        >
                            <GripVertical className="h-4 w-4 text-muted-foreground" />
                            <div className="p-1 rounded bg-yellow-100 text-yellow-700">
                                <GitMerge className="h-4 w-4" />
                            </div>
                            <span className="text-sm font-medium">Switch / Case</span>
                        </div>
                        <div
                            className="flex items-center gap-2 p-3 bg-background border rounded-md cursor-grab active:cursor-grabbing hover:border-primary transition-colors"
                            draggable
                            onDragStart={(e) => onDragStart(e, 'loop', 'Loop', 'logic')}
                        >
                            <GripVertical className="h-4 w-4 text-muted-foreground" />
                            <div className="p-1 rounded bg-indigo-100 text-indigo-700">
                                <Repeat className="h-4 w-4" />
                            </div>
                            <span className="text-sm font-medium">Loop</span>
                        </div>
                        <div
                            className="flex items-center gap-2 p-3 bg-background border rounded-md cursor-grab active:cursor-grabbing hover:border-primary transition-colors"
                            draggable
                            onDragStart={(e) => onDragStart(e, 'delay', 'Delay', 'logic')}
                        >
                            <GripVertical className="h-4 w-4 text-muted-foreground" />
                            <div className="p-1 rounded bg-stone-100 text-stone-700">
                                <Timer className="h-4 w-4" />
                            </div>
                            <span className="text-sm font-medium">Delay</span>
                        </div>
                        <div
                            className="flex items-center gap-2 p-3 bg-background border rounded-md cursor-grab active:cursor-grabbing hover:border-primary transition-colors"
                            draggable
                            onDragStart={(e) => onDragStart(e, 'set-variable', 'Set Variable', 'logic')}
                        >
                            <GripVertical className="h-4 w-4 text-muted-foreground" />
                            <div className="p-1 rounded bg-slate-100 text-slate-700">
                                <Database className="h-4 w-4" />
                            </div>
                            <span className="text-sm font-medium">Set Variable</span>
                        </div>
                        <div
                            className="flex items-center gap-2 p-3 bg-background border rounded-md cursor-grab active:cursor-grabbing hover:border-primary transition-colors"
                            draggable
                            onDragStart={(e) => onDragStart(e, 'aggregate', 'Aggregate', 'logic')}
                        >
                            <GripVertical className="h-4 w-4 text-muted-foreground" />
                            <div className="p-1 rounded bg-orange-100 text-orange-700">
                                <Sigma className="h-4 w-4" />
                            </div>
                            <span className="text-sm font-medium">Aggregate</span>
                        </div>
                        <div
                            className="flex items-center gap-2 p-3 bg-background border rounded-md cursor-grab active:cursor-grabbing hover:border-primary transition-colors"
                            draggable
                            onDragStart={(e) => onDragStart(e, 'filter', 'Filter Array', 'logic')}
                        >
                            <GripVertical className="h-4 w-4 text-muted-foreground" />
                            <div className="p-1 rounded bg-violet-100 text-violet-700">
                                <Filter className="h-4 w-4" />
                            </div>
                            <span className="text-sm font-medium">Filter Array</span>
                        </div>
                        <div
                            className="flex items-center gap-2 p-3 bg-background border rounded-md cursor-grab active:cursor-grabbing hover:border-primary transition-colors"
                            draggable
                            onDragStart={(e) => onDragStart(e, 'transform', 'Transform Data', 'logic')}
                        >
                            <GripVertical className="h-4 w-4 text-muted-foreground" />
                            <div className="p-1 rounded bg-cyan-100 text-cyan-700">
                                <Shuffle className="h-4 w-4" />
                            </div>
                            <span className="text-sm font-medium">Transform Data</span>
                        </div>
                        <div
                            className="flex items-center gap-2 p-3 bg-background border rounded-md cursor-grab active:cursor-grabbing hover:border-primary transition-colors"
                            draggable
                            onDragStart={(e) => onDragStart(e, 'calculate', 'Calculate', 'logic')}
                        >
                            <GripVertical className="h-4 w-4 text-muted-foreground" />
                            <div className="p-1 rounded bg-pink-100 text-pink-700">
                                <Calculator className="h-4 w-4" />
                            </div>
                            <span className="text-sm font-medium">Calculate</span>
                        </div>
                    </AccordionContent>
                </AccordionItem>

                {/* INTEGRATION */}
                <AccordionItem value="integration">
                    <AccordionTrigger className="text-sm font-semibold text-muted-foreground hover:no-underline py-2">
                        Integration
                    </AccordionTrigger>
                    <AccordionContent className="space-y-2 pb-2">
                        <div
                            className="flex items-center gap-2 p-3 bg-background border rounded-md cursor-grab active:cursor-grabbing hover:border-primary transition-colors"
                            draggable
                            onDragStart={(e) => onDragStart(e, 'email', 'Send Email', 'integration')}
                        >
                            <GripVertical className="h-4 w-4 text-muted-foreground" />
                            <div className="p-1 rounded bg-blue-100 text-blue-700">
                                <Mail className="h-4 w-4" />
                            </div>
                            <span className="text-sm font-medium">Send Email</span>
                        </div>
                        <div
                            className="flex items-center gap-2 p-3 bg-background border rounded-md cursor-grab active:cursor-grabbing hover:border-primary transition-colors"
                            draggable
                            onDragStart={(e) => onDragStart(e, 'sms', 'Send SMS', 'integration')}
                        >
                            <GripVertical className="h-4 w-4 text-muted-foreground" />
                            <div className="p-1 rounded bg-green-100 text-green-700">
                                <MessageSquare className="h-4 w-4" />
                            </div>
                            <span className="text-sm font-medium">Send SMS</span>
                        </div>
                        <div
                            className="flex items-center gap-2 p-3 bg-background border rounded-md cursor-grab active:cursor-grabbing hover:border-primary transition-colors"
                            draggable
                            onDragStart={(e) => onDragStart(e, 'http-request', 'HTTP Request', 'integration')}
                        >
                            <GripVertical className="h-4 w-4 text-muted-foreground" />
                            <div className="p-1 rounded bg-indigo-100 text-indigo-700">
                                <Globe className="h-4 w-4" />
                            </div>
                            <span className="text-sm font-medium">HTTP Request</span>
                        </div>
                        <div
                            className="flex items-center gap-2 p-3 bg-background border rounded-md cursor-grab active:cursor-grabbing hover:border-primary transition-colors"
                            draggable
                            onDragStart={(e) => onDragStart(e, 'file-upload', 'File Upload', 'integration')}
                        >
                            <GripVertical className="h-4 w-4 text-muted-foreground" />
                            <div className="p-1 rounded bg-cyan-100 text-cyan-700">
                                <UploadCloud className="h-4 w-4" />
                            </div>
                            <span className="text-sm font-medium">File Upload</span>
                        </div>
                        <div
                            className="flex items-center gap-2 p-3 bg-background border rounded-md cursor-grab active:cursor-grabbing hover:border-primary transition-colors"
                            draggable
                            onDragStart={(e) => onDragStart(e, 'stripe', 'Stripe Payment', 'integration')}
                        >
                            <GripVertical className="h-4 w-4 text-muted-foreground" />
                            <div className="p-1 rounded bg-purple-100 text-purple-700">
                                <CreditCard className="h-4 w-4" />
                            </div>
                            <span className="text-sm font-medium">Stripe Payment</span>
                        </div>
                        <div
                            className="flex items-center gap-2 p-3 bg-background border border-purple-500/50 rounded-md cursor-grab active:cursor-grabbing hover:border-purple-500 transition-colors"
                            draggable
                            onDragStart={(e) => onDragStart(e, 'openai', 'OpenAI', 'integration')}
                        >
                            <GripVertical className="h-4 w-4 text-muted-foreground" />
                            <div className="p-1 rounded bg-purple-100 text-purple-700">
                                <Sparkles className="h-4 w-4" />
                            </div>
                            <span className="text-sm font-medium">OpenAI</span>
                            <span className="ml-auto text-xs bg-purple-500/20 text-purple-600 px-2 py-0.5 rounded-full font-semibold">PRO</span>
                        </div>
                    </AccordionContent>
                </AccordionItem>

                {/* AUTOMATION */}
                <AccordionItem value="automation">
                    <AccordionTrigger className="text-sm font-semibold text-muted-foreground hover:no-underline py-2">
                        Automation
                    </AccordionTrigger>
                    <AccordionContent className="space-y-2 pb-2">
                        <div
                            className="flex items-center gap-2 p-3 bg-background border rounded-md cursor-grab active:cursor-grabbing hover:border-primary transition-colors"
                            draggable
                            onDragStart={(e) => onDragStart(e, 'notification', 'Notification', 'automation')}
                        >
                            <GripVertical className="h-4 w-4 text-muted-foreground" />
                            <div className="p-1 rounded bg-amber-100 text-amber-700">
                                <Bell className="h-4 w-4" />
                            </div>
                            <span className="text-sm font-medium">Notification</span>
                        </div>
                        <div
                            className="flex items-center gap-2 p-3 bg-background border rounded-md cursor-grab active:cursor-grabbing hover:border-primary transition-colors"
                            draggable
                            onDragStart={(e) => onDragStart(e, 'push-notification', 'Push Notification', 'automation')}
                        >
                            <GripVertical className="h-4 w-4 text-muted-foreground" />
                            <div className="p-1 rounded bg-rose-100 text-rose-700">
                                <Smartphone className="h-4 w-4" />
                            </div>
                            <span className="text-sm font-medium">Push Notification</span>
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </aside>
    )
}
