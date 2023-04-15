import * as Yup from "yup";


export const formValidation= Yup.object().shape({
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