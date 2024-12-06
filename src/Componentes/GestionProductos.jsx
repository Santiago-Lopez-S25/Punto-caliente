import React, { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import axios from 'axios';

const GestionProductos = ({ productos, setProductos }) => {
  const [loading, setLoading] = useState(true);  // Estado para manejar la carga de datos
  const [error, setError] = useState(null); // Estado para manejar errores

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
    // Llamar al JSON desde la URL externa con axios
    axios.get('https://tienddi.co/json.json')  // No necesitas agregar el dominio completo gracias al proxy
      .then(response => {
        console.log(response.data); // Imprime los datos recibidos en consola
        if (response.data && Array.isArray(response.data)) {
          setProductos(response.data);  // Guardamos los productos en el estado
          setLoading(false);  // Indicar que los datos se han cargado
        } else {
          throw new Error("Los datos no tienen el formato esperado");
        }
      })
      .catch(err => {
        console.error('Error al cargar los datos:', err);
        setError('Error al cargar los datos: ' + err.message); // Muestra el mensaje de error
        setLoading(false);
      });
  }, [setProductos]);

  // Si los datos aún están cargando, mostrar un mensaje
  if (loading) {
    return <div>Loading...</div>;
  }

  // Si hubo un error al cargar los datos, mostrar el error
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="ag-theme-alpine" style={{ height: 500, width: '100%' }}>
      <AgGridReact
        rowData={productos}  // Los productos cargados desde la URL externa
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
            setProductos(updatedProductos);  // Actualizar el estado con los productos modificados
          }
        }}
      />
    </div>
  );
};

export default GestionProductos;
