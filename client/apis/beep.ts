import { redirect, useNavigate } from "react-router-dom";
import request from "superagent";


export async function sendBeep() {
  console.log('api')
  const x = await request.get("http://localhost:3000/api/v1/beep")
  window.location.replace(x.text)
}

export async function sendCode(code: string) {
  await request.post('api/v1/beep').send({code})
}