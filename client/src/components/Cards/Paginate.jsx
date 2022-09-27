import React from 'react';
import './Paginate.css';
import Pagination from 'react-bootstrap/Pagination';

export default function Paginate({ dogsPerPage, allDogs, paginate, currentPage, setCurrentPage }) {
    
    const pageNumbers = [];
    for (let i = 0; i < Math.ceil(allDogs / dogsPerPage); i++) {
        pageNumbers.push(i +1 );
    }

    const previousPage = () => {
        setCurrentPage(currentPage - 1)
    }

    const nextPage = () => {
        setCurrentPage(currentPage + 1)
    }

    return (
        <div>
            <Pagination id='paginate' className='mt-4 justify-content-center flex-wrap'>
                <Pagination.Prev onClick={previousPage} disabled={currentPage === 1}/>

                {pageNumbers.length > 1 && 
                    pageNumbers.map(number => (
                        <Pagination.Item onClick={() => paginate(number)} className={number !== currentPage ? 'inactive' : null} active={number === currentPage}>{number}</Pagination.Item>
                    ))
                }
               
                <Pagination.Next  onClick={nextPage} disabled={currentPage === pageNumbers.length} />
            
            </Pagination>
        </div>
    )
}