import React from 'react'
import {redirect} from 'next/navigation'
import Database from '@/database/db'
import InventoryNavbar from '@/components/navbar'

export default async function ProductList() {
	//redirect("login");
	
	const db = new Database("sioos_db");
	var products = await db.getAll("products");
	var categoryByID = await db.mapByID("categories");
	var vendorByID = await db.mapByID("vendors");
	
	return (
		<div className="flex flex-col h-screen items-center font-[family-name:var(--font-geist-sans)]">
			<InventoryNavbar />
			<h2 className="text-center mb-4">Products</h2>
			<main className="h-full overflow-auto">
				<a className="button" href="products/edit?new">Add Product</a>
				<table className="mt-2">
					<thead>
						<tr>
							<th>Product</th>
							<th>Category</th>
							<th>Vendor</th>
							<th>Price</th>
							<th>In Stock</th>
							<th>Barcode</th>
							<th>Last Updated</th>
							<th></th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{await products.map(async (product, index) => {
							let category = categoryByID[product["category_id"]];
							let categoryName = category === undefined ? "" : category["name"];
							
							let vender = vendorByID[product["vendor_id"]];
							let vendorName = vender === undefined ? "" : vender["name"];
							
							return (
								<tr key={index}>
									<td>{product["name"]}</td>
									<td>{categoryName}</td>
									<td>{vendorName}</td>
									<td>${product["price"].toFixed(2)}</td>
									<td className="text-right">{product["stock_quantity"]}</td>
									<td><code>{product["barcode"]}</code></td>
									<td>{product["last_updated"].toLocaleString()}</td>
									<td><a className="button" href={"products/edit?id=" + product["_id"].toString()}>Edit</a></td>
									<td><a className="button red" href={"products/delete?id=" + product["_id"].toString()}>Delete</a></td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</main>
		</div>
	);
}
