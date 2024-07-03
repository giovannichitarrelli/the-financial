import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import { createCheckoutSessionAction } from "./actions";
import { Edit, Rocket } from "lucide-react";
import { AlertMsg, StatusAlert } from "../../_components/plan-alert";
import { isAvailable } from "@/app/_lib/utils";
import BillingAlert from "../../_components/billing-alert";

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
          Você está atualmente no plano
          <span className="ml-1 font-bold uppercase">{plan.name}.</span>
        </CardDescription>
      </CardHeader>

      <CardContent className="pt-6">
        <div className="space-y-2">
          <main>
            <StatusAlert statusName={status.status as string} />
            <div className="flex">
              <AlertMsg planName={plan.name as string} />
            </div>
          </main>
        </div>
      </CardContent>

      <CardFooter className=" border-t border-border pt-6 ">
        {plan.name === "free" ||
        (status.status !== "active" && status.status !== "trialing") ? (
          <form action={createCheckoutSessionAction} className="w-full">
            <BillingAlert
              description="Seja PRO e tenha acesso a todos os recursos! 😉"
              icon={<Rocket className="mr-2 h-4 w-4" />}
              title="Assine por 9,90R$ "
            />
          </form>
        ) : (
          <form action={createCheckoutSessionAction} className="w-full">
            <BillingAlert
              description=" Parabéns! Você é PRO. Esperamos que esteja controlando bem os seus
              gastos! 😉"
              icon={<Edit className="mr-2 h-4 w-4" />}
              title="Gerenciar assinatura "
            />
          </form>
        )}
      </CardFooter>
    </Card>
  );
}
