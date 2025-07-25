import {redirect} from 'next/navigation'

export default async function Logoff() {
	return redirect("/login");
}
