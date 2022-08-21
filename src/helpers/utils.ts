import { RentPeriod, RentPeriodEnum } from "../types/rent.types";
import { Pound, Pence } from "../types/shared.types";
import {
	MONTH_MIN_RENT_AMOUNT_RANGE,
	MONTH_MAX_RENT_AMOUNT_RANGE,
	WEEK_MIN_RENT_AMOUNT_RANGE,
	WEEK_MAX_RENT_AMOUNT_RANGE,
	VAT
} from "./constants";

/**
 * Helper function to convert pounds to pence.
 * @example
 * // returns 200
 * poundsToPence(2);
 * @param pounds - Amount of pounds to be converted to pence
 * @returns {number} - Returns the amount of pence of the given pounds
 */
export function poundsToPence(pounds: Pound): Pence {
	return pounds * 100; // 1£ = 100p
}

/**
 * Helper function to convert pence to pounds.
 * @example
 * // returns 2
 * poundsToPence(200);
 * @param pence - Amount of pence to be converted to punds
 * @returns {number} - Returns the amount of punds of the given pence
 */
export function penceToPounds(pence: Pence): Pound {
	return pence / 100; // 100p = 1£
}

/**
 * Helper function to get range of allowed rent amounts by rent period constraints.
 * @param period - Rent period to account the min and max values
 * @returns {Array<Pound>} Returns an array of min and max values in pounds
 */
export function getRentRangeByRentPeriod(period: RentPeriod): [Pound, Pound] {
	let min;
	let max;
	switch (period) {
		case RentPeriodEnum.Month:
			min = MONTH_MIN_RENT_AMOUNT_RANGE;
			max = MONTH_MAX_RENT_AMOUNT_RANGE;
			break;
		case RentPeriodEnum.Week:
		default:
			min = WEEK_MIN_RENT_AMOUNT_RANGE;
			max = WEEK_MAX_RENT_AMOUNT_RANGE;
			break;
	}
	return [min, max];
}

/**
 * Helper function to check if a value is within a given range. Could be a Number.prototype method but it is bad practice to change Primitives' prototypes.
 * @param value - value to validate
 * @param min - minimum value of the range
 * @param max - maximum value of the range
 * @returns {boolean} - Returns if the value is within the given range
 */
export function isNumberBetween(value: number, min: number, max: number): boolean {
	return min <= value && value <= max;
}

/**
 * Helper function to get the VAT value of a given amount
 * @param amount - amount to get the VAT from
 * @param vat - VAT to be applied
 * @returns {number} - Returns VAT value
 */
export function calcVat(amount: number, vat: number = VAT): number {
	return amount * vat;
}

/**
 * Helper function to get the number of days of a given month
 * @param month - month index 0 based. January is 0, December is 11
 * @param year - year to calculate the days for. Just for February.
 * @returns {number} - Returns the number of days
 */
export function getDaysOfMonth(month: number = new Date().getMonth(), year: number = new Date().getFullYear()) {
	if (!isNumberBetween(month, 0, 11))
		throw new RangeError(`Month input is not valid. Expected [0 ~ 11] got ${month}`);

	// it will return the last day of the previous month so by giving month + 1 will return the current month's last day
	return new Date(year, month + 1, 0).getDate();
}
