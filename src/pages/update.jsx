import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useLocation } from "react-router"
import axios from "axios"
import Swal from "sweetalert2"

import Loading from "../components/loading"

function Update() {
  const navigate = useNavigate()
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

  const [email, setEmail] = useState(data?.email)
  const [phoneNumber, setPhoneNumber] = useState(data?.phone_number)
  const [fullName, setFullName] = useState(data?.full_name)
  const [dob, setDob] = useState(data?.dob)
  const [pob, setPob] = useState(data?.pob)
  const [gender, setGender] = useState(data?.gender)
  const [yearsExp, setYearsExp] = useState(data?.year_exp)
  const [lastSalary, setLastSalary] = useState(data?.last_salary)

  if (loading) {
    return <Loading />
  }

  const handleUpdate = () => {
    setLoading(true)
    const payload = {
      email,
      phone_number: phoneNumber,
      full_name: fullName,
      dob,
      pob,
      gender,
      year_exp: yearsExp,
      last_salary: lastSalary,
    }
    axios
      .patch(
        `${process.env.REACT_APP_API_URL}/candidate/${data?.candidate_id}`,
        payload
      )
      .then((res) => {
        setLoading(false)
        Swal.fire({
          title: "Success!",
          text: res?.data?.message,
          icon: "success",
        }).then(() => {
          navigate("/")
        })
      })
      .catch((err) => {
        console.log(err)
        Swal.fire({
          title: "Error!",
          text: err?.response?.data?.message ?? "Something wrong in our App!",
          icon: "error",
        }).finally(() => {
          setLoading(false)
        })
      })
  }

  return (
    <>
      <div className="container my-5">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <Link className="btn btn-primary btn-sm" to={"/"}>
              Back
            </Link>
            <h1 className="text-center">Update Candidate</h1>
            <div className="form-floating mb-3">
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="name@example.com"
                defaultValue={data?.email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label for="email">Email address</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="number"
                className="form-control"
                id="phone_number"
                placeholder="Phone Number"
                defaultValue={data?.phone_number}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
              <label for="phone_number">Phone Number</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="full_name"
                placeholder="Fullname"
                defaultValue={data?.full_name}
                onChange={(e) => setFullName(e.target.value)}
              />
              <label for="full_name">Fullname</label>
            </div>
            <div className="row mb-3">
              <div className="col">
                <div className="form-floating ">
                  <input
                    type="date"
                    className="form-control"
                    id="dob"
                    placeholder="Date of Birth"
                    defaultValue={data?.dob?.split("T")[0]}
                    onChange={(e) => setDob(e.target.value)}
                  />
                  <label for="dob">Date of Birth</label>
                </div>
              </div>
              <div className="col">
                <div className="form-floating">
                  <input
                    type="text"
                    className="form-control"
                    id="pob"
                    placeholder="Place of Birth"
                    defaultValue={data?.pob}
                    onChange={(e) => setPob(e.target.value)}
                  />
                  <label for="pob">Place of Birth</label>
                </div>
              </div>
            </div>
            <div className="form-floating mb-3">
              <select
                className="form-select"
                id="gender"
                onChange={(e) => setGender(e.target.value)}
              >
                <option>Select gender</option>
                <option
                  value="M"
                  selected={data?.gender === "M" ? "selected" : ""}
                >
                  Male
                </option>
                <option
                  value="F"
                  selected={data?.gender === "F" ? "selected" : ""}
                >
                  Female
                </option>
              </select>
              <label for="gender">Select gender</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="number"
                className="form-control"
                id="year_exp"
                placeholder="Year(s) of Experience"
                defaultValue={data?.year_exp}
                onChange={(e) => setYearsExp(e.target.value)}
              />
              <label for="year_exp">Year(s) of Experience</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="number"
                className="form-control"
                id="last_salary"
                placeholder="Last Salary"
                defaultValue={data?.last_salary}
                onChange={(e) => setLastSalary(e.target.value)}
              />
              <label for="last_salary">Last Salary</label>
            </div>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleUpdate}
            >
              {loading ? "loading..." : "Submit"}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Update
