import React, { useEffect, useState } from "react";
import axios from "axios";
import { Modal, Button, Spinner } from "react-bootstrap";

function MaestroCard({ maestro, onMoreDetails }) {
  return (
    <div className="col">
      <div className="card h-100 shadow-sm">
        {/* Imagen del maestro */}
        <img
          src={maestro.imagen || "/fallback-image.jpg"}
          className="card-img-top img-thumbnail mx-auto mt-3"
          alt={maestro.nombre}
          style={{ width: "120px", height: "120px", objectFit: "cover" }}
        />
        <div className="card-body text-center">
          {/* Nombre y datos principales */}
          <h5 className="card-title">{maestro.nombre}</h5>
          <p className="card-text">
            <strong>Materia:</strong> {maestro.materia} <br />
            <strong>Turno:</strong> {maestro.turno}
          </p>
        </div>
        <div className="card-footer text-center">
          {/* Botón para más detalles */}
          <Button variant="primary" onClick={() => onMoreDetails(maestro)}>
            Ver detalles
          </Button>
        </div>
      </div>
    </div>
  );
}

function Maestros() {
  const [data, setData] = useState([]); // Estado para almacenar maestros
  const [loading, setLoading] = useState(true); // Estado de carga
  const [selectedMaestro, setSelectedMaestro] = useState(null); // Maestro seleccionado para el modal
  const [showModal, setShowModal] = useState(false); // Control del modal

  // Cargar datos desde la API
  useEffect(() => {
    axios
      .get("http://localhost:3001/api/maestros")
      .then((response) => setData(response.data))
      .finally(() => setLoading(false)); // Oculta el spinner después de cargar
  }, []);

  // Mostrar detalles de un maestro
  const handleMoreDetails = (maestro) => {
    setSelectedMaestro(maestro);
    setShowModal(true);
  };

  // Cerrar el modal
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedMaestro(null);
  };

  return (
    <div className="container mt-4">
      {/* Spinner de carga */}
      {loading ? (
        <div className="text-center">
          <Spinner animation="border" variant="primary" role="status">
            <span className="visually-hidden">Cargando...</span>
          </Spinner>
        </div>
      ) : (
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
          {/* Muestra tarjetas de maestros */}
          {data.map((maestro) => (
            <MaestroCard key={maestro.id} maestro={maestro} onMoreDetails={handleMoreDetails} />
          ))}
        </div>
      )}

      {/* Modal para detalles */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Detalles del Maestro</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedMaestro && (
            <div>
              <p><strong>Nombre:</strong> {selectedMaestro.nombre}</p>
              <p><strong>Materia:</strong> {selectedMaestro.materia}</p>
              <p><strong>Turno:</strong> {selectedMaestro.turno}</p>
              <p><strong>Años de servicio:</strong> {selectedMaestro.añosdeservicio}</p>
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

export default Maestros;
