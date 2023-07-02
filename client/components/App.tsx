import { Outlet } from 'react-router-dom'
import { sendBeep } from '../apis/beep'
import { useSearchParams } from 'react-router-dom'
import { useEffect } from 'react'
import { google } from 'googleapis'

function App() {
  const search = new URLSearchParams(window.location.hash.substring(1))
  const token = search.get('access_token')
  console.log(search)


  return (
    <>
      <button onClick={sendBeep}>beep</button>
      <Outlet />
    </>
  )
}

export default App