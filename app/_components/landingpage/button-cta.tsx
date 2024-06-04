import { CircleArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

interface ButtonProps {
  cta: string;
}
const ButtonCta = ({ cta }: ButtonProps) => {
  return (
    <Link href="/auth">
      <Button className="text-md rounded-sm shadow-md shadow-green-800  brightness-100 md:text-lg ">
        {cta}
        <CircleArrowRight className="ml-2" />
      </Button>
    </Link>
  );
};

export default ButtonCta;
