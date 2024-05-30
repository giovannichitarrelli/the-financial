"use client";
import { Button } from "@/app/_components/ui/button";
import { Loader2, Rocket } from "lucide-react";
// import { createCheckoutSessionAction } from "../settings/billing/actions";
import React from "react";

const CtaButtonPro = () => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  setTimeout(() => {
    setIsLoading(false);
  }, 3000);
  async function handleSubmit() {
    setIsLoading(true);
    // await createCheckoutSessionAction();
  }

  return (
    <Button variant="outline" disabled={isLoading} onClick={handleSubmit}>
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Assine por R$9,90/ mês
        </>
      ) : (
        <>
          <Rocket className="mr-2 h-4 w-4" /> Assine por R$9,90
        </>
      )}
    </Button>
  );
};

export default CtaButtonPro;
