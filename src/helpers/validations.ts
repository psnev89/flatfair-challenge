import { RentPeriod, RentPeriodEnum } from "../types/rent.types";
import { TaskResult, Pound, Pence } from "../types/shared.types";
import { getRentRangeByRentPeriod, isNumberBetween, poundsToPence } from "./utils";

/**
 * Method to validate rent amount.
 * @param amount - Amount to be validated
 * @param rentPeriod - Rent period. Can be any of {RentPeriod} type.
 * @returns {TaskResult<boolean>} Returns tupple with ["error message if applicable", successBoolean]
 */
export function validateRentAmount(amount: Pence, rentPeriod: RentPeriod = RentPeriodEnum.Week): TaskResult<boolean> {
  // validation amount input min & max not needed as range will comply (BR1)

  const [minRange, maxRange]: [Pound, Pound] = getRentRangeByRentPeriod(rentPeriod); // get rent range constraint

  if (isNumberBetween(amount, poundsToPence(minRange), poundsToPence(maxRange))) return [null, true]; // validate (BR3.1 & BR3.2)

  return [`Error: Rent amount (${amount}p) not in range of [£${minRange} ~ £${maxRange}]`, false];
}