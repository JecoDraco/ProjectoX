const express = require('express');
const router = express.Router();

// Datos de ejemplo para simular una base de datos en memoria
let maestros = [
  { id: 2, nombre: 'Mario Soler', materia: 'Calculo', añosdeservicio: '8 años', turno: 'Doble Turno', imagen: 'Mtr.Lazaro Arcos  (1).jpg' },
  { id: 3, nombre: 'Antonio Lopez', materia: 'Telecomunicacion', añosdeservicio: '10 años', turno: 'Doble Turno', imagen: 'Mtr.Antonio.jpg' },
  { id: 4, nombre: 'Dany Cambrano', materia: 'Estructura de Datos', añosdeservicio: '9 años', turno: 'Doble Turno', imagen: 'Mtr.Dany Cambrano (1).jpg' },
  { id: 5, nombre: 'David De la O', materia: 'Inv.De Operaciones', añosdeservicio: '10 años', turno: 'Doble Turno', imagen: 'Mtr.Salomon De la O (1).jpg' },
  { id: 6, nombre: 'Lazaro Arcos', materia: 'Fisica', añosdeservicio: '13 años', turno: 'Doble Turno', imagen: 'Mtr.Lazaro Arcos  (1).jpg' },
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
