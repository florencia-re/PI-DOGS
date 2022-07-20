import React from 'react';
import './Card.css'

//para mostrar los datos los recibo por props que vienen desde el estado de redux
export default function Card({ id, name, temperaments, image, weightMin, weightMax }) {
    return (
        <div id={id} className='card'>
            <div className='content'>
                <div>
                    <h2>{name}</h2>
                </div>
                <div>
                    <img className='img' src={image} alt='doggie' />
                </div>
                <div>
                    <h3>Temperament: {temperaments}</h3>
                </div>
                <div>
                    <h3>Weight Min: {weightMin} kg</h3> 
                    <h3>Weight Max: {weightMax} kg</h3>
                </div>
            </div>
        </div>
    )
}