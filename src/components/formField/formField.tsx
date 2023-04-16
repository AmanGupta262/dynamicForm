import { ErrorMessage, Field, FieldAttributes } from "formik";

import styles from "./formField.module.scss";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface FormFieldProps extends FieldAttributes<any> {
	label: string;
}

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
