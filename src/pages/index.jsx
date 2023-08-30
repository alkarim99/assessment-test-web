import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import Swal from "sweetalert2"

import Loading from "../components/loading"

function Index() {
  const [candidateList, setCandidateList] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/candidate`)
      .then((res) => {
        setCandidateList(res?.data?.results)
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
        <h1 className="text-center">List of Candidate</h1>
        <div className="row">
          <div className="col my-3">
            <Link className="btn btn-success btn-sm mb-3" to={"/create"}>
              New Candidate
            </Link>
            <table className="table text-center">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Date of Birth</th>
                  <th scope="col">Gender</th>
                  <th scope="col">Years of Experience</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {candidateList?.map((candidate, index) => {
                  return (
                    <>
                      <tr>
                        <th scope="row">{index + 1}</th>
                        <td>{candidate?.full_name}</td>
                        <td>
                          {candidate?.pob}, {candidate?.dob?.split("T")[0]}
                          <br />
                          {new Date().getFullYear() -
                            candidate?.dob?.split("-")[0]}{" "}
                          years
                        </td>
                        <td>{candidate?.gender == "M" ? "Male" : "Female"}</td>
                        <td>{candidate?.year_exp} year(s)</td>
                        <td>
                          <Link
                            className="badge text-bg-primary me-1 text-decoration-none"
                            to={`/detail/${candidate?.candidate_id}`}
                          >
                            Detail
                          </Link>
                          <Link
                            className="badge text-bg-warning me-1 text-decoration-none"
                            to={`/update/${candidate?.candidate_id}`}
                          >
                            Update
                          </Link>
                          <Link
                            className="badge text-bg-danger me-1 text-decoration-none"
                            to={`/delete/${candidate?.candidate_id}`}
                          >
                            Update
                          </Link>
                        </td>
                      </tr>
                    </>
                  )
                })}
              </tbody>
            </table>
          </div>
          <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-center">
              <li className="page-item">
                <a className="page-link" href="#">
                  Previous
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  1
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  2
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  3
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  Next
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  )
}

export default Index
