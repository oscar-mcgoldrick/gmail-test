import { useParams } from "react-router-dom"
import { useEffect } from "react"
import { sendCode } from "../apis/beep"

export default function AuthLanding() {
  const search = new URLSearchParams(window.location.search)
  const code = search.get('code')
  console.log(code)

  useEffect(() => {
    sendCode(code)
  },[])

  return (
    <>
      <div><p>hi</p></div>
    </>
  )
}