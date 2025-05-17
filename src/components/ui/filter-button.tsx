import { CheckboxIcon } from "@/assets/icons"

interface FilterButtonProps {
  label: string
  isActive: boolean
  onClick: () => void
}

export function FilterButton({ label, isActive, onClick }: FilterButtonProps) {
  return (
    <button
      className={`px-3 py-2 rounded-xl text-sm flex items-center gap-2 bg-[#AEAEAE] bg-opacity-[0.16] text-white`}
      onClick={onClick}
    >
      <div className="w-5 h-5 flex-shrink-0 flex items-center justify-center">
      <CheckboxIcon isActive={isActive} />
      </div>
      <span className="whitespace-nowrap">{label}</span>
    </button>
  )
}
