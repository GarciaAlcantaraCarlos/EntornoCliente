import { Link, useNavigate} from 'react-router-dom';
import { useState, useEffect } from "react"
import { useParams } from 'react-router-dom';
import { getEntidadByID, deleteEntidadByID } from "../services/entidadService.js"

export default function DetalleEntidad() {

  const navigate = useNavigate();
  const { id } = useParams();
  const [entidad, setEntidad] = useState({})

  useEffect(() => {
    getEntidadByID(id)
      .then((response) => setEntidad(response.data))
      .catch((error) => console.error(error));
  }, []);

  function borrar() {
    deleteEntidadByID(id)
      .then(() => navigate("/"))
      .catch((error) => console.error(error));
  }

  return (
    <>
      <h1>{entidad.titulo}</h1>
      <Link to={`/editar-entidad/${id}`}>Editar Entidad</Link>
      <button onClick={borrar}>BORRAR</button>
    </>
  )
}