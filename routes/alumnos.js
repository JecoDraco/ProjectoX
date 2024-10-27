// routes/alumnos.js
const express = require('express')
const router = express.Router()

// Datos de ejemplo para simular una base de datos en memoria
let alumnos = [
  { id: 1, matricula: '2023001', nombre: 'Juan Pérez', edad: 21, carrera: 'Ingeniería' },
  { id: 2, matricula: '2023002', nombre: 'María López', edad: 22, carrera: 'Arquitectura' },
  { id: 3, matricula: '2023003', nombre: 'Juan Pérez', edad: 21, carrera: 'Ingeniería' },
  { id: 4, matricula: '2023004', nombre: 'María López', edad: 22, carrera: 'Arquitectura' },
  { id: 5, matricula: '2023005', nombre: 'Juan Pérez', edad: 21, carrera: 'Ingeniería' },
  { id: 6, matricula: '2023006', nombre: 'María López', edad: 22, carrera: 'Arquitectura' },
  { id: 7, matricula: '2023007', nombre: 'Juan Pérez', edad: 21, carrera: 'Ingeniería' },
  { id: 8, matricula: '2023008', nombre: 'María López', edad: 22, carrera: 'Arquitectura' },
]

// Obtener todos los alumnos
router.get('/', (req, res) => {
  res.json(alumnos)
});

// Agregar un nuevo alumno
router.post('/', (req, res) => {
  const nuevoAlumno = req.body
  nuevoAlumno.id = alumnos.length + 1
  alumnos.push(nuevoAlumno)
  res.status(201).json(nuevoAlumno)
})

// Actualizar un alumno
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const alumnoIndex = alumnos.findIndex(al => al.id === parseInt(id))
  if (alumnoIndex !== -1) {
    alumnos[alumnoIndex] = { ...alumnos[alumnoIndex], ...req.body }
    res.json(alumnos[alumnoIndex])
  } else {
    res.status(404).json({ mensaje: 'Alumno no encontrado' })
  }
})

// Eliminar un alumno
router.delete('/:id', (req, res) => {
  const { id } = req.params
  alumnos = alumnos.filter(al => al.id !== parseInt(id))
  res.json({ mensaje: 'Alumno eliminado' })
})

module.exports = router