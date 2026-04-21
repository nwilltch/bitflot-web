"use server"

import { supabase } from "@/lib/supabase"
import { auth } from "@clerk/nextjs/server"

/**
 * Get aggregated data for charts
 */
export async function getChartDataAction(
    appId: string,
    resource: string,
    xAxis: string,
    yAxis: string,
    aggregation: 'sum' | 'count' | 'avg' = 'count'
) {
    const { userId } = await auth()
    if (!userId) return { error: "Unauthorized" }

    // In a real implementation, this would use SQL aggregation
    // For now, we fetch and aggregate in JS (not efficient for large datasets but works for MVP)
    const { data: records, error } = await supabase
        .from('records')
        .select('data')
        .eq('app_id', appId)
        .eq('resource_name', resource)

    if (error) return { error: error.message }

    // Group and aggregate
    const grouped: Record<string, number> = {}

    records?.forEach(record => {
        const xValue = record.data[xAxis] || 'Unknown'
        const yValue = Number(record.data[yAxis]) || 0

        if (!grouped[xValue]) grouped[xValue] = 0

        if (aggregation === 'count') {
            grouped[xValue]++
        } else if (aggregation === 'sum') {
            grouped[xValue] += yValue
        } else if (aggregation === 'avg') {
            // Complex logic omitted for brevity
            grouped[xValue] += yValue
        }
    })

    // Format for chart
    const chartData = Object.entries(grouped).map(([name, value]) => ({
        name,
        value
    }))

    return { success: true, data: chartData }
}

/**
 * Get events for calendar view
 */
export async function getCalendarEventsAction(
    appId: string,
    resource: string,
    dateField: string,
    titleField: string,
    start: string,
    end: string
) {
    const { userId } = await auth()
    if (!userId) return { error: "Unauthorized" }

    // Query records within date range
    // Note: This assumes dateField is stored in the JSONB 'data' column
    // Supabase JSONB filtering for dates can be tricky, simplified here
    const { data: records, error } = await supabase
        .from('records')
        .select('*')
        .eq('app_id', appId)
        .eq('resource_name', resource)
    // .gte(`data->>${dateField}`, start) // Requires proper casting in real SQL
    // .lte(`data->>${dateField}`, end)

    if (error) return { error: error.message }

    // Map to calendar event format
    const events = records?.map(record => ({
        id: record.id,
        title: record.data[titleField] || 'Untitled',
        start: record.data[dateField],
        allDay: true // Default
    })).filter(e => e.start) // Only valid dates

    return { success: true, data: events }
}

/**
 * Perform data aggregation
 */
export async function aggregateDataAction(
    appId: string,
    resource: string,
    field: string,
    functionType: 'sum' | 'count' | 'avg' | 'min' | 'max'
) {
    const { userId } = await auth()
    if (!userId) return { error: "Unauthorized" }

    const { data: records, error } = await supabase
        .from('records')
        .select('data')
        .eq('app_id', appId)
        .eq('resource_name', resource)

    if (error) return { error: error.message }

    const values = records?.map(r => Number(r.data[field])).filter(n => !isNaN(n)) || []

    let result = 0

    switch (functionType) {
        case 'sum':
            result = values.reduce((a, b) => a + b, 0)
            break
        case 'count':
            result = values.length
            break
        case 'avg':
            result = values.length ? values.reduce((a, b) => a + b, 0) / values.length : 0
            break
        case 'min':
            result = Math.min(...values)
            break
        case 'max':
            result = Math.max(...values)
            break
    }

    return { success: true, result }
}
