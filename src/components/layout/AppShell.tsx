"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  TransitionChild,
} from "@headlessui/react";
import {
  Bars3Icon,
  BellIcon,
  Cog6ToothIcon,
  HomeIcon,
  UsersIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { ChevronDownIcon, MagnifyingGlassIcon } from "@heroicons/react/20/solid";

import { NAV_ITEMS } from "@/lib/nav";
import { getCurrentUser } from "@/lib/current-user";

function classNames(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

const iconByHref: Record<string, any> = {
  "/app": HomeIcon,
  "/app/users": UsersIcon,
  "/app/settings": Cog6ToothIcon,
};

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  const user = getCurrentUser();
  const items = NAV_ITEMS
    .filter((i) => i.roles.includes(user.role))
    .map((i) => {
      const isCurrent =
        pathname === i.href || (i.href !== "/app" && pathname?.startsWith(i.href));
      return {
        name: i.label,
        href: i.href,
        icon: iconByHref[i.href] ?? HomeIcon,
        current: isCurrent,
      };
    });

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      {/* Mobile sidebar */}
      <Dialog open={sidebarOpen} onClose={setSidebarOpen} className="relative z-50 lg:hidden">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-neutral-950/80 transition-opacity duration-300 ease-linear data-closed:opacity-0"
        />

        <div className="fixed inset-0 flex">
          <DialogPanel
            transition
            className="relative mr-16 flex w-full max-w-xs flex-1 transform transition duration-300 ease-in-out data-closed:-translate-x-full"
          >
            <TransitionChild>
              <div className="absolute top-0 left-full flex w-16 justify-center pt-5 duration-300 ease-in-out data-closed:opacity-0">
                <button type="button" onClick={() => setSidebarOpen(false)} className="-m-2.5 p-2.5">
                  <span className="sr-only">Close sidebar</span>
                  <XMarkIcon aria-hidden="true" className="size-6 text-neutral-100" />
                </button>
              </div>
            </TransitionChild>

            <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-neutral-800/80 bg-neutral-950 px-6 pb-4">
              <div className="flex h-16 shrink-0 items-center">
                <div className="font-semibold tracking-tight text-primary-400">Livd</div>
              </div>

              <nav className="flex flex-1 flex-col">
                <ul role="list" className="flex flex-1 flex-col gap-y-7">
                  <li>
                    <ul role="list" className="-mx-2 space-y-1">
                      {items.map((item) => (
                        <li key={item.name}>
                          <Link
                            href={item.href}
                            onClick={() => setSidebarOpen(false)}
                            className={classNames(
                              item.current
                                ? "bg-neutral-900/60 text-primary-300"
                                : "text-neutral-300 hover:bg-neutral-900/50 hover:text-neutral-100",
                              "group flex gap-x-3 rounded-md p-2 text-sm font-semibold transition"
                            )}
                          >
                            <item.icon
                              aria-hidden="true"
                              className={classNames(
                                item.current
                                  ? "text-primary-300"
                                  : "text-neutral-500 group-hover:text-neutral-200",
                                "size-6 shrink-0"
                              )}
                            />
                            {item.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>

                  <li className="mt-auto">
                    <Link
                      href="/app/settings"
                      onClick={() => setSidebarOpen(false)}
                      className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold text-neutral-300 hover:bg-neutral-900/50 hover:text-neutral-100 transition"
                    >
                      <Cog6ToothIcon
                        aria-hidden="true"
                        className="size-6 shrink-0 text-neutral-500 group-hover:text-neutral-200"
                      />
                      Settings
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          </DialogPanel>
        </div>
      </Dialog>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-neutral-800/80 bg-neutral-950 px-6 pb-4">
          <div className="flex h-16 shrink-0 items-center">
            <div className="font-semibold tracking-tight text-primary-400">Livd</div>
          </div>

          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  {items.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className={classNames(
                          item.current
                            ? "bg-neutral-900/60 text-primary-300"
                            : "text-neutral-300 hover:bg-neutral-900/50 hover:text-neutral-100",
                          "group flex gap-x-3 rounded-md p-2 text-sm font-semibold transition"
                        )}
                      >
                        <item.icon
                          aria-hidden="true"
                          className={classNames(
                            item.current
                              ? "text-primary-300"
                              : "text-neutral-500 group-hover:text-neutral-200",
                            "size-6 shrink-0"
                          )}
                        />
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>

              <li className="mt-auto">
                <Link
                  href="/app/settings"
                  className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold text-neutral-300 hover:bg-neutral-900/50 hover:text-neutral-100 transition"
                >
                  <Cog6ToothIcon
                    aria-hidden="true"
                    className="size-6 shrink-0 text-neutral-500 group-hover:text-neutral-200"
                  />
                  Settings
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Top bar + content */}
      <div className="lg:pl-72">
        <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-neutral-800/80 bg-neutral-950/80 px-4 backdrop-blur sm:gap-x-6 sm:px-6 lg:px-8">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="-m-2.5 p-2.5 text-neutral-300 hover:text-neutral-100 lg:hidden"
          >
            <span className="sr-only">Open sidebar</span>
            <Bars3Icon aria-hidden="true" className="size-6" />
          </button>

          <div aria-hidden="true" className="h-6 w-px bg-neutral-800 lg:hidden" />

          <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
            <form action="#" method="GET" className="grid flex-1 grid-cols-1">
              <input
                name="search"
                placeholder="Search"
                aria-label="Search"
                className="col-start-1 row-start-1 block size-full bg-transparent pl-8 text-base text-neutral-100 outline-none placeholder:text-neutral-500 sm:text-sm"
              />
              <MagnifyingGlassIcon
                aria-hidden="true"
                className="pointer-events-none col-start-1 row-start-1 size-5 self-center text-neutral-500"
              />
            </form>

            <div className="flex items-center gap-x-4 lg:gap-x-6">
              <button type="button" className="-m-2.5 p-2.5 text-neutral-400 hover:text-neutral-100">
                <span className="sr-only">View notifications</span>
                <BellIcon aria-hidden="true" className="size-6" />
              </button>

              <div aria-hidden="true" className="hidden lg:block lg:h-6 lg:w-px lg:bg-neutral-800" />

              <Menu as="div" className="relative">
                <MenuButton className="relative flex items-center">
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">Open user menu</span>
                  <div className="size-8 rounded-full bg-neutral-800 ring-1 ring-neutral-700" />
                  <span className="hidden lg:flex lg:items-center">
                    <span aria-hidden="true" className="ml-4 text-sm font-semibold text-neutral-100">
                      {user.email}
                    </span>
                    <ChevronDownIcon aria-hidden="true" className="ml-2 size-5 text-neutral-500" />
                  </span>
                </MenuButton>

                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2.5 w-48 origin-top-right rounded-md bg-neutral-900 py-2 shadow-lg ring-1 ring-neutral-800 outline-none transition data-closed:scale-95 data-closed:opacity-0"
                >
                  {[
                    { name: "Your profile", href: "#" },
                    { name: "Sign out", href: "#" },
                  ].map((item) => (
                    <MenuItem key={item.name}>
                      {({ focus }) => (
                        <a
                          href={item.href}
                          className={classNames(
                            focus ? "bg-neutral-800/60" : "",
                            "block px-3 py-2 text-sm text-neutral-100"
                          )}
                        >
                          {item.name}
                        </a>
                      )}
                    </MenuItem>
                  ))}
                </MenuItems>
              </Menu>
            </div>
          </div>
        </div>

        <main className="py-10">
          <div className="px-4 sm:px-6 lg:px-8">{children}</div>
        </main>
      </div>
    </div>
  );
}
