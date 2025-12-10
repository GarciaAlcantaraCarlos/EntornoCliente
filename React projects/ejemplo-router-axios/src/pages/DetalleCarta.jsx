import { useState, useEffect } from "react";
import { getCartaByID } from "../services/cartaService.js"
import { useParams, Link } from "react-router-dom";

const cartaVacia = {
    _id: "",
    nombre: "",
    direccion: "",
    listaRegalos: []
}

export default function DetalleCarta() {

    const { id } = useParams();
    const [carta, setCarta] = useState(cartaVacia)

    useEffect(() => {
        getCartaByID(id)
            .then((response) => setCarta(response.data))
            .catch((error) => console.error(error));
    }, []);

    return (
        <>
            <h1>{carta.nombre}: {carta.listaRegalos.length} regalos</h1>
            <h4>Dirección: {carta.direccion}</h4>
            <ul>
                {carta.listaRegalos.map((value, id) => (
                    <li key={id}>{value}</li>
                ))}
            </ul>
            <Link to={`/EditarCarta/${carta._id}`}>Editar</Link>
        </>
    )
}