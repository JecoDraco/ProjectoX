import React from 'react';
import { Routes, Route } from "react-router-dom";
import Home from '../componente/home';
import Tabla from '../componente/tabla';
import Maestros from '../componente/Maestros';
import TablaMaestros from '../componente/TablaMaestros';
import Menu from '../componente/menu';

function Rutas() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/tabla' element={<Tabla />} />
        <Route path='/Maestros' element={<Maestros />} /> {/* Asegúrate de poner la barra al inicio */}
        <Route path='/TablaMaestros' element={<TablaMaestros />} />
      </Routes>
    </div>
  );
}

export default Rutas;

