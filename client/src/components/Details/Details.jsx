import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearState, getDetails } from "../../redux/actions";
import { Link } from 'react-router-dom';
import './Details.css';

export default function Details(props) {

    const dispatch = useDispatch();
    let id = props.match.params.id;

    useEffect(() => {
        dispatch(clearState())
        dispatch(getDetails(id))
    }, [dispatch, id])

    let dog = useSelector(state => state.details)

    return (
        <div className='details'>
            <div className="card-detail">
                <h2 className="title-detail">Doggie Details</h2>
                {
                    dog?.id ? <div className="div-detail">
                        <ul id="card-content">
                            <h3>{dog.name}</h3>
                            <p>Weight between: {dog.weightMin} kg and {dog.weightMax} kg</p>
                            <p>Height between: {dog.heightMin} cm and {dog.heightMax} cm</p>
                            <p>Temperaments: {dog.temperaments}</p>
                            <img className='img-detail'
                                src={dog?.image ? dog?.image : 'https://st3.depositphotos.com/6913282/12698/v/600/depositphotos_126982838-stock-illustration-trail-cats-abstract-animal-footprint.jpg'} alt='doggie' />
                            <Link to='/home'><p><button>Go back</button></p></Link>
                        </ul>
                    </div>
                        : <h3>Cargando...</h3>}
            </div>

        </div>
    )
}