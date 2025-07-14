import { PropsWithChildren } from "react";
import { SettingsSidebar } from "./_components/settings-sidebar";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="mx-auto max-w-7xl p-4 sm:px-6 lg:px-8">
      <header className="text-lg font-medium">Settings</header>
      <main>
        <div>
          <SettingsSidebar />
          <div>{children}</div>
        </div>
      </main>
    </div>
  );
}
