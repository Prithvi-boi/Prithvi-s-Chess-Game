import { useState } from "react"

import Navigation from "./Features/Navigation"
import HomePage from "./Pages/HomePage"
import ProfilePage from "./Pages/ProfilePage"
import RatingPage from "./Pages/RatingPage"

import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./Pages/LoginPage"

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<Home_Pages />} />
      </Routes>

    </BrowserRouter>
  )
}

function Home_Pages() {
  const [Nav, setNav] = useState("game")
  const Page = () => {
    switch (Nav.toLocaleLowerCase()) {
      case "game": return <HomePage />;
      case "profile": return <ProfilePage />;
      case "ratings": return <RatingPage />
      default: return <HomePage />;
    }
  }
  return (
    <>
      {/* Heading */}
      <Navigation option={Nav} NavCallback={(val) => setNav(val)} />
      {Page()}
    </>
  )
}


export default App
