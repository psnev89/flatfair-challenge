// poundsToPence
import { poundsToPence } from "../src/helpers/utils";
describe("HELPER UTILS :: poundsToPence", () => {
  test("converting 2 should return 200", () => {
    expect(poundsToPence(2)).toBe(200);
  });
  test("converting -1 should return -100", () => {
    expect(poundsToPence(-1)).toBe(-100);
  });
});

// penceToPounds
import { penceToPounds } from "../src/helpers/utils";
describe("HELPER UTILS :: penceToPounds", () => {
  test("converting 200 should return 2", () => {
    expect(penceToPounds(200)).toBe(2);
  });
  test("converting -100 should return -1", () => {
    expect(penceToPounds(-100)).toBe(-1);
  });
});

// getRentRangeByRentPeriod
import { getRentRangeByRentPeriod } from "../src/helpers/utils";
describe("HELPER UTILS :: getRentRangeByRentPeriod", () => {
  test("weekly rent period should return [25, 2000]", () => {
    expect(getRentRangeByRentPeriod("week")).toEqual([25, 2000]);
  });
  test("monthly rent period should return [110, 8660]", () => {
    expect(getRentRangeByRentPeriod("month")).toEqual([110, 8660]);
  });
});

// isNumberBetween
import { isNumberBetween } from "../src/helpers/utils";
describe("HELPER UTILS :: isNumberBetween", () => {
  test("5 is between [0, 10] should return true", () => {
    expect(isNumberBetween(5, 0, 10)).toBe(true);
  });
  test("15 is between [0, 10] should return false", () => {
    expect(isNumberBetween(15, 0, 10)).toBe(false);
  });
  test("max range and min range are between [0, 10] should return true", () => {
    expect(isNumberBetween(0, 0, 10)).toBe(true);
    expect(isNumberBetween(10, 0, 10)).toBe(true);
  });
});

// calcVat
import { calcVat } from "../src/helpers/utils";
describe("HELPER UTILS :: calcVat", () => {
  test("100 should return 20 by default", () => {
    expect(calcVat(100)).toBe(20);
  });
  test("100 should return 23 with 0.23 VAT", () => {
    expect(calcVat(100, 0.23)).toBe(23);
  });
});