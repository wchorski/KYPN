
export function PasswordRequirements() {
	return (
		<>
			<h5> requirements </h5>
			<ul className="unstyled">
				<li> 8 - 32 characters </li>
				<li> one Capital letter </li>
				<li>
					{" "}
					one special character <code>!@#+=$&-_^%*</code>
				</li>
				<li>
					{" "}
					one number <code> 0-9 </code>
				</li>
				<li> three lower case letters </li>
			</ul>
		</>
	)
}
