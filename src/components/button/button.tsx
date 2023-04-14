import { ButtonHTMLAttributes } from "react";

import styles from "./button.module.scss";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: "primary" | "danger" | "default";
}

const Button = ({
	variant = "primary",
	disabled,
	className = "",
	...rest
}: ButtonProps) => {
	console.log("info: className", className);
	return (
		<button
			{...rest}
			className={`${styles[variant]} ${styles.button} ${
				disabled ? styles.disabled : ""
			} ${className}`}
		/>
	);
};

export default Button;
