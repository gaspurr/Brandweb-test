import React from "react"
import { Routes, BrowserRouter, Route } from "react-router-dom"
import HomePage from "./Components/MainPage"

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </>

  )
}

export default App;
