import ButtonCta from "./button-cta";

const SectionCta = () => {
  return (
    <section className="bg-green-50 px-6 py-12">
      <div className=" mx-auto max-w-screen-xl">
        <div className="mx-auto flex w-full flex-col gap-6 text-center lg:w-2/3">
          <p className="text-green-500">Sem complicações</p>
          <h2 className="text-4xl font-extrabold text-black lg:text-6xl">
            Teste o <span className="text-green-500">DinDin</span> gratuitamente
            por 7 dias!
          </h2>
          <p className="font-extralight	text-black">
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
