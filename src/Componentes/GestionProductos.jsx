import React, { useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import data from "../Data/package-productos.json"; // Importa el JSON directamente

const GestionProductos = ({ productos, setProductos }) => {
  const columnas = [
    { headerName: 'ID', field: 'id', filter: 'agNumberColumnFilter' },
    { headerName: 'Producto', field: 'nombre', editable: true, filter: 'agTextColumnFilter' },
    { headerName: 'Categoría', field: 'nombre_categoria', editable: true, filter: 'agTextColumnFilter' },
    { headerName: 'Sucursal', field: 'nombre_sucursal', editable: true, filter: 'agTextColumnFilter' },
    { headerName: 'Cantidad Teórica', field: 'cantidad_teorica', editable: true, filter: 'agNumberColumnFilter' },
    { headerName: 'Cantidad Física', field: 'cantidad_fisica', editable: true, filter: 'agNumberColumnFilter' },
    { headerName: 'Diferencia', field: 'diferencia', filter: 'agNumberColumnFilter' },
    { headerName: 'Costo Actual', field: 'costo_actual', filter: 'agNumberColumnFilter' },
    { headerName: 'Empleado', field: 'empleado', filter: 'agTextColumnFilter' },
    { headerName: 'Fecha Registro', field: 'fecha_registro', filter: 'agDateColumnFilter' },
  ];

  useEffect(() => {
    setProductos(data);
  }, [setProductos]);

  return (
    <div className="ag-theme-alpine" style={{ height: 500, width: '100%' }}>
      <AgGridReact
        rowData={productos}
        columnDefs={columnas}
        defaultColDef={{
          sortable: true, // Habilita la ordenación en todas las columnas
          filter: true,   // Habilita los filtros en todas las columnas por defecto
          floatingFilter: true, // Muestra los filtros flotantes debajo de los encabezados
          resizable: true, // Permite redimensionar las columnas
        }}
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
