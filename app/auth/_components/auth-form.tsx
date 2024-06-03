"use client";
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
// import { useForm } from "react-hook-form";
// import { Label } from "@/app/_components/ui/label";
// import { Input } from "@/app/_components/ui/input";
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

  // const form = useForm();
  // const handleSubmit = form.handleSubmit(async (data) => {
  //   try {
  //     await signIn("nodemailer", { email: data.email, redirect: false });
  //     toast.success("Link enviado com sucesso!", {
  //       description: "Veja seu email para fazer login....",
  //     });
  //   } catch (error) {
  //     toast.success("Ocorreu um erro ao enviar o link!", {
  //       description: "Por favor, tente novamente...",
  //     });
  //   }
  // });

  return (
    <Card className=" w-[400px] max-w-full p-10">
      <Link href="/">
        <Logo />
      </Link>
      <CardHeader>
        <CardTitle>Acesse sua conta</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        {/* <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              placeholder="nome@email.com"
              required
              type="email"
              {...form.register("email")}
            />
          </div>

          <Button
            className="w-full"
            type="submit"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? (
              <>
                Enviar Magic Link
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              </>
            ) : (
              "Enviar Magic Link"
            )}
          </Button>
        </form> */}
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
