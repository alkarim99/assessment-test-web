import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useLocation } from "react-router"
import axios from "axios"

import Loading from "../components/loading"

function Detail() {
  const location = useLocation()
  const id = location.pathname.split("/")[2]
  const [data, setData] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    axios
      .get(`${process.env.REACT_APP_API_URL}/candidate/${id}`)
      .then((res) => {
        setData(res?.data?.result[0])
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  if (loading) {
    return <Loading />
  }

  return (
    <>
      <div className="container my-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <Link className="btn btn-primary btn-sm" to={"/"}>
              Back
            </Link>
            <h1 className="text-center">Detail Candidate</h1>
            <p>Email : {data?.email}</p>
            <p>Phone Number : {data?.phone_number}</p>
            <p>Fullname : {data?.full_name}</p>
            <p>
              Place, Date of Birth : {data?.pob}, {data?.dob?.split("T")[0]} (
              {new Date().getFullYear() - data?.dob?.split("-")[0]} years)
            </p>
            <p>Gender : {data?.gender == "M" ? "Male" : "Female"}</p>
            <p>Year(s) of Experience : {data?.year_exp}</p>
            <p>Last Salary : {data?.last_salary}</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Detail
