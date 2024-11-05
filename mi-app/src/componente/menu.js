import React, { useState } from 'react';
import { Link, useLocation } from "react-router-dom";
import axios from 'axios';

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

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">| BARRA DE NAVEGACION |</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className={`nav-item ${location.pathname === '/' ? 'active' : ''}`}>
              <Link className="nav-link" aria-current="page" to="/">| INICIO |</Link>
            </li>
            <li className={`nav-item ${location.pathname === '/tabla' ? 'active' : ''}`}>
              <Link className="nav-link" to="/tabla">| TABLA |</Link>
            </li>
          </ul>
          <form className="d-flex" role="search" onSubmit={handleSearch}>
            <input 
              className="form-control me-2" 
              type="search" 
              placeholder="Buscar" 
              aria-label="Buscar" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="btn btn-outline-success" type="submit" disabled={loading}>
              {loading ? 'Buscando...' : 'Buscar'}
            </button>
          </form>
          {error && <div className="text-danger mt-2">{error}</div>}
        </div>
      </div>
    </nav>
  );
}

export default Menu;
