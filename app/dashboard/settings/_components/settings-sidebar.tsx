"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
} from "@/app/_components/ui/menubar";
import { cn } from "@/app/_lib/utils";

export function SettingsSidebar() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <aside>
      <div className="max-w-fit py-4">
        <Menubar>
          <MenubarMenu>
            <MenubarTrigger
              asChild
              className={cn(
                isActive("/dashboard/settings") &&
                  "bg-primary data-[state=open]:bg-primary",
              )}
            >
              <Link href="/dashboard/settings">Profile</Link>
            </MenubarTrigger>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger
              asChild
              className={cn(
                isActive("/dashboard/settings/theme") &&
                  "bg-primary data-[state=open]:bg-primary",
              )}
            >
              <Link href="/dashboard/settings/theme">Theme</Link>
            </MenubarTrigger>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger
              asChild
              className={cn(
                isActive("/dashboard/settings/billing") &&
                  "bg-primary data-[state=open]:bg-primary",
              )}
            >
              <Link href="/dashboard/settings/billing">Subscription</Link>
            </MenubarTrigger>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger
              asChild
              className={cn(
                isActive("/dashboard/settings/support") &&
                  "bg-primary data-[state=open]:bg-primary  ",
              )}
            >
              <Link href="/dashboard/settings/support">Support</Link>
            </MenubarTrigger>
          </MenubarMenu>
        </Menubar>
      </div>
    </aside>
  );
}
