import React from 'react'
import Database from '@/database/db'
import {AddVendor, UpdateVendor} from '@/actions/update-vendor'

export default async function EditVendor({params, searchParams}) {
	let urlArgs = await searchParams;
	
	let isCreating = "new" in urlArgs;
	if (!isCreating && !("id" in urlArgs)) {
		throw new Error("No ID for vendor specified");
	}
	
	const db = new Database("sioos_db");
	
	let data = null;
	if (!isCreating) {
		data = await db.getByID("vendors", urlArgs["id"]);
	}
	
	return (
		<div className="flex flex-col h-screen items-center font-[family-name:var(--font-geist-sans)]">
			<h2 className="text-center mb-4">{isCreating ? "Add" : "Edit"} Vendor</h2>
			<main className="grid h-full items-center justify-items-center">
				<form action={isCreating ? AddVendor : UpdateVendor}>
					<input type="hidden" name="id" value={isCreating ? "" : data["_id"].toString()} readOnly />
					<label htmlFor="name">Name</label>
					<input type="text" name="name" defaultValue={isCreating ? "" : data["name"]} />
					<label htmlFor="contact_email">Contact Email</label>
					<input type="email" name="contact_email" defaultValue={isCreating ? "" : data["contact_email"]} />
					<label htmlFor="phone">Phone #</label>
					<input type="phone" name="phone" defaultValue={isCreating ? "" : data["phone"]} />
					<div className="flex justify-center gap-x-4">
						<button type="submit">Submit</button>
						<a className="button red" href="/vendors">Cancel</a>
					</div>
				</form>
			</main>
		</div>
	);
}
