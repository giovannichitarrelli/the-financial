import { ArrowUpCircleIcon } from "lucide-react";
// import Image from "next/image";

export default function Logo() {
  return (
    // <Image
    //   priority
    //   src="/logo.png"
    //   alt="dindin"
    //   width={0}
    //   height={0}
    //   sizes="100vw"
    //   style={{ width: "120px", height: "40px" }}
    // />

    <div className="flex items-center gap-2">
      <ArrowUpCircleIcon className="h-5 w-5 text-primary" />
      <span className="text-base font-semibold">The financial.</span>
    </div>
  );
}
