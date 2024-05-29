import { CircleArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

interface ButtonProps {
  cta: string;
}
const ButtonCta = ({ cta }: ButtonProps) => {
  return (
    <Link href="/auth">
      <Button className="font-meddium flex items-center p-6 text-lg shadow-md shadow-green-800 brightness-100">
        {cta}
        <CircleArrowRight className="ml-2" />
      </Button>
    </Link>
  );
};

export default ButtonCta;
