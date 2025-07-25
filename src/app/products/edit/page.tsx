import React from 'react'
import Database from '@/database/db'
import {AddProduct, UpdateProduct} from '@/actions/update-product'

export default async function EditProduct({params, searchParams}) {
	let urlArgs = await searchParams;
	
	let isCreating = "new" in urlArgs;
	if (!isCreating && !("id" in urlArgs)) {
		throw new Error("No ID for product specified");
	}
	
	const db = new Database("sioos_db");
	let categories = await db.getAll("categories");
	let vendors = await db.getAll("vendors");
	
	let data = null;
	if (!isCreating) {
		data = await db.getByID("products", urlArgs["id"]);
	}
	
	return (
		<div className="flex flex-col h-screen items-center font-[family-name:var(--font-geist-sans)]">
			<h2 className="text-center mb-4">{isCreating ? "Add" : "Edit"} Product</h2>
			<main className="grid h-full items-center justify-items-center">
				<form action={isCreating ? AddProduct : UpdateProduct}>
					<input type="hidden" name="id" value={isCreating ? "" : data["_id"].toString()} readOnly />
					<label htmlFor="name">Name</label>
					<input type="text" name="name" defaultValue={isCreating ? "" : data["name"]} />
					<label htmlFor="category_id">Category</label>
					<select name="category_id" defaultValue={isCreating ? "" : data["category_id"].toString()}>
						<option value="">---</option>
						{categories.map((category, index) => (<option key={index} value={category["_id"].toString()}>{category["name"]}</option>))}
					</select>
					<label htmlFor="vendor_id">Vendor</label>
					<select name="vendor_id" defaultValue={isCreating ? "" : data["vendor_id"].toString()}>
						<option value="">---</option>
						{vendors.map((vendor, index) => (<option key={index} value={vendor["_id"].toString()}>{vendor["name"]}</option>))}
					</select>
					<label htmlFor="price">Price</label>
					<input type="text" name="price" defaultValue={isCreating ? "0.00" : data["price"]} />
					<label htmlFor="stock_quantity">Quantity In Stock</label>
					<input type="number" name="stock_quantity" placeholder="0" min="0" defaultValue={isCreating ? "0" : data["stock_quantity"]} />
					<label htmlFor="barcode">Barcode</label>
					<input type="text" name="barcode" defaultValue={isCreating ? "" : data["barcode"]} />
					<div className="flex justify-center gap-x-4">
						<button type="submit">Submit</button>
						<a className="button red" href="/products">Cancel</a>
					</div>
				</form>
			</main>
		</div>
	);
}
