import { type Location } from "./location";

export interface Business {
  id?: number; // optional
  uid?: string;
  userId?: number; 
  
  // primary fields
  name: string;
  type: string; // e.g., "Services", "Products", "Restaurant"
  email: string;
  phone: string; // e.g., "+57123456789"
  
  // location
  address?: string;
  city: string;
  province: string;
  country: string;
  zipcode?: string;
  latlng?: string; // "latitude,longitude" e.g. "4.8057849,-75.6830817"


  website?: string;
  facebook?: string;
  instagram?: string;
  twitter?: string;
  youtube?: string;
  whatsapp?: string;
  telegram?: string;
  signal?: string;
  session?: string;

  // Description
  summary?: string; // short summary of the business (max 50 chars)
  description?: string; // longer description of the business

  // fiscal identification
  nid?: string; // national ID, NIT, registration number etc.
  taxId?: string; // tax ID, TAX, registration number etc.

  // apperance
  photo?: string; // url of the business logo photo
  background?: string; // url of the business background photo
  banner?: string; // url of the business mktplace banner photo
  colour?: string; // hex color
  style?: string;

  // Configuration
  locale?: string; // language of the business e.g. es_CO
  currency?: string; // currency of the business e.g. COP
  enabled?: boolean; // default true en backend
  uuid?: string; // subdomain, generado por backend

  // bank information
  bank?: string;
  sortCode?: string;
  accountName?: string;
  accountNumber?: string;
  paymentTerms?: string;

  flags?: string[]; // e.g. ["open", "closed"]

  roles?: BusinessRole[];
  locations?: Location[]; // default location
  categories?: BusinessCategory[];
  
  createdAt?: string;
  updatedAt?: string;
}

export interface BusinessRole {
  id: number;
  roleId: number;
  businessId: number;
  locationId: number;
  type: string;
  permissions: string;
  services: string[];
  name: string;
  email: string;
  photo?: string;
}

export interface BusinessCategory {
  id?: number;
  businessId?: number;
  category: string;
}