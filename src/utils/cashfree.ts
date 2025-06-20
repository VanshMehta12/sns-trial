import { load } from "@cashfreepayments/cashfree-js";

export interface CheckoutOptions {
  paymentSessionId: string;
  returnUrl: string;
}

export interface CheckoutResult {
  error?: {
    message: string;
  };
  redirect?: boolean;
}

// Define a type for the Cashfree instance
interface CashfreeInstance {
  checkout: (options: CheckoutOptions) => Promise<CheckoutResult>;
  // Add other methods that the Cashfree SDK provides as needed
}

let cashfreeInstance: CashfreeInstance | null = null;

// Initialize the SDK
async function initCashfree(): Promise<CashfreeInstance> {
  if (!cashfreeInstance) {
    cashfreeInstance = await load({
      mode: "sandbox", // or production
    }) as CashfreeInstance;
  }
  return cashfreeInstance;
}

// Ensure the SDK is initialized before use
export const cashfree = {
  checkout: async (options: CheckoutOptions): Promise<CheckoutResult> => {
    const instance = await initCashfree();
    return instance.checkout(options);
  }
};