import Link from "next/link"

export default function SignOutButton() {
	return (
		
			<Link
				type="button"
				// onClick={e => handleSignout()}
				href="/api/auth/signout"
			>
				Sign Out
			</Link>
		
	)
}
