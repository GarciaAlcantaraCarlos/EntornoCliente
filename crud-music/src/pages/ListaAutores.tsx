import { useEffect, useState } from "react";
import API from "../services/apiService";
import type { autor } from "../types";
import { Link } from "react-router-dom";

export default function ListaAutores () {

  const [autores, setAutores] = useState([])

  useEffect(() => {
    API.autor.getAll()
      .then((response) => setAutores(response.data))
      .catch((error) => console.error(error))
  }, [])

  return (
    <>
      <h1>Autores</h1>
      <div id="author-grid">
        {autores.map((autor : autor) => (
          <Link to={`/autor/${autor.id}`}>
            <div key={autor.id}>
              <img src={autor.foto_url} />
              <div>
                <h4>{autor.nombre}</h4>
                <p>{autor.obras.length} obras</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}