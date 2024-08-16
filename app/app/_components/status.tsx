import { Badge } from "@/app/_components/ui/badge";
import { Check, Clock, Pin, PinOff } from "lucide-react";

type StatusBadgeProps = {
  doneAt?: Date | null;
  expiryAt?: Date | null;
};

export function StatusPayment({ doneAt, expiryAt }: StatusBadgeProps) {
  const currentDate = new Date();
  const pastDate = new Date(currentDate.getTime() - 24 * 60 * 60 * 1000);

  let badgeContent;
  let badgeVariant:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "foreground"
    | "success"
    | "pending";

  if (doneAt) {
    badgeContent = (
      <>
        <Check className="mr-2  size-3" />
        Concluído
      </>
    );
    badgeVariant = "success";
  } else if (expiryAt && expiryAt < pastDate) {
    badgeContent = (
      <>
        <Clock className="mr-2  size-3" />
        Atrasado
      </>
    );
    badgeVariant = "destructive";
  } else {
    badgeContent = (
      <>
        <Check className="mr-2  size-3" />
        Pendente
      </>
    );
    badgeVariant = "outline";
  }

  return <Badge variant={badgeVariant}>{badgeContent}</Badge>;
}

type StatusBadgeFixedProps = {
  isFixed?: boolean;
};

type BadgeVariant =
  | "default"
  | "destructive"
  | "outline"
  | "secondary"
  | "foreground"
  | "success"
  | "pending";

export function StatusFixed({ isFixed }: StatusBadgeFixedProps) {
  const fixed = isFixed;
  let badgeContent;
  let badgeVariant: BadgeVariant;

  if (fixed === true) {
    badgeContent = (
      <>
        <Pin className="mr-2  size-3" />
        Fixo
      </>
    );
    badgeVariant = "foreground";
  } else {
    badgeContent = (
      <>
        <PinOff className="mr-2  size-3" />
        Não fixo
      </>
    );
    badgeVariant = "outline";
  }

  return <Badge variant={badgeVariant}>{badgeContent}</Badge>;
}
