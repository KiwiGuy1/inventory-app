import React from 'react'
import Database from '@/database/db'
import {DeleteVendor} from '@/actions/update-vendor'

export default async function ConfirmDeleteVendor({params, searchParams}) {
	let urlArgs = await searchParams;
	
	if (!("id" in urlArgs)) {
		throw new Error("No ID for vendor specified");
	}
	
	const db = new Database("sioos_db");
	var vendor = await db.getByID("vendors", urlArgs["id"]);
	
	return (
		<div className="flex flex-col h-screen items-center font-[family-name:var(--font-geist-sans)]">
			<h2 className="text-center mb-4">Confirm Deletion</h2>
			<main className="h-full">
				<form action={DeleteVendor}>
					<input type="hidden" name="id" value={vendor["_id"].toString()} readOnly />
					<p>Are you sure you want to delete the vendor '{vendor["name"]}'?</p>
					<div className="flex justify-center gap-x-6">
						<button type="submit">Yes</button>
						<a className="button red" href="/vendors">No</a>
					</div>
				</form>
			</main>
		</div>
	);
}
