import React, { useState } from 'react';
import { Link, useLocation } from "react-router-dom";

// Componente principal de navegación
function Menu() {
  const location = useLocation(); // Obtiene la ubicación actual para resaltar el enlace activo
  const [searchTerm, setSearchTerm] = useState(''); // Estado para almacenar el término de búsqueda

  // Maneja la acción de búsqueda (actualmente solo registra el término en consola)
  const handleSearch = (e) => {
    e.preventDefault(); // Previene la recarga de la página
    console.log('Buscando:', searchTerm); // Imprime el término de búsqueda en consola
  };

  // Estilos para la barra de navegación
  const navbarStyle = {
    background: 'rgba(255, 255, 255, 0.8)', // Transparencia con glassmorphism
    backdropFilter: 'blur(8px)', // Efecto de desenfoque
    borderRadius: '10px', // Bordes redondeados
    padding: '10px 20px', // Espaciado interno
  };

  const brandStyle = {
    color: '#007bff', // Color azul para el texto de la marca
    fontSize: '1.2em', // Tamaño de fuente más grande
    fontWeight: 'bold', // Texto en negrita
  };

  const navLinkStyle = {
    color: '#007bff', // Color azul para los enlaces
    transition: 'color 0.3s', // Suaviza el cambio de color al pasar el ratón
  };

  const searchInputStyle = {
    border: 'none', // Sin bordes visibles
    borderRadius: '20px', // Bordes redondeados
    padding: '8px 15px', // Espaciado interno
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light" style={navbarStyle}>
      <div className="container-fluid">
        {/* Enlace a la página principal */}
        <Link className="navbar-brand" to="/" style={brandStyle}>
          | Alumnos |
        </Link>

        {/* Botón para el menú desplegable en dispositivos pequeños */}
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarSupportedContent" 
          aria-controls="navbarSupportedContent" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Menú de navegación */}
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {/* Enlace a "Tabla" */}
            <li className={`nav-item ${location.pathname === '/tabla' ? 'active' : ''}`}>
              <Link className="nav-link" to="/tabla" style={navLinkStyle}>
                | Agregar |
              </Link>
            </li>
            <li className={`nav-item ${location.pathname === '/maestros' ? 'active' : ''}`}>
              <Link className="nav-link" to="/Maestros" style={navLinkStyle}>
                | Maestros |
              </Link>
            </li>
            <li className={`nav-item ${location.pathname === '/TablaMaestros' ? 'active' : ''}`}>
              <Link className="nav-link" to="/TablaMaestros" style={navLinkStyle}>
                | TablaMaestros |
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Menu;
