"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Plus, ChevronRight, ChevronDown, Database, Folder, MoreHorizontal, Trash2, Edit, FolderPlus, Home, Settings } from "lucide-react"
import { UserButton } from "@clerk/nextjs"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface DashboardSidebarProps {
    app: any
    appIcon: any
    appColor: string
}

interface FolderNode {
    id: string
    name: string
    type: 'folder' | 'resource'
    children?: FolderNode[]
    resourceData?: any
}

export function DashboardSidebar({ app, appIcon: Icon, appColor }: DashboardSidebarProps) {
    const config = app.config || {}
    const resources = config.resources || []

    // Initialize folder tree structure
    const [folderTree, setFolderTree] = useState<FolderNode[]>([
        {
            id: 'root',
            name: 'All Resources',
            type: 'folder',
            children: resources.map((r: any, i: number) => ({
                id: `resource-${i}`,
                name: r.name,
                type: 'resource' as const,
                resourceData: r
            }))
        }
    ])

    const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(['root']))
    const [showNewFolderDialog, setShowNewFolderDialog] = useState(false)
    const [showNewResourceDialog, setShowNewResourceDialog] = useState(false)
    const [newItemName, setNewItemName] = useState('')
    const [selectedParentId, setSelectedParentId] = useState<string>('root')

    const toggleFolder = (folderId: string) => {
        setExpandedFolders(prev => {
            const newSet = new Set(prev)
            if (newSet.has(folderId)) {
                newSet.delete(folderId)
            } else {
                newSet.add(folderId)
            }
            return newSet
        })
    }

    const handleCreateFolder = () => {
        if (!newItemName.trim()) return

        const newFolder: FolderNode = {
            id: `folder-${Date.now()}`,
            name: newItemName,
            type: 'folder',
            children: []
        }

        // Add folder to tree
        const addToTree = (nodes: FolderNode[]): FolderNode[] => {
            return nodes.map(node => {
                if (node.id === selectedParentId) {
                    return {
                        ...node,
                        children: [...(node.children || []), newFolder]
                    }
                }
                if (node.children) {
                    return {
                        ...node,
                        children: addToTree(node.children)
                    }
                }
                return node
            })
        }

        setFolderTree(addToTree(folderTree))
        setExpandedFolders(prev => new Set([...prev, selectedParentId]))
        setNewItemName('')
        setShowNewFolderDialog(false)
    }

    const handleDeleteItem = (itemId: string) => {
        const deleteFromTree = (nodes: FolderNode[]): FolderNode[] => {
            return nodes.filter(node => node.id !== itemId).map(node => ({
                ...node,
                children: node.children ? deleteFromTree(node.children) : undefined
            }))
        }

        setFolderTree(deleteFromTree(folderTree))
    }

    const renderTreeNode = (node: FolderNode, depth: number = 0) => {
        const isExpanded = expandedFolders.has(node.id)
        const hasChildren = node.children && node.children.length > 0

        return (
            <div key={node.id}>
                <div
                    className="group flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-muted transition-colors text-sm cursor-pointer"
                    style={{ paddingLeft: `${depth * 12 + 12}px` }}
                >
                    {/* Expand/Collapse Icon */}
                    {node.type === 'folder' && (
                        <button
                            onClick={() => toggleFolder(node.id)}
                            className="shrink-0 hover:bg-muted-foreground/10 rounded p-0.5"
                        >
                            {isExpanded ? (
                                <ChevronDown className="h-3 w-3" />
                            ) : (
                                <ChevronRight className="h-3 w-3" />
                            )}
                        </button>
                    )}
                    {node.type === 'resource' && <div className="w-4" />}

                    {/* Icon */}
                    {node.type === 'folder' ? (
                        <Folder className="h-4 w-4 shrink-0 text-muted-foreground" />
                    ) : (
                        <Database className="h-4 w-4 shrink-0 text-muted-foreground" />
                    )}

                    {/* Name */}
                    <span className="flex-1 truncate">{node.name}</span>

                    {/* Resource field count */}
                    {node.type === 'resource' && node.resourceData && (
                        <span className="text-xs text-muted-foreground">
                            {node.resourceData.fields?.length || 0}
                        </span>
                    )}

                    {/* Actions Menu */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button className="opacity-0 group-hover:opacity-100 shrink-0 p-1 hover:bg-muted-foreground/10 rounded">
                                <MoreHorizontal className="h-3 w-3" />
                            </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            {node.type === 'folder' && (
                                <>
                                    <DropdownMenuItem onClick={() => {
                                        setSelectedParentId(node.id)
                                        setShowNewFolderDialog(true)
                                    }}>
                                        <FolderPlus className="h-4 w-4 mr-2" />
                                        New Folder
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => {
                                        setSelectedParentId(node.id)
                                        setShowNewResourceDialog(true)
                                    }}>
                                        <Plus className="h-4 w-4 mr-2" />
                                        New Resource
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                </>
                            )}
                            <DropdownMenuItem>
                                <Edit className="h-4 w-4 mr-2" />
                                Rename
                            </DropdownMenuItem>
                            {node.id !== 'root' && (
                                <DropdownMenuItem
                                    className="text-destructive"
                                    onClick={() => handleDeleteItem(node.id)}
                                >
                                    <Trash2 className="h-4 w-4 mr-2" />
                                    Delete
                                </DropdownMenuItem>
                            )}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                {/* Render children */}
                {node.type === 'folder' && isExpanded && node.children && (
                    <div>
                        {node.children.map(child => renderTreeNode(child, depth + 1))}
                    </div>
                )}
            </div>
        )
    }

    return (
        <>
            <aside className="w-64 border-r bg-muted/40 flex flex-col h-screen">
                {/* App Header */}
                <div className="p-4 border-b">
                    <div className="flex items-center gap-3">
                        <div
                            className="w-10 h-10 rounded flex items-center justify-center shrink-0"
                            style={{ backgroundColor: appColor + "30" }}
                        >
                            <Icon className="h-5 w-5" style={{ color: appColor }} />
                        </div>
                        <div className="flex-1 min-w-0">
                            <h2 className="font-semibold text-sm truncate">{app.name}</h2>
                            <p className="text-xs text-muted-foreground">Dashboard</p>
                        </div>
                    </div>
                </div>

                {/* Navigation */}
                <div className="flex-1 overflow-y-auto p-3 space-y-1">
                    {/* Home */}
                    <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-muted transition-colors text-sm">
                        <Home className="h-4 w-4 shrink-0" />
                        <span>Home</span>
                    </button>

                    {/* Folder Tree */}
                    <div className="pt-2">
                        {folderTree.map(node => renderTreeNode(node))}
                    </div>

                    {/* Add New Buttons */}
                    <div className="pt-4 space-y-1">
                        <Button
                            variant="ghost"
                            size="sm"
                            className="w-full justify-start gap-2 text-xs"
                            onClick={() => {
                                setSelectedParentId('root')
                                setShowNewFolderDialog(true)
                            }}
                        >
                            <FolderPlus className="h-3.5 w-3.5" />
                            New Folder
                        </Button>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="w-full justify-start gap-2 text-xs"
                            onClick={() => {
                                setSelectedParentId('root')
                                setShowNewResourceDialog(true)
                            }}
                        >
                            <Plus className="h-3.5 w-3.5" />
                            New Resource
                        </Button>
                    </div>

                    {/* Divider */}
                    <div className="pt-4 pb-2">
                        <div className="h-px bg-border" />
                    </div>

                    {/* Settings */}
                    <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-muted transition-colors text-sm">
                        <Settings className="h-4 w-4 shrink-0" />
                        <span>Settings</span>
                    </button>
                </div>

                {/* User Section */}
                <div className="p-3 border-t">
                    <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-muted transition-colors">
                        <UserButton />
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">Account</p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* New Folder Dialog */}
            <Dialog open={showNewFolderDialog} onOpenChange={setShowNewFolderDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create New Folder</DialogTitle>
                        <DialogDescription>
                            Add a new folder to organize your resources
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="folder-name">Folder Name</Label>
                            <Input
                                id="folder-name"
                                placeholder="Enter folder name..."
                                value={newItemName}
                                onChange={(e) => setNewItemName(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleCreateFolder()}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setShowNewFolderDialog(false)}>
                            Cancel
                        </Button>
                        <Button onClick={handleCreateFolder}>Create Folder</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* New Resource Dialog */}
            <Dialog open={showNewResourceDialog} onOpenChange={setShowNewResourceDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create New Resource</DialogTitle>
                        <DialogDescription>
                            Add a new data resource to your app
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="resource-name">Resource Name</Label>
                            <Input
                                id="resource-name"
                                placeholder="Enter resource name..."
                                value={newItemName}
                                onChange={(e) => setNewItemName(e.target.value)}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setShowNewResourceDialog(false)}>
                            Cancel
                        </Button>
                        <Button onClick={() => {
                            // Handle create resource
                            setNewItemName('')
                            setShowNewResourceDialog(false)
                        }}>
                            Create Resource
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}
