"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { Loader2, LockKeyhole, Mail } from "lucide-react";

import { Metadata } from "next";

import Link from "next/link";
import Logo from "@/app/_components/logo";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import { Label } from "@/app/_components/ui/label";
import { Input } from "@/app/_components/ui/input";
import { Button } from "@/app/_components/ui/button";
import { Icons } from "@/app/_components/icons";

export const metadata: Metadata = {
  title: "DinDin - Login",
  description: "Página de login do app DinDin.",
};

const AuthForm = () => {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  // const form = useForm();

  async function login(e: React.FormEvent<HTMLFormElement>) {
    setIsLoading(true);

    try {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);

      const data = {
        email: formData.get("email"),
        password: formData.get("password"),
      };

      signIn("credentials", {
        ...data,
        callbackUrl: "/app",
      });
      toast.success("Login efetuado com sucesso!", {
        description: "Por favor, aguarde...",
      });
    } catch (error) {
      toast.error("Aconteceu um erro!", {
        description: "Por favor, tente novamente...",
      });
    }
  }
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
    <Card className=" w-[400px] max-w-full p-10">
      <Link href="/">
        <Logo />
      </Link>
      <CardHeader>
        <CardTitle>Acesse sua conta</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <form onSubmit={login}>
          <Label className="text-sm text-slate-300" htmlFor="email">
            Email
          </Label>
          <div className="flex items-center gap-2  py-1 ">
            <Mail className="h-6 w-6 text-muted-foreground" />
            <Input
              type="email"
              placeholder="dindin@dindin.com"
              name="email"
              className="w-full px-4 outline-none"
              disabled={isLoading}
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
            />
          </div>

          <Label className="text-sm text-slate-300" htmlFor="password">
            Senha
          </Label>
          <div className="flex items-center gap-2 py-1 ">
            <LockKeyhole className="h-6 w-6 text-muted-foreground " />
            <Input
              type="password"
              placeholder="**********"
              name="password"
              className="w-full px-4 outline-none"
              disabled={isLoading}
              autoCapitalize="none"
              autoComplete="password"
              autoCorrect="off"
            />
          </div>
          <Link href="./forgot" className="py-2 text-sm text-green-500">
            Esqueci minha senha
          </Link>
          <Button
            disabled={isLoading}
            className="mt-4 flex w-full items-center gap-2"
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin " />}
            Entrar
          </Button>

          {error === "CredentialsSignin" && (
            <div className="text-red-800">Erro no login</div>
          )}
        </form>

        <div className="relative ">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-2 text-muted-foreground">
              Ou continue usando
            </span>
          </div>
        </div>

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

        <div className="space-x-2 text-center">
          <span className="font-md text-muted-foreground ">
            Não tem uma conta?
          </span>
          <Link href="/register" className="text-slate-200 underline">
            Registre-se
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default AuthForm;

// "use client";
// import { Icons } from "@/app/_components/icons";
// import Logo from "@/app/_components/logo";
// import { Button } from "@/app/_components/ui/button";
// import { signIn } from "next-auth/react";
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
// } from "@/app/_components/ui/card";
// import { Loader2 } from "lucide-react";
// import Link from "next/link";
// import React from "react";
// import { toast } from "sonner";
// import { useForm } from "react-hook-form";
// // import { useForm } from "react-hook-form";
// // import { Label } from "@/app/_components/ui/label";
// // import { Input } from "@/app/_components/ui/input";
// const AuthForm = () => {
//   const [isLoading, setIsLoading] = React.useState<boolean>(false);

//   setTimeout(() => {
//     setIsLoading(false);
//   }, 3000);

//   async function handleLoginGoogle() {
//     setIsLoading(true);
//     signIn("google", {
//       callbackUrl: "/app",
//     });
//     toast.success("Você será redirecionado para o login!", {
//       description: "Por favor, aguarde...",
//     });
//   }

//   const form = useForm();
//   const handleSubmit = form.handleSubmit(async (data) => {
//     try {
//       e.preventDefault();
//       const formData = new FormData(e.currentTarget);

//       const data = {
//         email: formData.get("email"),
//         password: formData.get("password"),
//       };
//       signIn("credentials", {
//         ...data,
//         callbackUrl: "/app",
//       });

//       // await signIn("nodemailer", { email: data.email, redirect: false });
//       toast.success("Login efetuado com sucesso!", {
//         description: "Aguarde enquanto é redirecionado...",
//       });
//     } catch (error) {
//       toast.success("Ocorreu um erro!", {
//         description: "Por favor, tente novamente...",
//       });
//     }
//   });

//   return (
//     <Card className=" w-[400px] max-w-full p-10">
//       <Link href="/">
//         <Logo />
//       </Link>
//       <CardHeader>
//         <CardTitle>Acesse sua conta</CardTitle>
//       </CardHeader>
//       <CardContent className="grid gap-4">
//         {/* <form onSubmit={handleSubmit} className="space-y-4">
//           <div className="space-y-2">
//             <Label htmlFor="email">Email</Label>
//             <Input
//               id="email"
//               placeholder="nome@email.com"
//               required
//               type="email"
//               {...form.register("email")}
//             />
//           </div>

//           <Button
//             className="w-full"
//             type="submit"
//             disabled={form.formState.isSubmitting}
//           >
//             {form.formState.isSubmitting ? (
//               <>
//                 Enviar Magic Link
//                 <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//               </>
//             ) : (
//               "Enviar Magic Link"
//             )}
//           </Button>
//         </form> */}
//         <Button
//           className="w-full"
//           variant="outline"
//           disabled={isLoading}
//           onClick={handleLoginGoogle}
//         >
//           {isLoading ? (
//             <>
//               <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//               <Icons.google className="mr-2 h-4 w-4" />
//               Entrar com Google
//             </>
//           ) : (
//             <>
//               <Icons.google className="mr-2 h-4 w-4" />
//               Entrar com Google
//             </>
//           )}
//         </Button>
//       </CardContent>
//     </Card>
//   );
// };

// export default AuthForm;
