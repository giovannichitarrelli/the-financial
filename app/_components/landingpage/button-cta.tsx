import Link from "next/link";
import { Button } from "../ui/button";

interface ButtonProps {
  cta: string;
}
const ButtonCta = ({ cta }: ButtonProps) => {
  return (
    <Link href="/auth" className="group">
      <Button className="text-md flex items-center rounded-sm shadow-md   brightness-100">
        {cta}
      </Button>
    </Link>
  );
};

export default ButtonCta;
