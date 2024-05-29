import Image from "next/image";

export default function Logo() {
  return (
    <Image
      priority
      src="/logo.png"
      alt="dindin"
      width={0}
      height={0}
      sizes="100vw"
      style={{ width: "120px", height: "40px" }}
    />
  );
}
