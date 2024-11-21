import React, { useEffect, useState } from "react";
import axios from "axios";
import { Modal, Button, Spinner } from "react-bootstrap";

function AlumnoCard({ alumno, onMoreDetails }) {
  return (
    <div className="col">
      <div className="card h-100 shadow-sm">
        {/* Imagen del alumno */}
        <img
          src={alumno.imagen || "/fallback-image.jpg"}
          className="card-img-top img-thumbnail mx-auto mt-3"
          alt={alumno.nombre}
          style={{ width: "120px", height: "120px", objectFit: "cover" }}
        />
        <div className="card-body text-center">
          {/* Nombre y datos principales */}
          <h5 className="card-title">{alumno.nombre}</h5>
          <p className="card-text">
            <strong>Matrícula:</strong> {alumno.matricula} <br />
            <strong>Edad:</strong> {alumno.edad}
          </p>
        </div>
        <div className="card-footer text-center">
          {/* Botón para más detalles */}
          <Button variant="primary" onClick={() => onMoreDetails(alumno)}>
            Ver detalles
          </Button>
        </div>
      </div>
    </div>
  );
}

function Home() {
  const [data, setData] = useState([]); // Estado para almacenar alumnos
  const [loading, setLoading] = useState(true); // Estado de carga
  const [selectedAlumno, setSelectedAlumno] = useState(null); // Alumno seleccionado para el modal
  const [showModal, setShowModal] = useState(false); // Control del modal
  const [searchTerm, setSearchTerm] = useState(""); // Estado para almacenar el término de búsqueda

  // Cargar datos desde la API
  useEffect(() => {
    axios
      .get("http://localhost:3001/api/alumnos")
      .then((response) => setData(response.data))
      .finally(() => setLoading(false)); // Oculta el spinner después de cargar
  }, []);

  // Mostrar detalles de un alumno
  const handleMoreDetails = (alumno) => {
    setSelectedAlumno(alumno);
    setShowModal(true);
  };

  // Cerrar el modal
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedAlumno(null);
  };

  // Filtrar los alumnos según el término de búsqueda
  const filteredAlumnos = data.filter((alumno) =>
    alumno.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    alumno.matricula.toLowerCase().includes(searchTerm.toLowerCase()) ||
    alumno.carrera.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mt-4">
      {/* Barra de búsqueda */}
      <div className="mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Buscar por nombre, matrícula o carrera"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Spinner de carga */}
      {loading ? (
        <div className="text-center">
          <Spinner animation="border" variant="primary" role="status">
            <span className="visually-hidden">Cargando...</span>
          </Spinner>
        </div>
      ) : (
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
          {/* Muestra las tarjetas de los alumnos filtrados */}
          {filteredAlumnos.map((alumno) => (
            <AlumnoCard key={alumno.id} alumno={alumno} onMoreDetails={handleMoreDetails} />
          ))}
        </div>
      )}

      {/* Modal para detalles */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Detalles del Alumno</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedAlumno && (
            <div>
              <p><strong>Matrícula:</strong> {selectedAlumno.matricula}</p>
              <p><strong>Nombre:</strong> {selectedAlumno.nombre}</p>
              <p><strong>Edad:</strong> {selectedAlumno.edad}</p>
              <p><strong>Carrera:</strong> {selectedAlumno.carrera}</p>
              <p><strong>Semestre:</strong> {selectedAlumno.semestre}</p>
              <p><strong>Turno:</strong> {selectedAlumno.turno}</p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Home;

