"use client"

import Image from "next/image"
import bgLogo from '../../assets/images/bgLogo.png'
interface ChatMessageProps {
  text: string
  isUser: boolean
  messageId?: string
  onMessageClick?: (messageId: string) => void
}

export function ChatMessage({ text, isUser, messageId, onMessageClick }: ChatMessageProps) {
  const isClickable = !isUser && messageId && onMessageClick

  return (
    <div
      className={`flex items-start gap-2  p-3 rounded-lg  ${isUser ? "bg-[#AEAEAE] bg-opacity-[0.16] ml-auto" : "bg-[#2A2A2A] border border-[#B7B7B7]"} ${isClickable ? "cursor-pointer hover:bg-[#252525] transition-colors" : ""
        }`}
      onClick={() => {
        if (isClickable) {
          onMessageClick(messageId)
        }
      }}
    >
      {isClickable && <Image
        src={bgLogo}
        width={30}
        height={30}
        alt="ABV Logo"
        className="opacity-80 flex-shrink-0"
      />}
      <p className="text-[#F7F7F7]/80 text-sm break-words">{text}</p>
    </div>
  )
}
