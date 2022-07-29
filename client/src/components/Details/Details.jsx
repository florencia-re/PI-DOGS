import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getDetails } from "../../redux/actions";
import './Details.css';

export default function Details(props) {
    
    const dispatch = useDispatch();
    let id = props.match.params.id;
    
    useEffect(() => {
        dispatch(getDetails(id))
    }, [dispatch, id])
    let dog = useSelector(state => state.details)
    // console.log(dog)
    return (
        <div className='details'>
            <h2>Doggie Details</h2>
            <div className="card-detail">
            {
                dog ? <div>
                    <ul id="card-content">
                        <h3>{dog.name}</h3>
                        <p>Weight between: {dog.weightMin} kg and {dog.weightMax}</p>
                        <p>Height between: {dog.heightMin} - {dog.heightMax}</p>
                        <p>Temperaments: {dog.temperaments}</p>
                        <img className='img' src={dog.image} alt='doggie' />
                    </ul>
                </div>
                    : 'Doggie no encontrado'}
            </div>

        </div>
    )
}