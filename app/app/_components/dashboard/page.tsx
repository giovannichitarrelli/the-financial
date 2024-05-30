import { cn } from "@/app/_lib/utils";

export type DashboardPageGenericProps<T = any> = {
  children: React.ReactNode;
  className?: string;
} & T;

export function DashboardPage({
  className,
  children,
}: DashboardPageGenericProps) {
  return <section className={cn("", className)}>{children}</section>;
}

export function DashboardPageHeader({
  className,
  children,
}: DashboardPageGenericProps) {
  return (
    <header
      className={cn(
        "flex h-[10vh] items-center justify-between border-b border-border px-6 py-3",
        className,
      )}
    >
      {children}
    </header>
  );
}

export function DashboardPageHeaderTitle({
  className,
  children,
}: DashboardPageGenericProps) {
  return <h2 className={cn("text-lg font-bold", className)}>{children}</h2>;
}

export function DashboardPageHeaderNav({
  className,
  children,
}: DashboardPageGenericProps) {
  return <nav className={cn("", className)}>{children}</nav>;
}

export function DashboardPageMain({
  className,
  children,
}: DashboardPageGenericProps) {
  return (
    <main
      className={cn(
        "flex min-h-[80vh] flex-col gap-4 p-4 lg:min-h-[90vh] lg:gap-6 lg:p-6",
        className,
      )}
    >
      {children}
    </main>
  );
}
