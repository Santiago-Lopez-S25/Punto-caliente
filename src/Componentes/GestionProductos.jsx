import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { TabulatorFull as Tabulator } from 'tabulator-tables';
import 'tabulator-tables/dist/css/tabulator.min.css';
import './Tabla.css';

const AnalisisProductos = () => {
  const [productos, setProductos] = useState([]);
  const [agrupacion, setAgrupacion] = useState(['nombre_categoria', 'nombre_sucursal']); // Agrupación inicial
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const tablaRef = useRef(null);
  const tabulatorInstance = useRef(null);

  useEffect(() => {
    axios
      .get('https://tienddi.co/json.json')
      .then((response) => {
        const data = response.data;

        const datosConCategoria = data.map((producto) => ({
          ...producto,
          costo_actual: parseFloat(producto.costo_actual) || 0,
          nombre_categoria: producto.nombre_categoria || 'Sin Categoría',
          nombre_sucursal: producto.nombre_sucursal || 'Sucursal Desconocida',
        }));

        setProductos(datosConCategoria);
      })
      .catch((error) => {
        console.error('Error al cargar los datos:', error);
      });
  }, []);

  useEffect(() => {
    if (tablaRef.current && productos.length > 0) {
      tabulatorInstance.current = new Tabulator(tablaRef.current, {
        data: productos,
        layout: 'fitColumns',
        height: '500px',
        groupBy: agrupacion, // Agrupación dinámica
        groupHeader: (value, count) => `${value} - (${count} productos)`, // Configuración del encabezado de grupo
        columns: [
          { title: 'Producto', field: 'nombre', headerFilter: 'input' },
          { title: 'Categoría', field: 'nombre_categoria', visible: false },
          { title: 'Sucursal', field: 'nombre_sucursal', visible: false },
          { title: 'Costo Actual', field: 'costo_actual', sorter: 'number', headerFilter: 'number' },
          { 
            title: 'Cantidad Teórica', 
            field: 'cantidad_teorica', 
            sorter: 'number', 
            formatter: (cell) => {
              const value = cell.getValue();
              return value < 10 
                ? `<span class="highlight-low">${value}</span>` 
                : value;
            },
          },
          { 
            title: 'Cantidad Física', 
            field: 'cantidad_fisica', 
            sorter: 'number', 
            formatter: (cell) => {
              const value = cell.getValue();
              return value < 10 
                ? `<span class="highlight-low">${value}</span>` 
                : value;
            },
          },
          { 
            title: 'Diferencia', 
            field: 'diferencia', 
            sorter: 'number', 
            formatter: (cell) => {
              const value = cell.getValue();
              return value < 10 
                ? `<span class="highlight-low">${value}</span>` 
                : value;
            },
          },
          { title: 'Empleado', field: 'empleado', headerFilter: 'input' },
          { title: 'Fecha Registro', field: 'fecha_registro', sorter: 'date', headerFilter: 'input' },
          { 
            title: 'inventario', 
            field: 'invetario', 
            formatter: (cell) => {
              const value = cell.getRow().getData().diferencia; // Basado en la columna diferencia
              return value < 10 
                ? `<span style="color: red;">Bajo</span>` 
                : '<span style="color: green;">Normal</span>';
            },
          },
        ],
      });

      // Aplicar clase personalizada a la tabla
      tabulatorInstance.current.element.classList.add('custom-tabulator');
    }
  }, [productos, agrupacion]);

  const cambiarAgrupacion = (nuevaAgrupacion) => {
    setAgrupacion(nuevaAgrupacion);
    if (tabulatorInstance.current) {
      tabulatorInstance.current.setGroupBy(nuevaAgrupacion);
    }
  };

  const filtrarPorFechas = () => {
    if (fechaInicio && fechaFin) {
      const fechaInicioObj = new Date(fechaInicio);
      const fechaFinObj = new Date(fechaFin);
  
      const datosFiltrados = productos.filter((producto) => {
        const fechaRegistro = new Date(producto.fecha_registro);
        return fechaRegistro >= fechaInicioObj && fechaRegistro <= fechaFinObj;
      });
  
      tabulatorInstance.current.replaceData(datosFiltrados);
    }
  };
  

  return (
    <div style={{ padding: '30px' }}>
      <h3 className='header-empresaria'> Gestión de productos</h3>
      <div style={{ marginBottom: '20px' }}>
        <label className='tituloBoton'>Agrupar por: </label>
        <select
          onChange={(e) => cambiarAgrupacion([e.target.value, agrupacion[1]])}
  
        >
          <option value="nombre_categoria">Categoría</option>
          <option value="nombre_sucursal">Sucursal</option>
          <option value="empleado">Empleado</option>
        </select>
        <label className='tituloBoton'> También por: </label>
        <select
          onChange={(e) => cambiarAgrupacion([agrupacion[0], e.target.value])}
       
        >
          <option value="nombre_categoria">Categoría</option>
          <option value="nombre_sucursal">Sucursal</option>
          <option value="empleado">Empleado</option>
        </select>
      </div>
      <div style={{ marginBottom: '20px' }}>
          <label className='tituloBoton'>Fecha inicial: </label>
          <input className='calendario'
            type="datetime-local" 
            value={fechaInicio} 
            onChange={(e) => setFechaInicio(e.target.value)} 
          />
          <label className='tituloBoton'> Fecha final: </label>
          <input className='calendario'
            type="datetime-local" 
            value={fechaFin} 
            onChange={(e) => setFechaFin(e.target.value)} 
          />
          <button 
            className='tituloBoton'
            onClick={filtrarPorFechas}
          >
            Consultar
          </button>
        </div>

      <div
        ref={tablaRef}
      />
    </div>
  );
};

export default AnalisisProductos;
