import { ErrorMessage, Field } from "formik";
import { FormFieldProps } from "types";

import styles from "./formField.module.scss";

const FormField = ({ label, name, className, ...rest }: FormFieldProps) => {
	return (
		<div className={styles.formField}>
			<label className={styles.label} htmlFor={name}>
				{label}
			</label>
			<Field
				id={name}
				name={name}
				className={`${styles.fieldInput} ${className}`}
				{...rest}
			/>
			<div className={styles.error}>
				<ErrorMessage name={name} />
			</div>
		</div>
	);
};

export default FormField;
