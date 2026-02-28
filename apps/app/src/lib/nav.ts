import type { Role } from "@/types/rbac";

export type NavItem = { label: string; href: string; roles: Role[] };

export const NAV_ITEMS: NavItem[] = [
  { label: "Dashboard", href: "/app", roles: ["SUPER_ADMIN", "ADMIN", "CUSTOMER"] },
  { label: "Users", href: "/app/users", roles: ["SUPER_ADMIN", "ADMIN"] },
  { label: "Settings", href: "/app/settings", roles: ["SUPER_ADMIN", "ADMIN", "CUSTOMER"] },
  { label: "Admin", href: "/app/admin", roles: ["SUPER_ADMIN"] },
];
