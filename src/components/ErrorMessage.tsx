import React, { ReactNode } from "react"

import PropTypes from "prop-types"
import { MdError } from "react-icons/md"
import styles from "@styles/error.module.scss"
import Link from "next/link"
import { envs } from "@/envs"
import Flex from "./layouts/Flex"

type Props = {
	error: object | null | undefined | unknown
	children?: ReactNode
}

const ErrorMessage = ({ error, children }: Props) => {
	return (
		// todo use error.tsx in page folder instead
		// <Section layout={'1'}>
		<ErrorContents error={error}>{children}</ErrorContents>
		// </Section>
	)
}

const ErrorContents = ({ error, children }: any) => {
	if (!error || !error.message) return null
	// console.log('error, ', error);

	if (
		error.networkError &&
		error.networkError.result &&
		error.networkError.result.errors?.length
	) {
		return error.networkError.result.errors.map((error: any, i: any) => (
			<div className={styles.error_comp} key={i}>
				<strong>
					{" "}
					<MdError style={{ color: "red" }} />{" "}
				</strong>
				<p data-testid="graphql-error">
					{error.message.replace("GraphQL error: ", "")}
				</p>
				{children}
			</div>
		))
	}
	return (
		<div className={styles.error_comp}>
			<Flex alignItems={"center"}>
				<div>
					{" "}
					<MdError style={{ color: "red" }} /> {error?.code}{" "}
				</div>
				<div>
					<p data-test="graphql-error">
						{error?.message?.replace("GraphQL error: ", "")}
					</p>
					<p data-test="graphql-error">{error?.extensions?.code}</p>
					<p data-test="graphql-error">{error?.extensions?.debug?.message}</p>

					{children}

					<p>
						<small>
							<em>
								Contact{" "}
								<Link href={`mailto:${envs.ADMIN_EMAIL_ADDRESS}`}>
									{envs.ADMIN_EMAIL_ADDRESS}
								</Link>{" "}
								if this error persists
							</em>
						</small>
					</p>
				</div>
			</Flex>
		</div>
	)
}

ErrorMessage.propTypes = {
	error: PropTypes.object,
}

export default ErrorMessage
