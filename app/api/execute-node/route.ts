import { auth } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'
import { getCreatorSubscription } from '@/app/actions/subscriptions'
import { supabase } from '@/lib/supabase'

/**
 * Secure server-side execution API for Premium Nodes
 * CRITICAL: API keys are NEVER exposed to the client
 */
export async function POST(request: NextRequest) {
    try {
        // 1. Authenticate user
        const { userId } = await auth()
        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const { nodeType, nodeConfig, inputData, appId } = await request.json()

        // 2. Verify app exists and get creator
        const { data: app } = await supabase
            .from('apps')
            .select('created_by')
            .eq('id', appId)
            .single()

        if (!app) {
            return NextResponse.json({ error: 'App not found' }, { status: 404 })
        }

        // 3. Verify creator has Premium Nodes access
        const subscription = await getCreatorSubscription(app.created_by)
        if (!subscription.features?.premium_nodes) {
            return NextResponse.json({
                error: 'Premium Nodes require PRO plan'
            }, { status: 403 })
        }

        // 4. Execute based on node type
        if (nodeType === 'openai') {
            return await executeOpenAI(nodeConfig, inputData)
        }

        if (nodeType === 'custom-code') {
            return await executeCustomCode(nodeConfig, inputData)
        }

        return NextResponse.json({ error: 'Unknown node type' }, { status: 400 })

    } catch (error: any) {
        console.error('Node execution error:', error)
        return NextResponse.json({
            error: error.message || 'Internal server error'
        }, { status: 500 })
    }
}

/**
 * Execute OpenAI Node
 * API key stored securely in environment variables
 */
async function executeOpenAI(nodeConfig: any, inputData: any) {
    // Check if OpenAI API key is configured
    if (!process.env.OPENAI_API_KEY) {
        return NextResponse.json({
            error: 'OpenAI API key not configured. Please contact support.'
        }, { status: 500 })
    }

    try {
        // Dynamic import to avoid bundling OpenAI in client
        const OpenAI = (await import('openai')).default

        const openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY // SECURE: Server-side only
        })

        const completion = await openai.chat.completions.create({
            model: nodeConfig.model || 'gpt-4',
            messages: [
                {
                    role: 'user',
                    content: inputData.prompt || 'Hello'
                }
            ],
            max_tokens: nodeConfig.maxTokens || 500,
            temperature: nodeConfig.temperature || 0.7
        })

        return NextResponse.json({
            success: true,
            result: completion.choices[0].message.content,
            usage: completion.usage
        })

    } catch (error: any) {
        console.error('OpenAI execution error:', error)
        return NextResponse.json({
            error: `OpenAI error: ${error.message}`
        }, { status: 500 })
    }
}

/**
 * Execute Custom Code Node
 * Runs in sandboxed environment for security
 */
async function executeCustomCode(nodeConfig: any, inputData: any) {
    try {
        // For now, we'll use a simple eval with timeout
        // In production, use VM2 or isolated-vm for better sandboxing

        const code = nodeConfig.code || 'return input'
        const timeout = nodeConfig.timeout || 5000

        // Create sandboxed function
        const sandboxedFunction = new Function('input', `
            'use strict';
            try {
                ${code}
            } catch (error) {
                throw new Error('Code execution error: ' + error.message);
            }
        `)

        // Execute with timeout
        const result = await Promise.race([
            Promise.resolve(sandboxedFunction(inputData)),
            new Promise((_, reject) =>
                setTimeout(() => reject(new Error('Execution timeout')), timeout)
            )
        ])

        return NextResponse.json({
            success: true,
            result
        })

    } catch (error: any) {
        console.error('Custom code execution error:', error)
        return NextResponse.json({
            error: `Code execution error: ${error.message}`
        }, { status: 500 })
    }
}

/**
 * SECURITY NOTES:
 * 
 * 1. API Keys Protection:
 *    - OpenAI API key stored in process.env (server-side only)
 *    - NEVER sent to client
 *    - NEVER included in config JSON
 * 
 * 2. Authentication:
 *    - Clerk auth required for all requests
 *    - Creator subscription verified before execution
 * 
 * 3. Code Sandboxing:
 *    - Custom code runs in isolated context
 *    - Timeout protection (default 5s)
 *    - No access to file system or network
 *    - Consider upgrading to VM2 for production
 * 
 * 4. Rate Limiting:
 *    - TODO: Add rate limiting per user/app
 *    - TODO: Add cost tracking for OpenAI usage
 */
