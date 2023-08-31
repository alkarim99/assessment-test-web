import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import Swal from "sweetalert2"

function Create() {
  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [fullName, setFullName] = useState("")
  const [dob, setDob] = useState("")
  const [pob, setPob] = useState("")
  const [gender, setGender] = useState("")
  const [yearsExp, setYearsExp] = useState("")
  const [lastSalary, setLastSalary] = useState("")
  const [loading, setLoading] = useState(false)

  const handleCreate = () => {
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
      .post(`${process.env.REACT_APP_API_URL}/candidate`, payload)
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
        <h1 className="text-center">Create New Candidate</h1>
        <div className="row justify-content-center">
          <div className="col-md-8">
            <Link className="btn btn-primary btn-sm mb-3" to={"/"}>
              Back
            </Link>
            <div className="form-floating mb-3">
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="name@example.com"
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
                <option value="M">Male</option>
                <option value="F">Female</option>
              </select>
              <label for="gender">Select gender</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="number"
                className="form-control"
                id="year_exp"
                placeholder="Year(s) of Experience"
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
                onChange={(e) => setLastSalary(e.target.value)}
              />
              <label for="last_salary">Last Salary (Rp)</label>
            </div>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleCreate}
            >
              {loading ? "loading..." : "Submit"}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Create
