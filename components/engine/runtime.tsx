"use client"

import { useState, useEffect } from "react"
import { getFolders } from "@/app/actions/workspace"
import { getRecords, createRecord } from "@/app/actions/engine"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Folder, File, Plus, Loader2 } from "lucide-react"

interface BitSaaSRuntimeProps {
    appId: string
    teamId: string
    config: any // The JSON Config from Builder
}

export function BitSaaSRuntime({ appId, teamId, config }: BitSaaSRuntimeProps) {
    const [currentFolder, setCurrentFolder] = useState<string | null>(null)
    const [folders, setFolders] = useState<any[]>([])
    const [records, setRecords] = useState<any[]>([])
    const [loading, setLoading] = useState(false)

    // Fetch Folders & Records
    useEffect(() => {
        async function loadData() {
            setLoading(true)
            // 1. Load Folders
            const folderRes = await getFolders(teamId, currentFolder)
            if (folderRes.success) setFolders(folderRes.data)

            // 2. Load Records (Mocking resource name 'file' for now, should come from config)
            const resourceName = config.resources?.[0]?.name || "file"
            const recordData = await getRecords(appId, resourceName)
            // Filter by folder client-side for now (or update server action)
            const filteredRecords = recordData?.filter((r: any) =>
                currentFolder ? r.folder_id === currentFolder : r.folder_id === null
            ) || []

            setRecords(filteredRecords)
            setLoading(false)
        }
        loadData()
    }, [appId, teamId, currentFolder, config])

    return (
        <div className="flex h-full">
            {/* Sidebar / Folder Tree */}
            <div className="w-64 border-r bg-muted/10 p-4">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-sm">Folders</h3>
                    <Button variant="ghost" size="icon" className="h-6 w-6">
                        <Plus className="h-4 w-4" />
                    </Button>
                </div>
                <div className="space-y-1">
                    {currentFolder && (
                        <Button
                            variant="ghost"
                            className="w-full justify-start gap-2 text-muted-foreground"
                            onClick={() => setCurrentFolder(null)}
                        >
                            <Folder className="h-4 w-4" />
                            .. (Up)
                        </Button>
                    )}
                    {folders.map(folder => (
                        <Button
                            key={folder.id}
                            variant="ghost"
                            className="w-full justify-start gap-2"
                            onClick={() => setCurrentFolder(folder.id)}
                        >
                            <Folder className="h-4 w-4 fill-yellow-500 text-yellow-600" />
                            {folder.name}
                        </Button>
                    ))}
                </div>
            </div>

            {/* Main Content / Records */}
            <div className="flex-1 p-6">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold">{config.app_name || "Untitled App"}</h2>
                    <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        New {config.resources?.[0]?.name || "Item"}
                    </Button>
                </div>

                {loading ? (
                    <div className="flex justify-center p-8">
                        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {records.length === 0 && (
                            <div className="col-span-full text-center py-12 text-muted-foreground border-2 border-dashed rounded-lg">
                                No records found in this folder.
                            </div>
                        )}
                        {records.map(record => (
                            <Card key={record.id}>
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-base flex items-center gap-2">
                                        <File className="h-4 w-4" />
                                        {record.data.filename || "Untitled"}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <pre className="text-xs text-muted-foreground overflow-hidden">
                                        {JSON.stringify(record.data, null, 2)}
                                    </pre>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
