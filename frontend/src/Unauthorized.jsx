import React from 'react'
import { Link } from 'react-router-dom'

function Unauthorized() {
  return (
    <div className="d-flex align-items-center justify-content-center vh-100">
            <div className="text-center">
                <h1 className="display-1 fw-bold">401</h1>
                <p className="fs-3"> <span className="text-danger">Oops!</span> Unauthorized.</p>
                <p className="lead">
                    You need to have admin controls to access this page.<br />

                    <b>Please contact: </b> <span className="" style={{ color: 'red' }}>AmanAnand....</span>

                  </p>
                <Link to="/" className="btn btn-primary">Go Home</Link>
            </div>
        </div>
  )
}

export default Unauthorized