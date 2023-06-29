import { useParams } from "react-router-dom"

export default function AuthLanding() {
  const {authCode} = useParams()
  console.log(authCode)
  return (
    <>
      <div className="yo"><p>hi 2</p></div>
    </>
  )
}