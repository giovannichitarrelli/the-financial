import { getServerSession } from "next-auth";
import { ProfileForm } from "./_components/form";
import { auth } from "@/services/auth";

export default async function Page() {
  const session = await getServerSession(auth);
  if (!session?.user) {
    return <div>Usuário não encontrado...</div>;
  }

  return <ProfileForm defaultValues={session?.user} />;
}
