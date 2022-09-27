import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getDogs, sortByName, sortByWeight, filterByTemps, filterByOrigin, getTemperaments } from "../../redux/actions";
import Card from "./Card";
import Paginate from "./Paginate";
import Loader from "./../Loader/Loader";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Footer from "./../Footer/Footer";
import "./Cards.css"
import "./Paginate.css";

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

    useEffect(() => {
        dispatch(getTemperaments())
    }, [dispatch])

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

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
        <h4 className="mb-3 mt-3">Here you can apply sorts and filters:</h4>
            <Button variant="dark" className="d-lg-none mt-2" onClick={handleShow}>
                Sorts and filters
            </Button>
            
            <Offcanvas show={show} onHide={handleClose} responsive="lg" id="offCanvas">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Sorts and filters</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body id="canvas" className="justify-content-center">
                   
                   <Row xs={1} md={4} className="gap-lg-0 gap-3">
                        
                        {/* ORDENAMIENTOS */}
                        <div>
                            <p>Sort by Name:</p>
                            <Form.Select onChange={(e) => handlerSortByName(e)}>
                                <option selected value="All">Select</option>
                                <option value="Asc">A - Z</option>
                                <option value="Desc">Z - A</option>
                            </Form.Select>
                        </div>
                        <div>
                            <p>Sort by Weight:</p>
                            <Form.Select onChange={(e) => handlerSortByWeight(e)}>
                                <option selected value="All">Select</option>
                                <option value="Light">Lighter to heavier</option>
                                <option value="Heavy">Heavier to lighter</option>
                            </Form.Select>
                        </div>

                        {/* FILTRADOS */}
                        <div>
                            <p>Filter by Temperament:</p>
                            <Form.Select onChange={(e) => handlerFilterByTemps(e)}>
                                <option selected value='All'>All</option>
                                {allTemperaments?.sort((a, b) => {
                                    if ((a.name < b.name) || (a.name || b.name) === '') return -1
                                    if (a.name > b.name) return 1
                                    return 0
                                }).map((temp) => {
                                    return (
                                        <option key={temp.id} value={temp.name}>{temp.name}</option>)
                                })
                                }
                            </Form.Select>
                        </div>
                        <div>
                            <p>Filter by Origin (Existing or Created):</p>
                            <Form.Select onChange={(e) => handlerFilterByOrigin(e)}>
                                <option selected value="All">All</option>
                                <option value="Created">Created</option>
                                <option value='Exists'>Exists</option>
                            </Form.Select>
                        </div>
                    </Row>
                </Offcanvas.Body>
            </Offcanvas>
            <div className="container mt-3">

            </div>
            {/* CARDS */}
            <div className="container flex-center">
                <Paginate dogsPerPage={dogsPerPage} allDogs={allDogs.length} paginate={paginate} currentPage={currentPage} setCurrentPage={setCurrentPage} />

                <Row xs={1} md={3} className="g-4 mt-1 mb-5">
                    {currentDogs.length > 0 ? currentDogs.map(dog => (
                        <Col>
                            <Link to={'/details/' + dog.id} className="hover-overlay" style={{ textDecoration: 'none' }} >
                                <Card
                                    name={dog.name}
                                    image={dog.image}
                                    temperaments={dog.temperaments}
                                    weightMin={dog.weightMin}
                                    weightMax={dog.weightMax}
                                />
                            </Link>
                        </Col>)

                    ) : <Loader />}
                </Row>
            </div>
            <Footer />
        </>
    )
}