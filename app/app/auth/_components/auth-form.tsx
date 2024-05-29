import { Icons } from "@/app/_components/icons";
import Logo from "@/app/_components/logo";
import { Button } from "@/app/_components/ui/button";
import { signIn } from "next-auth/react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";

import { Loader2 } from "lucide-react";
import Link from "next/link";
import React from "react";

import { toast } from "sonner";

const AuthForm = () => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  setTimeout(() => {
    setIsLoading(false);
  }, 3000);

  async function handleLoginGoogle() {
    setIsLoading(true);
    signIn("google", {
      callbackUrl: "/app",
    });
    toast("Login efetuado com sucesso!", {
      description: "Você será redirecionado...",
    });
  }

  return (
    <Card className=" w-[400px] max-w-full p-10">
      <Link href="/">
        <Logo />
      </Link>
      <CardHeader>
        <CardTitle>Acesse sua conta</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <Button
          className="w-full"
          variant="outline"
          disabled={isLoading}
          onClick={handleLoginGoogle}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              <Icons.google className="mr-2 h-4 w-4" />
              Entrar com Google
            </>
          ) : (
            <>
              <Icons.google className="mr-2 h-4 w-4" />
              Entrar com Google
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
};

export default AuthForm;
