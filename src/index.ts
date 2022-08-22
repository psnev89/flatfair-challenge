import { useCalcWeekAmountOfMonth } from "./composables/useCalcWeekAmountOfMonth";
import { MINIMUM_MEMBERSHIP_FEE } from "./helpers/constants";
import { calcVat, poundsToPence } from "./helpers/utils";
import { validateRentAmount } from "./helpers/validations";
import { BranchUnit, AreaUnit, DivisionUnit } from "./types/organisation.types";
import { RentPeriod, RentPeriodEnum } from "./types/rent.types";
import { Pence, MembershipFee } from "./types/shared.types";

/**
 * Function to calculate membership fee.
 * @param rentAmount - Rent amount. from 1 to Number.MAX_SAFE_INTEGER
 * @param rentPeriod - Rent period. Can be one of: [week, month]
 * @param organisationUnit  - Branch
 * @returns Membership fee
 */
export function calculateMembershipFee(
	rentAmount: Pence,
	rentPeriod: RentPeriod,
	branchUnit: BranchUnit
): MembershipFee {
	// Membership fee calculation
	/// / check if org structure has fixed fee
	const fixedUnitFee = branchUnit.getFixedMembershipFee();
	if (fixedUnitFee != null) return fixedUnitFee;

	const [error] = validateRentAmount(rentAmount, rentPeriod); // Validate rentAmount by rentPeriod
	if (error) throw new RangeError(error); // Throw if invalid (BR3)

	/// / Membership fee is equal to one week of rent + VAT
	// use composable to get weekly fee if rent period is "month"
	const amount = rentPeriod === RentPeriodEnum.Month ? useCalcWeekAmountOfMonth(rentAmount) : rentAmount;

	/// / Minimum membership base fee is £120
	const baseFee = Math.max(amount, poundsToPence(MINIMUM_MEMBERSHIP_FEE));
	return Math.trunc(baseFee + calcVat(baseFee)); // calc fee + VAT. Truncating for decimals
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

	const run1 = calculateMembershipFee(800, RentPeriodEnum.Week, branchUnit1);
	console.log("1: Should return 0p ->", run1);

	areaUnit1.addUnit(branchUnit2);
	const run2 = calculateMembershipFee(800, RentPeriodEnum.Week, branchUnit2);
	console.log("2: Should return 750000p ->", run2);

	divisionUnit1.addUnit(areaUnit2);
	areaUnit2.addUnit(branchUnit2);
	const run3 = calculateMembershipFee(800, RentPeriodEnum.Week, branchUnit2);
	console.log("3: Should return 1000000p ->", run3);

	divisionUnit2.addUnit(areaUnit2);
	const run4 = calculateMembershipFee(80000, RentPeriodEnum.Week, branchUnit2);
	console.log("4: Should return 80000p + VAT ->", run4);

	const run5 = calculateMembershipFee(600000, RentPeriodEnum.Month, branchUnit2);
	console.log("5: Should return 150000p + VAT ->", run5);

	const run6 = calculateMembershipFee(10000, RentPeriodEnum.Week, branchUnit2);
	console.log("6: Should return minimum amount 12000p + VAT ->", run6);

	try {
		calculateMembershipFee(Number.MAX_SAFE_INTEGER, RentPeriodEnum.Week, branchUnit2); // will throw
	} catch (error) {
		console.log("8: Should throw RangeError -> ", String(error));
	}
})();
