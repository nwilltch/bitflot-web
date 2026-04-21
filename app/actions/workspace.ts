"use server"

import { supabase } from "@/lib/supabase"

// --- TEAMS ---

export async function createTeam(name: string, ownerId: string) {
    const slug = name.toLowerCase().replace(/\s+/g, '-') + '-' + Math.random().toString(36).substring(7);

    const { data, error } = await supabase
        .from("teams")
        .insert([{ name, slug, owner_id: ownerId }])
        .select()
        .single()

    if (error) return { error: error.message }
    return { success: true, data }
}

export async function getTeams(userId: string) {
    // For now, just fetching teams where user is owner. 
    // In real app, join with team_members.
    const { data, error } = await supabase
        .from("teams")
        .select("*")
        .eq("owner_id", userId)

    if (error) return { error: error.message }
    return { success: true, data }
}

// --- FOLDERS ---

export async function createFolder(name: string, teamId: string, parentId?: string) {
    const { data, error } = await supabase
        .from("folders")
        .insert([{ name, team_id: teamId, parent_id: parentId }])
        .select()
        .single()

    if (error) return { error: error.message }
    return { success: true, data }
}

export async function getFolders(teamId: string, parentId: string | null = null) {
    let query = supabase
        .from("folders")
        .select("*")
        .eq("team_id", teamId)

    if (parentId) {
        query = query.eq("parent_id", parentId)
    } else {
        query = query.is("parent_id", null)
    }

    const { data, error } = await query

    if (error) return { error: error.message }
    return { success: true, data }
}
