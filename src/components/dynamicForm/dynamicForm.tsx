import { useState } from "react";

import { Button, RemoveButton, ThemeChanger } from "components";
import { BATTERIES_INITIAL_VALUES, SINGLE_BATTERY } from "constant";
import {
	Formik,
	FieldArray,
	FormikHelpers,
	Form,
	Field,
	ErrorMessage,
} from "formik";
import { useLocalStorage } from "hooks";
import { BatteryCharging } from "react-feather";
import { toast } from "react-toastify";
import { Battery, BatteryInitialValues } from "types";

import styles from "./dynamicForm.module.scss";
import { formValidation } from "./formValidation";

const DynamicForm = () => {
	const [isLightTheme, setIsLightTheme] = useState<boolean>(true);

	const [initialValues, setInitialValues] =
		useLocalStorage<BatteryInitialValues>(
			"batteries",
			BATTERIES_INITIAL_VALUES
		);

	const handleFormSubmit = (
		values: BatteryInitialValues,
		helpers: FormikHelpers<BatteryInitialValues>
	) => {
		const { resetForm } = helpers;
		console.log(values);
		setInitialValues(BATTERIES_INITIAL_VALUES);
		toast("Form submitted successfully", { type: "success" });
		resetForm();
	};

	const isValuesEmpty = (battery: Battery) => {
		if (!battery?.manufacturer.trim() || !battery?.voltage) return true;

		return false;
	};

	const canAddField = (battery?: Battery) => {
		if (!battery) return false;
		const isEmpty = isValuesEmpty(battery);
		if (isEmpty) {
			toast("Please fill pervious row", { type: "info" });
		}
		return !isEmpty;
	};

	const handleSaveValues = (values: BatteryInitialValues) => {
		setInitialValues(values);
	};

	const handleRemoveField = (index: number) => {
		setInitialValues((prev) => {
			const prevCopy = { ...prev };
			prevCopy.batteries.splice(index, 1);
			console.log("info prev", prev, prevCopy);
			return prevCopy;
		});
	};
	const handleAddField = (index: number) => {
		setInitialValues((prev) => {
			const prevCopy = { ...prev };
			prevCopy.batteries.push(SINGLE_BATTERY);
			console.log("info prev", prev, prevCopy);
			return prevCopy;
		});
	};

	const options = [
		{ value: "1.5V", label: "1.5V" },
		{ value: "3V", label: "3V" },
		{ value: "6V", label: "6V" },
		{ value: "9V", label: "9V" },
		{ value: "12V", label: "12V" },
	];

	return (
		<main
			className={`${styles.pageContainer} ${isLightTheme ? "" : styles.dark} `}
		>
			<div className={styles.formContainer}>
				<header className={styles.header}>
					<div className={styles.title}>
						<BatteryCharging size={30} color='var(--green)' />
						Batteries
					</div>
					<ThemeChanger isLight={isLightTheme} handleChange={setIsLightTheme} />
				</header>
				<div className={styles.form}>
					<Formik
						initialValues={initialValues}
						validationSchema={formValidation}
						onSubmit={handleFormSubmit}
						enableReinitialize
					>
						{({ values }) => (
							<Form
								onBlur={() => handleSaveValues(values)}
								id='batteriesInfoForm'
							>
								<FieldArray
									name='batteries'
									render={() => (
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
															className={styles.fieldInput}
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
															className={styles.fieldInput}
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
														<RemoveButton
															type='button'
															variant='danger'
															isDataEmpty={isValuesEmpty(battery)}
															className={styles.removeBtn}
															onClick={() => {
																handleRemoveField(index);
															}}
														>
															Remove
														</RemoveButton>
													)}
												</div>
											))}

											{/* Add field */}
											<Button
												variant='default'
												type='button'
												className={styles.addBtn}
												onClick={() => {
													if (canAddField(values.batteries.at(-1)))
														handleAddField(values.batteries.length + 1);
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
				<div className={styles.submitBtnContainer}>
					<Button
						form='batteriesInfoForm'
						className={styles.submitBtn}
						type='submit'
					>
						Submit
					</Button>
				</div>
			</div>
		</main>
	);
};

export default DynamicForm;
