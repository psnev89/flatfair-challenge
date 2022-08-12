import { RentPeriod, RentPeriodEnum } from "../types/rent.types";
import { TaskResult, Pound } from "../types/shared.types";
import { getRentRangeByRentPeriod, isNumberBetween } from "./utils";

/**
 * Method to validate rent amount.
 * @param amount - Amount to be validated
 * @param rentPeriod - Rent period. Can be any of {RentPeriod} type.
 * @returns {TaskResult<boolean>} Returns tupple with ["error message if applicable", successBoolean]
 */
export function validateRentAmount(amount: Pound, rentPeriod: RentPeriod = RentPeriodEnum.Week): TaskResult<boolean> {
  // validation amount input min & max not needed as range will comply (BR1)

  const [minRange, maxRange]: [Pound, Pound] = getRentRangeByRentPeriod(rentPeriod); // get rent range constraint
  if (isNumberBetween(amount, minRange, maxRange)) return [null, true]; // validate (BR3.1 & BR3.2)

  return [`Error: Rent amount (£${amount}) not in range of [£${minRange} ~ £${maxRange}]`, false];
}