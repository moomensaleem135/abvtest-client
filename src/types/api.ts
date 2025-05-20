export interface ChatResponse {
  conversationId: string
  messageId?:string
  message: {
    messageId: string
    role: string
    content: string
  }
  validatorResponse: {
    role: string
    content: string
    compliance: {
      soc2: {
        status: string
        message: string
      }
      hipaa: {
        status: string
        message: string
      }
      bankData: {
        status: string
        message: string
      }
    }
  }
}

export interface SendMessageParams {
  message?: string
  conversationId?: string
}

export interface ComplianceStatsResponse {
  totalMessages: number
  percentages: {
    SOC2: {
      passPercentage: number
      failPercentage: number
    }
    HIPPA: {
      passPercentage: number
      failPercentage: number
    }
    BankDetails: {
      passPercentage: number
      failPercentage: number
    }
  }
  rawStats: Array<{
    _id: string
    conversationId: string
    messageId: string
    BankDetails: string
    HIPPA: string
    SOC2: string
    __v: number
    createdAt: string
    updatedAt: string
  }>
}

export interface ValidatorsByMessageIdResponse {
  validatorResponse: {
    Hippa?: "Pass" | "Fail"
    Soc2?: "Pass" | "Fail"
    bandDetails?: "Pass" | "Fail"
  }
}
