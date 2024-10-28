import React, { useEffect, useState } from "react";
import axios from "axios";

function Tabla() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editing, setEditing] = useState(null);
  const [newAlumno, setNewAlumno] = useState({ matricula: "", nombre: "", edad: "", carrera: "" });
  const [formErrors, setFormErrors] = useState({}); // Errores de formulario

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/alumnos");
        setData(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleAgregar = async () => {
    const errors = validateForm(newAlumno);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    try {
      const response = await axios.post("http://localhost:3001/api/alumnos", newAlumno);
      setData([...data, response.data]); // Agregar nuevo alumno
      setNewAlumno({ matricula: "", nombre: "", edad: "", carrera: "" });
      setFormErrors({});
    } catch (err) {
      setError(err.message);
    }
  };

  const validateForm = (alumno) => {
    const errors = {};
    if (!alumno.matricula) errors.matricula = "La matrícula es obligatoria.";
    if (!alumno.nombre) errors.nombre = "El nombre es obligatorio.";
    if (!alumno.edad) errors.edad = "La edad es obligatoria.";
    if (!alumno.carrera) errors.carrera = "La carrera es obligatoria.";
    return errors;
  };

  const handleEliminar = async (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este alumno?")) {
      try {
        await axios.delete(`http://localhost:3001/api/alumnos/${id}`);
        setData(data.filter((item) => item.id !== id));
      } catch (err) {
        setError(err.message);
      }
    }
  };

  const handleModificar = (id) => {
    const alumno = data.find((item) => item.id === id);
    setNewAlumno(alumno);
    setEditing(id);
  };

  const handleGuardarModificacion = async () => {
    try {
      const response = await axios.put(`http://localhost:3001/api/alumnos/${editing}`, newAlumno);
      setData(data.map((item) => (item.id === editing ? response.data : item)));
      setEditing(null);
      setNewAlumno({ matricula: "", nombre: "", edad: "", carrera: "" });
      setFormErrors({});
    } catch (err) {
      setError(err.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAlumno({ ...newAlumno, [name]: value });
    setFormErrors({ ...formErrors, [name]: "" }); // Limpiar error al modificar
  };

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <div className="row mb-3">
        <div className="col-8">
          <input
            type="text"
            name="matricula"
            placeholder="Matrícula"
            value={newAlumno.matricula}
            onChange={handleInputChange}
            className={`form-control mb-2 ${formErrors.matricula ? 'is-invalid' : ''}`}
          />
          <div className="invalid-feedback">{formErrors.matricula}</div>
          <input
            type="text"
            name="nombre"
            placeholder="Nombre"
            value={newAlumno.nombre}
            onChange={handleInputChange}
            className={`form-control mb-2 ${formErrors.nombre ? 'is-invalid' : ''}`}
          />
          <div className="invalid-feedback">{formErrors.nombre}</div>
          <input
            type="number"
            name="edad"
            placeholder="Edad"
            value={newAlumno.edad}
            onChange={handleInputChange}
            className={`form-control mb-2 ${formErrors.edad ? 'is-invalid' : ''}`}
          />
          <div className="invalid-feedback">{formErrors.edad}</div>
          <input
            type="text"
            name="carrera"
            placeholder="Carrera"
            value={newAlumno.carrera}
            onChange={handleInputChange}
            className={`form-control mb-2 ${formErrors.carrera ? 'is-invalid' : ''}`}
          />
          <div className="invalid-feedback">{formErrors.carrera}</div>
        </div>
        <div className="col-4 d-grid">
          {editing ? (
            <button className="btn btn-success" onClick={handleGuardarModificacion}>
              Guardar Cambios
            </button>
          ) : (
            <button className="btn btn-primary" onClick={handleAgregar}>
              Agregar
            </button>
          )}
        </div>
      </div>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>Matrícula</th>
            <th>Nombre</th>
            <th>Edad</th>
            <th>Carrera</th>
            <th>Eliminar</th>
            <th>Modificar</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.matricula}</td>
              <td>{item.nombre}</td>
              <td>{item.edad}</td>
              <td>{item.carrera}</td>
              <td>
                <button className="btn btn-danger" onClick={() => handleEliminar(item.id)}>
                  Eliminar
                </button>
              </td>
              <td>
                <button className="btn btn-warning" onClick={() => handleModificar(item.id)}>
                  Modificar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Tabla;
