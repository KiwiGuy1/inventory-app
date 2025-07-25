import React from 'react'
import Database from '@/database/db'
import {DeleteProduct} from '@/actions/update-product'

export default async function ConfirmDeleteProduct({params, searchParams}) {
	let urlArgs = await searchParams;
	
	if (!("id" in urlArgs)) {
		throw new Error("No ID for product specified");
	}
	
	const db = new Database("sioos_db");
	var product = await db.getByID("products", urlArgs["id"]);
	
	return (
		<div className="flex flex-col h-screen items-center font-[family-name:var(--font-geist-sans)]">
			<h2 className="text-center mb-4">Confirm Deletion</h2>
			<main className="h-full">
				<form action={DeleteProduct}>
					<input type="hidden" name="id" value={product["_id"].toString()} readOnly />
					<p>Are you sure you want to delete the product '{product["name"]}'?</p>
					<div className="flex justify-center gap-x-6">
						<button type="submit">Yes</button>
						<a className="button red" href="/products">No</a>
					</div>
				</form>
			</main>
		</div>
	);
}
