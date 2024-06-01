"use client";
import React from "react";
import { Button } from "./_components/ui/button";
import { Card, CardContent } from "./_components/ui/card";
import {
  BarChart2,
  BarChart3,
  Check,
  CircleArrowRight,
  CircleCheck,
  CircleFadingPlus,
  ClipboardList,
  Computer,
  Grid2X2,
  Grid2x2,
  HandCoins,
  Heart,
  LogOut,
  ShieldBan,
} from "lucide-react";
import Autoplay from "embla-carousel-autoplay";
import { Badge } from "./_components/ui/badge";
import ButtonCta from "./_components/landingpage/button-cta";
import Image from "next/image";
import SectionCta from "./_components/landingpage/section-cta";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./_components/ui/carousel";
import CardStarsIcon from "./_components/landingpage/stars";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./_components/ui/accordion";
import Link from "next/link";
import Footer from "./_components/footer";
import { SpeedInsights } from "@vercel/speed-insights/next";
export default function Home() {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true, isFinite }),
  );
  return (
    <div>
      {/* <PageMenu /> */}
      <main>
        <SpeedInsights />
        <section className=" m-auto flex max-w-screen-xl flex-col justify-center  gap-3 px-6 py-12 md:flex-row">
          <div className="flex w-full flex-col gap-6 md:w-1/2">
            <h1 className=" text-4xl font-extrabold lg:text-6xl">
              <span className="text-gradient-dindin-hero bg-clip-text text-transparent">
                Organize
              </span>{" "}
              seus gastos de forma Prática.
              <span className="text-gradient-dindin-hero bg-clip-text text-transparent ">
                {" "}
                Controlador Financeiro
              </span>{" "}
              que você sempre quis!
            </h1>
            <p className="font-extralight	">
              O DinDin é uma solução completa, intuitiva e segura. Com ele, você
              dará adeus a desorganização financeira da sua família!
            </p>
            <div>
              <ButtonCta cta="TESTAR 7 DIAS GRÁTIS" />
            </div>
          </div>

          <div className="w-full space-y-4 md:w-1/2">
            <Image
              priority
              src="/dindin-dashboard-main.png"
              alt="dindin-dashboard-main"
              className="object-contain"
              width={1080}
              height={565}
            />
            <div className="grid-cols-2 gap-4 space-y-3 lg:grid lg:space-y-0">
              <Card className=" flex items-center ">
                <CardContent className="flex items-center pt-6">
                  <div className="mr-3 rounded bg-foreground p-2">
                    <Computer className="text-muted" />
                  </div>
                  <span className="font-extralight	">
                    Pode usar no celular ou no computador
                  </span>
                </CardContent>
              </Card>
              <Card className="flex items-center ">
                <CardContent className="flex items-center pt-6">
                  <div className="mr-3 rounded bg-foreground p-2">
                    <ShieldBan className="text-muted" />
                  </div>
                  <span className="font-extralight	">
                    Livre dos bugs das planilhas de excel
                  </span>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="bg-gradient-dindin-hero w-full px-6 py-12">
          <div className="m-auto text-center lg:w-2/3 ">
            <Badge variant="secondary" className="text-md shadow-md">
              Teste gratuitamente
            </Badge>
            <h2 className="py-4 text-center text-4xl font-extrabold lg:text-6xl  ">
              Não deixe que suas despesas fiquem desorganizadas!
            </h2>
            <div className=" flex justify-center pt-2">
              <ButtonCta cta="TESTAR GRATUITAMENTE" />
            </div>
          </div>
        </section>

        <section className="first-line m-auto flex max-w-screen-xl flex-col items-center justify-center gap-3 px-6 py-12 md:flex-row">
          <div className="w-full md:w-1/3">
            <Image
              src="/analises-mobile.png"
              alt="analises-mobile"
              className="object-contain"
              width={1390}
              height={500}
            />
          </div>

          <div className="flex w-full flex-col gap-6 md:w-2/3">
            <p className="text-green-500">Organize suas despesas</p>
            <h2 className="text-4xl font-extrabold lg:text-6xl">
              Não sabe pra onde vai o dinheiro?{" "}
              <span className="text-gradient-dindin-hero bg-clip-text text-transparent">
                Controle gastos{" "}
              </span>
              com sabedoria.
            </h2>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <Card>
                <CardContent className="flex flex-col gap-3 p-4 pt-4">
                  <div className="flex items-center justify-between">
                    <Badge className="max-w-fit">Passo 1</Badge>
                    <ClipboardList className="h-4 w-4" />
                  </div>
                  <h3 className="text-xl font-bold">
                    Cadastre todos os seus gastos
                  </h3>
                  <p className="font-extralight	">
                    Mantenha tudo sob controle cadastrando suas contas e
                    despesas organizadas por categoria
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex flex-col gap-3 p-4 pt-4">
                  <div className="flex items-center justify-between">
                    <Badge className="max-w-fit">Passo 2</Badge>
                    <CircleFadingPlus className="h-4 w-4" />
                  </div>
                  <h3 className="text-xl font-bold">
                    Cadastre seus recebimentos
                  </h3>
                  <p className="font-extralight	">
                    Fixos e variáveis com data de expiração para você ficar
                    alerta
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex flex-col gap-3 p-4 pt-4">
                  <div className="flex items-center justify-between">
                    <Badge className="max-w-fit">Passo 3</Badge>
                    <HandCoins className="h-4 w-4" />
                  </div>
                  <h3 className="text-xl font-bold">
                    Cadastre seus investimentos
                  </h3>
                  <p className="font-extralight	">
                    Mantenha todos os seus investimentos, incluindo reserva de
                    emergência, cadastrados e atualizados
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex flex-col gap-3 p-4 pt-4">
                  <div className="flex items-center justify-between">
                    <Badge className="max-w-fit">Passo 4</Badge>
                    <Grid2X2 className="h-4 w-4" />
                  </div>

                  <h3 className="text-xl font-bold">Categorias flexíveis</h3>
                  <p className="font-extralight	">
                    Você tem a liberdade de criar e organizar as categorias da
                    melhor maneira possível
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="bg-muted/40 px-6 py-12">
          <div className=" m-auto flex max-w-screen-xl flex-col items-center justify-center gap-3 md:flex-row">
            <div className="flex w-full flex-col gap-6 md:w-1/2">
              <p className="text-green-500">
                Controle de gastos em primeiro lugar
              </p>
              <h2 className=" text-4xl font-extrabold lg:text-6xl">
                Tenha a{" "}
                <span className="text-gradient-dindin-hero bg-clip-text text-transparent">
                  gestão de gastos
                </span>{" "}
                que sempre sonhou
              </h2>
              <ul className="flex flex-col gap-3">
                <li className="flex items-center font-extralight">
                  <CircleCheck className="mr-2 h-4 w-4 text-green-500" />{" "}
                  Facilidade na inserção de gastos e recebidos
                </li>
                <li className="flex items-center font-extralight">
                  <CircleCheck className="mr-2 h-4 w-4 text-green-500" />
                  Cadastro de categorias flexíveis
                </li>
                <li className="flex items-center font-extralight">
                  <CircleCheck className="mr-2 h-4 w-4 text-green-500" />
                  Gerenciamento do cofrinho com controle de saques
                </li>
                <li className="flex items-center font-extralight">
                  <CircleCheck className="mr-2 h-4 w-4 text-green-500" />
                  Filtros mensais para melhor observação dos gastos
                </li>
                <li className="flex items-center font-extralight">
                  <CircleCheck className="mr-2 h-4 w-4 text-green-500" />{" "}
                  Alertas de contas a pagar e recebimentos em atraso
                </li>
                <li className="flex items-center font-extralight">
                  <CircleCheck className="mr-2 h-4 w-4 text-green-500" />
                  Visualização de porcentagens do salário investido mensalmente
                </li>
              </ul>
              <div className="grid-cols-2 gap-4 space-y-3 lg:grid lg:space-y-0">
                <Card className=" flex items-center ">
                  <CardContent className="flex items-center pt-6">
                    <div className="mr-3 rounded bg-foreground p-2">
                      <CircleCheck className="text-muted" />
                    </div>
                    <span className="font-extralight ">
                      Livre de bugs das planilhas do excel
                    </span>
                  </CardContent>
                </Card>
                <Card className="flex items-center ">
                  <CardContent className="flex items-center pt-6">
                    <div className="mr-3 rounded bg-foreground p-2">
                      <CircleCheck className="text-muted" />
                    </div>
                    <span className="font-extralight	">
                      Plataforma de gestão de gastos simples e intuitiva
                    </span>
                  </CardContent>
                </Card>
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <Image
                src="/dindin-analises-desktop.png"
                alt="dindin-analises-desktop"
                className="mx-auto object-contain"
                width={860}
                height={960}
              />
            </div>
          </div>
        </section>

        {/* <SectionCta /> */}

        <section id="plans" className="px-6 py-12 ">
          <div className="m-auto flex max-w-screen-xl flex-col gap-3 text-center">
            <h2 className=" text-4xl font-extrabold lg:text-6xl">
              Experimente um controle que{" "}
              <span className="text-gradient-dindin-hero bg-clip-text text-transparent">
                realmente funciona
              </span>{" "}
              e que tem tudo que você precisa
            </h2>
            <p className="font-extralight ">
              Após o período de teste você poderá escolher um dos planos abaixo
              para continuar controlando suas finanças.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-6">
              <Card className="w-full rounded-lg border-t border-green-500 p-0 lg:h-[260px] lg:w-1/2">
                <CardContent className="p-0">
                  <p className="rounded-t-md bg-green-500 p-2 text-xl font-semibold">
                    50% de economia
                  </p>
                  <div className="p-6">
                    <p className="text-xl">Assinatura mensal</p>
                    <div className="flex items-center justify-center gap-2 py-6">
                      <span className="text-lg text-red-500 line-through	lg:text-xl">
                        R$ 19,90
                      </span>
                      <span className="text-4xl font-bold text-green-500 lg:text-6xl">
                        R$ 9,90
                      </span>
                    </div>
                    <div className="flex items-center justify-center gap-4">
                      <Badge>50%OFF</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
              {/* <Card className="border-t border-green-500 w-full lg:w-1/2 rounded-lg p-0 lg:h-[260px]">
                <CardContent className="p-0">
                  <p className="bg-green-500 rounded-t-md p-2 text-xl font-semibold">
                    50% de economia
                  </p>
                  <div className="p-6">
                    <p className="text-xl">Assinatura anual</p>
                    <div className="flex items-center justify-center gap-2 py-6">
                      <span>12x</span>
                      <span className="text-6xl font-bold text-green-500">
                        R$ 9,90
                      </span>
                    </div>
                    <div className="flex items-center justify-center gap-4">
                      <span className="text-lg"> ou R$ 99,90 à vista</span>
                      <Badge>20%OFF</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card> */}
              {/* <Card className="w-full lg:w-1/3 rounded-lg p-0 lg:h-[260px] flex items-center justify-center">
                <CardContent className="p-6">
                  <div>
                    <p className="text-xl">Assinatura Mensal</p>
                    <div className="flex items-center justify-center gap-2 py-6">
                      <span>12x</span>
                      <span className="text-5xl font-bold ">R$ 19,90</span>
                    </div>
                    <div className="flex items-center justify-center gap-4">
                      <span className="text-lg"> valor sem desconto</span>
                    </div>
                  </div>
                </CardContent>
              </Card> */}
            </div>

            <Card className="m-auto mt-6 flex max-w-screen-lg flex-col gap-3 text-center lg:px-6">
              <CardContent className="gap-6 py-6 lg:flex lg:items-center ">
                <div className="lg:w-2/3">
                  <h3 className=" mb-4 text-3xl font-extrabold lg:text-left lg:text-5xl">
                    Alcance o bem-estar financeiro com a
                    <span className="text-green-500"> DinDin</span>!
                  </h3>
                  <p className=" mb-5 font-light lg:mb-0 lg:text-left ">
                    Teste gratuitamente por 7 dias! Se não gostar, é só pedir o
                    cancelamento :)
                  </p>
                </div>

                <div className="flex justify-center lg:w-1/3">
                  <ButtonCta cta="TESTAR 7 DIAS GRÁTIS" />
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="bg-muted/40 px-6 py-12 ">
          <div className="m-auto flex max-w-screen-xl flex-col gap-3 text-center">
            <p className="text-green-500 ">Controle total</p>
            <h2 className=" text-4xl font-extrabold lg:text-6xl">
              Por que controlar suas finanças
            </h2>
            <div className="mx-auto mt-5 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card className="max-w-full md:w-[300px]">
                <CardContent className="p-4 pt-4">
                  <Image
                    src="/planejamento-financeiro.webp"
                    alt="planejamento fiannceiro"
                    width={45}
                    height={45}
                    className="mx-auto mb-2 object-cover"
                  />

                  <div>
                    <h3 className="text-md font-bold">
                      Planejamento financeiro
                    </h3>
                    <p className="text-sm	font-extralight">
                      Controlar suas despesas permite um melhor planejamento
                      financeiro, ajudando a evitar gastos impulsivos e
                      garantindo que seu dinheiro seja direcionado para as áreas
                      mais importantes.
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card className="md:w-[300px]">
                <CardContent className="p-4 pt-4">
                  <Image
                    src="/reducao-gastos.png"
                    alt="redução de gastos"
                    width={65}
                    height={65}
                    className="mx-auto mb-2 object-cover"
                  />
                  <div>
                    <h3 className="text-md font-bold">Redução de Gastos</h3>
                    <p className="text-sm	font-extralight">
                      Ao analisar suas despesas, você pode identificar onde está
                      gastando dinheiro de forma desnecessária e, assim, tomar
                      medidas para reduzir esses gastos, economizando no longo
                      prazo.
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card className="md:w-[300px]">
                <CardContent className="p-4 pt-4">
                  <Image
                    src="/metas-financeiras.png"
                    alt="metas financeiras"
                    width={65}
                    height={65}
                    className="mx-auto mb-2 object-cover"
                  />
                  <div>
                    <h3 className="text-md font-bold">Metas Financeiras</h3>
                    <p className="text-sm	font-extralight">
                      Ao acompanhar suas despesas, você pode definir metas
                      financeiras claras e realistas, como economizar para uma
                      viagem, um carro novo ou aposentadoria, e acompanhar seu
                      progresso em direção a esses objetivos.
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card className="md:w-[300px]">
                <CardContent className="p-4 pt-4">
                  <Image
                    src="/indentificacao-dividas.png"
                    alt="identificacao-dividas"
                    width={65}
                    height={65}
                    className="mx-auto mb-2 object-cover"
                  />
                  <div>
                    <h3 className="text-md font-bold">
                      Identificação de dívidas
                    </h3>
                    <p className="text-sm	font-extralight">
                      Monitorar suas despesas ajuda a evitar o acúmulo de
                      dívidas desnecessárias, permitindo que você mantenha suas
                      finanças sob controle e evite entrar em situações de
                      endividamento excessivo.
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card className="md:w-[300px]">
                <CardContent className="p-4 pt-4">
                  <Image
                    src="/decisoes-fundamentadas.png"
                    alt="decisões fundamentadas"
                    width={65}
                    height={65}
                    className="mx-auto mb-2 object-cover"
                  />
                  <div>
                    <h3 className="text-md font-bold">
                      Decisões Fundamentadas
                    </h3>
                    <p className="text-sm	font-extralight">
                      Com dados concretos sobre seus hábitos de gastos, você
                      pode tomar decisões financeiras mais fundamentadas, como
                      escolher entre comprar ou alugar, investir em determinados
                      ativos ou pagar dívidas.
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card className="md:w-[300px]">
                <CardContent className="p-4 pt-4">
                  <Image
                    src="/qualidade-vida.png"
                    alt="qualidade de vida"
                    width={65}
                    height={65}
                    className="mx-auto mb-2 object-cover"
                  />
                  <div>
                    <h3 className="text-md font-bold">
                      Melhoria da Qualidade de Vida
                    </h3>
                    <p className="text-sm	font-extralight">
                      Controlar suas despesas pode levar a uma melhor qualidade
                      de vida, reduzindo o estresse financeiro, aumentando a
                      segurança financeira e proporcionando uma sensação de
                      controle sobre suas finanças pessoais.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section id="who" className=" px-6 py-12">
          <div className=" m-auto flex max-w-screen-xl flex-col items-center justify-center gap-3 md:flex-row">
            <div className="flex w-full flex-col gap-6 md:w-2/3">
              <p className="text-green-500">
                O DinDin é uma plataforma de gestão financeira pessoal intuitiva
                e simples de usar.
              </p>
              <h2 className=" text-4xl font-extrabold lg:text-6xl">
                Sobre o <span className="text-green-500"> DinDin</span>
              </h2>
              <p>
                O DinDin iniciou sua operação em 2024. Partindo de uma
                necessidade pessoal de seu fundador Giovanni. <br /> Cansado de
                planilhas que apresentam bugs, se tornam difíceis de manusear e
                difícil entendimento, a ideia de gerenciar seu dinheiro por meio
                de um aplicativo fácil de usar foi a melhor opção.
              </p>
              <p>
                Em pouco tempo de lançamento, já passamos da marca de 10.000
                usuários. Hoje, o aplicativo já caminha com suas próprias
                pernas.
                <br />
                Hoje com um time de 8 pessoas, o DinDin conta com equipe de
                programadores, marketing e relacionamento, prestando assim um
                suporte totalmente personalizado para nossos assinantes.
              </p>
              <p>
                Aqui no DinDin, prezamos pela facilidade de uso do app. Sem
                complicações e excesso de informações que vai deixar você
                perdido.
                <br />
                Transparência e comprometimento com os usuários são
                fundamentais. Nunca usaremos seus dados para fins de parcerias
                com instituições parceiras.
              </p>
              <div className="grid-cols-2 gap-4 space-y-3 lg:grid lg:space-y-0">
                <Card className=" flex items-center  border-primary">
                  <CardContent className="flex items-center pt-6">
                    <div className="mr-3 bg-muted/40 p-2">
                      <Check />
                    </div>
                    <div>
                      <span className="font-extralight	">
                        Gestão com simplicidade e praticidade
                      </span>
                    </div>
                  </CardContent>
                </Card>
                <Card className="flex items-center  border-primary">
                  <CardContent className="flex items-center pt-6">
                    <div className="mr-3 bg-muted/40 p-2">
                      <Check />
                    </div>
                    <div>
                      <span className="font-extralight	">
                        Ultrapassamos 10.000 usuários
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
            <div className="w-full md:w-1/3">
              <Image
                src="/team-dindin.png"
                alt="team-dindin"
                className="mx-auto object-contain"
                width={500}
                height={500}
              />
            </div>
          </div>
        </section>

        <section id="explore" className="bg-green-50 px-6 py-12 ">
          <div className="m-auto flex max-w-screen-xl flex-col gap-3 text-center">
            <h2 className="text-4xl font-extrabold text-black lg:text-6xl">
              Nossos principais recursos
            </h2>
            <p className="font-extralight text-black">
              Conheça os recursos que vão revolucionar seu controle financeiro
              pessoal, proporcionando uma visão clara da sua situação financeira
              e te ajudando a tomar decisões mais assertivas para alcançar seus
              objetivos.
            </p>

            <div className="items-center justify-center gap-4 lg:flex">
              <div className="space-y-3">
                <Card>
                  <CardContent className=" flex gap-4 p-4">
                    <span className="m-auto border p-3 text-xl">
                      <LogOut className="text-red-600" />
                    </span>
                    <div>
                      <h3 className="text-left text-xl font-bold">
                        Cadastre todos os seus gastos
                      </h3>
                      <p className="text-left	font-extralight">
                        Mantenha tudo sob controle cadastrando suas contas e
                        despesas organizadas por categoria
                      </p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className=" flex gap-4  p-4">
                    <span className="m-auto border p-3 text-xl">
                      <Heart className="text-pink-500 " />
                    </span>
                    <div>
                      <h3 className="text-left text-xl font-bold">
                        Lista de desejos
                      </h3>
                      <p className="text-left	font-extralight">
                        Cadastre e mantenha atualizado seus desejos de compras
                      </p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className=" flex gap-4  p-4">
                    <span className="m-auto border p-3 text-xl">
                      <HandCoins className="text-green-300" />
                    </span>
                    <div>
                      <h3 className="text-left text-xl font-bold">
                        Cadastre seus recebimentos
                      </h3>
                      <p className="text-left font-extralight">
                        Recebimentos fixos e variáveis com data de expiração
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div>
                <Image
                  src="/resume-cards-main.png"
                  alt="resume-cards-main"
                  className="object-contain"
                  width={400}
                  height={800}
                />
              </div>
              <div className="space-y-3">
                <Card>
                  <CardContent className=" flex gap-4  p-4">
                    <span className="m-auto border p-3 text-xl">
                      <Grid2x2 className="text-yellow-500" />
                    </span>
                    <div>
                      <h3 className="text-left text-xl font-bold">
                        Categorias flexíveis
                      </h3>
                      <p className="text-left font-extralight">
                        Cadastre e gerencie categorias da maneira que melhor lhe
                        atender
                      </p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className=" flex gap-4  p-4">
                    <span className="m-auto border p-3 text-xl">
                      <BarChart3 className="text-blue-500" />
                    </span>
                    <div>
                      <h3 className="text-left text-xl font-bold">
                        Dashboard financeiro
                      </h3>
                      <p className="text-left font-extralight">
                        Tenha acesso a um incrível dashboard com visualização
                        completa da sua gestão financeira
                      </p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className=" flex gap-4  p-4">
                    <span className="m-auto border p-3 text-xl">
                      <BarChart2 />
                    </span>
                    <div>
                      <h3 className="text-left text-xl font-bold">
                        Cadastro de investimentos
                      </h3>
                      <p className="text-left font-extralight">
                        Tenha controle total sobre seus investimentos
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        <section className="overflow-x-hidden px-6 py-12">
          <div className="m-auto flex max-w-screen-xl flex-col gap-3 text-center">
            <p className=" text-green-500">O que eles estão falando</p>

            <h2 className="mb-10 text-4xl font-extrabold lg:text-6xl">
              Veja porquê nossos clientes amam o
              <span className=" text-green-500"> DinDin</span>
            </h2>
          </div>

          <Carousel
            plugins={[plugin.current]}
            className="mx-auto w-10/12	lg:w-11/12"
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
          >
            <CarouselContent>
              <CarouselItem className="md:basis-1/2 lg:basis-1/4">
                <Card>
                  <CardContent className="flex h-[300px] flex-col justify-between gap-4 rounded-2xl py-5">
                    <div>
                      <h3 className="text-lg font-bold ">
                        Simples e intuitivo! Amei!
                      </h3>
                      <div className="flex">
                        <CardStarsIcon />
                      </div>
                    </div>
                    <p>
                      Conseguiu substituir minha planilha de excel! Há tempos
                      testei diversos app, mas esse é excelente e funcional, e
                      atendimento da equipe!
                    </p>
                    <div>
                      <span>escrito por</span>
                      <h3 className="text-lg font-bold ">Beatriz Campos</h3>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>

              <CarouselItem className="md:basis-1/2 lg:basis-1/4">
                <Card>
                  <CardContent className="flex h-[300px] flex-col justify-between gap-4 rounded-2xl py-5">
                    <div>
                      <h3 className="text-lg font-bold ">
                        Imprescindível na minha vida
                      </h3>
                      <div className="flex">
                        <CardStarsIcon />
                      </div>
                    </div>
                    <p>
                      Enfim, consegui organizar minhas contas e identificar onde
                      gasto mais. Agora posso me organizar e planejar meus
                      gastos
                    </p>
                    <div>
                      <span>escrito por</span>
                      <h3 className="text-lg font-bold ">Jessica Ramos</h3>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>

              <CarouselItem className="md:basis-1/2 lg:basis-1/4">
                <Card>
                  <CardContent className="flex h-[300px] flex-col justify-between gap-4 rounded-2xl py-5">
                    <div>
                      <h3 className="text-lg font-bold ">
                        Melhor decisão de todas! Muito satisfeito..
                      </h3>
                      <div className="flex">
                        <CardStarsIcon />
                      </div>
                    </div>
                    <p>
                      Com o DinDin, consegui organizar minhas finanças e
                      otimizar meus gastos
                    </p>
                    <div>
                      <span>escrito por</span>
                      <h3 className="text-lg font-bold ">Miguel Barros</h3>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>

              <CarouselItem className="md:basis-1/2 lg:basis-1/4">
                <Card>
                  <CardContent className="flex h-[300px] flex-col justify-between gap-4 rounded-2xl py-5">
                    <div>
                      <h3 className="text-lg font-bold ">
                        Simplesmente fantástico!
                      </h3>
                      <div className="flex">
                        <CardStarsIcon />
                      </div>
                    </div>
                    <p>
                      Este app é tudo o que eu precisava e mais um pouco. Agora
                      consigo gerenciar meus gastos sem problemas!
                    </p>
                    <div>
                      <span>escrito por</span>
                      <h3 className="text-lg font-bold ">Carla Almeida</h3>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>

              <CarouselItem className="md:basis-1/2 lg:basis-1/4">
                <Card>
                  <CardContent className="flex h-[300px] flex-col justify-between gap-4 rounded-2xl py-5">
                    <div>
                      <h3 className="text-lg font-bold ">
                        Fácil de usar e intuitivo
                      </h3>
                      <div className="flex">
                        <CardStarsIcon />
                      </div>
                    </div>
                    <p>
                      Supreso com tamanha facilidade na usabilidade. Consigo
                      acessar tudo sem ter que ficar pensando onde entrar.
                    </p>
                    <div>
                      <span>escrito por</span>
                      <h3 className="text-lg font-bold ">Rafael Nascimento</h3>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>

              <CarouselItem className="md:basis-1/2 lg:basis-1/4">
                <Card>
                  <CardContent className="flex h-[300px] flex-col justify-between gap-4 rounded-2xl py-5">
                    <div>
                      <h3 className="text-lg font-bold ">
                        Exatamente o que eu precisava
                      </h3>
                      <div className="flex">
                        <CardStarsIcon />
                      </div>
                    </div>
                    <p>
                      Estava em busca de um app de gestão há algum tempo e nunca
                      tinha conseguido me identificar. Até achar o DinDin...
                    </p>
                    <div>
                      <span>escrito por</span>
                      <h3 className="text-lg font-bold ">Deborah Nascimento</h3>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>

              <CarouselItem className="md:basis-1/2 lg:basis-1/4">
                <Card>
                  <CardContent className="flex h-[300px] flex-col justify-between gap-4 rounded-2xl py-5">
                    <div>
                      <h3 className="text-lg font-bold ">
                        Encantado com a plataforma
                      </h3>
                      <div className="flex">
                        <CardStarsIcon />
                      </div>
                    </div>
                    <p>
                      Esse App superou minhas expectativas.. Entregou além do
                      esperado!
                    </p>
                    <div>
                      <span>escrito por</span>
                      <h3 className="text-lg font-bold ">Pedro Henrique</h3>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>

              <CarouselItem className="md:basis-1/2 lg:basis-1/4">
                <Card>
                  <CardContent className="flex h-[300px] flex-col justify-between gap-4 rounded-2xl py-5">
                    <div>
                      <h3 className="text-lg font-bold ">
                        Livre das planilhas
                      </h3>
                      <div className="flex">
                        <CardStarsIcon />
                      </div>
                    </div>
                    <p>
                      O DinDin me possibilitou sair das planilhas e organizar
                      minhas finanças sem problemas por meio o app.
                    </p>
                    <div>
                      <span>escrito por</span>
                      <h3 className="text-lg font-bold ">Sofia Vasquez</h3>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </section>

        <SectionCta />

        <section className="bg-muted/40 px-6 py-12 ">
          <div className="m-auto flex max-w-screen-xl flex-col gap-3 text-center">
            <p className=" text-green-500">FAQ</p>

            <h2 className="text-4xl font-extrabold lg:text-6xl">
              Perguntas frequentes
            </h2>

            <Accordion
              type="single"
              collapsible
              className="mx-auto mt-6 flex w-full flex-col gap-3 lg:w-2/3"
            >
              <AccordionItem
                value="item-1"
                className="rounded-sm border px-4 py-2"
              >
                <AccordionTrigger className="text-left">
                  Preciso cadastrar meu cartão de crédito para poder testar os 7
                  dias?
                </AccordionTrigger>
                <AccordionContent className="text-left">
                  Não, para aproveitar o período de teste de 7 dias de forma
                  gratuita, fazendo seu controle pessoal com o DinDin, não será
                  necessário cadastrar seu cartão de crédito. Nenhum dado de
                  pagamento será solicitado durante o período de teste. Se optar
                  por assinar o DinDin após o período de teste, você precisará
                  cadastrar suas informações.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem
                value="item-2 "
                className="rounded-sm border px-4 py-2"
              >
                <AccordionTrigger className="text-left">
                  Quanto custa a assinatura do DinDin?
                </AccordionTrigger>
                <AccordionContent className="text-left">
                  A assinatura do DinDin tem um custo mensal de R$19,90, mas
                  você também pode optar pela assinatura anual que custa 12x de
                  R$ 9,90 ou R$99,90 à vista.
                  <br />
                  Investir no DinDin é uma decisão inteligente para você que
                  deseja organizar suas finanças pessoais e finalmente ter um
                  controle financeiro fácil de manter e capaz de te ajudar a
                  alcançar suas metas de curto, médio e longo prazo. Nossa
                  ferramenta oferece uma gama completa de recursos para auxiliar
                  a controlar seus gastos, planejar seu orçamento e economizar
                  tempo. Confira todos os detalhes dos planos disponíveis na
                  página de planos do DinDin
                </AccordionContent>
              </AccordionItem>
              <AccordionItem
                value="item-3"
                className="rounded-sm border px-4 py-2"
              >
                <AccordionTrigger className="text-left">
                  O DinDin vende dados financeiros para terceiros?
                </AccordionTrigger>
                <AccordionContent className="text-left">
                  Nunca. Nossa única fonte de receita é a sua assinatura. É ela
                  que permite nos mantermos sempre fiéis ao nosso grande
                  propósito, que é levar progresso financeiro às pessoas.
                  Valorizamos a confiança que você deposita em nós ao utilizar
                  nossa plataforma de controle financeiro pessoal e nos
                  comprometemos a proteger suas informações.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem
                value="item-4"
                className="rounded-sm border px-4 py-2"
              >
                <AccordionTrigger className="text-left">
                  O DinDin pode deixar de existir?
                </AccordionTrigger>
                <AccordionContent className="text-left">
                  O DinDin é o mais novo Gerenciador Financeiro Pessoal. Temos
                  uma estrutura construída com muito trabalho e paixão que nos
                  orgulha. Com crescimento constante, 100% auto-financiado com
                  receitas próprias (assinaturas de clientes). Não, nós não
                  iremos deixar de existir. Vamos sim seguir evoluindo e
                  trabalhando incansavelmente todos os dias para melhorar nossos
                  serviços e impactar positivamente a vida dos brasileiros.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem
                value="item-5"
                className="rounded-sm border px-4 py-2"
              >
                <AccordionTrigger className="text-left">
                  Posso usar o DinDin no celular e também no computador?
                </AccordionTrigger>
                <AccordionContent className="text-left">
                  Sim, o DinDin está disponível em versões mobile e desktop,
                  permitindo que você gerencie suas finanças de forma
                  conveniente e acessível em qualquer dispositivo. Essa
                  versatilidade oferece benefícios significativos, pois você
                  pode usar a plataforma onde e quando for mais conveniente para
                  você, sem se preocupar com restrições de acesso. Seja em
                  movimento, utilizando o aplicativo no seu smartphone, ou em
                  casa, você terá todas as ferramentas necessárias para manter
                  seu controle financeiro pessoal atualizado e organizado. Com o
                  DinDin, sua vida financeira está sempre ao alcance das suas
                  mãos, independentemente de onde você esteja ou do dispositivo
                  que esteja usando.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem
                value="item-6"
                className="rounded-sm border px-4 py-2"
              >
                <AccordionTrigger className="text-left">
                  Existe algum tipo de treinamento?
                </AccordionTrigger>
                <AccordionContent className="text-left">
                  Com certeza! Além do app ser prático e superfuncional, você
                  terá acesso a aulas e suporte personalizado.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem
                value="item-7"
                className="rounded-sm border px-4 py-2"
              >
                <AccordionTrigger className="text-left">
                  Como acessar o app?
                </AccordionTrigger>
                <AccordionContent className="text-left">
                  Basta navegar até a página de login, e você já terá acesso as
                  ferramentas.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>

        <section className="bg-muted/40 px-6 py-12 ">
          <Card className="m-auto flex max-w-screen-lg flex-col gap-3 border-orange-400 text-center shadow-md shadow-orange-400 lg:px-6">
            <CardContent className="gap-6 py-6 lg:flex lg:items-center ">
              <div className="lg:w-2/3">
                <h3 className=" mb-4 text-3xl font-extrabold lg:text-left lg:text-5xl">
                  Ainda com dúvidas?
                </h3>
                <p className=" mb-5 font-light lg:mb-0 lg:text-left ">
                  Caso tenha ficado com alguma dúvida sobre o uso do app, nossa
                  Central de Ajuda está cheia de dicas incríveis para você
                  aproveitar o DinDin ao máximo!
                </p>
              </div>
              <div className="lg:w-1/3">
                <Link
                  href="https://wa.me/+5516981969823?text=Olá,%20gostaria%20de%20obter%20suporte%20com%20o%20app%20Dindin!"
                  target="_blank"
                  passHref={true}
                >
                  <Button className="font-meddium mx-auto flex items-center bg-orange-400 p-6 text-lg shadow-md shadow-orange-400">
                    Central de ajuda
                    <CircleArrowRight className="ml-2" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
      <Footer />
    </div>
  );
}
