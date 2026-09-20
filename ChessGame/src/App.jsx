import Navigation from "./Features/Navigation"
import HomePage from "./Pages/HomePage"
import ProfilePage from "./Pages/ProfilePage"

import { useState } from "react"

function App() {
  const [Nav, setNav] = useState("game")
  const Page = () => {
    switch (Nav.toLocaleLowerCase()) {
      case "game": return <HomePage/>;
      case "profile": return <ProfilePage />;
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
