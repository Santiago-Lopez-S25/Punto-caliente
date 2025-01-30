import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GestionProductos from './components/GestionProductos.jsx';
import './components/Tabla.css';



function App() {
  return (
    <Router className="flex justify-center items-center h-screen">
      <div>
        <Routes>
            <Route
                path="/"
                element={<GestionProductos/>}
            />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
