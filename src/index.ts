import { MINIMUM_MEMBERSHIP_FEE } from "./helpers/constants";
import { calcVat } from "./helpers/utils";
import { validateRentAmount } from "./helpers/validations";
import { OrganisationUnit } from "./types/organisation.types";
import { RentPeriod } from "./types/rent.types";
import { Pound } from "./types/shared.types";

/**
 * Function to calculate membership fee.
 * @param rentAmount - Rent amount. from 1 to Number.MAX_SAFE_INTEGER
 * @param rentPeriod - Rent period. Can be one of: [week, month]
 * @param organisationUnit  - Branch
 * @returns 
 */
export function calculateMembershipFee(rentAmount: Pound, rentPeriod: RentPeriod, organisationUnit: OrganisationUnit): Pound {
  // Membership fee calculation rules (in order, from least to most important)
  //// TODO: Recursive search for organisation config object property fixed_membership_fee

  const [error] = validateRentAmount(rentAmount, rentPeriod);   // Validate rentAmount by rentPeriod
  if (error) throw new RangeError(error); // Throw if invalid (BR3)

  //// TODO: Membership fee is equal to one week of rent + VAT

  //// Minimum membership fee is £120 + VAT
  return MINIMUM_MEMBERSHIP_FEE + calcVat(MINIMUM_MEMBERSHIP_FEE);
}