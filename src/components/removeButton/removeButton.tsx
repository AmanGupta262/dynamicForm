import { useState } from "react";

import { Button } from "components";
import { RemoveButtonProps } from "types";

const RemoveButton = ({
	onClick,
	children,
	isDataEmpty = false,
	className,
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
		<div className={className}>
			<Button onClick={handleConfirm} {...rest}>
				{showConfirm ? "Confirm" : children}
			</Button>
			{showConfirm && (
				<Button
					style={{ marginLeft: "8px" }}
					onClick={() => setShowConfirm(false)}
					variant='default'
				>
					Cancel
				</Button>
			)}
		</div>
	);
};

export default RemoveButton;
