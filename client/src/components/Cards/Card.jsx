import React from 'react';
import './Card.css'


//para mostrar los datos los recibo por props que vienen desde el estado de redux
export default function Card({ id, name, temperaments, image, weightMin, weightMax }) {
    return (

        <div id={id} className='card'>

            <div>
                <h2>{name}</h2>
            </div>
            <div>
                <img className='img' src={image ? image : 'https://st3.depositphotos.com/6913282/12698/v/600/depositphotos_126982838-stock-illustration-trail-cats-abstract-animal-footprint.jpg'} alt='doggie' />
            </div>
            <div>
                <h3>Temperament: {temperaments}</h3>
            </div>
            <div>
                <h3>Weight Min: {weightMin} kg</h3>
                <h3>Weight Max: {weightMax} kg</h3>
            </div>

        </div>

    )
}