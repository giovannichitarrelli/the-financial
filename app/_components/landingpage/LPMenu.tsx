import { Button } from "@/app/_components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/app/_components/ui/sheet";
import { Menu } from "lucide-react";
import PageLinks from "./LPLinks";
import Logo from "../logo";
import Link from "next/link";
import { NavigationMenu, NavigationMenuList } from "../ui/navigation-menu";

export default function PageMenu() {
  return (
    <>
      {/* DESKTOP */}
      <header className="mx-auto hidden max-w-screen-xl items-center justify-between gap-3 p-6 lg:flex">
        <Link href="/">
          <Logo />
        </Link>
        <NavigationMenu>
          <NavigationMenuList className="flex items-center justify-between">
            <PageLinks />
          </NavigationMenuList>
        </NavigationMenu>
      </header>

      {/* MOBILE */}
      <header className="m-auto flex items-center justify-between p-4  lg:hidden">
        <Logo />
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 lg:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Menu</span>
            </Button>
          </SheetTrigger>

          <SheetContent side="right">
            <div className="border-b border-border pb-4">
              <Logo />
            </div>

            <NavigationMenu>
              <NavigationMenuList className="mt-6 flex flex-col items-start gap-5">
                <PageLinks />
              </NavigationMenuList>
            </NavigationMenu>
          </SheetContent>
        </Sheet>
      </header>
    </>
  );
}
