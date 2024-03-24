import React from "react";
// import logo from "./logo.svg";
import "./App.css";
import "@ag-grid-community/styles/ag-grid.css";
import "@ag-grid-community/styles/ag-theme-alpine.css";
import "@ag-grid-community/styles/ag-theme-quartz.css";

import { ColGrid } from "./components/colls.component";
import { RowsGrid } from "./components/rows.component";

function App() {
  return (
    <>
      <ColGrid />
      <RowsGrid />
    </>
  );
}

export default App;
