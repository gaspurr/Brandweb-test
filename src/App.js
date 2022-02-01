import React from "react"
import { Routes, BrowserRouter, Route } from "react-router-dom"
import HomePage from "./Components/MainPage"
import Navbar from "./Components/Navbar"
import DetailedView from "./Components/DetailedView"

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
          <Routes>
            <Route exact path="/" component={<HomePage />} element={<HomePage />} />
            <Route exact path="/game" component={<DetailedView />} element={<DetailedView />} />
          </Routes>
      </BrowserRouter>
    </>

  )
}

export default App;
