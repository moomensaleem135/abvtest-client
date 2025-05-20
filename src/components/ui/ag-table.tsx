import React, { useMemo, useState } from 'react';
import { AgGridReact, AgGridReactProps } from '@ag-grid-community/react';
import { ColDef, ModuleRegistry } from '@ag-grid-community/core';

import '@ag-grid-community/styles/ag-grid.css';
import '@ag-grid-community/styles/ag-theme-alpine.css';
import '@/styles/ag-styles.css';

import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';

// Register the required modules
ModuleRegistry.registerModules([ClientSideRowModelModule]);

interface AgGridTableProps extends AgGridReactProps {
  columns: ColDef[];
  rowData: any[];
  pageSize: string;
  onPaginationChanged?: (params: any) => void;
  setPageSize: (size: string) => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  totalRows: number;
  showPagination?: boolean;
  onPageChange?: (page: number) => void;
  pageNo?: number;
}

const AgGridTable: React.FC<AgGridTableProps> = ({
  columns,
  rowData,
  pageSize,
  onPaginationChanged,
  setPageSize,
  currentPage,
  setCurrentPage,
  totalRows,
  showPagination = true,
  onPageChange,
  pageNo,
  ...props
}) => {
  const [gridReady, setGridReady] = useState(false);

  const defaultColDef = useMemo<ColDef>(
    () => ({
      sortable: true,
      filter: false,
      resizable: true,
      flex: 1,
    }),
    []
  );

  const handleGridReady = () => {
    setGridReady(true);
  };

  return (
      <div className="ag-theme-alpine w-full">
        <AgGridReact
          columnDefs={columns}
          rowData={rowData}
          pagination={true}
          paginationPageSize={Number(pageSize)}
          onPaginationChanged={onPaginationChanged}
          defaultColDef={defaultColDef}
          suppressPaginationPanel
          onGridReady={handleGridReady}
          {...props}
          domLayout="autoHeight"
        />
      </div>
  );
};

export default AgGridTable;
