import React from "react";
// import logo from "./logo.svg";
import "./App.css";
import "@ag-grid-community/styles/ag-grid.css";
import "@ag-grid-community/styles/ag-theme-alpine.css";
import "@ag-grid-community/styles/ag-theme-quartz.css";

import { ColGrid } from "./components/colls.component";
import { RowsGrid } from "./components/rows.component";
import CellsGrid from "./components/cells.component";

function App() {
  return (
    <div className="flex flex-col gap-1">
      <ColGrid />
      <div className="block md:flex max-w-[1000px] gap-4 mx-auto">
        <RowsGrid />
        <CellsGrid />
      </div>
    </div>
  );
}

export default App;
