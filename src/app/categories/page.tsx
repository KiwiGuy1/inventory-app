import React from 'react'
import {redirect} from 'next/navigation'
import Database from '@/database/db'
import InventoryNavbar from '@/components/navbar'

export default async function CategoryList() {
	//redirect("login");
	
	const db = new Database("sioos_db");
	var categories = await db.getAll("categories");
	
	return (
		<div className="flex flex-col h-screen items-center font-[family-name:var(--font-geist-sans)]">
			<InventoryNavbar />
			<h2 className="text-center mb-4">Categories</h2>
			<main className="h-full overflow-auto">
				<a className="button" href="categories/edit?new">Add Category</a>
				<table className="mt-2">
					<thead>
						<tr>
							<th>Category</th>
							<th>Description</th>
							<th></th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{await categories.map(async (category, index) => (
							<tr key={index}>
								<td>{category["name"]}</td>
								<td>{category["description"]}</td>
								<td><a className="button" href={"categories/edit?id=" + category["_id"].toString()}>Edit</a></td>
								<td><a className="button red" href={"categories/delete?id=" + category["_id"].toString()}>Delete</a></td>
							</tr>
						))}
					</tbody>
				</table>
			</main>
		</div>
	);
}
