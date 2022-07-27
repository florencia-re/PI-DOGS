import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getDogs } from "../../redux/actions";
//import { Link } from "react-router-dom";
import Card from "./Card";
import './Cards.css'
import Paginate from "./Paginate";
import './Paginate.css'

//useSelector seleccion uno de los estados en el store, para poder tener acceso al state desde este componente
// hago toda la logica para mostrar aca, pedido de estado, paginado etc

export default function Cards() {
    //pido el estado a redux
    let allDogs = useSelector(state => state.dogs);
    const dispatch = useDispatch()
    //hago la logica para ya tener todos los datos cuando el estado se renderize, (return)


    //----  Paginado  ----
    const [currentPage, setCurrentPage] = useState(1);
    const [dogsPerPage] = useState(9);
    const lastDog = currentPage * dogsPerPage;
    const firstDog = lastDog - dogsPerPage;
    const currentDogs = allDogs.slice(firstDog, lastDog)

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    useEffect(() => {
        dispatch(getDogs())
    }, [dispatch])
    //console.log(state)

    //en h2 -> componente de error // componente de loading
    return (
        <div className="container">
            <Paginate dogsPerPage={dogsPerPage} allDogs={allDogs.length} paginate={paginate} currentPage={currentPage} setCurrentPage={setCurrentPage} />
            <div className='wrapper'>
                {currentDogs.length > 0 ? currentDogs.map(dog => (
                    <div key={dog.id}>
                        <Link to={'/details/' + dog.id} style={{ textDecoration: 'none' }} >
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
            <Paginate dogsPerPage={dogsPerPage} allDogs={allDogs.length} paginate={paginate} currentPage={currentPage} setCurrentPage={setCurrentPage} />
        </div>
    )
}