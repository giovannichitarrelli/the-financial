import { Badge } from "@/app/_components/ui/badge";
import { isAvailable } from "@/app/_lib/utils";
import { auth } from "@/services/auth";
import { getUserCurrentPlan } from "@/services/stripe";
import { getServerSession } from "next-auth";

export const FreeAlert = async () => {
  const session = await getServerSession(auth);
  const plan = await getUserCurrentPlan(session?.user.id as string);
  return (
    <Badge
      variant="destructive"
      className="mx-auto block text-center text-sm md:flex "
    >
      Plano atual:
      <span className="ml-1 text-sm font-semibold uppercase text-slate-200">
        {plan.name}
      </span>
      . Seja <span className="text-md mx-1 font-bold text-slate-200">PRO</span>{" "}
      e tenha uma experiência completa!
    </Badge>
  );
};

type Props = {
  planName: string;
};
export const AlertMsg = async ({ planName }: Props) => {
  const { plan } = await isAvailable();

  return (
    <div className="flex items-center gap-2">
      <span className="text-md font-semibold">Plano atual:</span>
      <Badge
        variant={plan?.name != "free" ? "success" : "destructive"}
        className=" text-sm uppercase"
      >
        {planName}
      </Badge>
    </div>
  );
};

type PropsStatus = {
  statusName: string;
};
export const StatusAlert = async ({ statusName }: PropsStatus) => {
  const { plan, status } = await isAvailable();

  return (
    <div className="flex items-center gap-2">
      {plan?.name === "free" ? (
        ""
      ) : (
        <>
          <span className="text-md font-semibold">Status da assinatura:</span>
          <Badge
            variant={
              status?.status === "active"
                ? "success"
                : status?.status === "trialing"
                  ? "pending"
                  : "destructive"
            }
            className="text-sm uppercase"
          >
            {statusName}
          </Badge>
        </>
      )}
    </div>
  );
};
