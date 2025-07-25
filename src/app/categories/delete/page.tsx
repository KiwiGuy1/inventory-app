import React from 'react'
import Database from '@/database/db'
import {DeleteCategory} from '@/actions/update-category'

export default async function ConfirmDeleteCategory({params, searchParams}) {
	let urlArgs = await searchParams;
	
	if (!("id" in urlArgs)) {
		throw new Error("No ID for category specified");
	}
	
	const db = new Database("sioos_db");
	var category = await db.getByID("categories", urlArgs["id"]);
	
	return (
		<div className="flex flex-col h-screen items-center font-[family-name:var(--font-geist-sans)]">
			<h2 className="text-center mb-4">Confirm Deletion</h2>
			<main className="h-full">
				<form action={DeleteCategory}>
					<input type="hidden" name="id" value={category["_id"].toString()} readOnly />
					<p>Are you sure you want to delete the category '{category["name"]}'?</p>
					<div className="flex justify-center gap-x-6">
						<button type="submit">Yes</button>
						<a className="button red" href="/categories">No</a>
					</div>
				</form>
			</main>
		</div>
	);
}
