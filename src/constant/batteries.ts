import { Battery, BatteryInitialValues } from "types";

export const SINGLE_BATTERY: Battery = {
	manufacturer: "",
	voltage: "",
	rechargeable: false,
};

export const BATTERIES_INITIAL_VALUES: BatteryInitialValues = {
	batteries: [SINGLE_BATTERY],
};
