"use client"

interface ProgressBarProps {
  leftValue: number
  rightValue: number
  leftColor?: string
  rightColor?: string
  height?: string
}

export function ProgressBar({
  leftValue,
  rightValue,
  leftColor = "#4ADE80",
  rightColor = "#EC4899",
  height = "h-1.5",
}: ProgressBarProps) {
  // Ensure values are between 0 and 100
  const safeLeftValue = Math.max(0, Math.min(100, leftValue))
  const safeRightValue = Math.max(0, Math.min(100, rightValue))

  return (
    <div className="flex flex-col items-center gap-2 pt-2">
             <div className="flex items-center justify-between text-xs w-full">
        <span className="text-[#4ADE80]">{safeLeftValue}%</span>
        <span className="text-white/60">•</span>
        <span className="text-[#EC4899]">{safeRightValue}%</span>
      </div>
      <div className={`w-full ${height} bg-gray-700 rounded-full overflow-hidden flex`}>
        <div
          className="rounded-l-full"
          style={{
            width: `${safeLeftValue}%`,
            backgroundColor: leftColor,
          }}
        />
        <div
          className="rounded-r-full"
          style={{
            width: `${safeRightValue}%`,
            backgroundColor: rightColor,
          }}
        />
      </div>
    </div>
  )
}
