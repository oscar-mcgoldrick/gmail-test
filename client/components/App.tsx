import { Outlet } from "react-router-dom"
import { sendBeep } from "../apis/beep"

function App() {

  async function handleBeep() {
    const url = await sendBeep()
    console.log(url)
    window.location.href = url
  }
  return (
    <>
      <button onClick={handleBeep}>beep</button>
      <Outlet />
    </>
  )
}

export default App
