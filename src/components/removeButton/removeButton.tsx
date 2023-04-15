import { useState } from "react";

import { Button } from "components";
import { ButtonProps } from "types";

interface RemoveButtonProps extends ButtonProps {
	isDataEmpty?: boolean;
}

const RemoveButton = ({
	onClick,
	children,
	isDataEmpty = false,
	...rest
}: RemoveButtonProps) => {
	const [showConfirm, setShowConfirm] = useState<boolean>(false);

	const handleConfirm = (e: React.MouseEvent<HTMLButtonElement>) => {
		if (showConfirm) {
			onClick?.(e);
			setShowConfirm(false);
			return;
		}
		setShowConfirm(true);
	};

	if (isDataEmpty)
		return (
			<Button onClick={onClick} {...rest}>
				{children}
			</Button>
		);

	return (
		<Button onClick={handleConfirm} {...rest}>
			{showConfirm ? "Confirm" : children}
		</Button>
	);
};

export default RemoveButton;
