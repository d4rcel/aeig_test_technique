import "../public/scss/main.scss";

if (typeof window !== "undefined") {
  import("bootstrap");
}

function App() {

  return (
    <>
      <div className="container">
        <button type="button" className="btn btn-primary">Primary</button>
      </div>
    </>
  )
}

export default App
