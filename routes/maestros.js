// Importamos Express para manejar rutas.
// Usamos el método Router() de Express para definir rutas específicas para "maestros".
const express = require('express');
const router = express.Router();

// Creamos un arreglo que simula una base de datos en memoria.
// Cada objeto representa un maestro con datos como nombre, especialidad, antigüedad, turno y una imagen asociada.
let maestros = [
  { id: 1, nombre: 'Carlos Pérez', especialidad: 'Matemáticas', antiguedad: '10 años', turno: 'Matutino', imagen: 'carlos.jpg' },
  { id: 2, nombre: 'Ana López', especialidad: 'Física', antiguedad: '8 años', turno: 'Vespertino', imagen: 'ana.jpg' },
  { id: 3, nombre: 'Luis Martínez', especialidad: 'Química', antiguedad: '5 años', turno: 'Matutino', imagen: 'luis.jpg' },
  { id: 4, nombre: 'María González', especialidad: 'Historia', antiguedad: '15 años', turno: 'Vespertino', imagen: 'maria.jpg' },
  { id: 5, nombre: 'José Ramírez', especialidad: 'Filosofía', antiguedad: '20 años', turno: 'Matutino', imagen: 'jose.jpg' },
];

// Ruta para obtener todos los maestros.
// Cuando se accede a esta ruta, se devuelve la lista completa de maestros en formato JSON.
router.get('/', (req, res) => {
  res.json(maestros); // Devuelve la lista completa de maestros
});

// Ruta para agregar un nuevo maestro.
// El cliente debe enviar los datos del maestro en el cuerpo de la solicitud.
router.post('/', (req, res) => {
  // Creamos un nuevo maestro con un ID único, basado en el tamaño actual del arreglo, y agregamos los datos enviados.
  const nuevoMaestro = { id: maestros.length + 1, ...req.body };
  maestros.push(nuevoMaestro); // Añadimos el nuevo maestro al arreglo.
  res.status(201).json(nuevoMaestro); // Respondemos con el nuevo maestro y un estado HTTP 201 (creado).
});

// Ruta para actualizar un maestro existente.
// El cliente debe proporcionar el ID del maestro en la URL y los datos actualizados en el cuerpo de la solicitud.
router.put('/:id', (req, res) => {
  // Buscamos el índice del maestro correspondiente al ID proporcionado.
  const index = maestros.findIndex(m => m.id === parseInt(req.params.id));
  if (index === -1) {
    // Si el maestro no existe, devolvemos un estado 404 (no encontrado) y un mensaje de error.
    return res.status(404).json({ mensaje: 'Maestro no encontrado' });
  }
  // Actualizamos los datos del maestro combinando la información existente con la nueva proporcionada.
  maestros[index] = { ...maestros[index], ...req.body };
  res.json(maestros[index]); // Enviamos el maestro actualizado como respuesta.
});

// Ruta para eliminar un maestro.
// El cliente debe proporcionar el ID del maestro a eliminar en la URL.
router.delete('/:id', (req, res) => {
  // Guardamos el tamaño inicial del arreglo para comparar después.
  const initialLength = maestros.length;
  // Filtramos el arreglo eliminando el maestro que tenga el ID especificado.
  maestros = maestros.filter(m => m.id !== parseInt(req.params.id));
  // Comparamos el tamaño inicial con el nuevo para determinar si el maestro fue eliminado.
  const mensaje = initialLength > maestros.length ? 'Maestro eliminado' : 'Maestro no encontrado';
  res.json({ mensaje }); // Enviamos un mensaje indicando el resultado.
});

// Exportamos el router para que pueda ser utilizado en la aplicación principal.
// Esto permite que las rutas definidas aquí se integren con el resto del proyecto.
module.exports = router;