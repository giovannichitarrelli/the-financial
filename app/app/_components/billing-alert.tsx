"use client";
import { Button } from "@/app/_components/ui/button";
import { Loader2 } from "lucide-react";
import { createCheckoutSessionAction } from "../settings/billing/actions";
import React from "react";
import { ReactElement } from "react";

type Props = {
  description: string;
  icon: ReactElement<any>;
  title: string;
};

const BillingAlert = ({ description, icon, title }: Props) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  setTimeout(() => {
    setIsLoading(false);
  }, 3000);

  async function handleSubmit() {
    setIsLoading(true);
    await createCheckoutSessionAction();
  }
  return (
    <div className="flex flex-wrap items-center gap-2 md:justify-between ">
      <span>{description}</span>
      <Button variant="outline" disabled={isLoading} onClick={handleSubmit}>
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            {title}
          </>
        ) : (
          <>
            {icon}
            {title}
          </>
        )}
      </Button>
    </div>
  );
};

export default BillingAlert;
