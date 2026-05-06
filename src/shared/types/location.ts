
import { type AgentInstance } from "./agent"

export interface Location {
  id: number;
  uid?: string;
  userId?: number;
  businessId: number;
  name: string;
  address?: string;
  city: string;
  province: string;
  country: string;
  zipcode?: string;
  phone: string;
  email: string;
  website?: string;
  latlng?: string;
  identity?: string;
  contactName?: string;
  photo?: string;
  message?: string;
  uuid: string;
  flags?: string[];
  rank?: number;
  agents: AgentInstance[];
  createdAt?: string;
  updatedAt?: string;
}

export interface LocationCreateRequest {
  businessId: number;
  userId: number;
  name: string;
  address?: string;
  city: string;
  province: string;
  country: string;
  phone: string;
  email: string;
  uuid?: string;
  flags?: string[];
}

export interface LocationUpdateRequest {
  name?: string;
  address?: string;
  city?: string;
  province?: string;
  country?: string;
  phone?: string;
  email?: string;
  uuid?: string;
  flags?: string[];
}