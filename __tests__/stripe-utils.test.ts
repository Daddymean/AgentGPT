import { getCustomerId } from "../src/utils/stripe-utils";

describe("getCustomerId", () => {
  test("should throw an error if customer is null", () => {
    expect(() => getCustomerId(null)).toThrowError("No customer found");
  });

  test("should return the customer string if customer is a string", () => {
    const customer = "cus_123456789";
    expect(getCustomerId(customer)).toEqual(customer);
  });

  test("should return the customer id if customer is an object", () => {
    const customer = { id: "cus_123456789" };
    expect(getCustomerId(customer as any)).toEqual("cus_123456789");
  });

  test("should throw an error if customer is an unexpected type", () => {
    const customer = 123;
    expect(() => getCustomerId(customer as any)).toThrowError("Unexpected customer type");
  });
});
