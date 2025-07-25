'use server'

import { redirect } from 'next/navigation'

export async function LoginHandler(formData: FormData) {
	redirect("/");
}