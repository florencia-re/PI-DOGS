import React from 'react';
import './Paginate.css'

export default function Paginate({ dogsPerPage, allDogs, paginate, currentPage, setCurrentPage }) {
    
    const pageNumbers = [];
    for (let i = 0; i < Math.ceil(allDogs / dogsPerPage); i++) {
        pageNumbers.push(i +1 );
    }
    //console.log(pageNumbers)

    const previousPage = () => {
        setCurrentPage(currentPage - 1)
    }

    const nextPage = () => {
        setCurrentPage(currentPage + 1)
    }

    return (
        <div>
            <ul className='paginado'>
                <button className='btn' onClick={previousPage} disabled={currentPage === 1}>Previous</button>

                {pageNumbers.length > 1 &&
                    pageNumbers.map(number => (
                        <li key={number}>
                            <button onClick={() => paginate(number)}>{number}</button>
                        </li>
                    ))}

                <button className='btn' onClick={nextPage} disabled={currentPage === pageNumbers.length}>Next</button>
            </ul>
        </div>
    )
}