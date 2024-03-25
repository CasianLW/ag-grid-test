import React, { FC, useMemo, useState } from "react";
import { AgGridReact } from "ag-grid-react";

import { ColDef, ValueGetterParams } from "ag-grid-community";

// interface RowData {
//   make: string;
//   model: string;
// }
const InitialRowData = [
  {
    make: "Tesla",
    model: "Model Y",
    price: 40000,
    offerPrice: 35000,
    electric: true,
  },
  {
    make: "Tesla",
    model: "Model S",
    price: 64950,
    offerPrice: 60000,
    electric: true,
  },
  {
    make: "Audi",
    model: "A4",
    price: 24000,
    offerPrice: 26000,
    electric: false,
  },
  {
    make: "Audi",
    model: "A8",
    price: 80000,
    offerPrice: 70000,
    electric: false,
  },
  {
    make: "Tesla",
    model: "Model X",
    price: 48000,
    offerPrice: 50000,
    electric: true,
  },
  {
    make: "Tesla",
    model: "Model 3",
    price: 64950,
    offerPrice: 48000,
    electric: true,
  },
  {
    make: "Ford",
    model: "F-Series",
    price: 33850,
    offerPrice: 30000,
    electric: false,
  },
  {
    make: "Toyota",
    model: "Corolla",
    price: 22600,
    offerPrice: 25000,
    electric: false,
  },
];

const CustomButtonComponent: FC = () => {
  return <button onClick={() => window.alert("clicked")}>Push Me!</button>;
};

const InitialColData: ColDef[] = [
  {
    field: "make",
    checkboxSelection: true,
    flex: 1,
    filter: true,
    floatingFilter: true,
    editable: true,
    cellEditor: "agSelectCellEditor",
    cellEditorParams: {
      values: ["Tesla", "Ford", "Toyota"],
    },
  },
  { field: "model", flex: 2 },
  {
    headerName: "Make & Model",
    valueGetter: (p: ValueGetterParams) => p.data.make + " " + p.data.model,
    flex: 2,
  },

  {
    field: "price",
    valueFormatter: (p) => "€" + Math.floor(p.value).toLocaleString(),
    flex: 1,
    filter: true,
    floatingFilter: true,
  },
  {
    field: "offerPrice",
    type: "offerPrice",
    valueFormatter: (p) => "€" + Math.floor(p.value).toLocaleString(),
    filter: true,
    floatingFilter: true,
    flex: 1,
  },
  {
    field: "electric",
    flex: 1,
    cellClassRules: { "bg-green-400": (params) => params.value === true },
  },
  { field: "button", cellRenderer: CustomButtonComponent, flex: 1 },
];

export const ColGrid: FC = () => {
  const columnTypes = useMemo(() => {
    return {
      offerPrice: {
        cellClass: "bg-gray-700",
      },
    };
  }, []);
  // set to default data
  const [rowData] = useState(InitialRowData);

  // Column Definitions: Defines the columns to be displayed.
  const [colDefs] = useState(InitialColData);

  const rowSelection = "multiple";

  const pagination = true;
  const paginationPageSize = 5;
  const paginationPageSizeSelector = [2, 5, 20];

  return (
    <div
      className="ag-theme-quartz-dark mx-auto mt-10"
      style={{ height: 400, width: 1000 }}
    >
      <h2 className="text-black text-2xl mt-4 font-semibold">Collums tests</h2>
      <AgGridReact
        rowData={rowData}
        columnDefs={colDefs}
        rowSelection={rowSelection}
        pagination={pagination}
        paginationPageSize={paginationPageSize}
        paginationPageSizeSelector={paginationPageSizeSelector}
        rowClassRules={{
          "!bg-red-500": (params) => params.data.price > params.data.offerPrice,
        }}
        columnTypes={columnTypes}
      />
    </div>
  );
};
