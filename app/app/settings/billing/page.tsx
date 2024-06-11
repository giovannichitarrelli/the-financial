import { Button } from "@/app/_components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import { createCheckoutSessionAction } from "./actions";
import { Pencil } from "lucide-react";
import Link from "next/link";
import { FreeAlert, ProAlert } from "../../_components/plan-alert";
import { isAvailable } from "@/app/_lib/utils";
export default async function Page() {
  const { plan, status } = await isAvailable();
  if (!plan || !status) {
    return (
      <Card>
        <CardHeader className="border-b border-border">
          <CardTitle>Gerenciar assinatura</CardTitle>
          <CardDescription>
            Não foi possível carregar as informações da sua assinatura.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="border-b border-border">
        <CardTitle>Gerenciar assinatura</CardTitle>
        <CardDescription>
          Você está atualmente no plano{" "}
          <span className="font-bold uppercase">{plan.name}.</span> Se estiver
          dentro do prazo de 7 dias de teste, poderá solicitar cancelamento e
          reembolso.
        </CardDescription>
      </CardHeader>

      <CardContent className="pt-6">
        <div className="space-y-2">
          <main>
            Status da assinatura:{" "}
            {status.status === "active" ? "Ativo" : status.status}
            <div className="flex">
              {plan.name === "free" || status.status != "active" ? (
                <FreeAlert />
              ) : (
                <ProAlert />
              )}
            </div>
          </main>
        </div>
      </CardContent>
      <CardFooter className=" border-t border-border pt-6 ">
        {plan.name === "free" || status.status != "active" ? (
          <form action={createCheckoutSessionAction} className="w-full">
            <div className="flex flex-wrap items-center justify-center gap-2 ">
              <span className="min-w-[250px]">
                Seja PRO e tenha acesso a todos os recursos agora mesmo! 😉
              </span>
            </div>
          </form>
        ) : (
          <div className="flex w-full flex-wrap items-center justify-between gap-2">
            <span>
              Parabéns! Você é PRO. Esperamos que esteja controlando bem os seus
              gastos! 😉
            </span>
            {/* <Link
              href="mailto:suporte@meudindin.online"
              target="_blank"
              rel="noopener noreferrer"
              passHref={true}
            >
              <Button variant="destructive">
                <>
                  <Pencil className="mr-2 h-4 w-4" />
                  Solicitar cancelamento
                </>
              </Button>
            </Link> */}
            <Link
              href="https://billing.stripe.com/p/login/7sI6pQ1qx3PU7xm6oo"
              target="_blank"
            >
              <Button variant="outline">
                {" "}
                <>
                  <Pencil className="mr-2 h-4 w-4" />
                  Gerenciar assinatura
                </>
              </Button>
            </Link>
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
