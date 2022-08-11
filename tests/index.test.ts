import {init} from "../src/index.js";

describe("init dummy test", () => {
  test("init function should return boolean", () => {
    expect(init("test")).toBeTruthy();
  });
});