import React, { FC, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import {
  ColDef,
  ValueFormatterParams,
  ValueGetterParams,
  GridReadyEvent,
} from "ag-grid-community";

interface BookData {
  title: string;
  author: string;
  year: number;
  price: number;
  description: string;
}

const ageValueGetter = (params: ValueGetterParams) => {
  return new Date().getFullYear() - (params.data as BookData).year;
};

const priceFormatter = (params: ValueFormatterParams) => {
  return `$${params.value.toFixed(2)}`;
};

const booksData: BookData[] = [
  {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    year: 1925,
    price: 20.25,
    description:
      "Novel about the Roaring Twenties and the pursuit of the American Dream.",
  },
  {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    year: 1960,
    price: 15.99,
    description:
      "A novel about the serious issues of rape and racial inequality.",
  },
  {
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    year: 1951,
    price: 12.49,
    description: "A story about adolescent alienation and loss of innocence.",
  },
  {
    title: "Brave New World",
    author: "Aldous Huxley",
    year: 1932,
    price: 18.32,
    description:
      "A dystopian novel presenting a future society controlled by technology.",
  },
  {
    title: "The Road",
    author: "Cormac McCarthy",
    year: 2006,
    price: 14.0,
    description:
      "A post-apocalyptic novel of a father and son's survival journey.",
  },
  {
    title: "Pride and Prejudice",
    author: "Jane Austen",
    year: 1813,
    price: 9.99,
    description:
      "A romantic novel of manners that explores the condition of women in Georgian England.",
  },
  {
    title: "1984",
    author: "George Orwell",
    year: 1949,
    price: 19.84,
    description: "Dystopian social science fiction novel and cautionary tale.",
  },
  {
    title: "The Lord of the Rings",
    author: "J.R.R. Tolkien",
    year: 1954,
    price: 22.54,
    description:
      "An epic high-fantasy novel and one of the best-selling books ever written.",
  },
  {
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    year: 1937,
    price: 10.37,
    description:
      "Children's fantasy novel and prequel to The Lord of the Rings.",
  },
  {
    title: "Harry Potter and the Philosopher's Stone",
    author: "J.K. Rowling",
    year: 1997,
    price: 20.97,
    description:
      "The first novel in the Harry Potter series about a young wizard and his friends.",
  },
  {
    title: "A Game of Thrones",
    author: "George R.R. Martin",
    year: 1996,
    price: 21.96,
    description:
      "The first book in the epic fantasy series A Song of Ice and Fire.",
  },
];

const InitialColData: ColDef[] = [
  {
    field: "title",
    tooltipField: "description",
    cellStyle: { cursor: "pointer" },
  },
  { field: "author" },
  { field: "year" },
  {
    headerName: "Age",
    valueGetter: ageValueGetter,
    // cellStyle: (params) => {
    //   return params.value > 50 ? { backgroundColor: "#e8f0fe" } : null;
    // },
    cellClass: (params) => {
      return params.value > 50 ? "bg-blue-500" : ""; // Use Tailwind's bg-xxx instead of style directly
    },
  },
  {
    headerName: "Price",
    field: "price",
    valueFormatter: priceFormatter,
    cellStyle: { fontStyle: "italic" },
  },
];

const CellsGrid: FC = () => {
  const [rowData] = useState<BookData[]>(booksData);
  const [columnDefs] = useState<ColDef[]>(InitialColData);

  const onGridReady = (params: GridReadyEvent) => {
    params.api.sizeColumnsToFit();
  };

  return (
    <div
      className="ag-theme-quartz-dark mx-auto pt-12"
      style={{ height: 400, width: 600 }}
    >
      <h2 className="text-black text-2xl mt-4 font-semibold">Cells tests</h2>

      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        // domLayout="autoHeight"
        // enableCellChangeFlash={true}
        tooltipShowDelay={0}
        onGridReady={onGridReady}
        enableCellTextSelection={true}
      />
    </div>
  );
};

export default CellsGrid;
