import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AnalisisProductos from './Componentes/AnalisisProductos';
import GestionProductos from './Componentes/GestionProductos';
import axios from 'axios'; // Importa axios
import './App.css';

const App = () => {
  const [productos, setProductos] = useState([]); // Define el estado productos

  // UseEffect para cargar los productos desde la URL cuando el componente se monte
  useEffect(() => {
    axios.get('https://tienddi.co/json.json')
      .then(response => {
        setProductos(response.data); // Guarda los productos en el estado
      })
      .catch(error => {
        console.error('Error al cargar los productos:', error);
      });
  }, []);  // El segundo argumento vacío [] asegura que solo se ejecute una vez cuando el componente se monte

  return (
    <Router>
      <div>
        <Link className="custom-button" to="/">Gestión de Productos</Link> / 
        <Link className="custom-button" to="/analisis">Análisis de Productos</Link>
        <Routes>
          <Route path="/" element={<GestionProductos productos={productos} setProductos={setProductos} />} />
          <Route path="/analisis" element={<AnalisisProductos productos={productos} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
