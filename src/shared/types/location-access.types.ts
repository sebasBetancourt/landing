import { type User } from './user';

// Location Access Types
export interface BusinessLocation {
  id: number;
  business_id: number;
  name: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  postal_code?: string;
  phone?: string;
  email?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface LocationAccess {
  id: number;
  user_id: number;
  business_id: number;
  location_id: number;
  created_at: string;
  updated_at: string;
  location?: BusinessLocation;
}

export interface LocationAccessRequest {
  user_id: number;
  business_id: number;
  location_ids: number[];
}

export interface LocationAccessResponse {
  user_id: number;
  business_id: number;
  location_access_type: 'all' | 'specific';
  locations: LocationAccessDetail[];
}

export interface LocationAccessDetail {
  location_id: number;
  location_name: string;
  is_active: boolean;
}

// Updated Business Role with location access
export interface BusinessRoleWithLocationAccess {
  id: number;
  user_id: number;
  business_id: number;
  role_type: 'admin' | 'owner' | 'member' | 'affiliate' | 'developer';
  location_access_type: 'all' | 'specific';
  permissions: string;
  services: string;
  created_at: string;
  updated_at: string;
  location_access?: LocationAccess[];
  user?: User;
}

// User creation data with location access
export interface UserCreateDataWithLocations {
  name: string;
  email: string;
  phone?: string;
  password: string;
  roles: string;
  locale: string;
  city?: string;
  country?: string;
  location_ids?: number[]; // For member role
}

// Location access check response
export interface LocationAccessCheckResponse {
  success: boolean;
  has_access: boolean;
}


