const express = require('express');
const router = express.Router();

// Base de datos simulada en memoria
let maestros = [
  { id: 1, nombre: 'Carlos Pérez', especialidad: 'Matemáticas', antiguedad: '10 años', turno: 'Matutino', imagen: 'carlos.jpg' },
  { id: 2, nombre: 'Ana López', especialidad: 'Física', antiguedad: '8 años', turno: 'Vespertino', imagen: 'ana.jpg' },
  { id: 3, nombre: 'Luis Martínez', especialidad: 'Química', antiguedad: '5 años', turno: 'Matutino', imagen: 'luis.jpg' },
  { id: 4, nombre: 'María González', especialidad: 'Historia', antiguedad: '15 años', turno: 'Vespertino', imagen: 'maria.jpg' },
  { id: 5, nombre: 'José Ramírez', especialidad: 'Filosofía', antiguedad: '20 años', turno: 'Matutino', imagen: 'jose.jpg' },
];

// Obtener todos los maestros
router.get('/', (req, res) => {
  res.json(maestros); // Devuelve la lista completa de maestros
});

// Agregar un nuevo maestro
router.post('/', (req, res) => {
  const nuevoMaestro = { id: maestros.length + 1, ...req.body }; // Crea un nuevo maestro con un ID único
  maestros.push(nuevoMaestro); // Agrega el nuevo maestro al arreglo
  res.status(201).json(nuevoMaestro); // Devuelve el maestro recién creado
});

// Actualizar un maestro existente
router.put('/:id', (req, res) => {
  const index = maestros.findIndex(m => m.id === parseInt(req.params.id)); // Encuentra el índice del maestro por su ID
  if (index === -1) {
    return res.status(404).json({ mensaje: 'Maestro no encontrado' }); // Responde si no se encuentra el maestro
  }
  maestros[index] = { ...maestros[index], ...req.body }; // Actualiza la información del maestro
  res.json(maestros[index]); // Devuelve el maestro actualizado
});

// Eliminar un maestro
router.delete('/:id', (req, res) => {
  const initialLength = maestros.length; // Guarda la longitud inicial del arreglo
  maestros = maestros.filter(m => m.id !== parseInt(req.params.id)); // Elimina al maestro con el ID especificado
  const mensaje = initialLength > maestros.length ? 'Maestro eliminado' : 'Maestro no encontrado'; // Determina si se eliminó o no
  res.json({ mensaje }); // Devuelve un mensaje confirmando el resultado
});

module.exports = router;
