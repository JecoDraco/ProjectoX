const express = require('express');
const router = express.Router();

// Base de datos simulada en memoria
let maestros = [
  { id: 1, nombre: 'DR.Ivan Arturo Perez ', especialidad: 'Director General', antiguedad: '10 años', turno: 'Completo', imagen: 'Director (1).jpg' },
  { id: 2, nombre: 'DCC.Fernando Vera ', especialidad: 'Jefe de Carrera', antiguedad: '10 años', turno: 'Completo', imagen: 'Jefe de carrera (1).jpg' },
  { id: 3, nombre: 'MSI.Fabiola Cruz ', especialidad: 'Desarro.Suste', antiguedad: '10 años', turno: 'Matutino', imagen: 'Mtr.Fabiola Cruz.jpg' },
  { id: 4, nombre: 'MC.Mario Soler', especialidad: 'Calculo Vectorial', antiguedad: '10 años', turno: 'Doble', imagen: 'Mtr.Mario (1).jpg' },
  { id: 5, nombre: 'ING.Antonio Lopez', especialidad: 'Telecomunicacion', antiguedad: '9 años', turno: 'Doble', imagen: 'Mtr.Antonio.jpg' },
  { id: 6, nombre: 'ING.Dany Cambrano', especialidad: 'Estructura de Datos', antiguedad: '13 años', turno: 'Doble', imagen: 'Mtr.Dany Cambrano (1).jpg' },
  { id: 7, nombre: 'DCC.Salomon de la O', especialidad: 'IO', antiguedad: '10 años', turno: 'Doble', imagen: 'Mtr.Salomon De la O (1).jpg' },
  { id: 8, nombre: 'ING.Lazaro Arcos', especialidad: 'Fisica', antiguedad: '23 años', turno: 'Doble', imagen: 'Mtr.Lazaro Arcos  (1).jpg' },
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
