export interface Battery {
	manufacturer: string;
	voltage: string;
	rechargeable: boolean;
}

export interface BatteryInitialValues {
	batteries: Battery[];
}