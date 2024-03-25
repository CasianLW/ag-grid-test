import React, { FC, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { ColDef, GridReadyEvent, ICellRendererParams } from "ag-grid-community";

interface ProductData {
  id: number;
  name: string;
  price: number;
  rating: string; // Ratings as star emojis
  image: string; // Local image path
  secondaryImage: string; // External URL to the product image
}

const availableSecondaryImages = [
  "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1326&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=1630&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1587831991059-40958cea9ca5?q=80&w=1548&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1587831991059-40958cea9ca5?q=80&w=1548&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];

const availableImages = ["macbook.jpg", "iphone.jpg", "ipad.jpg", "galaxy.jpg"];

// Extend initialProducts with secondaryImage
const initialProducts: ProductData[] = [
  {
    id: 1,
    name: "Macbook Pro",
    price: 999,
    rating: "★★★★☆",
    image: "/assets/macbook.jpg",
    secondaryImage:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1326&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 2,
    name: "iPhone 13",
    price: 799,
    rating: "★★★★★",
    image: "/assets/iphone.jpg",
    secondaryImage:
      "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=1630&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 3,
    name: "iPad Pro",
    price: 1099,
    rating: "★★★★☆",
    image: "/assets/ipad.jpg",
    secondaryImage:
      "https://images.unsplash.com/photo-1587831991059-40958cea9ca5?q=80&w=1548&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 4,
    name: "Samsung Galaxy S22",
    price: 899,
    rating: "★★★★☆",
    image: "/assets/galaxy.jpg",
    secondaryImage:
      "https://images.unsplash.com/photo-1587831991059-40958cea9ca5?q=80&w=1548&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

const ImageCellRenderer: FC<ICellRendererParams> = ({ value }) => {
  return (
    <img
      src={value}
      alt="Product"
      style={{ maxWidth: "100%", maxHeight: "100%" }}
    />
  );
};

const imageCellRendererFunc = (params: ICellRendererParams) => {
  return <ImageCellRenderer {...params} />;
};

const ImageSelectEditor: FC<any> = (props) => {
  //   const [selectedImage, setSelectedImage] = useState(props.value);

  const handleSelect = (image: string) => {
    // setSelectedImage(image);
    const newData = { ...props.node.data, image };
    props.node.setData(newData);
    props.api.refreshCells({ force: true, rowNodes: [props.node] });
    props.api.stopEditing();
  };

  return (
    <div className="custom-dropdown" style={{ position: "relative" }}>
      <div
        className="!bg-slate-800 w-[220px] h-[280px]"
        style={{
          position: "absolute",
          zIndex: 100,
          backgroundColor: "#ffffff",
          border: "1px solid #ddd",
          borderRadius: "4px",
          //   width: "100%",
        }}
      >
        {availableImages.map((imageName) => (
          <div
            key={imageName}
            onClick={() => handleSelect(`/assets/${imageName}`)}
            className="dropdown-item hover:bg-slate-700"
            style={{
              padding: "10px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
            }}
          >
            <img
              src={`/assets/${imageName}`}
              alt={imageName}
              style={{
                maxWidth: "100px",
                maxHeight: "100px",
                marginRight: "10px",
              }}
            />
            <span>{imageName}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
const SecondaryImageSelectEditor: FC<any> = (props) => {
  const handleSelect = (imageUrl: string) => {
    const newData = { ...props.node.data, secondaryImage: imageUrl };
    props.node.setData(newData);
    props.api.refreshCells({ force: true, rowNodes: [props.node] });
    props.api.stopEditing();
  };

  return (
    <div className="custom-dropdown" style={{ position: "relative" }}>
      <div
        className="dropdown-content !bg-slate-800 w-[120px] h-[290px]"
        style={{
          position: "absolute",
          zIndex: 100,
          backgroundColor: "#fff",
          border: "1px solid #ddd",
          borderRadius: "4px",
        }}
      >
        {availableSecondaryImages.map((imageUrl) => (
          <div
            key={imageUrl}
            onClick={() => handleSelect(imageUrl)}
            className=" hover:bg-slate-700"
            style={{
              padding: "10px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
            }}
          >
            <img
              src={imageUrl}
              alt="Secondary"
              style={{
                maxWidth: "100px",
                maxHeight: "100px",
                marginRight: "10px",
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export const EditGrid: FC = () => {
  const [rowData] = useState<ProductData[]>(initialProducts);

  const [columnDefs] = useState<ColDef[]>([
    { field: "name", editable: true },
    {
      field: "price",
      editable: true,
      flex: 1,
      valueFormatter: (p) => "€" + Math.floor(p.value).toLocaleString(),
    },
    {
      field: "rating",
      editable: true,
      cellEditor: "agSelectCellEditor",
      cellEditorParams: {
        values: ["☆☆☆☆☆", "★☆☆☆☆", "★★☆☆☆", "★★★☆☆", "★★★★☆", "★★★★★"],
      },
    },
    {
      headerName: "Main Image",
      field: "image",
      //   cellRenderer: imageCellRenderer,
      //   cellRendererFramework: ImageCellRenderer,
      cellRenderer: imageCellRendererFunc,
      editable: true,

      cellEditorPopup: true, // Popup the custom editor

      cellEditor: ImageSelectEditor as any,
    },
    {
      headerName: "Secondary Image",
      field: "secondaryImage",
      //   cellRenderer: imageCellRenderer,
      //   cellRendererFramework: ImageCellRenderer,
      cellRenderer: imageCellRendererFunc,
      editable: true,
      cellEditorPopup: true,
      cellEditor: SecondaryImageSelectEditor as any,
    },
  ]);

  const onGridReady = (params: GridReadyEvent) => {
    params.api.sizeColumnsToFit();
  };

  return (
    <div
      className="ag-theme-quartz-dark mx-auto pt-12"
      style={{ height: 500, width: 1000 }}
    >
      <h2 className="text-2xl font-semibold my-4 text-black">Edit tests</h2>
      <AgGridReact
        rowData={rowData}
        rowHeight={100}
        columnDefs={columnDefs}
        onGridReady={onGridReady}
      />
    </div>
  );
};

export default EditGrid;
