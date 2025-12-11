import { useEffect, useState } from "react";
import { getEntidadByID, putEntidad } from "../services/entidadService.js"
import { useNavigate, useParams } from "react-router-dom";

export default function EdiatrEntidad() {

  const navigate = useNavigate();

  const { id } = useParams()
  const [entidad, setEntidad] = useState({})
  const [listaGeneros, setListaGeneros] = useState([])

  useEffect(() => {
    getEntidadByID(id)
      .then((response) => setEntidad(response.data))
      .catch((error) => console.error(error));
  }, [])

  function handleChange(input) {
    const { name, value } = input.target;
    setEntidad({
      ...entidad,
      [name]: value
    });
  };

  function handleSubmit(form) {
    form.preventDefault();
    putEntidad(entidad)
      .then((response) => navigate("/entidad/" + response.data.id))
      .catch((error) => console.error(error));
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>field: <input name="field" type="text" onChange={handleChange} value={entidad.field} /></label>
        <input type="submit" />
      </form>
    </>
  )
}