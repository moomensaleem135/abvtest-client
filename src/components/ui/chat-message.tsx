import Image from "next/image";
import bgLogo from '../../assets/images/bgLogo.png'

interface ChatMessageProps {
  text: string;
  isUser: boolean;
}

export function ChatMessage({ text, isUser }: ChatMessageProps) {
  return (
    <div
      className={`flex items-start gap-2 rounded-lg p-3 ${
        isUser ? "bg-[#AEAEAE] bg-opacity-[0.16]" : "bg-[#2A2A2A] border border-[#B7B7B7]"
      }`}
    >
      {!isUser && (
        <Image
          src={bgLogo}
          width={30}
          height={30}
          alt="ABV Logo"
          className="opacity-80 flex-shrink-0"
        />
      )}
      <p className="text-[#F7F7F7]/80 text-sm break-words">{text}</p>
    </div>
  );
}
