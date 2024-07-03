import { cn } from "@/app/_lib/utils";
import Link from "next/link";

export type SideBarGenericProps<T = any> = {
  children: React.ReactNode;
  className?: string;
} & T;

export default function DashboardSideBar({
  className,
  children,
}: SideBarGenericProps) {
  return (
    <aside
      className={cn(
        "hidden   flex-col justify-between border-r lg:flex  ",
        className,
      )}
    >
      {children}
    </aside>
  );
}

export function DashboardSideBarHeader({
  className,
  children,
}: SideBarGenericProps) {
  return (
    <header
      className={cn(
        "flex  min-h-[10vh] items-center border-b  px-4 lg:px-6",
        className,
      )}
    >
      {children}
    </header>
  );
}

export function DashboardSideBarMain({
  className,
  children,
}: SideBarGenericProps) {
  return <main className={cn("   ", className)}>{children}</main>;
}

export function DashboardSideBarNav({
  className,
  children,
}: SideBarGenericProps) {
  return <header className={cn("pb-2  ", className)}>{children}</header>;
}

export function DashboardSideBarNavMain({
  className,
  children,
}: SideBarGenericProps) {
  return (
    <main
      className={cn(
        "flex min-h-[80vh] flex-col justify-between px-0 py-8 md:px-3  ",
        className,
      )}
    >
      {children}
    </main>
  );
}

type SideBarNavLinkProps = {
  href: string;
  active?: boolean;
};

export function DashboardSideBarNavLink({
  className,
  children,
  href,
  active,
}: SideBarGenericProps<SideBarNavLinkProps>) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 rounded-lg p-2 text-muted-foreground transition-all hover:text-primary",
        active && "bg-secondary",
        className,
      )}
    >
      {children}
    </Link>
  );
}

export function DashboardSideBarNavFooter({
  className,
  children,
}: SideBarGenericProps) {
  return (
    <footer className={cn("border-y border-border p-5", className)}>
      {children}
    </footer>
  );
}

// MOBILE DOWN
export function DashboardMenuMobile({
  className,
  children,
}: SideBarGenericProps) {
  return (
    <aside
      className={cn(
        "flex h-20 items-center justify-between border-b bg-muted/40 p-4 lg:hidden",
        className,
      )}
    >
      {children}
    </aside>
  );
}
// MOBILE UP
