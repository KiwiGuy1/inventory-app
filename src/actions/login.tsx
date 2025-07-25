"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Database from "@/database/db"; // adjust path if needed

export async function LoginHandler(formData: FormData) {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  if (!username || !password) {
    redirect("/login?error=Missing%20credentials");
  }

  const db = new Database("sioos_db"); // replace with your DB name

  // Query user with matching username and password (plain text)
  const user = await db
    .getAll("users")
    .then((users) =>
      users.find((u) => u.username === username && u.password === password)
    );

  if (!user) {
    redirect("/login?error=Invalid%20credentials");
  }

  // Set auth cookie (basic)
  const cookieStore = await cookies();
  cookieStore.set(
    "user",
    JSON.stringify({ id: user._id.toString(), role: user.role })
  );

  redirect("/");
}
