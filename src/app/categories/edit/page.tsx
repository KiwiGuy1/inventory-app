import React from 'react'
import {AddCategory, UpdateCategory} from '@/actions/update-category'
import Database from '@/database/db'

export default async function EditCategory({params, searchParams}) {
	let urlArgs = await searchParams;
	
	let isCreating = "new" in urlArgs;
	if (!isCreating && !("id" in urlArgs)) {
		throw new Error("No ID for category specified");
	}
	
	const db = new Database("sioos_db");
	
	let data = null;
	if (!isCreating) {
		data = await db.getByID("categories", urlArgs["id"]);
	}
	
	return (
		<div className="flex flex-col h-screen items-center font-[family-name:var(--font-geist-sans)]">
			<h2 className="text-center mb-4">{isCreating ? "Add" : "Edit"} Category</h2>
			<main className="grid h-full items-center justify-items-center">
				<form action={isCreating ? AddCategory : UpdateCategory}>
					<input type="hidden" name="id" value={isCreating ? "" : data["_id"].toString()} readOnly />
					<label htmlFor="name">Name</label>
					<input type="text" name="name" defaultValue={isCreating ? "" : data["name"]} />
					<label htmlFor="description">Description</label>
					<textarea name="description" defaultValue={isCreating ? "" : data["description"]} />
					<div className="flex justify-center gap-x-4">
						<button type="submit">Submit</button>
						<a className="button red" href="/categories">Cancel</a>
					</div>
				</form>
			</main>
		</div>
	);
}
