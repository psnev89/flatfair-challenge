// rent period can only be one of these: "month" or "week".
export const enum RentPeriodEnum {
	Month = "month",
	Week = "week"
}

export type RentPeriod = `${RentPeriodEnum}`;
