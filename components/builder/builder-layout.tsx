"use client"

import { useState, useCallback, useRef, useEffect } from 'react';
import {
    ReactFlow,
    Background,
    Controls,
    MiniMap,
    useNodesState,
    useEdgesState,
    addEdge,
    Connection,
    Edge,
    Node,
    ReactFlowProvider,
    Panel
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { BuilderSidebar } from './sidebar';
import { EnhancedPropertiesPanel as PropertiesPanel } from './properties-panel';
import { AppSettings } from './app-settings';
import { CustomNode } from './custom-node';
import { SchemaNode } from './schema-node';
import { FormNode } from './form-node';
import { ListNode } from './list-node';
import { DetailNode } from './detail-node';
import { Button } from "@/components/ui/button"
import { ArrowLeft, Save, Loader2 } from "lucide-react"
import Link from "next/link"
import { saveAppConfig } from '@/app/actions/builder';
import { useRouter } from 'next/navigation';
import { toast } from "sonner";
import { DEFAULT_MICROSAAS_TEMPLATE } from '@/lib/default-template';
import { getCreatorSubscription, hasPremiumNodesAccess } from '@/app/actions/subscriptions';
import { useUser } from '@clerk/nextjs';
import { PaywallNode } from './paywall-node';
import { OpenAINode } from './openai-node';
import { QueryNode } from './query-node';
import { CreateRecordNode, UpdateRecordNode, DeleteRecordNode } from './crud-nodes';
import { LoopNode } from './loop-node';
import { ConditionNode } from './condition-node';
import { EmailNode } from './email-node';
import { StripeNode } from './stripe-node';
import { ScheduleNode } from './schedule-node';
import { NotificationNode } from './notification-node';
import { TransformNode } from './transform-node';
import { CalculateNode } from './calculate-node';
import { ChartViewNode, CalendarViewNode } from './view-nodes';
import { AggregateNode, FilterNode, SetVariableNode } from './data-logic-nodes';
import { BulkUpdateNode, ExportDataNode, ImportDataNode } from './bulk-nodes';
import { DuplicateRecordNode, LinkRecordsNode } from './record-management-nodes';
import { SwitchNode, DelayNode } from './advanced-logic-nodes';
import { EmailTriggerNode, EventTriggerNode } from './advanced-trigger-nodes';
import { SMSNode, HTTPRequestNode, FileUploadNode, PushNotificationNode } from './external-nodes';

const nodeTypes = {
    custom: CustomNode,
    schema: SchemaNode,
    form: FormNode,
    list: ListNode,
    detail: DetailNode,
    paywall: PaywallNode,
    openai: OpenAINode,
    query: QueryNode,
    'create-record': CreateRecordNode,
    'update-record': UpdateRecordNode,
    'delete-record': DeleteRecordNode,
    loop: LoopNode,
    condition: ConditionNode,
    email: EmailNode,
    stripe: StripeNode,
    schedule: ScheduleNode,
    notification: NotificationNode,
    transform: TransformNode,
    calculate: CalculateNode,
    'chart-view': ChartViewNode,
    'calendar-view': CalendarViewNode,
    aggregate: AggregateNode,
    filter: FilterNode,
    'set-variable': SetVariableNode,
    'bulk-update': BulkUpdateNode,
    'export-data': ExportDataNode,
    'import-data': ImportDataNode,
    'duplicate-record': DuplicateRecordNode,
    'link-records': LinkRecordsNode,
    'switch': SwitchNode,
    'delay': DelayNode,
    'email-trigger': EmailTriggerNode,
    'event-trigger': EventTriggerNode,
    'sms': SMSNode,
    'http-request': HTTPRequestNode,
    'file-upload': FileUploadNode,
    'push-notification': PushNotificationNode,
};

const initialNodes: Node[] = [
    {
        id: '1',
        type: 'custom',
        position: { x: 250, y: 5 },
        data: { label: 'Webhook', type: 'trigger', icon: 'trigger' }
    },
];

export function BuilderLayout() {
    const router = useRouter();
    const { user } = useUser();
    const reactFlowWrapper = useRef<HTMLDivElement>(null);
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const [selectedNode, setSelectedNode] = useState<Node | null>(null);
    const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);
    const [saving, setSaving] = useState(false);
    const [creatorPlan, setCreatorPlan] = useState<any>(null);

    // App settings state
    const [appSettings, setAppSettings] = useState({
        name: "Untitled App",
        icon: "Layers",
        color: "#3b82f6"
    });

    // Load creator subscription on mount
    useEffect(() => {
        async function loadSubscription() {
            if (user?.id) {
                const sub = await getCreatorSubscription(user.id);
                setCreatorPlan(sub);
            }
        }
        loadSubscription();
    }, [user]);

    const onConnect = useCallback(
        (params: Connection) => setEdges((eds) => addEdge(params, eds)),
        [setEdges],
    );

    const onDragOver = useCallback((event: React.DragEvent) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    const onDrop = useCallback(
        (event: React.DragEvent) => {
            event.preventDefault();

            if (!reactFlowWrapper.current || !reactFlowInstance) return;

            const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
            const data = event.dataTransfer.getData('application/reactflow');

            if (!data) return;

            const { type, label, icon } = JSON.parse(data);

            // Check if Premium Node
            const premiumNodes = ['openai', 'custom-code', 'stripe-payment', 'paywall'];
            if (premiumNodes.includes(type)) {
                if (!creatorPlan?.features?.premium_nodes) {
                    toast.error("Upgrade to PRO to use Premium Nodes", {
                        action: {
                            label: "Upgrade",
                            onClick: () => router.push('/dashboard/billing')
                        }
                    });
                    return;
                }
            }

            const position = reactFlowInstance.screenToFlowPosition({
                x: event.clientX,
                y: event.clientY,
            });

            // Determine node type based on dropped item
            let nodeType = 'custom';
            if (type === 'schema') nodeType = 'schema';
            else if (type === 'form') nodeType = 'form';
            else if (type === 'list') nodeType = 'list';
            else if (type === 'detail') nodeType = 'detail';

            const newNode: Node = {
                id: `${type}-${Date.now()}`,
                type: nodeType,
                position,
                data: {
                    label,
                    type,
                    icon,
                    fields: type === 'schema' ? [{ name: 'name', type: 'text' }] : undefined
                },
            };

            setNodes((nds) => nds.concat(newNode));
        },
        [reactFlowInstance, setNodes, creatorPlan, router],
    );

    const onNodeClick = useCallback((_: React.MouseEvent, node: Node) => {
        setSelectedNode(node);
    }, []);

    const onPaneClick = useCallback(() => {
        setSelectedNode(null);
    }, []);

    const handleUpdateNode = useCallback((nodeId: string, newData: any) => {
        setNodes((nds) =>
            nds.map((node) =>
                node.id === nodeId ? { ...node, data: newData } : node
            )
        );
    }, [setNodes]);

    const handleSave = async () => {
        setSaving(true);

        // 1. Extract Resources from Schema Nodes
        const resources = nodes
            .filter(n => n.type === 'schema')
            .map(n => ({
                name: n.data.label,
                fields: n.data.fields
            }));

        // Check if canvas is empty (no resources defined)
        const isEmptyCanvas = resources.length === 0;

        let config;
        let appName = appSettings.name;

        if (isEmptyCanvas) {
            // Use default Tally-like template
            toast.info("Creating default Form Builder app...");
            config = {
                app_name: DEFAULT_MICROSAAS_TEMPLATE.name,
                description: DEFAULT_MICROSAAS_TEMPLATE.description,
                icon: DEFAULT_MICROSAAS_TEMPLATE.icon,
                color: DEFAULT_MICROSAAS_TEMPLATE.color,
                resources: DEFAULT_MICROSAAS_TEMPLATE.resources,
                views: DEFAULT_MICROSAAS_TEMPLATE.views,
                flows: DEFAULT_MICROSAAS_TEMPLATE.flows
            };
            appName = DEFAULT_MICROSAAS_TEMPLATE.name;
        } else {
            // Use custom configuration from canvas
            // 2. Extract Views
            const views = nodes
                .filter(n => ['form', 'list', 'detail'].includes(n.type || ''))
                .map(n => ({
                    id: n.id,
                    type: n.type,
                    label: n.data.label,
                    resourceId: n.data.resourceId
                }));

            // 3. Extract Flows
            const flows = [{
                id: 'main-flow',
                nodes: nodes.map(n => ({ id: n.id, type: n.type, data: n.data })),
                edges: edges
            }];

            config = {
                app_name: appSettings.name,
                icon: appSettings.icon,
                color: appSettings.color,
                resources,
                views,
                flows
            };
        }

        // 4. Save to DB
        const result = await saveAppConfig(appName, config);

        setSaving(false);

        if (result.success) {
            if (isEmptyCanvas) {
                toast.success("Default Form Builder app created successfully!");
            } else {
                toast.success("App published successfully!");
            }
            router.push('/dashboard/projects');
        } else {
            if (result.requiresUpgrade) {
                toast.error(result.error, {
                    action: {
                        label: "Upgrade",
                        onClick: () => router.push('/dashboard/billing')
                    },
                    duration: 5000
                });
            } else {
                toast.error("Error publishing app: " + result.error);
            }
        }
    };

    return (
        <div className="flex h-screen w-full flex-col">
            {/* Header */}
            <header className="h-14 border-b flex items-center justify-between px-4 bg-background z-20">
                <div className="flex items-center gap-4">
                    <Link href="/dashboard">
                        <Button variant="ghost" size="icon">
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                    </Link>
                    <AppSettings
                        appName={appSettings.name}
                        appIcon={appSettings.icon}
                        appColor={appSettings.color}
                        onUpdate={(settings) => setAppSettings(settings)}
                    />
                </div>
                <div className="flex items-center gap-2">
                    <Button size="sm" className="gap-2" onClick={handleSave} disabled={saving}>
                        {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                        Publish App
                    </Button>
                </div>
            </header>

            {/* Editor Area */}
            <div className="flex flex-1 overflow-hidden">
                <ReactFlowProvider>
                    <BuilderSidebar />
                    <div className="flex-1 relative h-full" ref={reactFlowWrapper}>
                        <ReactFlow
                            nodes={nodes}
                            edges={edges}
                            onNodesChange={onNodesChange}
                            onEdgesChange={onEdgesChange}
                            onConnect={onConnect}
                            onInit={setReactFlowInstance}
                            onDrop={onDrop}
                            onDragOver={onDragOver}
                            onNodeClick={onNodeClick}
                            onPaneClick={onPaneClick}
                            nodeTypes={nodeTypes}
                            fitView
                        >
                            <Background color="#aaa" gap={16} />
                            <Controls />
                            <MiniMap />
                            <Panel position="top-right">
                                <div className="bg-background/50 p-2 rounded text-xs text-muted-foreground backdrop-blur-sm">
                                    Drag nodes from sidebar
                                </div>
                            </Panel>
                        </ReactFlow>
                        {selectedNode && (
                            <PropertiesPanel
                                selectedNode={selectedNode}
                                allNodes={nodes}
                                onClose={() => setSelectedNode(null)}
                                onUpdateNode={handleUpdateNode}
                            />
                        )}
                    </div>
                </ReactFlowProvider>
            </div>
        </div>
    );
}
