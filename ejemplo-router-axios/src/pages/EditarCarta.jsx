import { useState, useEffect } from "react"
import { useParams, useNavigate } from 'react-router-dom';
import { putCarta } from "../services/cartaService.js"
import { getCartaByID } from "../services/cartaService.js"

const cartaVacia = {
    _id: "",
    nombre: "",
    direccion: "",
    listaRegalos: []
}

export default function EditarCarta() {

    const navigate = useNavigate();
    const { id } = useParams();
    const [carta, setCarta] = useState(cartaVacia);

    useEffect(() => {
        getCartaByID(id)
            .then((response) => setCarta(response.data))
            .catch((error) => console.error(error));
    }, []);


    function handleChange(input) {
        const { name, value } = input.target;
        setCarta({
            ...carta,
            [name]: value
        });
    };

    function leerRegalos(input) {
        const { value } = input.target

        const listaRegalosInput = value.split(",")

        setCarta({
            ...carta,
            listaRegalos: listaRegalosInput
        });
    };

    function handleSubmit(form){
        form.preventDefault();
        putCarta(carta)
            .then((response) => navigate("/carta/"+response.data._id))
            .catch((error) => console.error(error)); 
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label>Nombre: <input name="nombre" type="text" value={carta.nombre} onChange={handleChange} /></label>
                <label>Direccion: <input name="direccion" type="text" value={carta.direccion} onChange={handleChange} /></label>
                <label>Regalos (separar con comas): <textarea value={carta.listaRegalos} onChange={leerRegalos}></textarea></label>.
                <input type="submit" />
            </form>
        </>
    )
}