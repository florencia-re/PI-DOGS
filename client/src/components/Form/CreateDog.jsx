import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { getTemperaments, postDog } from '../../redux/actions';
import { Link, useHistory } from "react-router-dom";
import './CreateDog.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import NavBar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';

function validate(dog) {
    let error = {}
    if (!dog.name) {
        error.name = 'Name of the breed is required'
    }
    else if (dog.name.length > 30) {
        error.name = 'The name is too long';
    }
    else if (parseInt(dog.name)) {
        error.name = 'The name cannot contain numbers'
    }
    else if (!dog.heightMin) {
        error.heightMin = 'Minimum height is required';
    }
    else if (isNaN(parseInt(dog.heightMin))) {
        error.heightMin = 'Height should be a number';
    }
    else if (dog.heightMin <= 10) {
        error.heightMin = 'Your breed can´t be shorter than 10 cm';
    }
    else if (parseInt(dog.heightMin) >= parseInt(dog.heightMax)) {
        error.heightMin = 'Minimum height should be lower than maximum height';
    }
    else if (!dog.heightMax) {
        error.heightMax = 'Maximum height is required';
    }
    else if (isNaN(parseInt(dog.heightMax))) {
        error.heightMax = 'Height should be a number';
    }
    else if (dog.heightMax > 130) {
        error.heightMax = 'More than 130 cm is too much';
    }
    else if (!dog.weightMin) {
        error.weightMin = 'Minimum weight is required';
    }
    else if (isNaN(parseInt(dog.weightMin))) {
        error.weightMin = 'Weight should be a number';
    }
    else if (dog.weightMin <= 1) {
        error.weightMin = 'The weight cannot be less than 1 kg';
    }
    else if (!dog.weightMax) {
        error.weightMax = 'Maximum weight is required';
    }
    else if (isNaN(parseInt(dog.weightMax))) {
        error.weightMax = 'Weight should be a number';
    }
    else if (parseInt(dog.weightMax) <= parseInt(dog.weightMin)) {
        error.weightMax = 'Maximum weight should be higher than minimum weight';
    }
    else if (dog.weightMax > 170) {
        error.weightMax = 'The weight must be under 200 kgs';
    }
    else if (!dog.lifeSpan) {
        error.lifeSpan = 'Life span is required';
    }
    else if (isNaN(parseInt(dog.lifeSpan))) {
        error.lifeSpan = 'Life span should be a number';
    }
    else if (dog.lifeSpan > 30) {
        error.lifeSpan = 'Put an appropriate age, the dogs don´t live more than 30 years';
    }
    else if (dog.lifeSpan <= 1) {
        error.lifeSpan = 'The life span don´t be less than 1 year';
    } else if (!dog.image.includes("https://") && !dog.image.includes("http://")) {
        error.image = "This isn't a valid image address";
    }
    return error
}


export default function CreateDog() {

    const dispatch = useDispatch()
    //me redirige al home con hisotry.push('/home')
    const history = useHistory()
    const temperaments = useSelector(state => state.temperaments)

    useEffect(() => {
        dispatch(getTemperaments())
    }, [dispatch])


    const [error, setError] = useState({})
    const [dog, setDog] = useState({
        name: "",
        heightMin: "",
        heightMax: "",
        weightMin: "",
        weightMax: "",
        lifeSpan: "",
        image: "",
        temperaments: []
    })

    const handleChange = (e) => {  //en cada input onChange va a ir modificando la propiedad del estado, que se corresponde con el value
        setDog({
            ...dog,
            [e.target.name]: e.target.value
        })
        // console.log(dog)
        setError(validate({     //manejo errores
            ...dog,
            [e.target.name]: e.target.value
        }))
    }

    const handleSelect = (e) => {
        //verifico que no se repitan los temperamentos
        if (!dog.temperaments.includes(e.target.value)) {
            setDog({
                ...dog,
                temperaments: [...dog.temperaments, e.target.value]
            })
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        //console.log(dog)
        //console.log(error)
        //verfico q no haya nada en el objeto de errores y q se completen los datos para despachar

        if (!Object.getOwnPropertyNames(error).length && dog.name && dog.heightMin && dog.heightMax && dog.weightMin && dog.weightMax && dog.lifeSpan && dog.temperaments.length) {
            dispatch(postDog(dog))
            alert('Your doggie was successfully created 🐶')
            setDog({
                name: "",
                heightMin: "",
                heightMax: "",
                weightMin: "",
                weightMax: "",
                lifeSpan: "",
                image: "",
                temperaments: []
            })
            history.push('/home')
        } else {
            alert('You must complete all required fields')
        }
    }

    const handleDeleteTemperament = (e) => {
        setDog({
            ...dog,
            temperaments: dog.temperaments.filter(temp => temp !== e)
        })
    }

    return (
        <>
            <NavBar />
            <div className='div-form'>

                <h3 className='my-2'>Create a New Doggie!</h3>
                <form className='form text-start' onSubmit={e => handleSubmit(e)}>
                    <label>Name</label>
                    <input type='text' name='name' value={dog.name} onChange={e => handleChange(e)} />
                    {error.name && (<p className='error text-warning mt-1'>{error.name}</p>)}
                    <label>Minimum Height (centimeters in numbers):</label>
                    <input type='text' name='heightMin' value={dog.heightMin} onChange={e => handleChange(e)} />
                    {error.heightMin && (<p className='error text-warning mt-1'>{error.heightMin}</p>)}
                    <label>Maximum Height (centimeters in numbers):</label>
                    <input type='text' name='heightMax' value={dog.heightMax} onChange={e => handleChange(e)} />
                    {error.heightMax && (<p className='error text-warning mt-1'>{error.heightMax}</p>)}
                    <label>Minimum Weight (kilograms in numbers):</label>
                    <input type='text' name='weightMin' value={dog.weightMin} onChange={e => handleChange(e)} />
                    {error.weightMin && (<p className='error text-warning mt-1'>{error.weightMin}</p>)}
                    <label>Maximum Weight (kilograms in numbers):</label>
                    <input type='text' name='weightMax' value={dog.weightMax} onChange={e => handleChange(e)} />
                    {error.weightMax && (<p className='error text-warning mt-1'>{error.weightMax}</p>)}
                    <label>Life Span (years in numbers):</label>
                    <input type='text' name='lifeSpan' value={dog.lifeSpan} onChange={e => handleChange(e)} />
                    {error.lifeSpan && (<p className='error text-warning mt-1'>{error.lifeSpan}</p>)}

                    <label>Temperaments</label>
                    <select name='temperaments' onChange={e => handleSelect(e)}>
                        <option>Select</option>
                        {temperaments?.sort((a, b) => {
                            if ((a.name < b.name) || (a.name || b.name) === '') return -1
                            if (a.name > b.name) return 1
                            return 0
                        }).map((temp) => {
                            return (
                                <option key={temp.id} value={temp.name}>{temp.name}</option>)
                        })
                        }
                    </select>

                    {/* <span>{dog.temperaments.map(temp => temp + ', ')}</span> */}
                    <Row xs={1} md={3} className="g-1 mt-1">
                        {dog.temperaments.map(el => {
                            return (

                                <Col>
                                    <div className='container text-center' key={el}>
                                        <div>
                                            <p><strong>{el}</strong></p></div>
                                        <div>
                                            <button onClick={() => handleDeleteTemperament(el)} className='x' >x</button>
                                        </div>
                                    </div>
                                </Col>
                            )
                        })}</Row>

                    <label>Image</label>
                    <input type='text' name='image' value={dog.image} placeholder="Example: https://..." onChange={e => handleChange(e)}></input>
                    {error.image && (<p className='error'>{error.image}</p>)}

                    <fieldset>
                        <button type='submit' className='btn-form-create' disabled={!Object.getOwnPropertyNames(error).length ? false : true}>Create Dog</button>
                    </fieldset>
                    <fieldset>
                        <Link to='/home'>
                            <button className='btn-form-back'>Go back</button>
                        </Link>
                    </fieldset>
                </form>
            </div>
            <Footer />
            </>
    )
}
