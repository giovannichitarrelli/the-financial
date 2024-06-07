import Link from "next/link";
import { Button } from "../ui/button";
import { SendHorizonal } from "lucide-react";

interface ButtonProps {
  cta: string;
}
const ButtonCta = ({ cta }: ButtonProps) => {
  return (
    <Link href="/auth">
      <Button className="text-md rounded-sm shadow-md shadow-green-800 brightness-100  ">
        {cta}
        <SendHorizonal />
      </Button>
    </Link>
  );
};

export default ButtonCta;
