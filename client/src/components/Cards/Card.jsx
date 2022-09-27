import React from 'react';
import Card from 'react-bootstrap/Card';
import "./CardStyle.css";

//para mostrar los datos los recibo por props que vienen desde el estado de redux
export default function DogCard({ id, name, temperaments, image, weightMin, weightMax }) {
    return (
        <Card className="cardDog" key={id} style={{ height: '28rem' }}>
            <Card.Img variant="top" src={image ? image : 'https://st3.depositphotos.com/6913282/12698/v/600/depositphotos_126982838-stock-illustration-trail-cats-abstract-animal-footprint.jpg'} style={{ height: '15rem' }} />
            <Card.Body className='gap-1 text-black'>
                <Card.Title>{name}</Card.Title>
                <Card.Text>
                    <div className='gap-1'>
                        <p>Temperament: {temperaments}</p>
                        <p>Weight Min: {weightMin} kg</p>
                        <p>Weight Max: {weightMax} kg</p>
                    </div>
                </Card.Text>
                {/* <Button variant="primary">Go somewhere</Button> */}
            </Card.Body>
        </Card>
    )
}