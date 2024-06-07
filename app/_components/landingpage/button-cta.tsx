import Link from "next/link";
import { Button } from "../ui/button";
import { SendHorizonal } from "lucide-react";

interface ButtonProps {
  cta: string;
}
const ButtonCta = ({ cta }: ButtonProps) => {
  return (
    <Link href="/auth" className="group">
      <Button className="text-md flex items-center rounded-sm shadow-md shadow-green-800 brightness-100">
        {cta}
        <SendHorizonal className=" w-0 translate-x-[100%] pl-0 opacity-0 transition-all duration-200 group-hover:w-5 group-hover:translate-x-0 group-hover:pl-2 group-hover:opacity-100" />
      </Button>
    </Link>
  );
};

export default ButtonCta;
