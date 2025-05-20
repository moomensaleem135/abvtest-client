"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ExitIcon } from "@/assets/icons"
import ValidatorTable from "./validator-table"
import { getComplianceStats } from "@/services/api"

interface ValidationItems {
  scope: string
  coverage?: string
  status?: "Pass" | "Fail"
  id?: string
  earnings?: string
  usage?: string
  quickStats?: {
    left: number
    right: number
  }
  isActive?: boolean
}

const ValidatorView = () => {
  const [validationData, setValidationData] = useState<ValidationItems[]>([])
  const [metricsData, setMetricsData] = useState<ValidationItems[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchComplianceStats = async () => {
      try {
        setIsLoading(true)
        setError(null)
        const conversationId = localStorage.getItem("currentConversationId")

        if (!conversationId) {
          setError("No conversation ID found. Please start a chat in Developer View first.")
          return
        }

        const stats = await getComplianceStats(conversationId)
        const validationItems: ValidationItems[] = []

        stats.rawStats.forEach((stat) => {
          validationItems.push({
            scope: "HIPAA",
            coverage: "10,000 ABV",
            status: stat.HIPPA as "Pass" | "Fail",
            id: stat.messageId,
          })
          validationItems.push({
            scope: "SOC2",
            coverage: "25,000 ABV",
            status: stat.SOC2 as "Pass" | "Fail",
            id: stat.messageId,
          })
          validationItems.push({
            scope: "Bank Details Check",
            coverage: "No Coverage",
            status: stat.BankDetails as "Pass" | "Fail",
            id: stat.messageId,
          })
        })

        setValidationData(validationItems)

        const metricsItems: ValidationItems[] = [
          {
            scope: "HIPAA",
            earnings: "379 ABV",
            usage: `${Math.round(stats.totalMessages * 0.8)}k runs`,
            quickStats: {
              left: stats.percentages.HIPPA.passPercentage,
              right: stats.percentages.HIPPA.failPercentage,
            },
            isActive: true,
            id: "hipaa-metrics",
          },
          {
            scope: "SOC2",
            earnings: "379 ABV",
            usage: `${Math.round(stats.totalMessages * 1.2)}k runs`,
            quickStats: {
              left: stats.percentages.SOC2.passPercentage,
              right: stats.percentages.SOC2.failPercentage,
            },
            isActive: true,
            id: "soc2-metrics",
          },
          {
            scope: "Bank Details Check",
            earnings: "379 ABV",
            usage: `${Math.round(stats.totalMessages * 1.5)}k runs`,
            quickStats: {
              left: stats.percentages.BankDetails.passPercentage,
              right: stats.percentages.BankDetails.failPercentage,
            },
            isActive: true,
            id: "bank-metrics",
          },
        ]

        setMetricsData(metricsItems)
      } catch (err) {
        console.error("Error fetching compliance stats:", err)
        setError("Failed to fetch compliance statistics. Please try again.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchComplianceStats()
  }, [])

  const handleToggleStatus = (id: string, isActive: boolean) => {
    setMetricsData((prevData) => prevData.map((item) => (item.id === id ? { ...item, isActive } : item)))
  }
 
  return (
    <div className="min-h-screen flex flex-col container mx-auto">
      <div className="flex justify-end items-end py-6">
        <Link
          href="/"
          className="cursor-pointer text-white/80 flex items-center gap-2 px-4 py-2 rounded-md bg-[#1A1A1A] mt-3 z-20"
        >
          <ExitIcon />
          Exit Validator View
        </Link>
      </div>

      <div className="flex flex-1 py-6 gap-4 flex-wrap md:flex-nowrap">
        {isLoading ? (
          <div className="w-full flex items-center justify-center text-white/80">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-white/60 animate-pulse"></div>
              <div className="w-3 h-3 rounded-full bg-white/60 animate-pulse delay-100"></div>
              <div className="w-3 h-3 rounded-full bg-white/60 animate-pulse delay-200"></div>
              <span className="ml-2">Loading...</span>
            </div>
          </div>
        ) : error ? (
          <div className="w-full flex items-center justify-center text-red-400 bg-[#AEAEAE] bg-opacity-[0.16] rounded-lg p-4">
            {error}
          </div>
        ) : (
          <>
            <div className="flex-1 bg-[#AEAEAE] bg-opacity-[0.16] rounded-lg overflow-hidden">
              <ValidatorTable data={validationData} type="validation" />
            </div>

            <div className="flex-1 bg-[#AEAEAE] bg-opacity-[0.16] rounded-lg overflow-hidden">
              <ValidatorTable data={metricsData} type="metrics" onToggleStatus={handleToggleStatus} />
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default ValidatorView
