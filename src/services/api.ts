import { ChatResponse, ComplianceStatsResponse, SendMessageParams } from "@/types/api"
import axios from 'axios'

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"

const apiClient = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
})

export async function sendChatMessage(params: SendMessageParams): Promise<ChatResponse> {
    const endpoint = `${API_URL}/fireworks/chat`

    const requestBody: Record<string, any> = {}

    if (params.conversationId) {
        requestBody.conversationId = params.conversationId
        requestBody.initialMessage = params.message
    } else {
        requestBody.initialMessage = params.message
    }

    try {
        const response = await apiClient.post<ChatResponse>(endpoint, requestBody)
        return response.data
    } catch (error) {
        console.error("Error sending chat message:", error)
        throw error
    }
}

export async function getComplianceStats(conversationId: string): Promise<ComplianceStatsResponse> {
    const endpoint = `${API_URL}/conversations/get-compliance-percentages?conversationId=${conversationId}`

    try {
        const response = await apiClient.get<ComplianceStatsResponse>(endpoint, {
            params: { conversationId },
            headers: {
                Accept: "*/*",
            },
        })
        return response.data
    } catch (error) {
        console.error("Error fetching compliance stats:", error)
        throw error
    }
}

export async function getValidatorsByMessageId(messageId: string): Promise<any> {
    const endpoint = `${API_URL}/conversations/get-validators-by-message-id?messageId=${messageId}`
    try {
        const response = await apiClient.get(endpoint, {
            params: { messageId },
            headers: {
                Accept: "*/*",
            },
        })
        return response.data
    } catch (error) {
        console.error("Error fetching validators by message ID:", error)
        throw error
    }
}