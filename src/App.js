import React from "react"
import { Routes, BrowserRouter, Route } from "react-router-dom"
import HomePage from "./Components/MainPage"
import Navbar from "./Components/Navbar"

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
          <Routes>
            <Route exact path="/" component={<HomePage />} element={<HomePage />} />
          </Routes>
      </BrowserRouter>
    </>

  )
}

export default App;
