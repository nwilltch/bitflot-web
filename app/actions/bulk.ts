"use server"

import { supabase } from "@/lib/supabase"
import { auth } from "@clerk/nextjs/server"

/**
 * Export data to CSV/JSON
 */
export async function exportDataAction(
    appId: string,
    resource: string,
    format: 'csv' | 'json' = 'csv'
) {
    const { userId } = await auth()
    if (!userId) return { error: "Unauthorized" }

    const { data: records, error } = await supabase
        .from('records')
        .select('data')
        .eq('app_id', appId)
        .eq('resource_name', resource)

    if (error) return { error: error.message }

    if (format === 'json') {
        return { success: true, data: JSON.stringify(records, null, 2), mimeType: 'application/json' }
    } else {
        // Convert to CSV
        if (!records || records.length === 0) return { success: true, data: '', mimeType: 'text/csv' }

        const headers = Object.keys(records[0].data).join(',')
        const rows = records.map(r => Object.values(r.data).map(v => `"${v}"`).join(','))
        const csv = [headers, ...rows].join('\n')

        return { success: true, data: csv, mimeType: 'text/csv' }
    }
}

/**
 * Import data from JSON (CSV parsing would happen on client)
 */
export async function importDataAction(
    appId: string,
    resource: string,
    data: any[]
) {
    const { userId } = await auth()
    if (!userId) return { error: "Unauthorized" }

    // Get team ID (simplified: assume first team for user)
    const { data: teamMember } = await supabase
        .from('team_members')
        .select('team_id')
        .eq('user_id', userId)
        .single()

    const teamId = teamMember?.team_id

    if (!teamId) return { error: "No team found" }

    // Bulk insert
    const records = data.map(item => ({
        app_id: appId,
        team_id: teamId,
        resource_name: resource,
        data: item,
        created_by: userId
    }))

    const { error } = await supabase
        .from('records')
        .insert(records)

    if (error) return { error: error.message }

    return { success: true, count: records.length }
}

/**
 * Duplicate a record
 */
export async function duplicateRecordAction(
    recordId: string,
    overrides: Record<string, any> = {}
) {
    const { userId } = await auth()
    if (!userId) return { error: "Unauthorized" }

    // Fetch original
    const { data: original, error: fetchError } = await supabase
        .from('records')
        .select('*')
        .eq('id', recordId)
        .single()

    if (fetchError) return { error: fetchError.message }

    // Create copy with overrides
    const newData = { ...original.data, ...overrides }

    const { data: newRecord, error: insertError } = await supabase
        .from('records')
        .insert([{
            app_id: original.app_id,
            team_id: original.team_id,
            resource_name: original.resource_name,
            data: newData,
            created_by: userId
        }])
        .select()
        .single()

    if (insertError) return { error: insertError.message }

    return { success: true, data: newRecord }
}

/**
 * Link records (Conceptual - stores ID reference in data)
 */
export async function linkRecordsAction(
    parentId: string,
    childId: string,
    relationField: string
) {
    const { userId } = await auth()
    if (!userId) return { error: "Unauthorized" }

    // Update parent to reference child
    // In a real relational DB this would be a foreign key
    // In our JSONB model, we store the ID in a field

    // First fetch parent data to merge
    const { data: parent, error: fetchError } = await supabase
        .from('records')
        .select('data')
        .eq('id', parentId)
        .single()

    if (fetchError) return { error: fetchError.message }

    const newData = { ...parent.data, [relationField]: childId }

    const { error } = await supabase
        .from('records')
        .update({ data: newData })
        .eq('id', parentId)

    if (error) return { error: error.message }

    return { success: true }
}
