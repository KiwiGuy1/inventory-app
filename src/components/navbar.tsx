export default function InventoryNavbar() {
	return (
		<div className="navbar">
			<a href="/products">Products</a>
			<a href="/categories">Categories</a>
			<a href="/vendors">Vendors</a>
			<a className="right" href="/logoff">Log Off</a>
		</div>
	);
}