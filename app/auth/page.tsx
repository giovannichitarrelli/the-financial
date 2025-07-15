import AuthForm from "./_components/auth-form";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "The Financial - Login",
  description: "Página de login do app The Financial.",
};
export default function Page() {
  return <AuthForm />;
}
