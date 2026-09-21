import Navigation from "./Features/Navigation"
import HomePage from "./Pages/HomePage"
import ProfilePage from "./Pages/ProfilePage"
import RatingPage from "./Pages/RatingPage"

import { useState } from "react"

function App() {
  const [Nav, setNav] = useState("ratings")
  const Page = () => {
    switch (Nav.toLocaleLowerCase()) {
      case "game": return <HomePage/>;
      case "profile": return <ProfilePage />;
      case "ratings": return <RatingPage />
      default:return <HomePage/>;
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
