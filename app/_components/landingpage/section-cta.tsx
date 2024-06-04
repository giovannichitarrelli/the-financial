import ButtonCta from "./button-cta";

const SectionCta = () => {
  return (
    <section className=" px-6 py-12">
      <div className=" mx-auto max-w-screen-xl">
        <div className="mx-auto flex w-full flex-col gap-6 text-center lg:w-2/3">
          <span className="mx-auto mb-2 inline-block animate-pulse rounded-md bg-primary/10 p-2 text-center text-xs font-semibold uppercase text-primary">
            Sem complicações
          </span>

          <h2 className="z-10 bg-gradient-to-br from-foreground via-foreground to-zinc-600 bg-clip-text  text-4xl/tight font-extrabold text-transparent  md:text-6xl/tight ">
            Teste o <span className="text-green-500">DinDin</span> gratuitamente
            por 7 dias!
          </h2>

          <p className="font-extralight">
            Tenha acesso a recursos exclusivos que te ajudam a economizar,
            planejar e cuidar melhor do seu dinheiro!
          </p>

          <div className="flex justify-center ">
            <ButtonCta cta="TESTAR 7 DIAS GRÁTIS" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionCta;
