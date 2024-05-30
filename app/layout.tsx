import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
// import AuthProvider from "./_providers/auth";
import { ThemeProvider } from "./_components/theme-provider";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DinDin - Gestor de finanças pessoais",
  description: "Aplicativo para gerenciamento de finanças pessoais",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={inter.className}>
        {/* <AuthProvider> */}
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        {/* </AuthProvider> */}
        <Toaster />
      </body>
    </html>
  );
}
