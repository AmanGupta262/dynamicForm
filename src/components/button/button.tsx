import { ButtonHTMLAttributes } from "react";

import styles from "./button.module.scss";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: "primary" | "danger" | "default" | "icon";
}

const Button = ({
	variant = "primary",
	disabled,
	className = "",
	...rest
}: ButtonProps) => {
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
