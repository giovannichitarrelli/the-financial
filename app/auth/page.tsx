import Footer from "@/app/_components/footer";
import AuthForm from "./_components/auth-form";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "DinDin - Login",
  description: "Página de login do app DinDin.",
};
export default function Page() {
  return (
    <>
      <div className="flex min-h-[80vh] w-full items-center justify-center px-4 py-12">
        <div className="mx-auto w-[400px] max-w-full space-y-4">
          <AuthForm />
        </div>
      </div>
      <Footer />
    </>
  );
}
