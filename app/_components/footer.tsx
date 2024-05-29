import Link from "next/link";
import Logo from "./logo";

const Footer = () => {
  return (
    <footer className="mt-auto  w-full border-t border-border p-6">
      <div className="m-auto flex max-w-screen-xl flex-col gap-3">
        <Link href="/">
          <Logo />
        </Link>
        <p className="text-xs font-bold text-gray-400 opacity-75 ">
          ©2024 DinDin. CNPJ 43.430.221/0001-02
        </p>
      </div>
    </footer>
  );
};

export default Footer;
