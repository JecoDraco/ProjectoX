import React, { useState } from 'react';
import { Link, useLocation } from "react-router-dom";
import axios from 'axios';
import { Spinner } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';

function Menu() {
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`https://api.example.com/search?q=${searchTerm}`);
      console.log('Search results:', response.data);
      // Manejo de resultados según tu estructura
    } catch (err) {
      setError('Error al realizar la búsqueda. Inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  // Estilos en JavaScript para aplicar el efecto de transparencia y glassmorphism
  const navbarStyle = {
    background: 'rgba(255, 255, 255, 0.8)',
    backdropFilter: 'blur(8px)',
    borderRadius: '10px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    padding: '10px 20px',
  };

  const brandStyle = {
    color: '#007bff',
    fontSize: '1.2em',
    fontWeight: 'bold',
  };

  const navLinkStyle = {
    color: '#007bff',
    transition: 'color 0.3s',
  };

  const searchInputStyle = {
    border: 'none',
    borderRadius: '20px',
    padding: '8px 15px',
    boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.1)',
    transition: 'box-shadow 0.3s',
  };

  const searchButtonStyle = {
    borderRadius: '50%',
    padding: '5px 10px',
    transition: 'background-color 0.3s, box-shadow 0.3s',
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light" style={navbarStyle}>
      <div className="container-fluid">
        <Link className="navbar-brand" to="/" style={brandStyle}>
          | BARRA DE NAVEGACIÓN |
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className={`nav-item ${location.pathname === '/' ? 'active' : ''}`}>
              <Link className="nav-link" aria-current="page" to="/" style={navLinkStyle}>
                | INICIO |
              </Link>
            </li>
            <li className={`nav-item ${location.pathname === '/tabla' ? 'active' : ''}`}>
              <Link className="nav-link" to="/tabla" style={navLinkStyle}>
                | TABLA |
              </Link>
            </li>
          </ul>
          <form className="d-flex align-items-center" role="search" onSubmit={handleSearch}>
            <input 
              className="form-control me-2" 
              type="search" 
              placeholder="Buscar" 
              aria-label="Buscar" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={searchInputStyle}
              onFocus={(e) => e.target.style.boxShadow = '0px 0px 8px rgba(0, 0, 0, 0.2)'}
              onBlur={(e) => e.target.style.boxShadow = '0px 0px 5px rgba(0, 0, 0, 0.1)'}
            />
            <button className="btn btn-outline-primary" type="submit" style={searchButtonStyle} disabled={loading}>
              {loading ? <Spinner as="span" animation="border" size="sm" /> : <i className="bi bi-search"></i>}
            </button>
          </form>
          {error && <div className="text-danger mt-2">{error}</div>}
        </div>
      </div>
    </nav>
  );
}

export default Menu;