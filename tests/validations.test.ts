// validateRentAmount
import { validateRentAmount } from "../src/helpers/validations";

describe("HELPER VALIDATIONS :: validateRentAmount", () => {
	test("£1500 amount for week period should be valid", () => {
		const [error, success] = validateRentAmount(1500, "week");
		expect(success).toBe(true);
		expect(error).toBeFalsy();
	});
	test("£50 amount for week period should NOT be valid and return error message", () => {
		const [error, success] = validateRentAmount(10, "week");
		expect(success).toBe(false);
		expect(error).toBeTruthy();
	});
	test("£2500 amount for week period should NOT be valid and return error message", () => {
		const [error, success] = validateRentAmount(2500, "week");
		expect(success).toBe(false);
		expect(error).toBeTruthy();
	});
	test("3000 amount for month period should be valid", () => {
		const [error, success] = validateRentAmount(3000, "month");
		expect(success).toBe(true);
		expect(error).toBeFalsy();
	});
	test("£50 amount for month period should NOT be valid and return error message", () => {
		const [error, success] = validateRentAmount(10, "month");
		expect(success).toBe(false);
		expect(error).toBeTruthy();
	});
	test("£9000 amount for month period should NOT be valid and return error message", () => {
		const [error, success] = validateRentAmount(9000, "month");
		expect(success).toBe(false);
		expect(error).toBeTruthy();
	});
});
