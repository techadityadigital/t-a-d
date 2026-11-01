export interface FestivePackage {
  id: string;
  name: string;
  category: 'hampers' | 'digital' | 'eco' | 'executive';
  categoryLabel: string;
  badge?: string;
  tagline: string;
  description: string;
  pricePerUnit: number;
  originalPricePerUnit: number;
  minOrderQuantity: number;
  itemsIncluded: string[];
  specs: {
    turnaroundTime: string;
    customBranding: string;
    packaging: string;
    idealFor: string;
  };
  popular?: boolean;
}

export interface BulkOrderFormData {
  selectedPackageId: string;
  quantity: number;
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  deliveryCity: string;
  targetDeliveryDate: string;
  includeLogoBranding: boolean;
  includePersonalizedGreeting: boolean;
  includeExpressShipping: boolean;
  includeDigitalAssetAddon: boolean;
  specialInstructions: string;
}

export interface QuoteSummary {
  quoteId: string;
  createdAt: string;
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  packageName: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
  discountPercentage: number;
  discountAmount: number;
  addonsTotal: number;
  estimatedTax: number;
  grandTotal: number;
  deliveryCity: string;
  targetDeliveryDate: string;
  specialInstructions: string;
  addonsList: string[];
}
