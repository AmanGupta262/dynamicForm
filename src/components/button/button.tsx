import { ButtonProps } from "types";

import styles from "./button.module.scss";

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
