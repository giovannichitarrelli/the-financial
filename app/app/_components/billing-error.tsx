"use client";
import { Button } from "@/app/_components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/app/_components/ui/card";
import { BadgeAlert, Loader2, LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import React from "react";

const BillingError = () => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const handleSignOut = () => {
    setIsLoading(true);
    signOut();
  };
  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4 py-6">
      <Card>
        <CardHeader className="border-b border-border">
          <CardTitle className="flex items-center justify-between">
            <p> Ops! Algo inesperado aconteceu.</p>
            <BadgeAlert className="ml-2 h-5 w-5 text-red-500 " />
          </CardTitle>
          <CardDescription>
            Não foi possível carregar as informações da sua assinatura.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="py-4">
            <p>Por favor, saia e entre novamente usando seu login.</p>
            <p className="text-muted-foreground">
              Caso o erro persista, não exite em entrar em contato conosco.
            </p>
          </div>
          <Button disabled={isLoading} onClick={() => handleSignOut()}>
            {isLoading ? (
              <Loader2 className="mr-3 size-4" />
            ) : (
              <LogOut className="mr-3 size-4" />
            )}
            Sair
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default BillingError;
