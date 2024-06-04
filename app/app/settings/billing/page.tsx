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
import { getUserCurrentPlan } from "@/services/stripe";
import { Pencil } from "lucide-react";
import Link from "next/link";
import { FreeAlert, ProAlert } from "../../_components/plan-alert";
import CtaButtonPro from "../../_components/cta-button-pro";
import { auth } from "@/services/auth";
import { getServerSession } from "next-auth";

export default async function Page() {
  const session = await getServerSession(auth);
  const plan = await getUserCurrentPlan(session?.user.id as string);

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
          <main className="flex justify-center">
            {plan.name === "free" ? <FreeAlert /> : <ProAlert />}
          </main>
        </div>
      </CardContent>
      <CardFooter className=" border-t border-border pt-6 ">
        {plan.name === "free" ? (
          <form action={createCheckoutSessionAction} className="w-full">
            <div className="flex flex-wrap items-center justify-center gap-2 ">
              <span className="min-w-[250px]">
                Seja PRO e tenha acesso a todos os recursos agora mesmo! 😉
              </span>
              <CtaButtonPro />
            </div>
          </form>
        ) : (
          <div className="flex  flex-wrap items-center justify-start gap-2 ">
            <span>
              Parabéns! Você é PRO. Esperamos que esteja controlando bem os seus
              gastos! 😉
            </span>
            <Link
              href="https://wa.me/+5516981969823?text=Ol%C3%A1,%20estou%20dentro%20do%20prazo%20de%20cancelamento%20do%20plano%20PRO%20do%20DinDin%20e%20gostaria%20de%20solicitar%20reembolso."
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
            </Link>
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
