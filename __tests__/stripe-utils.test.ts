import { getCustomerEmail, getCustomerId } from "../src/utils/stripe-utils";
import Stripe from "stripe";

describe("stripe-utils", () => {
  describe("getCustomerId", () => {
    it("should throw an error if customer is null", () => {
      expect(() => getCustomerId(null)).toThrow("No customer found");
    });

    it("should return the customer string if passed a string", () => {
      expect(getCustomerId("cus_123")).toBe("cus_123");
    });

    it("should return customer.id if passed a Customer object", () => {
      const mockCustomer = { id: "cus_456" } as Stripe.Customer;
      expect(getCustomerId(mockCustomer)).toBe("cus_456");
    });
  });

  describe("getCustomerEmail", () => {
    let mockStripe: Stripe;

    beforeEach(() => {
      // Create a mock stripe object
      mockStripe = {
        customers: {
          retrieve: jest.fn(),
        },
      } as unknown as Stripe;
    });

    it("should throw an error if customer is null", async () => {
      await expect(getCustomerEmail(mockStripe, null)).rejects.toThrow("No customer found");
    });

    it("should retrieve customer and return email if customer is a string", async () => {
      const mockCustomer = { id: "cus_123", email: "test@example.com" } as Stripe.Customer;
      (mockStripe.customers.retrieve as jest.Mock).mockResolvedValue(mockCustomer);

      const email = await getCustomerEmail(mockStripe, "cus_123");

      expect(mockStripe.customers.retrieve).toHaveBeenCalledWith("cus_123");
      expect(email).toBe("test@example.com");
    });

    it("should return empty string if retrieved customer has no email", async () => {
      const mockCustomer = { id: "cus_123" } as Stripe.Customer; // no email
      (mockStripe.customers.retrieve as jest.Mock).mockResolvedValue(mockCustomer);

      const email = await getCustomerEmail(mockStripe, "cus_123");

      expect(mockStripe.customers.retrieve).toHaveBeenCalledWith("cus_123");
      expect(email).toBe("");
    });

    it("should return email directly if customer is an object", async () => {
      const mockCustomer = { id: "cus_456", email: "direct@example.com" } as Stripe.Customer;

      const email = await getCustomerEmail(mockStripe, mockCustomer);

      expect(mockStripe.customers.retrieve).not.toHaveBeenCalled();
      expect(email).toBe("direct@example.com");
    });
  });
});
