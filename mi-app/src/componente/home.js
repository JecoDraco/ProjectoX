import React, { useEffect, useState } from "react";

function Home() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/alumnos"); // Verifica que esta URL sea correcta
        if (!response.ok) {
          throw new Error("Error en la solicitud");
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="row row-cols-1 row-cols-md-3 g-4">
      {data.map((item) => (
        <div className="col" key={item.id}>
          <div className="card">
            <img src={item.imagen} className="card-img-top" alt={item.nombre} />
            <div className="card-body">
              <h5 className="card-title">{item.nombre}</h5>
              <p className="card-text">
                <strong>Matrícula:</strong> {item.matricula}<br />
                <strong>Edad:</strong> {item.edad}<br />
                <strong>Carrera:</strong> {item.carrera}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Home;
