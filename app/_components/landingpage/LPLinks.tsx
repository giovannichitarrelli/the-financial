import {
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/app/_components/ui/navigation-menu";
import { User } from "lucide-react";
import Link from "next/link";

const PageLinks = () => {
  return (
    <>
      <NavigationMenuItem>
        <Link href="#who" legacyBehavior passHref>
          <NavigationMenuLink className={navigationMenuTriggerStyle()}>
            Quem Somos
          </NavigationMenuLink>
        </Link>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <Link href="#explore" legacyBehavior passHref>
          <NavigationMenuLink className={navigationMenuTriggerStyle()}>
            Recursos
          </NavigationMenuLink>
        </Link>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <Link href="#plans" legacyBehavior passHref>
          <NavigationMenuLink className={navigationMenuTriggerStyle()}>
            Planos
          </NavigationMenuLink>
        </Link>
      </NavigationMenuItem>

      <NavigationMenuItem>
        <Link href="./auth" legacyBehavior passHref>
          <NavigationMenuLink className={navigationMenuTriggerStyle()}>
            <User className="mr-1 h-4 w-4" />
            Login
          </NavigationMenuLink>
        </Link>
      </NavigationMenuItem>
    </>
  );
};

export default PageLinks;
