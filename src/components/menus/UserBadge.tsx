import { ImageDynamic } from "@components/elements/ImageDynamic"
import type { User } from "@ks/types"
import styles from "@styles/menus/userbadge.module.css"
import Link from "next/link"
import Image from "next/image"
import { IconAccountBox } from "@lib/useIcons"
import type { CSSProperties } from "react"

export function UserBadge({ user, style }: { user: User, style?:CSSProperties }) {
	return (
		<div className={styles.user_badge} style={style}>
			<figure>
				{user.image ? (
					<Image
						src={user.image}
						alt={"user avatar"}
						width={20}
						height={20}
						unoptimized={true}
					/>
				) : (
					<IconAccountBox />
				)}
			</figure>

			<div className="content">
				<Link href={`/users/${user?.id}`} target={"_blank"}>
					{" "}
					{user?.name} {user?.nameLast}
				</Link>
				<br />
				<small>{user?.email}</small>
			</div>
		</div>
	)
}
