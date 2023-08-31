import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import Swal from "sweetalert2"

import Loading from "../components/loading"
import NotFound from "../components/notFound"

function Index() {
  const navigate = useNavigate()
  const [currentPage, setCurrentPage] = useState(1)
  const [totalData, setTotalData] = useState("")
  const [totalPage, setTotalPage] = useState("")
  const [currentUrl, setCurrentUrl] = useState(
    `${process.env.REACT_APP_API_URL}/candidate`
  )
  const [candidateList, setCandidateList] = useState([])
  const [filter, setFilter] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    axios
      .get(currentUrl)
      .then((res) => {
        setCurrentPage(res?.data?.current_page)
        setTotalData(res?.data?.total_data)
        setTotalPage(res?.data?.total_page)
        setCandidateList(res?.data?.results)
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [currentUrl])

  const countPage = []
  for (let index = 1; index <= totalPage; index++) {
    countPage.push(index)
  }

  if (loading) {
    return <Loading />
  }

  if (!loading && !candidateList) {
    return <NotFound />
  }

  const handleFilter = (filter) => {
    console.log(filter)
    if (filter != "all") {
      setFilter(filter)
      setCurrentUrl(
        `${process.env.REACT_APP_API_URL}/candidate?filter=${filter}`
      )
    } else {
      setFilter("")
      setCurrentUrl(`${process.env.REACT_APP_API_URL}/candidate`)
    }
  }

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setLoading(true)
        axios
          .delete(`${process.env.REACT_APP_API_URL}/candidate/${id}`)
          .then((res) => {
            console.log(res)
            Swal.fire("Deleted!", "Candidate deleted successfully.", "success")
          })
          .catch((err) => {
            console.log(err)
          })
          .finally(() => {
            navigate("/")
            setLoading(false)
          })
      }
    })
  }

  return (
    <>
      <div className="container my-5">
        <h1 className="text-center">List of Candidate</h1>
        <div className="row">
          <div className="col my-3">
            <div className="row mb-3 justify-content-between align-items-center">
              <div className="col-md-3">
                <Link className="btn btn-success btn-sm" to={"/create"}>
                  New Candidate
                </Link>
              </div>
              <div className="col-md-3">
                <label for="filter" class="form-label">
                  Filter by year of experience (YoE)
                </label>
                <select
                  className="form-select"
                  id="filter"
                  onChange={(e) => {
                    handleFilter(e.target.value)
                  }}
                >
                  <option value="all" selected={filter == "" ? "selected" : ""}>
                    All
                  </option>
                  <option
                    value="junior"
                    selected={filter == "junior" ? "selected" : ""}
                  >
                    Junior (1-3 YoE)
                  </option>
                  <option
                    value="mid"
                    selected={filter == "mid" ? "selected" : ""}
                  >
                    Mid (3-5 YoE)
                  </option>
                  <option
                    value="senior"
                    selected={filter == "senior" ? "selected" : ""}
                  >
                    Senior ({">"}=5 YoE)
                  </option>
                </select>
              </div>
            </div>
            <table className="table text-center">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Date of Birth</th>
                  <th scope="col">Gender</th>
                  <th scope="col">Years of Experience</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {candidateList?.map((candidate) => {
                  return (
                    <>
                      <tr>
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
                          <button
                            className="badge text-bg-danger me-1 text-decoration-none border-0"
                            onClick={() => {
                              handleDelete(candidate?.candidate_id)
                            }}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    </>
                  )
                })}
              </tbody>
            </table>
          </div>
          {!filter && (
            <>
              <p className="text-center">
                10 data per page <br />
                Current page = {currentPage} <br />
                Total data = {totalData} candidate <br />
                Total page = {totalPage} pages <br />
              </p>
              <nav aria-label="Page navigation example">
                <ul className="pagination justify-content-center">
                  {currentPage != 1 && (
                    <li className="page-item">
                      <a
                        className="page-link"
                        href="#"
                        onClick={() => {
                          let page = currentPage - 1
                          setCurrentUrl(
                            `${process.env.REACT_APP_API_URL}/candidate?page=${page}`
                          )
                        }}
                      >
                        Previous
                      </a>
                    </li>
                  )}
                  {countPage.map((page) => {
                    return (
                      <>
                        <li className="page-item">
                          <a
                            className="page-link"
                            href="#"
                            onClick={() => {
                              setCurrentUrl(
                                `${process.env.REACT_APP_API_URL}/candidate?page=${page}`
                              )
                            }}
                          >
                            {page}
                          </a>
                        </li>
                      </>
                    )
                  })}
                  {currentPage != totalPage && (
                    <li className="page-item">
                      <a
                        className="page-link"
                        href="#"
                        onClick={() => {
                          let page = currentPage + 1
                          setCurrentUrl(
                            `${process.env.REACT_APP_API_URL}/candidate?page=${page}`
                          )
                        }}
                      >
                        Next
                      </a>
                    </li>
                  )}
                </ul>
              </nav>
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default Index
