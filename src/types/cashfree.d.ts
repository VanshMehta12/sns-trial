declare module '@cashfreepayments/cashfree-js' {
    export function load(config: { mode: 'sandbox' | 'production' }): Promise<CashfreeSDK>;

    interface CashfreeCheckoutOptions {
        paymentSessionId: string;
        redirectTarget?: '_self' | '_blank' | string;
    }

    interface CashfreeSDK {
        checkout(options: CashfreeCheckoutOptions): void;
    }

    export function checkout(checkoutOptions: { paymentSessionId: string; redirectTarget: string; }) {
        console.log(checkoutOptions);
        throw new Error('Function not implemented.');
    }

    export function PGFetchOrder(version: string, arg1: string) {
        console.log(version);
        console.log(arg1);
        throw new Error('Function not implemented.');
        
    }
}
