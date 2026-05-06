import { type BusinessRole } from './api';

export interface User {
  // Primary fields
  id: number;
  name: string;
  email: string;
  username?: string;
  phone?: string;

  // Authentication & Security
  apiKey?: string;
  api_key?: string;
  token?: string;
  pubKey?: string;
  roles?: string; // CSV list: admin, user, technician, etc.
  role?: "owner" | "developer" | "affiliate" | "admin"; // Single role for UI
  pin?: number;
  unlockToken?: string;

  // Profile Information
  photo?: string; // Profile photo path (used by backend)
  city?: string;
  province?: string;
  country?: string;
  gender?: string;
  day?: number;
  month?: number;
  yob?: number; // Year of birth

  // Communication Channels
  whatsApp?: string;
  telegram?: string;
  signal?: string;
  session?: string;

  // Preferences
  locale?: string;
  flags?: string[];

  // Relations
  businessRoles?: BusinessRole[];

  // Timestamps
  CreatedAt?: string;
  UpdatedAt?: string;
  createdAt?: string; // Alternative naming
  updatedAt?: string; // Alternative naming

  // UI-specific fields
  status?: "active" | "inactive" | "disabled";
  type?: "premium" | "standard" | "trial";
  lastActive?: string;
  needsOnboarding?: boolean;
  isNewUser?: boolean;
}

// ========== USER HELPER FUNCTIONS ==========

/**
 * Get user status based on flags array
 */
export function getUserStatus(user: User): "active" | "inactive" {
  if (user.flags && user.flags.includes("disabled")) {
    return "inactive";
  }
  return "active";
}

/**
 * Parse roles CSV string into array
 */
export function getUserRoles(user: User): string[] {
  if (!user.roles) return [];
  return user.roles
    .split(",")
    .map((role) => role.trim())
    .filter((role) => role.length > 0);
}

/**
 * Check if user has a specific role
 */
export function userHasRole(user: User, role: string): boolean {
  const roles = getUserRoles(user);
  return roles.includes(role);
}

/**
 * Check if user is admin
 */
export function isAdmin(user: User): boolean {
  return userHasRole(user, "admin");
}

/**
 * Get user's primary role (for display)
 */
export function getPrimaryRole(user: User): string {
  const roles = getUserRoles(user);
  if (roles.length === 0) return "user";

  // Priority order
  const priorityRoles = ["admin", "owner", "developer", "affiliate", "technician", "user"];
  for (const priority of priorityRoles) {
    if (roles.includes(priority)) {
      return priority;
    }
  }

  return roles[0];
}

/**
 * Format roles for display
 */
export function formatRolesForDisplay(user: User): string[] {
  return getUserRoles(user);
}

/**
 * Get user initials for avatar
 */
export function getUserInitials(user: User): string {
  if (!user.name) return "?";
  const parts = user.name.split(" ");
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  }
  return user.name.substring(0, 2).toUpperCase();
}

/**
 * Get user photo URL
 */
export function getUserPhoto(user: User): string | undefined {
  return user.photo;
}

/**
 * Count user's businesses
 */
export function getUserBusinessCount(user: User): number {
  return user.businessRoles?.length || 0;
}