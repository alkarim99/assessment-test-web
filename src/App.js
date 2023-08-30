import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.min.js"

import { createBrowserRouter, RouterProvider } from "react-router-dom"

import Index from "./pages"
import Create from "./pages/create"
import Detail from "./pages/detail"
import Update from "./pages/update"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
  },
  {
    path: "/create",
    element: <Create />,
  },
  {
    path: "/detail/:id",
    element: <Detail />,
  },
  {
    path: "/update/:id",
    element: <Update />,
  },
])

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
