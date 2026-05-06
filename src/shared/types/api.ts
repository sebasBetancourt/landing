/**
 * API Types
 *
 * Shared types for API requests and responses across the application.
 */

/**
 * Standard API response wrapper
 */
export interface ApiResponse<T> {
  result?: T;
  error?: string;
  message?: string;
}

/**
 * jQuery AJAX error object
 */
export interface JQueryAjaxError {
  status: number;
  statusText: string;
  responseJSON?: {
    error?: string;
    message?: string;
  };
  responseText?: string;
  message?: string;
}

/**
 * API callback function types
 */
export type ApiSuccessCallback<T> = (data: ApiResponse<T>) => void;
export type ApiErrorCallback = (error: JQueryAjaxError | string) => void;

/**
 * Upload progress callback
 */
export type UploadProgressCallback = (percent: number) => void;

/**
 * Upload load callback
 */
export type UploadLoadCallback<T> = (data: T) => void;

/**
 * Business role assignment for multi-tenant support
 */
export interface BusinessRole {
  id: number;
  userId: number;
  businessId: number;
  role: string;
  createdAt?: string;
  updatedAt?: string;
}

/**
 * Login request payload
 */
export interface LoginRequest {
  email: string;
  password?: string;
  phone?: string;
  token?: string;
  unlockToken?: string;
}

/**
 * Registration request payload
 */
export interface RegisterRequest {
  name: string;
  email: string;
  phone: string;
  password?: string;
  city?: string;
  province?: string;
  country?: string;
  locale?: string;
  role?: string;
}

/**
 * Password reset request payload
 */
export interface PasswordResetRequest {
  email: string;
}

/**
 * Password update request payload
 */
export interface PasswordUpdateRequest {
  token: string;
  password: string;
  confirm: string;
}

/**
 * Simple API response handler - accepts any response structure
 */
export type AnyApiResponse = ApiResponse<any>;

/**
 * Helper to extract result type from API response
 */
export type ExtractResult<T> = T extends ApiResponse<infer R> ? R : never;
