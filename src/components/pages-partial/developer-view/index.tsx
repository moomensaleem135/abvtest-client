"use client"

import type React from "react"

import { useMemo, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { FilterButton } from "@/components/ui/filter-button"
import { ChatMessage } from "@/components/ui/chat-message"
import ValidationTable from "./validation-table"
import { sendChatMessage } from "@/services/api"
import { AddIcon, ExitIcon, MicIcon, RefreshIcon } from "@/assets/icons"
import bgLogo from '../../../assets/images/bgLogo.png'

interface Message {
  text: string
  isUser: boolean
}

interface ValidationResult {
  scope: string
  details: string
  coverage: string
  status: string;
}

const DeveloperView = () => {
  const [activeFilters, setActiveFilters] = useState<string[]>(["HIPAA", "BANK DETAILS", "SAFE HEALTH ADVICE"])
  const [inputText, setInputText] = useState<string>("")
  const [chatMessages, setChatMessages] = useState<Message[]>([])
  const [conversationId, setConversationId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [allValidationResults, setAllValidationResults] = useState<ValidationResult[]>([])

  const filteredValidationResults = useMemo(() => {
    return allValidationResults.filter((result) => {
      if (result.scope === "HIPAA" && activeFilters.includes("HIPAA")) return true
      if (result.scope === "Bank Details Check" && activeFilters.includes("BANK DETAILS")) return true
      if (result.scope === "Safe Health Advice" && activeFilters.includes("SAFE HEALTH ADVICE")) return true
      return false
    })
  }, [allValidationResults, activeFilters])
  

  const processValidationResponse = (response: any) => {
    const results: ValidationResult[] = []

    if (response?.compliance) {
      if (response.compliance.hipaa) {
        results.push({
          scope: "HIPAA",
          details: response.compliance.hipaa.message,
          coverage: "10,000 ABV",
          status: response.compliance.hipaa.status as "Pass" | "Fail",
        })
      }

      if (response.compliance.bankData) {
        results.push({
          scope: "Bank Details Check",
          details: response.compliance.bankData.message,
          coverage: response.compliance.bankData.status === "Pass" ? "No Coverage" : "Coverage Details",
          status: response.compliance.bankData.status as "Pass" | "Fail",
        })
      }

      if (response.compliance.soc2) {
        results.push({
          scope: "Safe Health Advice",
          details: response.compliance.soc2.message,
          coverage: "25,000 ABV",
          status: response.compliance.soc2.status as "Pass" | "Fail",
        })
      }
    }

    return results
  }

  const handleSendMessage = async () => {
    if (inputText.trim()) {
      try {
        const userMessage = { text: inputText, isUser: true }
        setChatMessages((prev) => [...prev, userMessage])
        setInputText("")
        setIsLoading(true)

        const response = await sendChatMessage({
          message: inputText,
          conversationId: conversationId || undefined,
        })

        if (response.conversationId) {
          setConversationId(response.conversationId)
           localStorage.setItem("currentConversationId", response.conversationId)
        }

        // Add AI response to chat
        if (response.message && response.message.content) {
          setChatMessages((prev) => [...prev, { text: response.message.content, isUser: false }])
        }

        if (response.validatorResponse) {
          const results = processValidationResponse(response.validatorResponse)
          setAllValidationResults(results)
        }
      } catch (error) {
        console.error("Error sending message:", error)
        setChatMessages((prev) => [
          ...prev,
          {
            text: "Sorry, there was an error processing your message. Please try again.",
            isUser: false,
          },
        ])
      } finally {
        setIsLoading(false)
      }
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const toggleFilter = (filter: string) => {
    if (activeFilters.includes(filter)) {
      setActiveFilters(activeFilters.filter((f) => f !== filter))
    } else {
      setActiveFilters([...activeFilters, filter])
    }
  }

  return (
    <div className="min-h-screen flex flex-col container mx-auto">
      <div className="flex justify-end items-end py-6">
        <Link
          href="/"
          className="cursor-pointer text-white/80 flex items-center gap-2 px-4 py-2 rounded-md bg-[#1A1A1A] mt-3 z-20"
        >
          <ExitIcon />
          Exit Dev View
        </Link>
      </div>

      <div className="flex flex-1 py-6 gap-4 flex-wrap md:flex-nowrap">
        <div className="flex-1 bg-[#AEAEAE] bg-opacity-[0.16] rounded-lg overflow-hidden">
          <ValidationTable results={filteredValidationResults} />
        </div>

        <div className="flex-1 md:flex-[0.5] bg-[#AEAEAE] bg-opacity-[0.16] rounded-lg flex flex-col rounded-[19px]">
          <div className="p-4 flex items-center justify-between bg-[#515353] rounded-tr-[19px] rounded-tl-[19px]">
            <div className="flex items-center gap-2">
              <Image src={bgLogo} width={40} height={40} alt="ABV Logo" />
              <div>
                <h3 className="text-white font-medium">Test Chat</h3>
                <p className="text-[#F7F7F7]/60 text-sm">Try validation settings!</p>
              </div>
            </div>
            <button className="cursor-pointer">
              <RefreshIcon />
            </button>
          </div>

          <div className="flex gap-2 p-3 bg-[#515353] border-b border-[#2A2A2A]">
            <FilterButton
              label="HIPAA"
              isActive={activeFilters.includes("HIPAA")}
              onClick={() => toggleFilter("HIPAA")}
            />
            <FilterButton
              label="BANK DETAILS"
              isActive={activeFilters.includes("BANK DETAILS")}
              onClick={() => toggleFilter("BANK DETAILS")}
            />
            <FilterButton
              label="SAFE HEALTH ADVICE"
              isActive={activeFilters.includes("SAFE HEALTH ADVICE")}
              onClick={() => toggleFilter("SAFE HEALTH ADVICE")}
            />
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[calc(100vh-360px)]">
            {chatMessages.map((message, index) => (
              <ChatMessage key={index} text={message.text} isUser={message.isUser} />
            ))}
            {isLoading && (
              <div className="flex items-center space-x-2 text-white/60">
                <div className="w-2 h-2 rounded-full bg-white/60 animate-pulse"></div>
                <div className="w-2 h-2 rounded-full bg-white/60 animate-pulse delay-100"></div>
                <div className="w-2 h-2 rounded-full bg-white/60 animate-pulse delay-200"></div>
              </div>
            )}
          </div>

          <div className="m-3 rounded-lg border border-[#FFFFFF] border-opacity-[0.46]">
            <div className="flex items-center gap-2 bg-[#2A2A2A] rounded-lg p-4">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent text-[#F7F7F7]/80 text-sm outline-none"
                placeholder="Type a message..."
                disabled={isLoading}
              />
              <button
                className={`text-[#F7F7F7]/60 ${isLoading ? "opacity-50 cursor-not-allowed" : "hover:text-white"}`}
                onClick={handleSendMessage}
                disabled={isLoading}
              >
                <AddIcon />
              </button>
              <button className="text-[#F7F7F7]/60">
                <MicIcon />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DeveloperView
