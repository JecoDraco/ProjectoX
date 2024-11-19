const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()
const port = process.env.PORT || 3001

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

const alumnosRoutes = require('./routes/alumnos');
const maestrosRoutes = require('./routes/maestros');

app.use('/api/alumnos', alumnosRoutes);
app.use('/api/maestros', maestrosRoutes);

app.listen(port, ()=> {
    console.log(`Servidor corriendo en http://localhost:${port}`)
}) 