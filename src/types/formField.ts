import { FieldAttributes } from "formik";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface FormFieldProps extends FieldAttributes<any> {
	label: string;
}
