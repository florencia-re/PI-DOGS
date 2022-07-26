import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getDogs } from "../../redux/actions";


export default function SearchBar() {

    const dispatch = useDispatch();
    let [name, setName] = useState('')

    function handleInputChange (e) {
        e.preventDefault()
        setName(e.target.value)
        console.log(name)
    }

    function handleSubmit (e) {
        e.preventDefault()
        var search = getDogs(name)
        dispatch(search)
        setName('')
        console.log(name)
    }

    return (
        <div>
            <h3>Search by breed:</h3>
            <input
                type="text"
                placeholder="Search 🐶"
                onChange={e => handleInputChange(e)}
                onKeyPress={e => e.key === 'Enter' && handleSubmit(e)}
                value={name}
            />
            <button type='Submit' onClick={e => handleSubmit(e)}>Search</button>
            
        </div>
    )
}