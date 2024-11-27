import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AnalisisProductos from './Componentes/AnalisisProductos';
import GestionProductos from './Componentes/GestionProductos';

import './App.css';


const App = () => {


  const [productos, setProductos] = useState([
    { id: 1, nombre: 'Laptop', categoria: 'Electrónica', precio: 1200, stock: 15 },
    { id: 2, nombre: 'Mouse', categoria: 'Electrónica', precio: 20, stock: 50 },
    { id: 3, nombre: 'Silla', categoria: 'Muebles', precio: 80, stock: 30 },
    { id: 4, nombre: 'Mesa', categoria: 'Muebles', precio: 150, stock: 10 },
  ]);

  return (
    <Router>
      <div>
          <Link  className="custom-button" to="/">Gestión de Productos</Link> / <Link className="custom-button" to="/analisis">Analisis de Productos</Link>
        <Routes>
          <Route path="/" element={<GestionProductos productos={productos} setProductos={setProductos} />} />
          <Route path="/analisis" element={<AnalisisProductos productos={productos} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
