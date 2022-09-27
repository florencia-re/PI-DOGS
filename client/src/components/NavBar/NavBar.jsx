import React from "react";
import { Link } from "react-router-dom";
import SearchBar from '../NavBar/SearchBar';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

export default function NavBar() {
    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Navbar.Brand className="mx-2" href="#">Doggie App 🐶</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
                <Nav
                    className="ms-auto my-2 gap-2 gap-lg-0 my-lg-0"
                    style={{ maxHeight: '100px' }}
                    navbarScroll
                >
                    <SearchBar />
                    <Link to='/create' style={{ textDecoration: 'none' }}>
                        <Nav.Link href='/create' className="btn btn-outline-secondary ms-2 me-2 text-white">Create a New Dog</Nav.Link>
                    </Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}