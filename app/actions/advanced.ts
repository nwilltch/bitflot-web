"use server"

import { auth } from "@clerk/nextjs/server"

/**
 * Transform data using JSONata-like mapping
 */
export async function transformDataAction(
    input: any,
    mappings: Record<string, string>
) {
    const { userId } = await auth()
    if (!userId) return { error: "Unauthorized" }

    try {
        const result: Record<string, any> = {}

        // Simple mapping implementation
        // In production, use a library like 'jsonata' or 'jq'
        for (const [targetKey, sourcePath] of Object.entries(mappings)) {
            // Support simple dot notation: "user.address.city"
            const value = sourcePath.split('.').reduce((obj, key) => obj?.[key], input)
            result[targetKey] = value
        }

        return { success: true, data: result }
    } catch (error: any) {
        return { error: error.message }
    }
}

/**
 * Perform calculation using a formula
 */
export async function calculateAction(
    formula: string,
    variables: Record<string, number>
) {
    const { userId } = await auth()
    if (!userId) return { error: "Unauthorized" }

    try {
        // Security: Use a safe math parser instead of eval
        // For this implementation, we'll do a very basic safe eval
        // In production, use 'mathjs'

        // 1. Replace variables with values
        let expression = formula
        for (const [key, value] of Object.entries(variables)) {
            expression = expression.replace(new RegExp(`\\b${key}\\b`, 'g'), String(value))
        }

        // 2. Validate expression contains only safe chars
        if (!/^[0-9+\-*/%.()\s]+$/.test(expression)) {
            return { error: "Invalid characters in formula" }
        }

        // 3. Evaluate
        // eslint-disable-next-line no-new-func
        const result = new Function(`return ${expression}`)()

        return { success: true, result }
    } catch (error: any) {
        return { error: `Calculation error: ${error.message}` }
    }
}
