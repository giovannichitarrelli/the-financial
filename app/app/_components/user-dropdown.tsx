import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/_components/ui/avatar";
import { Button } from "@/app/_components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/_components/ui/dropdown-menu";
import { LogOut, Rocket, Settings } from "lucide-react";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import Link from "next/link";
import React from "react";

type UserDropdownProps = {
  user: Session["user"];
};

export function UserDropdown({ user }: UserDropdownProps) {
  if (!user) return;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="link"
          className=" flex h-10 w-full items-center justify-between space-x-2 overflow-hidden !px-0"
        >
          <Avatar className="h-8 w-8">
            <AvatarImage
              src={user?.image as string}
              alt={user.name as string}
            />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <div className="flex flex-1 flex-col space-y-2 text-left">
            {user.name && (
              <p className="text-sm font-medium leading-none">
                {user.name.length > 31
                  ? user.name.substring(0, 28) + "..."
                  : user.name}
              </p>
            )}
            <p className="text-xs leading-none text-muted-foreground">
              {user.email
                ? user.email.length > 31
                  ? user.email.substring(0, 28) + "..."
                  : user.email
                : "Usuário sem email"}
            </p>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link href="/app/settings">
            <DropdownMenuItem>
              <Settings className="mr-3  size-3" />
              Configurações
            </DropdownMenuItem>
          </Link>

          <Link href="/app/settings/billing">
            <DropdownMenuItem>
              <Rocket className="mr-3  size-3" />
              Assinatura
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={() => signOut()}>
          <LogOut className="mr-3  size-3" />
          Sair
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
