import React from "react"

function Loading() {
  return (
    <>
      <div className="row justify-content-center align-items-center vh-100 text-center">
        <div className="spinner-grow text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </>
  )
}

export default Loading
