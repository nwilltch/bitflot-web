"use server"

import { supabase } from "@/lib/supabase"
import { auth } from "@clerk/nextjs/server"

/**
 * Query records with filters, sorting, and limits
 */
export async function queryRecords(
    appId: string,
    resource: string,
    filters?: Record<string, any>,
    limit?: number,
    orderBy?: { field: string; direction: 'asc' | 'desc' }
) {
    const { userId } = await auth()
    if (!userId) return { error: "Unauthorized" }

    let query = supabase
        .from('records')
        .select('*')
        .eq('app_id', appId)
        .eq('resource_name', resource)

    // Apply filters
    if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
            // Query JSONB data column
            query = query.eq(`data->${key}`, value)
        })
    }

    // Apply ordering
    if (orderBy) {
        query = query.order(`data->${orderBy.field}`, {
            ascending: orderBy.direction === 'asc'
        })
    }

    // Apply limit
    if (limit && limit > 0) {
        query = query.limit(limit)
    }

    const { data, error } = await query

    if (error) {
        console.error('Query error:', error)
        return { error: error.message }
    }

    return { success: true, data: data || [] }
}

/**
 * Create a new record
 */
export async function createRecordAction(
    appId: string,
    resource: string,
    data: Record<string, any>,
    teamId: string
) {
    const { userId } = await auth()
    if (!userId) return { error: "Unauthorized" }

    const { data: record, error } = await supabase
        .from('records')
        .insert([{
            app_id: appId,
            team_id: teamId,
            resource_name: resource,
            data,
            created_by: userId
        }])
        .select()
        .single()

    if (error) {
        console.error('Create error:', error)
        return { error: error.message }
    }

    return { success: true, data: record }
}

/**
 * Update an existing record
 */
export async function updateRecordAction(
    recordId: string,
    updates: Record<string, any>
) {
    const { userId } = await auth()
    if (!userId) return { error: "Unauthorized" }

    // Fetch current record to merge updates
    const { data: currentRecord } = await supabase
        .from('records')
        .select('data')
        .eq('id', recordId)
        .single()

    if (!currentRecord) {
        return { error: "Record not found" }
    }

    // Merge updates with existing data
    const mergedData = { ...currentRecord.data, ...updates }

    const { data: record, error } = await supabase
        .from('records')
        .update({ data: mergedData })
        .eq('id', recordId)
        .select()
        .single()

    if (error) {
        console.error('Update error:', error)
        return { error: error.message }
    }

    return { success: true, data: record }
}

/**
 * Delete a record
 */
export async function deleteRecordAction(recordId: string) {
    const { userId } = await auth()
    if (!userId) return { error: "Unauthorized" }

    const { error } = await supabase
        .from('records')
        .delete()
        .eq('id', recordId)

    if (error) {
        console.error('Delete error:', error)
        return { error: error.message }
    }

    return { success: true }
}

/**
 * Bulk update multiple records
 */
export async function bulkUpdateRecords(
    appId: string,
    resource: string,
    filters: Record<string, any>,
    updates: Record<string, any>
) {
    const { userId } = await auth()
    if (!userId) return { error: "Unauthorized" }

    // First, query matching records
    const queryResult = await queryRecords(appId, resource, filters)

    if (!queryResult.success || !queryResult.data) {
        return { error: "Failed to query records" }
    }

    // Update each record
    const updatePromises = queryResult.data.map((record: any) =>
        updateRecordAction(record.id, updates)
    )

    const results = await Promise.all(updatePromises)
    const errors = results.filter(r => !r.success)

    if (errors.length > 0) {
        return {
            error: `Failed to update ${errors.length} records`,
            partialSuccess: true,
            updated: results.length - errors.length
        }
    }

    return {
        success: true,
        updated: results.length
    }
}
