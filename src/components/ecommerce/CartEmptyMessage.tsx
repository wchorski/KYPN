import Link from "next/link";

export function CartEmptyMessage() {
	return (
		<p>
			Cart is empty. View the <Link href={`/shop`}>Shop</Link> or checkout some{" "}
			<Link href={`/events`}>Events</Link>
		</p>
	)
}