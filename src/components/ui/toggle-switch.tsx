"use client"

interface ToggleSwitchProps {
  isActive: boolean
  onChange: (isActive: boolean) => void
  disabled?: boolean
}

export function ToggleSwitch({ isActive, onChange, disabled = false }: ToggleSwitchProps) {
  return (
    <button
      type="button"
      className={`relative inline-flex h-6 w-11 items-center rounded-full mt-3 ${
        isActive ? "bg-[#C2C2C2]" : "border border-[#C2C2C2] "
      } transition-colors duration-200 ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
      onClick={() => !disabled && onChange(!isActive)}
      disabled={disabled}
      role="switch"
      aria-checked={isActive}
    >
      <span className="sr-only">{isActive ? "Enabled" : "Disabled"}</span>
      <span 
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition duration-200 ease-in-out ${
          isActive ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  )
}
