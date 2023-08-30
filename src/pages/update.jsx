import React from "react"
import { Link } from "react-router-dom"
import { useLocation } from "react-router"
import axios from "axios"
import Swal from "sweetalert2"

function Update() {
  const location = useLocation()
  const id = location.pathname.split("/")[2]
  return (
    <>
      <Link className="btn btn-primary btn-sm" to={"/"}>
        Back
      </Link>
      <p>{id}</p>
      <h1>Update Candidate</h1>
    </>
  )
}

export default Update
