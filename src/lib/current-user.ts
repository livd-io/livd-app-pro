import type { Role } from "@/types/rbac";

export type CurrentUser = { id: string; email: string; role: Role };

export function getCurrentUser(): CurrentUser {
  return {
    id: "dev-user",
    email: "andy@local.dev",
    role: "SUPER_ADMIN",
  };
}
