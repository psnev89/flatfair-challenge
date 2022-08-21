// validateRentAmount
import { validateRentAmount } from "../src/helpers/validations";

describe("HELPER VALIDATIONS :: validateRentAmount", () => {
	test("150000p amount for week period should be valid", () => {
		const [error, success] = validateRentAmount(150000, "week");
		expect(success).toBe(true);
		expect(error).toBeFalsy();
	});
	test("900p amount for week period should NOT be valid and return error message", () => {
		const [error, success] = validateRentAmount(900, "week");
		expect(success).toBe(false);
		expect(error).toBeTruthy();
	});
	test("250000p amount for week period should NOT be valid and return error message", () => {
		const [error, success] = validateRentAmount(250000, "week");
		expect(success).toBe(false);
		expect(error).toBeTruthy();
	});
	test("300000p amount for month period should be valid", () => {
		const [error, success] = validateRentAmount(300000, "month");
		expect(success).toBe(true);
		expect(error).toBeFalsy();
	});
	test("5000p amount for month period should NOT be valid and return error message", () => {
		const [error, success] = validateRentAmount(5000, "month");
		expect(success).toBe(false);
		expect(error).toBeTruthy();
	});
	test("900000p amount for month period should NOT be valid and return error message", () => {
		const [error, success] = validateRentAmount(900000, "month");
		expect(success).toBe(false);
		expect(error).toBeTruthy();
	});
});
