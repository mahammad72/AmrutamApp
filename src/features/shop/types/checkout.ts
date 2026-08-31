// checkout.ts
export interface Address {
  id: string;

  name: string;

  phone: string;

  addressLine1: string;

  addressLine2?: string;

  city: string;

  state: string;

  pincode: string;
}

export type PaymentMethod = 'cod' | 'upi' | 'card';

export interface CheckoutState {
  selectedAddress: Address | null;

  paymentMethod: PaymentMethod | null;
}
