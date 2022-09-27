import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getDogs } from "../../redux/actions";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';

export default function SearchBar() {

    const dispatch = useDispatch();
    let [name, setName] = useState('')

    function handleInputChange (e) {
        e.preventDefault()
        setName(e.target.value)
        //console.log(name)
    }

    function handleSubmit (e) {
        e.preventDefault()
        var search = getDogs(name)
        dispatch(search)
        setName('')
        //console.log(name)
    }

    return (
        <>
            <Form className="d-flex">
            <FormControl
              type="search"
              placeholder="Search"
              className="me-1 ms-2"
              aria-label="Search"
              onChange={e => handleInputChange(e)}
              onKeyPress={e => e.key === 'Enter' && handleSubmit(e)}
              value={name}
            />
            
            <Button className="ms-2 me-2" variant="success" onClick={e => handleSubmit(e)}>Search</Button>
           
          </Form>
        </>
    )
}