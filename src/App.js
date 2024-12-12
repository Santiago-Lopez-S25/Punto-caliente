import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GestionProductos from './Componentes/GestionProductos';
import axios from 'axios';
import './Componentes/Tabla.css';

const App = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  // Aca cargan los datos de la url
  useEffect(() => {
    axios
      .get('https://tienddi.co/json.json')
      .then((response) => {
        console.log('Datos cargados:', response.data);
        setProductos(response.data); // guarda datos
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error al cargar los datos:', error);
        setLoading(false);
      });
  }, []); 

  if (loading) {
    return <div>Cargando datos...</div>; // Mostrar un mensaje de carga
  }

  return (
    <Router>
      <div>
        <Routes>
          <Route
            path="/"
            element={<GestionProductos productos={productos} setProductos={setProductos} />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
