import React, { useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const GestionProductos = ({ productos, setProductos }) => {
  const columnas = [
    { headerName: 'ID', field: 'id', sortable: true, filter: true },
    { headerName: 'Nombre', field: 'nombre', sortable: true, filter: true, editable: true },
    { headerName: 'Categoría', field: 'categoria', sortable: true, filter: true, editable: true },
    { headerName: 'Precio', field: 'precio', sortable: true, filter: true, editable: true },
    { headerName: 'Stock', field: 'stock', sortable: true, filter: true, editable: true },
  ];

  return (
    <div className="ag-theme-alpine" style={{ height: 400, width: '100%' }}>
      <AgGridReact
        rowData={productos}
        columnDefs={columnas}
        onCellValueChanged={(params) => {
          const updatedProductos = [...productos];
          const index = updatedProductos.findIndex(p => p.id === params.data.id);
          if (index !== -1) {
            updatedProductos[index] = params.data;
            setProductos(updatedProductos);
          }
        }}
      />
    </div>
  );
};

export default GestionProductos;