"use client"

import { useMemo, useState } from "react"
import type { ColDef } from "@ag-grid-community/core"
import AgGridTable from "@/components/ui/ag-table"
import StatusCellRenderer from "@/components/ui/status-cell-renderer"

interface ValidationResult {
  scope: string
  details: string
  coverage: string
  status: string
}

interface ValidationTableProps {
  results: ValidationResult[]
  isLoading?: boolean
}

const ValidationTable = ({ results = [], isLoading = false }: ValidationTableProps) => {
  const [pageSize, setPageSize] = useState("10")
  const [currentPage, setCurrentPage] = useState(1)

  const columnDefs = useMemo<ColDef[]>(
    () => [
      {
        headerName: "SCOPE",
        field: "scope",
        flex: 1,
        cellStyle: { color: "rgba(247, 247, 247, 0.8)" },
      },
      {
        headerName: "DETAILS",
        field: "details",
        flex: 1.5,
        cellStyle: { color: "rgba(247, 247, 247, 0.6)" },
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
    ],
    [],
  )

  return (
    <div className="h-full">
      {isLoading ? (
        <div className="flex justify-center items-center h-20 text-white/60">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-white/60 animate-pulse"></div>
            <div className="w-2 h-2 rounded-full bg-white/60 animate-pulse delay-100"></div>
            <div className="w-2 h-2 rounded-full bg-white/60 animate-pulse delay-200"></div>
            <span className="ml-2">Loading validation results...</span>
          </div>
        </div>
      ) : (
        <AgGridTable
          columns={columnDefs}
          rowData={results}
          pageSize={pageSize}
          setPageSize={setPageSize}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalRows={results.length}
          showPagination={false}
          domLayout="autoHeight"
        />
      )}
    </div>
  )
}

export default ValidationTable
