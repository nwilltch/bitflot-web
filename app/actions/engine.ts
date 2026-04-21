"use server"

import { supabase } from "@/lib/supabase"
import { z } from "zod"

// Generic Record Schema for validation (Basic)
const RecordSchema = z.object({
    app_id: z.string().uuid(),
    team_id: z.string().uuid(),
    folder_id: z.string().uuid().optional().nullable(),
    resource_name: z.string(),
    data: z.record(z.string(), z.any()), // JSONB data
})

export async function createRecord(prevState: any, formData: FormData) {
    const rawData = {
        app_id: formData.get("app_id"),
        team_id: formData.get("team_id"),
        folder_id: formData.get("folder_id"),
        resource_name: formData.get("resource_name"),
        data: JSON.parse(formData.get("data") as string || "{}"),
    }

    const validatedFields = RecordSchema.safeParse(rawData)

    if (!validatedFields.success) {
        return {
            error: validatedFields.error.flatten().fieldErrors,
        }
    }

    const { data, error } = await supabase
        .from("records")
        .insert([validatedFields.data])
        .select()

    if (error) {
        return { error: error.message }
    }

    return { success: true, data }
}

export async function getRecords(appId: string, resourceName: string) {
    const { data, error } = await supabase
        .from("records")
        .select("*")
        .eq("app_id", appId)
        .eq("resource_name", resourceName)

    if (error) {
        throw new Error(error.message)
    }

    return data
}

export async function deleteRecord(recordId: string) {
    const { error } = await supabase
        .from("records")
        .delete()
        .eq("id", recordId)

    if (error) {
        return { error: error.message }
    }

    return { success: true }
}
