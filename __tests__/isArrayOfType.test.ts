import { isArrayOfType } from "../src/utils/helpers";

class MockClass {}
class OtherClass {}

describe("isArrayOfType", () => {
  it("should return true for an array of strings", () => {
    expect(isArrayOfType(["a", "b", "c"], "string")).toBe(true);
  });

  it("should return true for an array of numbers", () => {
    expect(isArrayOfType([1, 2, 3], "number")).toBe(true);
  });

  it("should return true for an array of booleans", () => {
    expect(isArrayOfType([true, false, true], "boolean")).toBe(true);
  });

  it("should return false for a mixed array", () => {
    expect(isArrayOfType(["a", 1, "c"], "string")).toBe(false);
  });

  it("should return true for an empty array", () => {
    expect(isArrayOfType([], "string")).toBe(true);
  });

  it("should return false for non-array inputs", () => {
    expect(isArrayOfType("not an array", "string")).toBe(false);
    expect(isArrayOfType(123, "number")).toBe(false);
    expect(isArrayOfType(null, "string")).toBe(false);
    expect(isArrayOfType(undefined, "string")).toBe(false);
    expect(isArrayOfType({}, "object")).toBe(false);
  });

  it("should return true for an array of custom class instances", () => {
    expect(isArrayOfType([new MockClass(), new MockClass()], MockClass)).toBe(true);
  });

  it("should return false for an array of mixed class instances", () => {
    expect(isArrayOfType([new MockClass(), new OtherClass()], MockClass)).toBe(false);
  });

  it("should return false when checking custom class against wrong type array", () => {
    expect(isArrayOfType(["a", "b"], MockClass)).toBe(false);
  });
});
