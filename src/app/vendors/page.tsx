import React from 'react'
import {redirect} from 'next/navigation'
import Database from '@/database/db'
import InventoryNavbar from '@/components/navbar'

export default async function VendorList() {
	//redirect("login");
	
	const db = new Database("sioos_db");
	var vendors = await db.getAll("vendors");
	
	return (
		<div className="flex flex-col h-screen items-center font-[family-name:var(--font-geist-sans)]">
			<InventoryNavbar />
			<h2 className="text-center mb-4">Vendors</h2>
			<main className="h-full overflow-auto">
				<a className="button" href="vendors/edit?new">Add Vendor</a>
				<table className="mt-2">
					<thead>
						<tr>
							<th>Vendor</th>
							<th>Email</th>
							<th>Phone #</th>
							<th></th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{await vendors.map(async (vendor, index) => (
							<tr key={index}>
								<td>{vendor["name"]}</td>
								<td>{vendor["contact_email"]}</td>
								<td>{vendor["phone"]}</td>
								<td><a className="button" href={"vendors/edit?id=" + vendor["_id"].toString()}>Edit</a></td>
								<td><a className="button red" href={"vendors/delete?id=" + vendor["_id"].toString()}>Delete</a></td>
							</tr>
						))}
					</tbody>
				</table>
			</main>
		</div>
	);
}
