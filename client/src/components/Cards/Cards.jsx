import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getDogs, sortByName, sortByWeight, filterByTemps, filterByOrigin, getTemperaments } from "../../redux/actions";
//import { Link } from "react-router-dom";
import Card from "./Card";
import './Cards.css'
import Paginate from "./Paginate";
import './Paginate.css'

//useSelector seleccion uno de los estados en el store, para poder tener acceso al state desde este componente
// hago toda la logica para mostrar aca, pedido de estado, paginado etc

export default function Cards() {
    //pido el estado a redux
    const allDogs = useSelector(state => state.dogs);
    const allTemperaments = useSelector((state) => state.temperaments)
    const dispatch = useDispatch()
    //hago la logica para ya tener todos los datos cuando el estado se renderize, (return)

    //----  Paginado  ----
    const [currentPage, setCurrentPage] = useState(1);
    const [/*order*/, setOrder] = useState('')
    const [dogsPerPage] = useState(9);
    const lastDog = currentPage * dogsPerPage;
    const firstDog = lastDog - dogsPerPage;
    const currentDogs = allDogs.slice(firstDog, lastDog)

    useEffect(() => {
        dispatch(getDogs())
    }, [dispatch])
    //console.log(state)

    useEffect(() => {
        dispatch(getTemperaments())
    }, [dispatch])

    // const handlerGetDogs = (e) => {
    //     dispatch(getDogs())
    // }

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    const handlerSortByName = (e) => {
        dispatch(sortByName(e.target.value))
        setCurrentPage(1)
        setOrder(`Order ${e.target.value}`)
    }

    const handlerSortByWeight = (e) => {
        dispatch(sortByWeight(e.target.value))
        setCurrentPage(1)
        //seteo el estado para q se vuelva a renderizar con el orden
        setOrder(`Ordenado ${e.target.value}`)
    }

    const handlerFilterByTemps = (e) => {
        //e.target.value -> es el 'option' elegido
        dispatch(filterByTemps(e.target.value))
        setCurrentPage(1)
    }

    const handlerFilterByOrigin = (e) => {
        dispatch(filterByOrigin(e.target.value))
        setCurrentPage(1)
    }


    return (
        <>
            <div className="container-sort">
                {/* <div>
                    <button onClick={(e) => handlerGetDogs(e)}>Charge</button>
                </div> */}

                {/* ORDENAMIENTOS */}
                <div>
                    <h3>Sort by Name:</h3>
                    <select className="text" onChange={(e) => handlerSortByName(e)}>
                        <option value="All">Select</option>
                        <option value="Asc">A - Z</option>
                        <option value="Desc">Z - A</option>
                    </select>
                </div>
                <div>
                    <h3>Sort by Weight:</h3>
                    <select className="text" onChange={(e) => handlerSortByWeight(e)}>
                        <option value="All">Select</option>
                        <option value="Light">Lighter to heavier</option>
                        <option value="Heavy">Heavier to lighter</option>
                    </select>
                </div>
                <div>
                    {/* FILTRADOS */}
                    <h3>Filter by Temperament:</h3>
                    <select className='text' onChange={(e) => handlerFilterByTemps(e)}>
                        <option value='All'>All</option>
                        {allTemperaments?.sort((a, b) => {
                            if ((a.name < b.name) || (a.name || b.name) === '') return -1
                            if (a.name > b.name) return 1
                            return 0
                        }).map((temp) => {
                            return (
                                <option key={temp.id} value={temp.name}>{temp.name}</option>)
                        })
                        }
                    </select>
                </div>
                <div>
                    <h3>Filter by Origin (Existing or Created):</h3>
                    <select className="text" onChange={(e) => handlerFilterByOrigin(e)}>
                        <option value="All">All</option>
                        <option value="Created">Created</option>
                        <option value='Exists'>Exists</option>
                    </select>
                </div>
            </div>
            {/* CARDS */}
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

                    ) : <h2>Loading...</h2>}
                </div>
                <Paginate dogsPerPage={dogsPerPage} allDogs={allDogs.length} paginate={paginate} currentPage={currentPage} setCurrentPage={setCurrentPage} />
            </div>
        </>
    )
}