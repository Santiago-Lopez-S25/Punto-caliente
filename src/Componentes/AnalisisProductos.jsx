import React, { useState } from 'react';
import PivotTableUI from 'react-pivottable/PivotTableUI';
import 'react-pivottable/pivottable.css';
import { aggregators } from 'react-pivottable/Utilities';
import './AnalisisProductos.css'; 

const AnalisisProductos = ({ productos }) => {
  const [pivotState, setPivotState] = useState({
    aggregatorName: 'Sum',
    vals: ['costo_actual'], // Valor inicial a sumar
    rows: ['nombre_categoria'], // Categoría como filas
    cols: ['nombre_sucursal'], // Sucursal como columnas
  });

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
          aggregators={aggregators}
        />
      </div>
    </div>
  );
};

export default AnalisisProductos;

