import { MINIMUM_MEMBERSHIP_FEE } from "./helpers/constants";
import { calcVat, poundsToPence } from "./helpers/utils";
import { validateRentAmount } from "./helpers/validations";
import { BranchUnit, AreaUnit, DivisionUnit, OrganisationUnit } from "./types/organisation.types";
import { RentPeriod, RentPeriodEnum } from "./types/rent.types";
import { Pence, MembershipFee } from "./types/shared.types";

/**
 * Function to calculate membership fee.
 * @param rentAmount - Rent amount. from 1 to Number.MAX_SAFE_INTEGER
 * @param rentPeriod - Rent period. Can be one of: [week, month]
 * @param organisationUnit  - Branch
 * @returns 
 */
export function calculateMembershipFee(rentAmount: Pence, rentPeriod: RentPeriod, organisationUnit: OrganisationUnit): MembershipFee {
  // Membership fee calculation
  //// check if org structure has fixed fee
  const fixedUnitFee = organisationUnit.getFixedMembershipFee();
  if (fixedUnitFee != null) return fixedUnitFee;

  const [error] = validateRentAmount(rentAmount, rentPeriod);   // Validate rentAmount by rentPeriod
  if (error) throw new RangeError(error); // Throw if invalid (BR3)

  //// Membership fee is equal to one week of rent + VAT
  // assuming a month has 4 weeks
  const divider = rentPeriod === RentPeriodEnum.Month ? 4 : 1;

  //// Minimum membership base fee is £120
  const baseFee = Math.max(rentAmount / divider, poundsToPence(MINIMUM_MEMBERSHIP_FEE));
  return baseFee + calcVat(baseFee);
}

// example of app running
(function init() {
  const divisionUnit1 = new DivisionUnit("Division Unit #1", true, 1000000);
  const divisionUnit2 = new DivisionUnit("Division Unit #2", false, 800000);
  const areaUnit1 = new AreaUnit("Area Unit #1", true, 750000);
  const areaUnit2 = new AreaUnit("Area Unit #2", false);
  const branchUnit1 = new BranchUnit("Branch Unit #1", true, 0);
  const branchUnit2 = new BranchUnit("Branch Unit #2", false, 9000000);

  divisionUnit1.addUnit(areaUnit1);
  areaUnit1.addUnit(branchUnit1);

  let run1 = calculateMembershipFee(800, RentPeriodEnum.Week, branchUnit1);
  console.log("1: Should return 0p ->", run1);

  areaUnit1.addUnit(branchUnit2);
  let run2 = calculateMembershipFee(800, RentPeriodEnum.Week, branchUnit2);
  console.log("2: Should return 750000p ->", run2);

  divisionUnit1.addUnit(areaUnit2);
  areaUnit2.addUnit(branchUnit2);
  let run3 = calculateMembershipFee(800, RentPeriodEnum.Week, branchUnit2);
  console.log("3: Should return 1000000p ->", run3);

  divisionUnit2.addUnit(areaUnit2);
  let run4 = calculateMembershipFee(80000, RentPeriodEnum.Week, branchUnit2);
  console.log("4: Should return 80000p + VAT ->", run4);

  let run5 = calculateMembershipFee(600000, RentPeriodEnum.Month, branchUnit2);
  console.log("5: Should return 150000p + VAT ->", run5);

  let run6 = calculateMembershipFee(10000, RentPeriodEnum.Week, branchUnit2);
  console.log("6: Should return minimum amount £120 + VAT ->", run6);
  
  try {
    calculateMembershipFee(Number.MAX_SAFE_INTEGER, RentPeriodEnum.Week, branchUnit2); // will throw
  } catch (error) {
    console.log("8: Should throw RangeError -> ", String(error));
  }
})();