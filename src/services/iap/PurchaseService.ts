/**
 * In-App Purchase Service (Stub)
 * Handles premium subscription purchases
 */

export interface PurchaseProduct {
  id: string;
  title: string;
  description: string;
  price: string;
  priceValue: number;
  currency: string;
}

export class PurchaseService {
  async initialize(): Promise<void> {
    console.log('IAP: Initialization (stub)');
  }

  async getProducts(): Promise<PurchaseProduct[]> {
    console.log('IAP: Getting products (stub)');
    return [
      {
        id: 'premium_monthly',
        title: 'Premium Monthly',
        description: 'Monthly subscription',
        price: '$4.99',
        priceValue: 4.99,
        currency: 'USD',
      },
      {
        id: 'premium_yearly',
        title: 'Premium Yearly',
        description: 'Yearly subscription (save 33%)',
        price: '$39.99',
        priceValue: 39.99,
        currency: 'USD',
      },
    ];
  }

  async purchaseProduct(productId: string): Promise<boolean> {
    console.log('IAP: Purchasing product (stub)', productId);
    return true;
  }

  async restorePurchases(): Promise<void> {
    console.log('IAP: Restoring purchases (stub)');
  }
}

export const purchaseService = new PurchaseService();
