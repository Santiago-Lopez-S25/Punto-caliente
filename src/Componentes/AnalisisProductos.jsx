import React, { useState, useEffect } from 'react';
import PivotTableUI from 'react-pivottable/PivotTableUI';
import 'react-pivottable/pivottable.css';
import axios from 'axios';

const AnalisisProductos = () => {
  const [productos, setProductos] = useState([]);
  const [pivotState, setPivotState] = useState({
    aggregatorName: 'Sum',
    vals: ['costo_actual'],
    rows: ['nombre_categoria'],
    cols: ['nombre_sucursal'],
  });

  // Llamar al JSON desde la URL externa
  useEffect(() => {
    axios.get('https://tienddi.co/json.json')
      .then((response) => {
        console.log(response.data); // Imprimir los datos recibidos
        setProductos(response.data); // Guardamos los datos en el estado
      })
      .catch((error) => {
        console.error('Error al cargar el archivo JSON:', error);
      });
  }, []); // El array vacío asegura que la solicitud solo se haga una vez al cargar el componente.

  // Verificamos si los productos se cargaron correctamente
  if (productos.length === 0) {
    return <div>Loading...</div>; // Mensaje mientras se cargan los productos
  }

  return (
    <div className="analisis-productos-container">
      <h3>Análisis de Productos</h3>
      <div className="pivote-contenedor">
        <PivotTableUI
          data={productos.map((producto) => ({
            id: producto.id,
            nombre: producto.nombre,
            nombre_categoria: producto.nombre_categoria,
            nombre_sucursal: producto.nombre_sucursal,
            cantidad_teorica: producto.cantidad_teorica,
            cantidad_fisica: producto.cantidad_fisica,
            diferencia: producto.diferencia,
            costo_actual: producto.costo_actual,
            empleado: producto.empleado,
            fecha_registro: producto.fecha_registro,
          }))}
          onChange={(s) => setPivotState(s)}
          {...pivotState}
        />
      </div>
    </div>
  );
};

export default AnalisisProductos;
