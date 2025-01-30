import { useEffect, useRef, useState } from 'react';
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

  // Solicitud GET a la API
  useEffect(() => {
    const config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'https://api.cuenti.co/jServerj4ErpPro/com/j4ErpPro/server/inv/movimiento/historico_conteo/1735707600000/1736355978288/2',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        accept: 'application/json;charset=UTF-8',
        'x-auth-token-empresa': '14717',
        'x-gtm': 'GMT-0500',
        Authorization:
          "Bearer MTQ3MTd8MTQ3MTd8ODExMDIzMjM4fDB8ZXlKMGVYQWlPaUpLVjFRaUxDSmhiR2NpT2lKSVV6STFOaUo5LmV5SnpkV0lpT2lJeE5EY3hOeTB5TURJME1ERXhOekF3TURNeFltSmlaV0ZpWmkwNFpqaGpMVFJtWXpJdFltWmpaUzFqWlRGaE56ZzNPRFJqTm1WOE9ERXhNREl6TWpNNElpd2lhV0YwSWpveE56TTNOREkzTlRrMExDSmxlSEFpT201MWJHeDkuSEU5LXNqY196UDdNSGpCQksxTHFmV3Z4MUtucGhBblFyX0txbUdkdHlCZw==",
      },
    };

    axios
      .request(config)
      .then((response) => {
        const data = response.data;

        const datosConCategoria = data.map((producto) => ({
          ...producto,
          costo_actual: parseFloat(producto.costo_actual) || 0,
          nombre_categoria: producto.nombre_categoria || 'Sin Categoría',
          nombre_sucursal: producto.nombre_sucursal || 'Sucursal Desconocida',
          estado: producto.diferencia < 10 ? 'Bajo' : 'Normal',
          fecha_registro: new Date(producto.fecha_registro), // Asegúrate de que sea un objeto Date
        }));

        setProductos(datosConCategoria);
      })
      .catch((error) => {
        console.error('Error al cargar los datos:', error);
      });
  }, []);

  // Inicializar Tabulator
  useEffect(() => {
    if (tablaRef.current && productos.length > 0) {
      tabulatorInstance.current = new Tabulator(tablaRef.current, {
        data: productos,
        layout: 'fitColumns',
        height: '500px',
        groupBy: agrupacion,
        groupHeader: (value, count) => `${value} - (${count} productos)`,
        columns: [
          {
            title: 'Producto',
            field: 'nombre',
            headerFilter: 'input',
            headerFilterFunc: 'like',
            headerFilterPlaceholder: '',
            headerFilterParams: { class: 'filter-input' }, // Clase personalizada
          },
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
          {
            title: 'Empleado',
            field: 'empleado',
            headerFilter: 'input',
            headerFilterFunc: 'like',
            headerFilterPlaceholder: '',
            headerFilterParams: { class: 'filter-input' }, // Clase personalizada
          },
          {
            title: 'Fecha Registro',
            field: 'fecha_registro',
            sorter: 'date',
            headerFilter: 'input',
            headerFilterFunc: 'like',
            headerFilterPlaceholder: '',
            formatter: (cell) => {
              const fecha = cell.getValue();
              return new Date(fecha).toLocaleString();
            },
            headerFilterParams: { class: 'filter-input' }, // Clase personalizada
          },
          {
            title: 'Estados',
            field: 'estado',
            headerFilter: 'input',
            headerFilterFunc: (headerValue, rowValue) => {
              if (!headerValue) return true;
              return rowValue.toLowerCase() === headerValue.toLowerCase();
            },
            formatter: (cell) => {
              const value = cell.getValue();
              return value === 'Bajo'
                ? `<span style="color: red;">${value}</span>`
                : `<span style="color: green;">${value}</span>`;
            },
            headerFilterParams: { class: 'filter-input' }, // Clase personalizada
          },
        ],
      });

      tabulatorInstance.current.element.classList.add('custom-tabulator');
    }
  }, [productos, agrupacion]);

  // Cambiar la agrupación dinámica
  const cambiarAgrupacion = (nuevaAgrupacion) => {
    setAgrupacion(nuevaAgrupacion);
    if (tabulatorInstance.current) {
      tabulatorInstance.current.setGroupBy(nuevaAgrupacion);
    }
  };

  // Filtro de fechas
  const filtrarPorFechas = () => {
    if (fechaInicio && fechaFin) {
      const fechaInicioObj = new Date(fechaInicio);
      const fechaFinObj = new Date(fechaFin);

      fechaFinObj.setHours(23, 59, 59, 999);

      const datosFiltrados = productos.filter((producto) => {
        const fechaRegistro = producto.fecha_registro.getTime();
        return (
          fechaRegistro >= fechaInicioObj.getTime() &&
          fechaRegistro <= fechaFinObj.getTime()
        );
      });

      if (tabulatorInstance.current) {
        tabulatorInstance.current.replaceData(datosFiltrados);
      }
    } else {
      alert('Por favor, selecciona ambas fechas para filtrar.');
    }
  };

  return (
    <div style={{ padding: '30px' }}>
      <h3 className="header-empresaria">Gestión de productos</h3>
      <div style={{ marginBottom: '20px' }}>
        <label className="tituloBoton">Agrupar por: </label>
        <select onChange={(e) => cambiarAgrupacion([e.target.value, agrupacion[1]])}>
          <option value="nombre_categoria">Categoría</option>
          <option value="nombre_sucursal">Sucursal</option>
          <option value="empleado">Empleado</option>
        </select>
        <label className="tituloBoton"> También por: </label>
        <select onChange={(e) => cambiarAgrupacion([agrupacion[0], e.target.value])}>
          <option value="nombre_categoria">Categoría</option>
          <option value="nombre_sucursal">Sucursal</option>
          <option value="empleado">Empleado</option>
        </select>
      </div>
      <div style={{ marginBottom: '20px' }}>
        <label className="tituloBoton">Fecha inicial: </label>
        <input
          className="calendario"
          type="datetime-local"
          value={fechaInicio}
          onChange={(e) => setFechaInicio(e.target.value)}
        />
        <label className="tituloBoton"> Fecha final: </label>
        <input
          className="calendario"
          type="datetime-local"
          value={fechaFin}
          onChange={(e) => setFechaFin(e.target.value)}
        />

        <button className="tituloBoton" onClick={filtrarPorFechas}>
          Consultar
        </button>
      </div>
      <div ref={tablaRef} />
    </div>
  );
};

export default AnalisisProductos;
