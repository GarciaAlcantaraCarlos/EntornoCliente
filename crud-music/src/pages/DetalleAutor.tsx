import { useEffect, useState } from "react";
import API from "../services/apiService";
import type { autor } from "../types";
import { useParams } from "react-router-dom";

const initAutor = {
  nombre: '',
  pais: '',
  periodo: '' ,
  foto_url: '',
  id: '',
  obras: []
}

export default function ListaAutores () {

  const { id } = useParams();
  const [autor, setAutor] = useState<autor>(initAutor)

  useEffect(() => {
    API.autor.get(id!)
      .then((response) => setAutor(response.data))
      .catch((error) => console.error(error))
  }, [])

  return (
    <>
      <img src={autor.foto_url} />
      <h1>{autor.nombre}</h1>
      <p>{autor.periodo} - {autor.pais}</p>
         <hr />
      {autor.obras.map((obra) => (
        <>
          <h2>{obra.titulo}</h2>
          <p>{obra.tipo} - {obra.anio}</p>
        </>
      ))}
    </>
  );
}