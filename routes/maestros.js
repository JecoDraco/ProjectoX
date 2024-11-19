const express = require('express');
const router = express.Router();

// Datos de ejemplo para simular una base de datos en memoria
let maestros = [
  { id: 1, nombre: 'Carlos Pérez', especialidad: 'Matemáticas', antiguedad: '10 años', turno: 'Matutino', imagen: 'carlos.jpg' },
  { id: 2, nombre: 'Ana López', especialidad: 'Física', antiguedad: '8 años', turno: 'Vespertino', imagen: 'ana.jpg' },
  { id: 3, nombre: 'Luis Martínez', especialidad: 'Química', antiguedad: '5 años', turno: 'Matutino', imagen: 'luis.jpg' },
  { id: 4, nombre: 'María González', especialidad: 'Historia', antiguedad: '15 años', turno: 'Vespertino', imagen: 'maria.jpg' },
  { id: 5, nombre: 'José Ramírez', especialidad: 'Filosofía', antiguedad: '20 años', turno: 'Matutino', imagen: 'jose.jpg' },
];

// Obtener todos los maestros
router.get('/', (req, res) => {
  res.json(maestros);
});

// Agregar un nuevo maestro
router.post('/', (req, res) => {
  const nuevoMaestro = req.body;
  nuevoMaestro.id = maestros.length + 1;
  maestros.push(nuevoMaestro);
  res.status(201).json(nuevoMaestro);
});

// Actualizar un maestro
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const maestroIndex = maestros.findIndex(maestro => maestro.id === parseInt(id));
  if (maestroIndex !== -1) {
    maestros[maestroIndex] = { ...maestros[maestroIndex], ...req.body };
    res.json(maestros[maestroIndex]);
  } else {
    res.status(404).json({ mensaje: 'Maestro no encontrado' });
  }
});

// Eliminar un maestro
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  maestros = maestros.filter(maestro => maestro.id !== parseInt(id));
  res.json({ mensaje: 'Maestro eliminado' });
});

module.exports = router;
