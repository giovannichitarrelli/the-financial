import { PropsWithChildren } from "react";
import { MainSideBar } from "./_components/main-sidebar";
import { auth } from "@/services/auth";

export default async function Layout({ children }: PropsWithChildren) {
  const session = await auth();

  return (
    <div className="grid w-full lg:grid-cols-[270px_1fr] ">
      <div className="lg:relative">
        <div className=" lg:fixed lg:max-w-[270px] ">
          <MainSideBar user={session?.user} />
        </div>
      </div>

      <main>{children}</main>
    </div>
  );
}
