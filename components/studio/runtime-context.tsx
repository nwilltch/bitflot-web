"use client"

import * as React from "react"
import { Action } from "@/components/studio/component-renderer"

interface RuntimeContextValue {
    dataStore: Map<string, any[]>
    currentPage: string
    navigate: (path: string) => void
    showToast: (message: string, type: 'success' | 'error' | 'info' | 'warning') => void
    createRecord: (table: string, data: any) => string
    updateRecord: (table: string, id: string, data: any) => void
    deleteRecord: (table: string, id: string) => void
    executeActionStack: (actions: Action[], eventData?: any) => Promise<void>
}

const RuntimeContext = React.createContext<RuntimeContextValue | null>(null)

export function useRuntime() {
    const context = React.useContext(RuntimeContext)
    if (!context) {
        throw new Error("useRuntime must be used within RuntimeProvider")
    }
    return context
}

interface RuntimeProviderProps {
    children: React.ReactNode
    initialPage?: string
}

export function RuntimeProvider({ children, initialPage = "/" }: RuntimeProviderProps) {
    const [dataStore, setDataStore] = React.useState<Map<string, any[]>>(new Map())
    const [currentPage, setCurrentPage] = React.useState(initialPage)
    const [toasts, setToasts] = React.useState<Array<{ id: string; message: string; type: string }>>([])

    const navigate = React.useCallback((path: string) => {
        setCurrentPage(path)
    }, [])

    const showToast = React.useCallback((message: string, type: 'success' | 'error' | 'info' | 'warning') => {
        const id = Math.random().toString(36).substr(2, 9)
        setToasts(prev => [...prev, { id, message, type }])

        // Auto-remove after 3 seconds
        setTimeout(() => {
            setToasts(prev => prev.filter(t => t.id !== id))
        }, 3000)
    }, [])

    const createRecord = React.useCallback((table: string, data: any): string => {
        const id = Math.random().toString(36).substr(2, 9)
        const record = { id, ...data, createdAt: new Date().toISOString() }

        setDataStore(prev => {
            const newStore = new Map(prev)
            const tableData = newStore.get(table) || []
            newStore.set(table, [...tableData, record])
            return newStore
        })

        return id
    }, [])

    const updateRecord = React.useCallback((table: string, id: string, data: any) => {
        setDataStore(prev => {
            const newStore = new Map(prev)
            const tableData = newStore.get(table) || []
            const updatedData = tableData.map(record =>
                record.id === id ? { ...record, ...data, updatedAt: new Date().toISOString() } : record
            )
            newStore.set(table, updatedData)
            return newStore
        })
    }, [])

    const deleteRecord = React.useCallback((table: string, id: string) => {
        setDataStore(prev => {
            const newStore = new Map(prev)
            const tableData = newStore.get(table) || []
            newStore.set(table, tableData.filter(record => record.id !== id))
            return newStore
        })
    }, [])

    // Action Handlers
    const executeShowMessage = React.useCallback((action: Action) => {
        const { message, type } = action.config
        showToast(message || "Action executed", type || 'info')
    }, [showToast])

    const executeNavigate = React.useCallback((action: Action) => {
        const { path } = action.config
        if (path) {
            navigate(path)
        }
    }, [navigate])

    const executeCreateRecord = React.useCallback((action: Action, eventData?: any) => {
        const { table } = action.config
        if (table && eventData) {
            createRecord(table, eventData)
        }
    }, [createRecord])

    const executeUpdateRecord = React.useCallback((action: Action, eventData?: any) => {
        const { table, id } = action.config
        if (table && id && eventData) {
            updateRecord(table, id, eventData)
        }
    }, [updateRecord])

    const executeDeleteRecord = React.useCallback((action: Action) => {
        const { table, id } = action.config
        if (table && id) {
            deleteRecord(table, id)
        }
    }, [deleteRecord])

    const executeSendEmail = React.useCallback((action: Action) => {
        const { to, subject } = action.config
        console.log(`[Mock Email] To: ${to}, Subject: ${subject}`)
        showToast(`Email sent to ${to}`, 'success')
    }, [showToast])

    // Main Action Executor
    const executeActionStack = React.useCallback(async (actions: Action[], eventData?: any) => {
        for (const action of actions) {
            try {
                switch (action.type) {
                    case 'show_message':
                        executeShowMessage(action)
                        break
                    case 'navigate':
                        executeNavigate(action)
                        break
                    case 'create_record':
                        executeCreateRecord(action, eventData)
                        break
                    case 'update_record':
                        executeUpdateRecord(action, eventData)
                        break
                    case 'delete_record':
                        executeDeleteRecord(action)
                        break
                    case 'send_email':
                        executeSendEmail(action)
                        break
                    default:
                        console.warn(`Unknown action type: ${action.type}`)
                }
            } catch (error) {
                console.error(`Error executing action ${action.type}:`, error)
                showToast(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`, 'error')
            }
        }
    }, [executeShowMessage, executeNavigate, executeCreateRecord, executeUpdateRecord, executeDeleteRecord, executeSendEmail, showToast])

    const value: RuntimeContextValue = {
        dataStore,
        currentPage,
        navigate,
        showToast,
        createRecord,
        updateRecord,
        deleteRecord,
        executeActionStack,
    }

    return (
        <RuntimeContext.Provider value={value}>
            {children}
            {/* Toast Container */}
            <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
                {toasts.map(toast => (
                    <div
                        key={toast.id}
                        className={`px-4 py-3 rounded-lg shadow-lg text-white animate-in slide-in-from-right ${toast.type === 'success' ? 'bg-green-600' :
                                toast.type === 'error' ? 'bg-red-600' :
                                    toast.type === 'warning' ? 'bg-yellow-600' :
                                        'bg-blue-600'
                            }`}
                    >
                        {toast.message}
                    </div>
                ))}
            </div>
        </RuntimeContext.Provider>
    )
}
