import { useState } from "react";

import { Button } from "components/button";
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
				.required("Manufacturer is required")
				.matches(/^[a-zA-Z0-9]+$/, "Manufacturer must be alphanumeric"),
			voltage: Yup.string().required("Please select an option"),
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
		<main className={`${styles.pageContainer} `}>
			<div className={styles.formContainer}>
				<header className={styles.header}>Batteries</header>
				<div className={styles.form}>
					<Formik
						initialValues={initialValues}
						validationSchema={validationSchema}
						onSubmit={handleFormSubmit}
					>
						{({ errors, touched, values }) => (
							<Form id='batteriesInfoForm'>
								<FieldArray
									name='batteries'
									render={({ insert, remove }) => (
										<div className={styles.batteriesContainer}>
											{values.batteries.map((battery, index) => (
												<div key={index} className={styles.battery}>
													{/* Manufacturer */}
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
															className={styles.input}
														/>
														<div className={styles.error}>
															<ErrorMessage
																name={`batteries.${index}.manufacturer`}
															/>
														</div>
													</div>

													{/* Voltage */}
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
															className={styles.select}
														>
															<option value=''>Select an option</option>
															{options.map((option) => (
																<option key={option.value} value={option.value}>
																	{option.label}
																</option>
															))}
														</Field>
														<div className={styles.error}>
															<ErrorMessage
																name={`batteries.${index}.voltage`}
															/>
														</div>
													</div>

													{/* Rechargeable */}
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
															className={styles.checkbox}
														/>
														<div className={styles.error}>
															<ErrorMessage
																name={`batteries.${index}.rechargeable`}
															/>
														</div>
													</div>

													{/* Remove field */}
													{index !== 0 && (
														<Button
															type='button'
															variant='danger'
															className={styles.removeBtn}
															onClick={() => {
																remove(index);
															}}
														>
															Remove
														</Button>
													)}
												</div>
											))}

											{/* Add field */}
											<Button
												variant='default'
												type='button'
												className={styles.addBtn}
												onClick={() => {
													insert(values.batteries.length + 1, singleBattery);
												}}
											>
												Add
											</Button>
										</div>
									)}
								/>
							</Form>
						)}
					</Formik>
				</div>
				<Button
					form='batteriesInfoForm'
					className={styles.submitBtn}
					type='submit'
				>
					Submit
				</Button>
			</div>
		</main>
	);
};

export default DynamicForm;
