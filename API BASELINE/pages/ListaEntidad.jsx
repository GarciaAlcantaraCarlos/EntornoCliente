import { useState, useEffect } from "react";
import { getEntidads } from "../services/entidadService.js"
import { Link } from "react-router-dom";

export default function ListaEntidads() {

  const [entidads, setEntidads] = useState([])

  useEffect(() => {
    getEntidads()
      .then((response) => setEntidads(response.data))
      .catch((error) => console.error(error)); 
  }, []);

  return (
    <div>
      <h2>Entidads</h2>
      <ul>
        {entidads.map((entidad) => (
          <Link to={`/entidad/${entidad.id}`} >
            <div key={entidad.id}>
              <h3>{entidad.titulo}</h3>
            </div>
          </Link>
        ))}
      </ul>
    </div>
  );
}