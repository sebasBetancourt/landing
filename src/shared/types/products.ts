export interface Product {
  id: number;
  active: boolean;
  priceUSD: number;
  priceCOP: number;
  name: string;
  description: string;
  tokensAmount?: number | null;
  createdAt: string;
  updatedAt: string;
}

export interface SubscriptionPlan {
  id: number;
  product: string;
  name: string;
  description: string;
  weekly: number;
  monthly: number;
  quarterly: number;
  yearly: number;
  currency: string;
  countryCode: string;
  free: boolean;
  freeDays: number;
  freeUnits: number;
  flags: string[] | null;
  createdAt: string;
  updatedAt: string;
}
