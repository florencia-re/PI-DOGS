import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { getTemperaments, postDog } from '../../redux/actions';
import { Link, useHistory } from "react-router-dom";
import './CreateDog.css';

function validate(dog){
    let error = {}
    if(!dog.name){
        error.name = 'Name of the breed is required'
    }
    else if (dog.name.length > 30) {
        error.name = 'The name is too long';
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
    else if (!dog.life_span) {
        error.life_span = 'Life span is required';
    }
    else if (isNaN(parseInt(dog.life_span))) {
        error.life_span = 'Life span should be a number';
    }
    else if (dog.life_span > 30) {
        error.life_span = 'Put an appropriate age, the dogs don´t live more than 30 years';
    }
    else if (dog.life_span <= 1) {
        error.life_span = 'The life span don´t be less than 1 year';
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
          setDog({
            ...dog,
            temperaments: [...dog.temperaments, e.target.value]
        })  
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(dog)
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
    }

    const handleDeleteTemperament = (e) => {
        setDog({
            ...dog,
            temperaments: dog.temperaments.filter(temp => temp !== e)
        })
    }

    return (
        <div className='div-form'>
            <h3>Create a New Doggie!</h3>
            <form className='form' onSubmit={e => handleSubmit(e)}>
                <label>Name</label>
                <input type='text' name='name' value={dog.name} onChange={e => handleChange(e)} />
                {error.name && (<p className='error'>{error.name}</p>)}
                <label>Minimum Height (centimeters in numbers):</label>
                <input type='number' name='heightMin' value={dog.heightMin} onChange={e => handleChange(e)} />
                {error.heightMin && (<p className='error'>{error.heightMin}</p>)}
                <label>Maximum Height (centimeters in numbers):</label>
                <input type='number' name='heightMax' value={dog.heightMax} onChange={e => handleChange(e)} />
                {error.heightMax && (<p className='error'>{error.heightMax}</p>)}
                <label>Minimum Weight (kilograms in numbers):</label>
                <input type='number' name='weightMin' value={dog.weightMin} onChange={e => handleChange(e)} />
                {error.weightMin && (<p className='error'>{error.weightMin}</p>)}
                <label>Maximum Weight (kilograms in numbers):</label>
                <input type='number' name='weightMax' value={dog.weightMax} onChange={e => handleChange(e)} />
                {error.weightMax && (<p className='error'>{error.weightMax}</p>)}
                <label>Life Span (years in numbers):</label>
                <input type='number' name='lifeSpan' value={dog.lifeSpan} onChange={e => handleChange(e)} />
                {error.lifeSpan && (<p className='error'>{error.lifeSpan}</p>)}

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

                {dog.temperaments.map(el => {
                    return (
                        <div className='temp-select' key={el}>
                            <div>
                                <p className='temp-p'><strong>{el}</strong></p></div>
                            <div>
                                <button onClick={() => handleDeleteTemperament(el)} className='x' >x</button>
                            </div>
                        </div>
                    )
                })}

                <label>Image</label>
                <input type='file' name='image' value={dog.image} onChange={e => handleChange(e)}></input>
                <fieldset>
                    <button type='submit' className='btn-form-create'>Create Dog</button>
                </fieldset>
                <fieldset>
                    <Link to='/home'>
                        <button className='btn-form-back'>Go back</button>
                    </Link>
                </fieldset>
            </form>
        </div>
    )
}

//onChange={handleSelect}