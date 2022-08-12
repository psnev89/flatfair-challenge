import { MINIMUM_MEMBERSHIP_FEE } from "./helpers/constants";
import { calcVat } from "./helpers/utils";
import { validateRentAmount } from "./helpers/validations";
import { BranchUnit, AreaUnit, DivisionUnit, OrganisationUnit } from "./types/organisation.types";
import { RentPeriod, RentPeriodEnum } from "./types/rent.types";
import { Pound } from "./types/shared.types";

/**
 * Function to calculate membership fee.
 * @param rentAmount - Rent amount. from 1 to Number.MAX_SAFE_INTEGER
 * @param rentPeriod - Rent period. Can be one of: [week, month]
 * @param organisationUnit  - Branch
 * @returns 
 */
export function calculateMembershipFee(rentAmount: Pound, rentPeriod: RentPeriod, organisationUnit: OrganisationUnit): Pound {
  // Membership fee calculation
  //// check if org structure has fixed fee
  const fixedUnitFee = organisationUnit.getFixedMembershipFee()
  if (fixedUnitFee) return fixedUnitFee;

  const [error] = validateRentAmount(rentAmount, rentPeriod);   // Validate rentAmount by rentPeriod
  if (error) throw new RangeError(error); // Throw if invalid (BR3)

  //// Membership fee is equal to one week of rent + VAT
  // assuming a month has 4 weeks
  const divider = rentPeriod === RentPeriodEnum.Month ? 4 : 1;

  //// Minimum membership base fee is £120
  const baseFee = Math.max(rentAmount / divider, MINIMUM_MEMBERSHIP_FEE);
  return baseFee + calcVat(baseFee);
}

// example of app running
(function init() {
  const divisionUnit1 = new DivisionUnit("Division Unit #1", true, 400);
  const divisionUnit2 = new DivisionUnit("Division Unit #2", false, 400);
  const areaUnit1 = new AreaUnit("Area Unit #1", true, 500);
  const areaUnit2 = new AreaUnit("Area Unit #2", false);
  const branchUnit1 = new BranchUnit("Branch Unit #1", true, 650);
  const branchUnit2 = new BranchUnit("Branch Unit #2", false, 650);

  divisionUnit1.addUnit(areaUnit1);
  areaUnit1.addUnit(branchUnit1);

  let run1 = calculateMembershipFee(800, RentPeriodEnum.Week, branchUnit1);
  console.log("1: Should return £650 ->", run1);

  areaUnit1.addUnit(branchUnit2);
  let run2 = calculateMembershipFee(800, RentPeriodEnum.Week, branchUnit2);
  console.log("2: Should return £500 ->", run2);

  divisionUnit1.addUnit(areaUnit2);
  areaUnit2.addUnit(branchUnit2);
  let run3 = calculateMembershipFee(800, RentPeriodEnum.Week, branchUnit2);
  console.log("3: Should return £400 ->", run3);

  divisionUnit2.addUnit(areaUnit2);
  let run4 = calculateMembershipFee(800, RentPeriodEnum.Week, branchUnit2);
  console.log("4: Should return £800 + VAT ->", run4);

  let run5 = calculateMembershipFee(6000, RentPeriodEnum.Month, branchUnit2);
  console.log("5: Should return £1500 + VAT ->", run5);

  let run6 = calculateMembershipFee(110, RentPeriodEnum.Week, branchUnit2);
  console.log("6: Should return minimum amount £120 + VAT ->", run6);

  try {
    let run7 = calculateMembershipFee(Number.MAX_SAFE_INTEGER, RentPeriodEnum.Week, branchUnit2); // will throw
  } catch (error) {
    console.log("7: Should throw RangeError --> ", String(error));
  }
})();