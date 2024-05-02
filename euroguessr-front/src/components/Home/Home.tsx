import { redirect } from "react-router-dom";

export default function Home() {
  redirect("/play");
  return redirect("/play");
}