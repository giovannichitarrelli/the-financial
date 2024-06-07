"use client";
import { Icons } from "@/app/_components/icons";
import { Button } from "@/app/_components/ui/button";
import { signIn } from "next-auth/react";
import { Loader2 } from "lucide-react";
// import Link from "next/link";
import React from "react";
import { toast } from "sonner";
import Image from "next/image";
import Logo from "@/app/_components/logo";
import { Card, CardContent, CardHeader } from "@/app/_components/ui/card";
// import { Input } from "@/app/_components/ui/input";
// import { Label } from "@/app/_components/ui/label";
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
    toast.success("Você será redirecionado para o login!", {
      description: "Por favor, aguarde...",
    });
  }
  return (
    <div className="min-h-[100vh] w-full  lg:grid lg:grid-cols-2">
      <div className="flex items-center justify-center py-12">
        <Card className="mx-auto  grid w-[350px] gap-6">
          <CardHeader className="grid gap-2 text-center">
            <div className="mx-auto">
              <Logo />
            </div>
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-balance text-muted-foreground">
              {/* Insira o email abaixo para fazer login na sua conta */}
              Faça login com google
            </p>
          </CardHeader>
          <CardContent className="grid gap-4">
            {/* <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="email@dindin.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Senha</Label>
                <Link
                  href="/forgot-password"
                  className="ml-auto inline-block text-sm underline"
                >
                  Esqueceu a senha?
                </Link>
              </div>
              <Input id="password" type="password" required />
            </div>
            <Button type="submit" className="w-full">
              Login
            </Button> */}

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
                  Login com Google
                </>
              ) : (
                <>
                  <Icons.google className="mr-2 h-4 w-4" />
                  Login com Google
                </>
              )}
            </Button>
          </CardContent>
          {/* <div className="mt-4 text-center text-sm">
            Não tem uma conta?{" "}
            <Link href="#" className="underline">
              Registre-se
            </Link>
          </div> */}
        </Card>
      </div>
      <div className="hidden bg-muted lg:block">
        <Image
          src="/login-dindin.svg"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover "
        />
      </div>
    </div>
  );
};

export default AuthForm;
