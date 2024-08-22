import type { ReactNode } from "react"

type Props =
	| {
			children: ReactNode
			citeAuthor?: string
      citeLink?:string
	  }

export function Blockquote({ citeLink, citeAuthor, children }: Props) {
  const author = citeAuthor || 'anonymous'
	return (
		<blockquote className={`blockquote`}>
			{children}
			<footer>
				—{" "}
				<cite>
          {citeLink ? <a href={citeLink}>{author}</a> : <span>{author}</span>}
				</cite>
			</footer>
		</blockquote>
	)
}
