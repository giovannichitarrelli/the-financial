"use client";
import { Button } from "@/app/_components/ui/button";
import { Loader2, LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import Image from "next/image";
import React from "react";

const Error = () => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const handleSignOut = () => {
    setIsLoading(true);
    signOut();
  };
  return (
    <div className="flex min-h-[90vh] flex-col items-center justify-center gap-4  p-4">
      <Image
        src="/IA.jpg"
        priority
        width={0}
        height={0}
        sizes="100vw"
        style={{ width: "300px", height: "300px", maxWidth: "100%" }}
        alt="Imagem erro"
      />
      <div className="text-center">
        <h2 className="mb-4 text-2xl font-bold">
          Ops! Algo inesperado aconteceu.
        </h2>
        <p>Por favor, saia e entre novamente usando seu login.</p>
        <p className="mb-4 text-muted-foreground">
          Caso o erro persista, não exite em entrar em contato conosco.
        </p>
        <Button disabled={isLoading} onClick={() => handleSignOut()}>
          {isLoading ? (
            <Loader2 className="mr-3 size-4" />
          ) : (
            <LogOut className="mr-3 size-4" />
          )}
          Sair
        </Button>
      </div>
    </div>
  );
};

export default Error;
