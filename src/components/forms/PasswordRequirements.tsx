import { Card } from "@components/layouts/Card";
import { bg_c_reverse_theme } from "@styles/colorthemes.module.css";

export function PasswordRequirements() {
	return (
		<Card colorTheme={'bg_c_reverse_theme'}>
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
		</Card>
	)
}
