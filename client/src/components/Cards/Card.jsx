import React from 'react';

//para mostrar los datos los recibo por props que vienen desde el estado de redux
export default function Card({ id, name, temperaments, image, weightMin, weightMax }) {
    return (
        <div id={id}>
            <div>
                <h2>{name}</h2>
            </div>

            <div>
                <img src={image} alt='doggie' />
            </div>
            <div>
                <h3>Temperament: {temperaments}</h3>
            </div>
            <div>
                <h3>Weight: {weightMin} - {weightMax}</h3>
            </div>
        </div>
    )
}