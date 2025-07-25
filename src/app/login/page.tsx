'use client'

import React, { FormEvent } from 'react'
import {LoginHandler} from '@/actions/login'

export default function Home() {
	return (
		<div className="flex flex-col h-screen items-center font-[family-name:var(--font-geist-sans)]">
			<h1 className="text-center border-b">Login</h1>
			<main className="grid h-full items-center justify-items-center">
				<form action={LoginHandler}>
					<label htmlFor="username">Username</label>
					<input type="text" name="username" />
					<label htmlFor="password">Password</label>
					<input type="password" name="password" />
					<div className="flex justify-center">
						<button type="submit">Login</button>
					</div>
				</form>
			</main>
		</div>
	);
}
