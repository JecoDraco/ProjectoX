import React, { useEffect, useState } from "react";
import axios from "axios";
import { Modal, Button, Spinner } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./home.css";

function AlumnoCard({ alumno, onMoreDetails }) {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="col">
      <div className="card h-100 shadow-lg border-0 rounded-3 small-card">
        <img
          src={imageError ? "/fallback-image.jpg" : alumno.imagen}
          className="card-img-top rounded-circle img-thumbnail mx-auto mt-3"
          alt={alumno.nombre}
          onError={() => setImageError(true)}
          style={{ width: "120px", height: "120px", objectFit: "cover", border: "2px solid #007bff" }}
        />
        <div className="card-body text-start">
          <h5 className="card-title text-primary">
            <i className="bi bi-person-circle me-2" style={{ fontSize: "1.3em" }}></i> {alumno.nombre}
          </h5>
          <p className="card-text text-muted">
            <i className="bi bi-bookmark-fill me-1 text-info"></i> <strong>Matrícula:</strong> {alumno.matricula}<br />
            <i className="bi bi-calendar3 me-1 text-success"></i> <strong>Edad:</strong> {alumno.edad}<br />
            <i className="bi bi-mortarboard me-1 text-warning"></i> <strong>Carrera:</strong> {alumno.carrera}
          </p>
        </div>
        <div className="card-footer text-center border-0">
          <Button variant="outline-primary" onClick={() => onMoreDetails(alumno)}>
            <i className="bi bi-info-circle me-1"></i> Más detalles
          </Button>
        </div>
      </div>
    </div>
  );
}

function Home() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedAlumno, setSelectedAlumno] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get("http://localhost:3001/api/alumnos");
        setData(data);
      } catch {
        setError("Error al cargar los datos.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleMoreDetails = (alumno) => {
    setSelectedAlumno(alumno);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedAlumno(null);
  };

  return (
    <div className="home-container">
      {loading ? (
        <div className="d-flex justify-content-center">
          <Spinner animation="border" variant="primary" role="status">
            <span className="visually-hidden">Cargando...</span>
          </Spinner>
        </div>
      ) : error ? (
        <p className="text-danger text-center">{error}</p>
      ) : (
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
          {data.map((alumno) => (
            <AlumnoCard key={alumno.id} alumno={alumno} onMoreDetails={handleMoreDetails} />
          ))}
        </div>
      )}

      <Modal show={showModal} onHide={handleCloseModal} className="custom-modal">
        <Modal.Header closeButton>
          <Modal.Title className="text-primary">
            <i className="bi bi-person-circle me-2" style={{ fontSize: "1.5em" }}></i> Detalles de {selectedAlumno?.nombre}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedAlumno && (
            <>
              <p><i className="bi bi-bookmark-fill me-1 text-info"></i> <strong>Matrícula:</strong> {selectedAlumno.matricula}</p>
              <p><i className="bi bi-calendar3 me-1 text-success"></i> <strong>Edad:</strong> {selectedAlumno.edad}</p>
              <p><i className="bi bi-mortarboard me-1 text-warning"></i> <strong>Carrera:</strong> {selectedAlumno.carrera}</p>
              <p><i className="bi bi-journal me-1 text-secondary"></i> <strong>Semestre:</strong> {selectedAlumno.semestre}</p>
              <p><i className="bi bi-clock me-1 text-dark"></i> <strong>Turno:</strong> {selectedAlumno.turno}</p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={handleCloseModal}>
            <i className="bi bi-x-circle me-1"></i> Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Home;
