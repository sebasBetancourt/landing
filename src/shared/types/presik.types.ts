export interface PresikConsumer {
  id?: number;
  name: string;
  phone: string;
  id_number?: string;
  address?: string;
  birthday?: string;
  notes?: string;
}

export interface PresikParty {
  name: string;
  type_document: string;
  id_number: string;
  main_email: string;
  country_code: string;
  subdivision_code: string;
  city_code: string;
  main_mobile: string;
}

export interface PresikHotelShop {
  id: number;
  name: string;
}

export interface PresikRatePlan {
  id: number;
  name: string;
}

export interface PresikPaymentTerm {
  id: number;
  name: string;
}

export interface PresikContact {
  name: string;
  email: string;
  mobile: string;
  country: string;
}

export interface PresikFolio {
  id?: number;
  accommodation_id: number;
  arrival_date: string;
  departure_date: string;
  unit_price: number;
  num_adults: number;
  num_children: number;
  comments?: string;
}

export interface PresikBooking {
  hotel_id: number;
  channel_id: number;
  reservation_code: string;
  price_list_id: number;
  application: string;
  contact: PresikContact;
  notes?: string;
  folios: PresikFolio[];
}

/** Request body for POST /hotels/dap — Presik uses "shop" (not hotel_id) */
export interface PresikAvailabilityRequest {
  shop: number;
  rate_plan?: number;
  start_date: string;
  end_date: string;
}

export interface PresikListResponse<T> {
  items: T[];
  count: number;
}

// ── DAP response types ──────────────────────────────────────────────────────

export interface PresikDAPAvailability {
  dates: Record<string, number>;
  availability: number;
}

export interface PresikDAPPriceList {
  product: number;
  price_list: number;
  name: string;
  unit_price: number;
  pax_prices: null;
  meal_plan: number;
  prices_by_date: Record<string, number>;
}

export interface PresikDAPRoom {
  id: number;
  accommodation: number;
  name: string;
}

export interface PresikDAPAccommodation {
  id: number;
  name: string;
  max_adults: number;
  max_children: number;
  images: string[];
  rooms: PresikDAPRoom[];
  availability: number;
  amenities: string[];
  rate_type: string;
  price_lists: PresikDAPPriceList[];
}

export interface PresikDAPResponse {
  status: string;
  accommodations: Record<string, PresikDAPAvailability>;
  records: PresikDAPAccommodation[];
}
