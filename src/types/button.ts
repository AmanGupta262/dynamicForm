import { ButtonHTMLAttributes } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: "primary" | "danger" | "default" | "icon";
}

export interface RemoveButtonProps extends ButtonProps {
	isDataEmpty?: boolean;
}