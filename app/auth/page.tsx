import AuthForm from "./_components/auth-form";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "DinDin - Login",
  description: "Página de login do app DinDin.",
};
export default function Page() {
  return <AuthForm />;
}
