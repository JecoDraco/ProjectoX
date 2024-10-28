import React from 'react'
import {Routes,Route} from "react-router-dom";
import Home from '../componente/home';
import Tabla from '../componente/tabla';
function Rutas() {
  return (
    <div>
      <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/tabla' element={<Tabla/>}/>
        </Routes>
    </div>
  )
}

export default Rutas
