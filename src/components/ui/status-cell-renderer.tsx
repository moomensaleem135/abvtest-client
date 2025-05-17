import { EditIcon } from "@/assets/icons/edit-icon"
import type React from "react"

interface StatusCellRendererProps {
    value: string
}

const StatusCellRenderer: React.FC<StatusCellRendererProps> = ({ value }) => {
    const isPass = value === "Pass"

    return (
        <div className={`flex gap-x-2 items-center ${isPass ? "text-green-500" : "text-red-500"}`}>
            {isPass ? (
                <EditIcon color='#62FFEA' />

            ) : (
                <EditIcon color="#FF6262" />

            )}
            {value}
        </div>
    )
}

export default StatusCellRenderer
