import type { User } from "@/shared/types/user";

 // Function to map the backend user to the frontend format
export const mapBackendUser = (backendUser: any): User => {
    // Determine the role based on the backend roles
    let role: "owner" | "developer" | "affiliate" | "admin" = "owner";
    if (backendUser.roles) {
      if (backendUser.roles.includes('admin')) role = 'admin';
      else if (backendUser.roles.includes('developer')) role = 'developer';
      else if (backendUser.roles.includes('affiliate')) role = 'affiliate';
    }

    const mappedUser = {
      id: backendUser.id,
      email: backendUser.email,
      name: backendUser.name || backendUser.email,
      phone: backendUser.phone,
      roles: backendUser.roles,
      city: backendUser.city,
      province: backendUser.province,
      country: backendUser.country,
      apiKey: backendUser.apiKey,
      token: backendUser.apiKey, // Usar apiKey como token
      api_key: backendUser.apiKey, // Compatibilidad
      pubKey: backendUser.pubKey || '',
      CreatedAt: backendUser.CreatedAt,
      UpdatedAt: backendUser.UpdatedAt,
      photo: backendUser.photo, // Photo from backend
      role: role,
      needsOnboarding: Boolean(backendUser.needsOnboarding),
      isNewUser: Boolean(backendUser.isNewUser),
    };

    return mappedUser;
  };
