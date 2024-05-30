import { Badge } from "@/app/_components/ui/badge";
import { auth } from "@/app/_lib/auth";
import { getUserCurrentPlan } from "@/app/_lib/stripe";
import { BadgeAlert } from "lucide-react";

export const FreeAlert = async () => {
  const session = await auth();
  const plan = await getUserCurrentPlan(session?.user.id as string);
  return (
    <Badge
      variant="destructive"
      className="mx-auto block text-center text-sm md:flex "
    >
      <BadgeAlert className="mx-auto md:mr-2" />
      Atenção: Seu plano é o
      <span className="text-md ml-1 font-bold uppercase text-slate-200">
        {" "}
        {plan.name}
      </span>
      . Seja <span className="text-md mx-1 font-bold text-slate-200">PRO</span>{" "}
      e tenha uma experiência completa!
    </Badge>
  );
};

export const ProAlert = () => {
  return (
    <Badge
      variant="success"
      className="mx-auto block text-center text-sm md:flex "
    >
      <BadgeAlert className="mx-auto md:mr-2  " /> Parabéns! Seu plano é o
      <span className="text-md ml-1 font-bold text-slate-200"> PRO</span>.
      Esperamos que esteja gostando!
    </Badge>
  );
};
