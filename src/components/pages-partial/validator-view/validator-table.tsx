"use client"

import { useMemo, useState } from "react"
import type { ColDef } from "@ag-grid-community/core"
import AgGridTable from "@/components/ui/ag-table"
import StatusCellRenderer from "@/components/ui/status-cell-renderer"
import { ToggleSwitch } from "@/components/ui/toggle-switch"
import { ProgressBar } from "@/components/ui/progress-bar"

interface ValidationItem {
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

interface ValidatorTableProps {
  data: ValidationItem[]
  type: "validation" | "metrics"
  onToggleStatus?: (id: string, isActive: boolean) => void
}

const ValidatorTable = ({ data = [], type, onToggleStatus }: ValidatorTableProps) => {
  const [pageSize, setPageSize] = useState("10")
  const [currentPage, setCurrentPage] = useState(1)

  const validationColumnDefs = useMemo<ColDef[]>(
    () => [
      {
        headerName: "SCOPE",
        field: "scope",
        flex: 1,
        cellStyle: { color: "rgba(247, 247, 247, 0.8)" },
      },
      {
        headerName: "COVERAGE",
        field: "coverage",
        flex: 1,
        cellStyle: { color: "rgba(247, 247, 247, 0.6)" },
      },
      {
        headerName: "STATUS",
        field: "status",
        flex: 1,
        cellRenderer: StatusCellRenderer,
      },
      {
        headerName: "ID",
        field: "id",
        flex: 1,
        cellStyle: { color: "rgba(247, 247, 247, 0.6)" },
      },
    ],
    [],
  )

  const metricsColumnDefs = useMemo<ColDef[]>(
    () => [
      {
        headerName: "SCOPE",
        field: "scope",
        flex: 1,
        cellStyle: { color: "rgba(247, 247, 247, 0.8)" },
      },
      {
        headerName: "7D EARNINGS",
        field: "earnings",
        flex: 1,
        cellStyle: { color: "rgba(247, 247, 247, 0.6)" },
      },
      {
        headerName: "7D USAGE",
        field: "usage",
        flex: 1,
        cellStyle: { color: "rgba(247, 247, 247, 0.6)" },
      },
      {
        headerName: "QUICK STATS",
        field: "quickStats",
        flex: 1.5,
        cellRenderer: (params: any) => {
          const { left, right } = params.value || { left: 0, right: 0 }
          return <ProgressBar leftValue={left} rightValue={right} />
        },
      },
      {
        headerName: "STATUS",
        field: "isActive",
        flex: 0.8,
        cellRenderer: (params: any) => {
          return (
            <div className="flex justify-center">
              <ToggleSwitch
                isActive={params.value}
                onChange={(isActive) => {
                  if (onToggleStatus) {
                    onToggleStatus(params.data.id, isActive)
                  }
                }}
              />
            </div>
          )
        },
      },
    ],
    [onToggleStatus],
  )

  const columnDefs = type === "validation" ? validationColumnDefs : metricsColumnDefs

  return (
    <div className="h-full">
      <AgGridTable
        columns={columnDefs}
        rowData={data}
        pageSize={pageSize}
        setPageSize={setPageSize}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalRows={data.length}
        showPagination={false}
        domLayout="autoHeight"
      />
    </div>
  )
}

export default ValidatorTable
