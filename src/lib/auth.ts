import { cookies } from "next/headers";
export async function isLoggedIn(): Promise<boolean> {
  const cookieStore = await cookies(); // 👈 use await
  const auth = cookieStore.get("user");
  return !!auth;
}
