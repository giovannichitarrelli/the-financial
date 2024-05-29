import Footer from "@/app/_components/footer";
import AuthForm from "./_components/auth-form";

export default function Page() {
  return (
    <>
      <div className="flex w-full items-center justify-center py-12">
        <div className="mx-auto w-[400px] max-w-full space-y-4">
          <AuthForm />
        </div>
      </div>
      <Footer />
    </>
  );
}
