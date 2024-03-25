import React, { FC, useMemo, useState } from "react";
import { AgGridReact } from "ag-grid-react";

import { ColDef, ICellRendererParams } from "ag-grid-community";

interface RowData {
  time: string;
  session: string;
  speaker: string;
  span: number;
}
const InitialRowData: RowData[] = [
  { time: "09:00", session: "Keynote", speaker: "Dr. Smith", span: 3 },
  { time: "10:00", session: "", speaker: "", span: 0 },
  { time: "10:30", session: "", speaker: "", span: 0 },
  { time: "11:00", session: "React Workshop", speaker: "Jane Doe", span: 1 },
  { time: "12:00", session: "Lunch Break", speaker: "", span: 1 },
  { time: "14:00", session: "Presentation", speaker: "Dr.Smith", span: 3 },
  { time: "14:30", session: "", speaker: "", span: 0 },
  { time: "15:00", session: "", speaker: "", span: 0 },
  { time: "15:30", session: "Break", speaker: "", span: 1 },
  { time: "16:30", session: "Monologue", speaker: "Dr.Vincent", span: 1 },
];
const rowSpan = (params: { data: RowData }) => params.data.span;
const cellStyle = (params: { data: RowData }) => {
  if (params.data.span > 1) {
    return {
      backgroundColor: "rgba(255, 255, 255, .4)",
      color: "rgba(255, 255, 255, .7)",
    }; // Light gray background for spanned cells
  } else {
    return null; // No specific style for other cells
  }
};
const SessionCellRenderer: FC<ICellRendererParams> = ({ value, data }) => {
  if (data.span === 0) return null; // Don't render content for spanned rows
  return <>{value}</>; // Render the value for non-spanned rows
};

export const RowsGrid: FC = () => {
  const [rowData] = useState<RowData[]>(InitialRowData);

  const columnDefs = useMemo<ColDef[]>(
    () => [
      { field: "time", flex: 1 },
      {
        field: "session",
        flex: 2,
        cellRendererFramework: SessionCellRenderer,
        rowSpan: rowSpan,
        cellStyle: cellStyle,
      },
      { field: "speaker", flex: 2 },
    ],
    []
  );

  return (
    <div
      className="ag-theme-quartz-dark mx-auto pt-12"
      style={{ height: 400, width: 400 }}
    >
      <h2 className="text-black text-2xl mt-4 font-semibold">Rows tests</h2>
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        // domLayout="autoHeight"
        // getRowHeight={() => 60}
        suppressRowTransform={true}
      />
    </div>
  );
};

export default RowsGrid;
