import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getDetails } from "../../redux/actions";

export default function Details(props) {
    
    const dispatch = useDispatch();
    let id = props.match.params.id;
    
    useEffect(() => {
        dispatch(getDetails(id))
    }, [dispatch, id])
    let dog = useSelector(state => state.details)
    // console.log(dog)
    return (
        <div>
            <h2>Doggie Details</h2>
            {
                dog ? <div>
                    <ul>
                        <h3>{dog.name}</h3>
                        <li>Weight: {dog.weightMin} - {dog.weightMax}</li>
                        <li>Height: {dog.heightMin} - {dog.heightMax}</li>
                        <li>Temperaments: {dog.temperaments}</li>
                        <img src={dog.image} alt='doggie' />
                    </ul>
                </div>
                    : 'Doggie no encontrado'}

        </div>
    )
}