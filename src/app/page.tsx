import { redirect } from "next/navigation";
import { isLoggedIn } from "@/lib/auth"; // ✅ import it

export default async function Home() {
  if (await isLoggedIn()) {
    redirect("/products"); // ✅ redirect if user is logged in
  }

  return <h1>Please log in to continue.</h1>; // or your login page fallback
}
