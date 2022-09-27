import React from 'react';
import Spinner from 'react-bootstrap/Spinner';

function Loader() {
  return (
    <div className="container flex justify-content-center mt-4 height-100" style={{ height: '40vw' }}>
      <Spinner animation="grow" />
    </div>
  )
}

export default Loader;