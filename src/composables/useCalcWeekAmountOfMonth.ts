import { getDaysOfMonth } from "../helpers/utils";

/**
 * Interface for composable's options
 */
interface ICalcWeekAmountOptions {
	month?: number;
	year?: number;
	truncate?: boolean;
}

/**
 * Calculate weekly amount from a monthly amount. If no options are provided, current month and year will be used.
 * @param  amount monthly amount
 * @param  options composable's options
 * @return weekly amount
 */
export function useCalcWeekAmountOfMonth(amount: number, options: ICalcWeekAmountOptions = {}): number {
	const { month = new Date().getMonth(), year = new Date().getFullYear(), truncate = true } = options;

	// get days of context month
	const daysOfMonth = getDaysOfMonth(month, year);

	// get week amount
	// daily rate = monthly amount / days of month
	// weekly rate = daily rate * 7 -> week has 7 days
	const weekAmount = (amount / daysOfMonth) * 7;

	// check truncate option and return
	return truncate ? Math.trunc(weekAmount) : weekAmount;
}
