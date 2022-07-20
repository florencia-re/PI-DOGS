import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getDogs } from "../../redux/actions";
//import { Link } from "react-router-dom";
import Card from "./Card";


//useSelector seleccion uno de los estados en el store, para poder tener acceso al state desde este componente
// hago toda la logica para mostrar aca, pedido de estado, paginado etc

export default function Cards() {
    //pido el estado a redux
    let state = useSelector(state => state.dogs);
    const dispatch = useDispatch()
    //hago la logica para ya tener todos los datos cuando el estado se renderize, (return)

    useEffect(() => {
        dispatch(getDogs())
    }, [dispatch])
    //console.log(state)

    //en h2 -> componente de error // componente de loading
    return (
        <div>
            {state.length > 0 ? state.map(dog => (
                <div key={dog.id}>
                    <Link to='/details' style={{textDecoration: 'none'}} >
                    <Card
                        name={dog.name}
                        image={dog.image}
                        temperaments={dog.temperaments}
                        weightMin={dog.weightMin}
                        weightMax={dog.weightMax}
                    />
                    </Link>
                </div>)

            ) : <h2>Cargando...</h2>}
        </div>
    )
}