import { useState } from "react";
import { postEntidad } from "../services/entidadService.js"
import { useNavigate } from "react-router-dom";

export default function CrearEntidad() {

  const navigate = useNavigate();

  const [entidad, setEntidad] = useState({});

  function handleChange(input) {
    const { name, value } = input.target;
    setEntidad({
      ...entidad,
      [name]: value
    });
  };


  function handleSubmit(form) {
    form.preventDefault();
    postEntidad(entidad)
      .then((response) => navigate("/entidad/" + response.data.id))
      .catch((error) => console.error(error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>field: <input name="field" type="text" onChange={handleChange} /></label>
      <input type="submit" />
    </form>
  )
}