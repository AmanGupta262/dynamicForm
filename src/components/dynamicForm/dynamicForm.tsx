import { useState } from "react";

import {
	Formik,
	FieldArray,
	FormikHelpers,
	Form,
	Field,
	ErrorMessage,
} from "formik";
import * as Yup from "yup";

import styles from "./dynamicForm.module.scss";

interface Row {
	manufacturer: string;
	voltage: string;
	rechargeable: boolean;
}

interface InitialValues {
	batteries: Row[];
}

const singleBattery = { manufacturer: "", voltage: "", rechargeable: false };

const initialValues: InitialValues = {
	batteries: [singleBattery],
};

const options = [
	{ value: "1.5V", label: "1.5V" },
	{ value: "3V", label: "3V" },
	{ value: "6V", label: "6V" },
	{ value: "9V", label: "9V" },
	{ value: "12V", label: "12V" },
];

const validationSchema = Yup.object().shape({
	batteries: Yup.array().of(
		Yup.object().shape({
			manufacturer: Yup.string()
				.required("Manufacturer name is required")
				.matches(/^[a-zA-Z0-9]+$/, "Manufacturer name must be alphanumeric"),
			voltage: Yup.string()
				.required("Please select an option"),
			rechargeable: Yup.boolean(),
		})
	),
});

const DynamicForm = () => {
	const [showSuccess, setShowSuccess] = useState(false);

	const handleFormSubmit = (
		values: InitialValues,
		helpers: FormikHelpers<InitialValues>
	) => {
		const { resetForm } = helpers;
		console.log(values);
		resetForm();
		setShowSuccess(true);
	};
	return (
		<div className={styles.form}>
			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={handleFormSubmit}
			>
				{({ errors, touched, values }) => (
					<Form>
						<FieldArray
							name='batteries'
							render={({ insert, remove }) => (
								<div className={styles.batteriesContainer}>
									{values.batteries.map((battery, index) => (
										<div key={index} className={styles.battery}>
											<div className={styles.formField}>
												<label
													className={styles.label}
													htmlFor={`batteries.${index}.manufacturer`}
												>
													Manufacturer:
												</label>
												<Field
													id={`batteries.${index}.manufacturer`}
													name={`batteries.${index}.manufacturer`}
												/>
												<div className={styles.error}>
													<ErrorMessage
														name={`batteries.${index}.manufacturer`}
													/>
												</div>
											</div>
											<div className={styles.formField}>
												<label
													className={styles.label}
													htmlFor={`batteries.${index}.voltage`}
												>
													Voltage:
												</label>
												<Field
													as='select'
													options={options}
													id={`batteries.${index}.voltage`}
													name={`batteries.${index}.voltage`}
												>
													<option value=''>Select an option</option>
													{options.map((option) => (
														<option key={option.value} value={option.value}>
															{option.label}
														</option>
													))}
												</Field>
												<div className={styles.error}>
													<ErrorMessage name={`batteries.${index}.voltage`} />
												</div>
											</div>
											<div className={styles.formField}>
												<label
													className={styles.label}
													htmlFor={`batteries.${index}.rechargeable`}
												>
													Rechargeable:
												</label>
												<Field
													type='checkbox'
													name={`batteries.${index}.rechargeable`}
													id={`batteries.${index}.rechargeable`}
												/>
												<div className={styles.error}>
													<ErrorMessage
														name={`batteries.${index}.rechargeable`}
													/>
												</div>
											</div>
											{index !== 0 && (
												<button
													type='button'
													onClick={() => {
														remove(index);
													}}
												>
													remove
												</button>
											)}
										</div>
									))}
									<button
										type='button'
										onClick={() => {
											insert(values.batteries.length + 1, singleBattery);
										}}
									>
										add
									</button>
								</div>
							)}
						/>
						<button type='submit'>submit</button>
					</Form>
				)}
			</Formik>
		</div>
	);
};

export default DynamicForm;
