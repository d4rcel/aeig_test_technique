import "../public/scss/main.scss";
import routes from "./routes/routes";
import { RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast"

if (typeof window !== "undefined") {
  import("bootstrap");
}

function App() {

  return (
    <>
      <RouterProvider router={routes}/>
      <Toaster position="top-center" reverseOrder={true} />
    </>
  )
}

export default App
