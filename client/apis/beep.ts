import request from "superagent";

export async function sendBeep() {
  const res = await request.get("/api/v1/beep/")
  return res.text
}