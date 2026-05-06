/**
 * Inventory Types - Parts, Consumables, Brands, Stock Management
 * Based on backend Go models
 */

export interface Part {
  id: number;
  businessId: number;
  name: string;
  partNumber?: string;
  category?: string;
  description?: string;
  unitPrice?: number;
  manufacturer?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Consumable {
  id: number;
  businessId: number;
  name: string;
  category?: string;
  description?: string;
  unitPrice?: number;
  manufacturer?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Brand {
  id: number;
  name: string;
  category?: string;
  manufacturer?: string;
}

export interface StockBin {
  id: number;
  locationId: number;
  binNumber: string;
  binLocation?: string;
  itemType: 'part' | 'consumable';
  itemId: number;
  quantity: number;
  minQuantity?: number;
  maxQuantity?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface PartStockBin extends StockBin {
  partId: number;
  part?: Part;
}

export interface ConsumableStockBin extends StockBin {
  consumableId: number;
  consumable?: Consumable;
}

export interface TransferRequest {
  itemId: number;
  quantity: number;
  notes?: string;
}

export interface InventoryFilters {
  category?: string;
  manufacturer?: string;
  search?: string;
}
