"use client";

import {
  tableFeatures,
  useTable,
  type ColumnDef,
  type ReactTable,
  type RowData,
  type TableOptions,
} from "@tanstack/react-table";

type DataTableColumnMeta = {
  headerClassName?: string;
  cellClassName?: string;
};

export const dataTableFeatures = tableFeatures({
  columnMeta: {} as DataTableColumnMeta,
});

type DataTableFeatures = typeof dataTableFeatures;

type DataTableProps<TData extends RowData> = {
  data: TData[];
  columns: ColumnDef<DataTableFeatures, TData>[];
  isLoading?: boolean;
  error?: string;
  emptyMessage?: string;
  getRowId?: TableOptions<DataTableFeatures, TData>["getRowId"];
};

export function DataTable<TData extends RowData>({
  data,
  columns,
  isLoading = false,
  error,
  emptyMessage = "Дані не знайдено",
  getRowId,
}: DataTableProps<TData>) {
  const table = useTable({ features: dataTableFeatures, data, columns, getRowId });
  const shouldShowState = isLoading || Boolean(error) || data.length === 0;

  return (
    <table className="desktop:min-w-245 w-full min-w-190 table-fixed border-collapse font-sans">
      <DataTableHead table={table} />

      <tbody>
        {shouldShowState ? (
          <DataTableState
            span={table.getAllLeafColumns().length}
            isLoading={isLoading}
            error={error}
            emptyMessage={emptyMessage}
          />
        ) : (
          table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              className="border-border text-text-normal desktop:h-16 h-14 border-b text-[14px] leading-4 last:border-b-0"
            >
              {row.getAllCells().map((cell) => (
                <td
                  key={cell.id}
                  className={`${cell.column.columnDef.meta?.cellClassName ?? ""} px-5`}
                >
                  <table.FlexRender cell={cell} />
                </td>
              ))}
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}

function DataTableHead<TData extends RowData>({
  table,
}: {
  table: ReactTable<DataTableFeatures, TData>;
}) {
  return (
    <thead className="bg-surface-muted">
      {table.getHeaderGroups().map((headerGroup) => (
        <tr
          key={headerGroup.id}
          className="text-text-heading h-12.5 text-left text-[14px] leading-4 font-bold"
        >
          {headerGroup.headers.map((header) => (
            <th
              key={header.id}
              className={`${header.column.columnDef.meta?.headerClassName ?? ""} px-5`}
            >
              {header.isPlaceholder ? null : <table.FlexRender header={header} />}
            </th>
          ))}
        </tr>
      ))}
    </thead>
  );
}

function DataTableState({
  span,
  isLoading,
  error,
  emptyMessage,
}: {
  span: number;
  isLoading: boolean;
  error?: string;
  emptyMessage: string;
}) {
  return (
    <tr>
      <td
        colSpan={span}
        className="desktop:h-107.5 h-82.5 px-5 text-center font-sans text-[14px] leading-4"
      >
        {error ? (
          <span className="text-text-error">{error}</span>
        ) : isLoading ? (
          <span className="text-text-muted">Завантаження...</span>
        ) : (
          <span className="text-text-muted">{emptyMessage}</span>
        )}
      </td>
    </tr>
  );
}
